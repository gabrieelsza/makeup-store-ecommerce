import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Configurar Prisma
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})
const prisma = new PrismaClient({ adapter })

/**
 * Busca carrinho de um usuário
 * @param {number} userId - ID do usuário
 * @returns {Promise<Object>} Carrinho com itens
 */
export async function getCartByUser(userId) {
    let cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    product: {
                        select: {
                            nome: true,
                            imagemPrincipal: true,
                            slug: true,
                            preco: true,
                            precoPromocional: true
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

    // Se não existir carrinho, cria um vazio
    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                userId,
                items: { create: [] }
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                nome: true,
                                imagemPrincipal: true,
                                slug: true,
                                preco: true,
                                precoPromocional: true
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
    }

    return cart
}

/**
 * Adiciona item ao carrinho
 * @param {Object} data - Dados do item
 * @returns {Promise<Object>} Carrinho atualizado
 */
export async function addItemToCart(data) {
    const { userId, productId, variantId, quantidade } = data

    // Validar produto
    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { variants: true }
    })

    if (!product) {
        throw new Error('Produto não encontrado')
    }

    // Validar variante se existir
    if (variantId) {
        const variant = product.variants.find(v => v.id === variantId)

        if (!variant) {
            throw new Error('Variante não encontrada')
        }

        if (variant.estoque < quantidade) {
            throw new Error(`Estoque insuficiente para ${product.nome} - ${variant.nome}`)
        }
    } else {
        if (product.estoque < quantidade) {
            throw new Error(`Estoque insuficiente para ${product.nome}`)
        }
    }

    // Buscar ou criar carrinho
    let cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: true }
    })

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                userId,
                items: { create: [] }
            }
        })
    }

    // Verificar se item já existe no carrinho
    const existingItem = cart.items.find(item => {
        return item.productId === productId &&
            item.variantId === variantId
    })

    if (existingItem) {
        // Atualizar quantidade
        await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: {
                quantidade: {
                    increment: quantidade
                }
            }
        })
    } else {
        // Adicionar novo item
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                variantId,
                quantidade
            }
        })
    }

    // Retornar carrinho atualizado
    return await getCartByUser(userId)
}

/**
 * Atualiza quantidade de um item do carrinho
 * @param {Object} data - Dados da atualização
 * @returns {Promise<Object>} Carrinho atualizado
 */
export async function updateCartItem(data) {
    const { itemId, quantidade } = data

    // Verificar se item existe
    const item = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: {
            cart: true
        }
    })

    if (!item) {
        throw new Error('Item não encontrado')
    }

    // Validar estoque
    const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { variants: true }
    })

    if (item.variantId) {
        const variant = product.variants.find(v => v.id === item.variantId)

        if (variant && variant.estoque < quantidade) {
            throw new Error(`Estoque insuficiente para ${product.nome}`)
        }
    } else {
        if (product.estoque < quantidade) {
            throw new Error(`Estoque insuficiente para ${product.nome}`)
        }
    }

    // Atualizar quantidade
    await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantidade }
    })

    // Retornar carrinho atualizado
    return await getCartByUser(item.cart.userId)
}

/**
 * Remove item do carrinho
 * @param {number} itemId - ID do item
 * @returns {Promise<Object>} Carrinho atualizado
 */
export async function removeItemFromCart(itemId) {
    const item = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: {
            cart: true
        }
    })

    if (!item) {
        throw new Error('Item não encontrado')
    }

    // Remover item
    await prisma.cartItem.delete({
        where: { id: itemId }
    })

    // Retornar carrinho atualizado
    return await getCartByUser(item.cart.userId)
}

/**
 * Limpa carrinho inteiro
 * @param {number} userId - ID do usuário
 * @returns {Promise<Object>} Carrinho vazio
 */
export async function clearCart(userId) {
    // Deletar todos os itens do carrinho
    await prisma.cartItem.deleteMany({
        where: { cart: { userId } }
    })

    // Retornar carrinho vazio
    return {
        id: userId,
        items: [],
        subtotal: 0
    }
}
