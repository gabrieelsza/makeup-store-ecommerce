import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Configurar Prisma
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})
const prisma = new PrismaClient({ adapter })

/**
 * Cria um novo usuário
 * @param {Object} data - Dados do usuário
 * @returns {Promise<Object>} Usuário criado
 */
export async function createUser(data) {
    const { email, password, nome, cpf, telefone } = data

    const user = await prisma.user.create({
        data: {
            email,
            password, // Em produção, use bcrypt para hashear: await bcrypt.hash(password, 10)
            nome,
            cpf,
            telefone
        }
    })

    return user
}

/**
 * Busca usuário por ID
 * @param {number} id - ID do usuário
 * @returns {Promise<Object|null>} Usuário encontrado
 */
export async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            addresses: true,
            orders: {
                select: {
                    id: true,
                    numero: true,
                    status: true,
                    total: true,
                    createdAt: true
                }
            },
            favorites: {
                select: {
                    id: true,
                    product: {
                        select: {
                            id: true,
                            nome: true,
                            slug: true,
                            imagemPrincipal: true,
                            preco: true,
                            precoPromocional: true
                        }
                    }
                }
            }
        }
    })

    return user
}

/**
 * Busca usuário por email
 * @param {string} email - Email do usuário
 * @returns {Promise<Object|null>} Usuário encontrado
 */
export async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    return user
}

/**
 * Busca usuário por CPF
 * @param {string} cpf - CPF do usuário
 * @returns {Promise<Object|null>} Usuário encontrado
 */
export async function getUserByCPF(cpf) {
    const user = await prisma.user.findUnique({
        where: { cpf }
    })

    return user
}

/**
 * Atualiza usuário
 * @param {number} id - ID do usuário
 * @param {Object} data - Dados para atualizar
 * @returns {Promise<Object>} Usuário atualizado
 */
export async function updateUser(id, data) {
    const { nome, telefone, email, cpf } = data

    // Verificar se email já existe (para outro usuário)
    if (email) {
        const existingUser = await prisma.user.findFirst({
            where: {
                email,
                NOT: { id }
            }
        })

        if (existingUser) {
            throw new Error('Email já cadastrado')
        }
    }

    // Verificar se CPF já existe (para outro usuário)
    if (cpf) {
        const existingUser = await prisma.user.findFirst({
            where: {
                cpf,
                NOT: { id }
            }
        })

        if (existingUser) {
            throw new Error('CPF já cadastrado')
        }
    }

    const user = await prisma.user.update({
        where: { id },
        data: {
            nome,
            telefone,
            email,
            cpf
        }
    })

    return user
}

/**
 * Deleta usuário
 * @param {number} id - ID do usuário
 * @returns {Promise<void>}
 */
export async function deleteUser(id) {
    await prisma.user.delete({
        where: { id }
    })
}

/**
 * Lista pedidos de um usuário
 * @param {number} userId - ID do usuário
 * @returns {Promise<Array>} Lista de pedidos
 */
export async function getUserOrders(userId) {
    const orders = await prisma.order.findMany({
        where: { userId },
        include: {
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
 * Lista favoritos de um usuário
 * @param {number} userId - ID do usuário
 * @returns {Promise<Array>} Lista de favoritos
 */
export async function getUserFavorites(userId) {
    const favorites = await prisma.favorite.findMany({
        where: { userId },
        include: {
            product: {
                select: {
                    id: true,
                    nome: true,
                    slug: true,
                    imagemPrincipal: true,
                    preco: true,
                    precoPromocional: true,
                    categoria: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    })

    return favorites
}

/**
 * Adiciona produto aos favoritos
 * @param {Object} data - Dados
 * @returns {Promise<Array>} Lista de favoritos atualizada
 */
export async function addToFavorites(data) {
    const { userId, productId } = data

    // Verificar se produto existe
    const product = await prisma.product.findUnique({
        where: { id: productId }
    })

    if (!product) {
        throw new Error('Produto não encontrado')
    }

    // Verificar se já está nos favoritos
    const existing = await prisma.favorite.findUnique({
        where: {
            userId_productId: {
                userId,
                productId
            }
        }
    })

    if (existing) {
        throw new Error('Produto já está nos favoritos')
    }

    // Adicionar aos favoritos
    await prisma.favorite.create({
        data: {
            userId,
            productId
        }
    })

    // Retornar favoritos atualizados
    return await getUserFavorites(userId)
}

/**
 * Remove produto dos favoritos
 * @param {Object} data - Dados
 * @returns {Promise<Array>} Lista de favoritos atualizada
 */
export async function removeFromFavorites(data) {
    const { userId, productId } = data

    // Verificar se existe
    const favorite = await prisma.favorite.findUnique({
        where: {
            userId_productId: {
                userId,
                productId
            }
        }
    })

    if (!favorite) {
        throw new Error('Produto não está nos favoritos')
    }

    // Remover dos favoritos
    await prisma.favorite.delete({
        where: { id: favorite.id }
    })

    // Retornar favoritos atualizados
    return await getUserFavorites(userId)
}