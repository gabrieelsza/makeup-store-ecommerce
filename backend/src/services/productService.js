import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

export async function getAllProducts(filters = {}) {
    const { categoria, subcategoria, busca, min, max } = filters

    const where = {}

    if (categoria) where.categoria = categoria
    if (subcategoria) where.subcategoria = subcategoria

    if (busca) {
        where.OR = [
            { nome: { contains: busca, mode: 'insensitive' } },
            { descricao: { contains: busca, mode: 'insensitive' } }
        ]
    }

    if (min || max) {
        where.preco = {}
        if (min) where.preco.gte = parseFloat(min)
        if (max) where.preco.lte = parseFloat(max)
    }

    const products = await prisma.product.findMany({
        where,
        include: { variants: true },
        orderBy: { createdAt: 'desc' }
    })

    return products
}

export async function getProductBySlug(slug) {
    const product = await prisma.product.findUnique({
        where: { slug },
        include: { variants: true }
    })

    if (!product) {
        throw new Error('Produto não encontrado')
    }

    return product
}

export async function getCategories() {
    const categories = await prisma.product.findMany({
        select: { categoria: true, subcategoria: true },
        distinct: ['categoria', 'subcategoria']
    })

    return categories
}