import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Configurar Prisma
const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
})
const prisma = new PrismaClient({ adapter })

/**
 * Lista todos os pedidos com filtros
 * @param {Object} filters - Filtros da busca
 * @returns {Promise<Object>} Pedidos com paginação
 */
export async function getAllOrders(filters = {}) {
  const { status, userId, page = 1, limit = 10 } = filters
  
  const where = {}
  
  if (status) {
    where.status = status
  }
  
  if (userId) {
    where.userId = userId
  }
  
  const skip = (page - 1) * limit
  const take = limit
  
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            nome: true,
            email: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                nome: true,
                imagemPrincipal: true
              }
            },
            variant: {
              select: {
                nome: true,
                corHex: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take
    }),
    prisma.order.count({ where })
  ])
  
  return {
    orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  }
}

/**
 * Lista pedidos de um usuário
 * @param {number} userId - ID do usuário
 * @returns {Promise<Array>} Lista de pedidos
 */
export async function getOrdersByUser(userId) {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: {
              nome: true,
              imagemPrincipal: true
            }
          },
          variant: {
            select: {
              nome: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
  
  return orders
}

/**
 * Busca pedido por ID
 * @param {number} id - ID do pedido
 * @returns {Promise<Object>} Pedido encontrado
 */
export async function getOrderById(id) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          nome: true,
          email: true,
          cpf: true,
          telefone: true
        }
      },
      items: {
        include: {
          product: {
            select: {
              nome: true,
              imagemPrincipal: true,
              slug: true
            }
          },
          variant: {
            select: {
              nome: true,
              corHex: true
            }
          }
        }
      }
    }
  })
  
  if (!order) {
    throw new Error('Pedido não encontrado')
  }
  
  return order
}

/**
 * Valida cupom de desconto
 * @param {string} codigo - Código do cupom
 * @param {number} subtotal - Subtotal do pedido
 * @returns {Promise<Object|null>} Cupom válido ou null
 */
export async function validateCoupon(codigo, subtotal) {
  const coupon = await prisma.coupon.findUnique({
    where: { codigo }
  })
  
  if (!coupon || !coupon.ativo) {
    return null
  }
  
  const now = new Date()
  if (now < coupon.validoDe || now > coupon.validoAte) {
    return null
  }
  
  if (coupon.valorMinimo && subtotal < coupon.valorMinimo) {
    return null
  }
  
  // Calcular valor do desconto
  let valorDesconto = 0
  if (coupon.tipoDesconto === 'PORCENTAGEM') {
    valorDesconto = subtotal * (coupon.valor / 100)
  } else {
    valorDesconto = coupon.valor
  }
  
  return {
    ...coupon,
    valor: valorDesconto
  }
}

/**
 * Cria um novo pedido
 * @param {Object} data - Dados do pedido
 * @returns {Promise<Object>} Pedido criado
 */
export async function createOrder(data) {
  const { 
    userId, 
    items, 
    endereco, 
    cupomCodigo, 
    cupomDesconto,
    subtotal, 
    frete, 
    desconto, 
    total,
    pagamentoMethod 
  } = data
  
  // Validar estoque de cada produto
  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      include: { variants: true }
    })
    
    if (!product) {
      throw new Error(`Produto ${item.productId} não encontrado`)
    }
    
    // Verificar estoque do produto ou variante
    if (item.variantId) {
      const variant = product.variants.find(v => v.id === item.variantId)
      
      if (!variant) {
        throw new Error(`Variante ${item.variantId} não encontrada`)
      }
      
      if (variant.estoque < item.quantidade) {
        throw new Error(`Estoque insuficiente para ${product.nome} - ${variant.nome}`)
      }
    } else {
      if (product.estoque < item.quantidade) {
        throw new Error(`Estoque insuficiente para ${product.nome}`)
      }
    }
  }
  
  // Gerar número do pedido
  const numero = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  
  // Criar pedido com transação
  const order = await prisma.order.create({
    data: {
      numero,
      userId,
      enderecoEntrega: `${endereco.rua}, ${endereco.numero}${endereco.complemento ? ` - ${endereco.complemento}` : ''}`,
      cep: endereco.cep,
      cidade: endereco.cidade,
      estado: endereco.estado,
      subtotal,
      frete,
      desconto,
      total,
      cupomCodigo,
      cupomDesconto,
      pagamentoMethod,
      pagamentoStatus: 'PENDENTE',
      status: 'PENDENTE',
      items: {
        create: items.map(item => ({
          productId: item.productId,
          variantId: item.variantId || null,
          quantidade: item.quantidade,
          precoUnitario: item.precoUnitario,
          subtotal: item.precoUnitario * item.quantidade
        }))
      }
    },
    include: {
      items: {
        include: {
          product: true,
          variant: true
        }
      }
    }
  })
  
  // Atualizar estoque (opcional - pode ser feito depois)
  for (const item of items) {
    if (item.variantId) {
      await prisma.productVariant.update({
        where: { id: item.variantId },
        data: {
          estoque: {
            decrement: item.quantidade
          }
        }
      })
    } else {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          estoque: {
            decrement: item.quantidade
          }
        }
      })
    }
  }
  
  return order
}

/**
 * Atualiza status do pedido
 * @param {number} id - ID do pedido
 * @param {string} status - Novo status
 * @returns {Promise<Object>} Pedido atualizado
 */
export async function updateOrderStatus(id, status) {
  const order = await prisma.order.findUnique({
    where: { id }
  })
  
  if (!order) {
    throw new Error('Pedido não encontrado')
  }
  
  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status },
    include: {
      items: {
        include: {
          product: true,
          variant: true
        }
      }
    }
  })
  
  return updatedOrder
}

/**
 * Cancela um pedido
 * @param {number} id - ID do pedido
 * @returns {Promise<Object>} Pedido cancelado
 */
export async function cancelOrder(id) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true }
  })
  
  if (!order) {
    throw new Error('Pedido não encontrado')
  }
  
  if (order.status === 'ENVIADO' || order.status === 'ENTREGUE') {
    throw new Error('Pedido já foi enviado')
  }
  
  // Reestocar produtos
  for (const item of order.items) {
    if (item.variantId) {
      await prisma.productVariant.update({
        where: { id: item.variantId },
        data: {
          estoque: {
            increment: item.quantidade
          }
        }
      })
    } else {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          estoque: {
            increment: item.quantidade
          }
        }
      })
    }
  }
  
  // Atualizar pedido
  const cancelledOrder = await prisma.order.update({
    where: { id },
    data: { 
      status: 'CANCELADO',
      pagamentoStatus: 'CANCELADO'
    },
    include: {
      items: {
        include: {
          product: true,
          variant: true
        }
      }
    }
  })
  
  return cancelledOrder
}