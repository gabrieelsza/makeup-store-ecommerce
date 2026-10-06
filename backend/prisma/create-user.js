import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'cliente@blush.com.br',
            password: 'senha123', // Em produção, use bcrypt para hashear
            nome: 'Cliente Teste',
            cpf: '12345678900',
            telefone: '(61) 99999-9999'
        }
    })

    console.log('Usuário criado:', user)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())