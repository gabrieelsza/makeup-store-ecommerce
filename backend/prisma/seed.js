import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não encontrada no arquivo .env')
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const products = [
  { nome: 'Soft Glow Blush', slug: 'soft-glow-blush', categoria: 'Rosto', subcategoria: 'Blush', descricao: 'Blush em pó com acabamento natural e iluminado para um corado saudável.', preco: 89.9, estoque: 50, acabamento: 'Natural Glow', beneficios: 'Longa duração, não craquela, acabamento natural', modoUso: 'Aplique nas maçãs do rosto com pincel macio.', ingredientes: 'Mica, Silica, Dimethicone, Vitamina E', imagemPrincipal: '/images/products/soft-glow-blush.jpg', imagens: ['/images/products/soft-glow-blush-1.jpg'], variants: [{ nome: '01 Nude', codigo: 'NUDE-01', corHex: '#F5C6BA', estoque: 20 }, { nome: '02 Warm', codigo: 'WARM-02', corHex: '#E89A7E', estoque: 20 }, { nome: '03 Rose', codigo: 'ROSE-03', corHex: '#D47A8A', estoque: 20 }] },
  { nome: 'Velvet Skin Foundation', slug: 'velvet-skin-foundation', categoria: 'Rosto', subcategoria: 'Base', descricao: 'Base líquida com acabamento aveludado e cobertura média para pele uniforme.', preco: 149.9, precoPromocional: 119.9, estoque: 30, acabamento: 'Velvet Matte', beneficios: 'Cobertura construível, controle de oleosidade, FPS 20', modoUso: 'Aplique do centro do rosto para fora com esponja ou pincel.', ingredientes: 'Water, Cyclopentasiloxane, Titanium Dioxide, Glycerin', imagemPrincipal: '/images/products/velvet-skin-foundation.jpg', imagens: ['/images/products/velvet-skin-foundation-1.jpg'], variants: [{ nome: '01 Fair', codigo: 'FAIR-01', corHex: '#F9E4D6', estoque: 10 }, { nome: '02 Light', codigo: 'LIGHT-02', corHex: '#F0D0B8', estoque: 10 }, { nome: '03 Medium', codigo: 'MEDIUM-03', corHex: '#E0B090', estoque: 10 }, { nome: '04 Tan', codigo: 'TAN-04', corHex: '#C89068', estoque: 10 }, { nome: '05 Deep', codigo: 'DEEP-05', corHex: '#A06040', estoque: 10 }] },
  { nome: 'Cherry Kiss Lip Tint', slug: 'cherry-kiss-lip-tint', categoria: 'Lábios', subcategoria: 'Tint', descricao: 'Tint labial com cor vibrante, confortável e de longa duração.', preco: 69.9, estoque: 80, acabamento: 'Glossy', beneficios: 'Hidratação, cor intensa, longa duração', modoUso: 'Aplique diretamente nos lábios.', ingredientes: 'Isododecane, Dimethicone, Cherry Extract, Vitamina E', imagemPrincipal: '/images/products/cherry-kiss-tint.jpg', imagens: ['/images/products/cherry-kiss-tint-1.jpg'], variants: [{ nome: '01 Cherry', codigo: 'CHERRY-01', corHex: '#C41E3A', estoque: 25 }, { nome: '02 Coral', codigo: 'CORAL-02', corHex: '#FF7F50', estoque: 25 }, { nome: '03 Berry', codigo: 'BERRY-03', corHex: '#8B3A62', estoque: 25 }] },
  { nome: 'Cloud Mascara', slug: 'cloud-mascara', categoria: 'Olhos', subcategoria: 'Máscara de cílios', descricao: 'Máscara volumizadora para cílios definidos e sem borrões.', preco: 79.9, estoque: 60, acabamento: 'Matte', beneficios: 'Volume, alongamento, resistente à água', modoUso: 'Aplique da raiz às pontas em zigue-zague.', ingredientes: 'Beeswax, Carnauba Wax, Iron Oxides, Panthenol', imagemPrincipal: '/images/products/cloud-mascara.jpg', imagens: ['/images/products/cloud-mascara-1.jpg'], variants: [{ nome: '01 Black', codigo: 'BLACK-01', corHex: '#000000', estoque: 40 }] },
  { nome: 'Nude Mood Palette', slug: 'nude-mood-palette', categoria: 'Olhos', subcategoria: 'Paleta', descricao: 'Paleta de 12 sombras em tons nude, entre acabamentos matte e cintilante.', preco: 189.9, precoPromocional: 159.9, estoque: 25, acabamento: 'Matte & Shimmer', beneficios: 'Alta pigmentação, fácil de esfumar, 12 cores versáteis', modoUso: 'Aplique com pincéis de sombra.', ingredientes: 'Mica, Talc, Magnesium Stearate, Dimethicone', imagemPrincipal: '/images/products/nude-mood-palette.jpg', imagens: ['/images/products/nude-mood-palette-1.jpg'], variants: [] },
  { nome: 'Glow Stick', slug: 'glow-stick', categoria: 'Rosto', subcategoria: 'Iluminador', descricao: 'Iluminador em bastão para pontos de luz com aplicação prática.', preco: 99.9, estoque: 40, acabamento: 'Metallic Glow', beneficios: 'Brilho construível, fácil de aplicar, não transfere', modoUso: 'Aplique nos pontos altos do rosto e esfume.', ingredientes: 'Mica, Synthetic Fluorphlogopite, Dimethicone, Vitamina E', imagemPrincipal: '/images/products/glow-stick.jpg', imagens: ['/images/products/glow-stick-1.jpg'], variants: [{ nome: '01 Pearl', codigo: 'PEARL-01', corHex: '#F8F4E8', estoque: 15 }, { nome: '02 Gold', codigo: 'GOLD-02', corHex: '#FFD700', estoque: 15 }, { nome: '03 Rose Gold', codigo: 'ROSE-GOLD-03', corHex: '#E0BFB8', estoque: 15 }] },
  { nome: 'Soft Touch Concealer', slug: 'soft-touch-concealer', categoria: 'Rosto', subcategoria: 'Corretivo', descricao: 'Corretivo de alta cobertura e textura leve para olheiras e imperfeições.', preco: 79.9, estoque: 55, acabamento: 'Natural', beneficios: 'Alta cobertura, não craquela, hidratação', modoUso: 'Aplique em pequenas quantidades e esfume.', ingredientes: 'Water, Cyclopentasiloxane, Titanium Dioxide, Caffeine', imagemPrincipal: '/images/products/soft-touch-concealer.jpg', imagens: ['/images/products/soft-touch-concealer-1.jpg'], variants: [{ nome: '01 Fair', codigo: 'FAIR-01', corHex: '#F9E4D6', estoque: 12 }, { nome: '02 Light', codigo: 'LIGHT-02', corHex: '#F0D0B8', estoque: 12 }, { nome: '03 Medium', codigo: 'MEDIUM-03', corHex: '#E0B090', estoque: 12 }, { nome: '04 Tan', codigo: 'TAN-04', corHex: '#C89068', estoque: 12 }] },
  { nome: 'Glass Lip Gloss', slug: 'glass-lip-gloss', categoria: 'Lábios', subcategoria: 'Gloss', descricao: 'Gloss com efeito vidro e hidratação intensa, sem sensação pegajosa.', preco: 59.9, precoPromocional: 49.9, estoque: 100, acabamento: 'Glass Shine', beneficios: 'Brilho intenso, hidratação, textura confortável', modoUso: 'Aplique diretamente ou sobre o batom.', ingredientes: 'Polybutene, Octyldodecanol, Hyaluronic Acid, Vitamina E', imagemPrincipal: '/images/products/glass-lip-gloss.jpg', imagens: ['/images/products/glass-lip-gloss-1.jpg'], variants: [{ nome: '01 Clear', codigo: 'CLEAR-01', corHex: '#FFFFFF', estoque: 30 }, { nome: '02 Pink', codigo: 'PINK-02', corHex: '#FFB6C1', estoque: 30 }, { nome: '03 Nude', codigo: 'NUDE-03', corHex: '#E8C4B0', estoque: 30 }] },
  { nome: 'Matte Mood Lipstick', slug: 'matte-mood-lipstick', categoria: 'Lábios', subcategoria: 'Batom', descricao: 'Batom matte confortável, pigmentado e com acabamento sofisticado.', preco: 89.9, estoque: 45, acabamento: 'Matte', beneficios: 'Cor intensa, longa duração, não transfere', modoUso: 'Aplique diretamente nos lábios.', ingredientes: 'Dimethicone, Beeswax, Vitamina E, Shea Butter', imagemPrincipal: '/images/products/matte-mood-lipstick.jpg', imagens: ['/images/products/matte-mood-lipstick-1.jpg'], variants: [{ nome: '01 Red', codigo: 'RED-01', corHex: '#C41E3A', estoque: 12 }, { nome: '02 Nude', codigo: 'NUDE-02', corHex: '#D4A59A', estoque: 12 }, { nome: '03 Berry', codigo: 'BERRY-03', corHex: '#8B3A62', estoque: 12 }, { nome: '04 Coral', codigo: 'CORAL-04', corHex: '#FF7F50', estoque: 12 }] },
  { nome: 'Brow Define Pencil', slug: 'brow-define-pencil', categoria: 'Olhos', subcategoria: 'Sobrancelha', descricao: 'Lápis de sobrancelha de precisão com ponta retrátil e esfumador.', preco: 69.9, estoque: 70, acabamento: 'Natural', beneficios: 'Precisão, fácil de esfumar, resistente à água', modoUso: 'Faça traços leves e esfume.', ingredientes: 'Hydrogenated Soybean Oil, Talc, Iron Oxides, Vitamina E', imagemPrincipal: '/images/products/brow-define-pencil.jpg', imagens: ['/images/products/brow-define-pencil-1.jpg'], variants: [{ nome: '01 Blonde', codigo: 'BLONDE-01', corHex: '#D4B896', estoque: 20 }, { nome: '02 Brown', codigo: 'BROWN-02', corHex: '#6B4423', estoque: 20 }, { nome: '03 Black', codigo: 'BLACK-03', corHex: '#2B2B2B', estoque: 20 }] },
  { nome: 'Setting Spray Fix', slug: 'setting-spray-fix', categoria: 'Rosto', subcategoria: 'Fixador', descricao: 'Spray fixador com acabamento natural e longa duração.', preco: 99.9, precoPromocional: 84.9, estoque: 35, acabamento: 'Natural', beneficios: 'Fixa por até 12 horas, não resseca, acabamento natural', modoUso: 'Borrife a 20 cm do rosto após a maquiagem.', ingredientes: 'Water, Alcohol, Glycerin, Aloe Vera', imagemPrincipal: '/images/products/setting-spray-fix.jpg', imagens: ['/images/products/setting-spray-fix-1.jpg'], variants: [] },
  { nome: 'Eyeshadow Primer', slug: 'eyeshadow-primer', categoria: 'Olhos', subcategoria: 'Primer', descricao: 'Primer para intensificar a cor das sombras e prolongar a duração.', preco: 59.9, estoque: 50, acabamento: 'Matte', beneficios: 'Intensifica cor, previne acúmulo, longa duração', modoUso: 'Aplique uma camada fina nas pálpebras.', ingredientes: 'Isododecane, Cyclopentasiloxane, Silica, Vitamina E', imagemPrincipal: '/images/products/eyeshadow-primer.jpg', imagens: ['/images/products/eyeshadow-primer-1.jpg'], variants: [] }
]

const users = [
  { email: 'admin@blush.com.br', password: 'admin123', nome: 'Admin BLUSH', cpf: '11111111111', telefone: '(61) 99999-0001' },
  { email: 'cliente@blush.com.br', password: 'cliente123', nome: 'Cliente Teste', cpf: '12345678900', telefone: '(61) 99999-0002' },
  { email: 'maria@blush.com.br', password: 'maria123', nome: 'Maria Silva', cpf: '22222222222', telefone: '(61) 99999-0003' },
  { email: 'ana@blush.com.br', password: 'ana123', nome: 'Ana Costa', cpf: '33333333333', telefone: '(61) 99999-0004' }
]

const coupons = [
  { codigo: 'BLUSH10', descricao: '10% de desconto em qualquer compra', tipoDesconto: 'PORCENTAGEM', valor: 10, validoDe: new Date('2026-01-01'), validoAte: new Date('2026-12-31T23:59:59.999Z'), ativo: true },
  { codigo: 'PRIMEIRACOMPRA', descricao: '15% de desconto na primeira compra acima de R$ 100', tipoDesconto: 'PORCENTAGEM', valor: 15, valorMinimo: 100, validoDe: new Date('2026-01-01'), validoAte: new Date('2026-12-31T23:59:59.999Z'), ativo: true },
  { codigo: 'FRETEGRATIS', descricao: 'Desconto de R$ 15 acima de R$ 200', tipoDesconto: 'FIXO', valor: 15, valorMinimo: 200, validoDe: new Date('2026-01-01'), validoAte: new Date('2026-12-31T23:59:59.999Z'), ativo: true }
]

async function seedProducts() {
  const result = new Map()

  for (const productData of products) {
    const { variants, ...productDataWithoutVariants } = productData

    const product = await prisma.product.create({
      data: {
        ...productDataWithoutVariants,
        variants: { create: variants }
      },
      include: { variants: true }
    })

    result.set(product.slug, product)
  }

  return result
}

async function seedUsers() {
  const result = new Map()

  for (const userData of users) {
    const password = await bcrypt.hash(userData.password, 10)
    const user = await prisma.user.create({
      data: { ...userData, password }
    })

    result.set(user.email, user)
  }

  return result
}

async function seedAddresses(userByEmail) {
  const data = [
    { email: 'cliente@blush.com.br', cep: '70000-000', rua: 'SCS Quadra 1', numero: '100', complemento: 'Apto 501', bairro: 'Asa Sul', cidade: 'Brasília', estado: 'DF', padrao: true },
    { email: 'maria@blush.com.br', cep: '70040-010', rua: 'SCLN 204', numero: 'B', complemento: 'Casa 15', bairro: 'Asa Norte', cidade: 'Brasília', estado: 'DF', padrao: true },
    { email: 'ana@blush.com.br', cep: '70800-000', rua: 'SHIN QI 10', numero: 'Conjunto 5', complemento: 'Casa 12', bairro: 'Lago Norte', cidade: 'Brasília', estado: 'DF', padrao: true }
  ]

  for (const address of data) {
    const user = userByEmail.get(address.email)
    const { email, ...addressData } = address

    await prisma.address.create({
      data: { ...addressData, userId: user.id }
    })
  }
}

async function seedCoupons() {
  for (const coupon of coupons) {
    await prisma.coupon.create({ data: coupon })
  }
}

async function seedFavorites(userByEmail, productBySlug) {
  const maria = userByEmail.get('maria@blush.com.br')
  const ana = userByEmail.get('ana@blush.com.br')

  const mariaSlugs = ['soft-glow-blush', 'cherry-kiss-lip-tint', 'nude-mood-palette', 'glass-lip-gloss']
  const anaSlugs = ['velvet-skin-foundation', 'cloud-mascara', 'glow-stick', 'matte-mood-lipstick', 'brow-define-pencil']

  for (const slug of mariaSlugs) {
    await prisma.favorite.create({ data: { userId: maria.id, productId: productBySlug.get(slug).id } })
  }

  for (const slug of anaSlugs) {
    await prisma.favorite.create({ data: { userId: ana.id, productId: productBySlug.get(slug).id } })
  }
}

async function seedOrders(userByEmail, productBySlug) {
  const maria = userByEmail.get('maria@blush.com.br')
  const ana = userByEmail.get('ana@blush.com.br')
  const blush = productBySlug.get('soft-glow-blush')
  const tint = productBySlug.get('cherry-kiss-lip-tint')
  const base = productBySlug.get('velvet-skin-foundation')
  const glow = productBySlug.get('glow-stick')
  const lapis = productBySlug.get('brow-define-pencil')

  await prisma.order.create({
    data: {
      numero: 'BLUSH-2026-0001', userId: maria.id,
      enderecoEntrega: 'SCLN 204, B - Casa 15', cep: '70040-010', cidade: 'Brasília', estado: 'DF',
      subtotal: 229.7, frete: 15, desconto: 22.97, total: 221.73,
      cupomCodigo: 'BLUSH10', cupomDesconto: 22.97,
      status: 'ENTREGUE', pagamentoMethod: 'CARTAO', pagamentoStatus: 'PAGO',
      items: {
        create: [
          { productId: blush.id, variantId: blush.variants.find((item) => item.codigo === 'NUDE-01').id, quantidade: 1, precoUnitario: 89.9, subtotal: 89.9 },
          { productId: tint.id, variantId: tint.variants.find((item) => item.codigo === 'CHERRY-01').id, quantidade: 2, precoUnitario: 69.9, subtotal: 139.8 }
        ]
      }
    }
  })

  await prisma.order.create({
    data: {
      numero: 'BLUSH-2026-0002', userId: ana.id,
      enderecoEntrega: 'SHIN QI 10, Conjunto 5 - Casa 12', cep: '70800-000', cidade: 'Brasília', estado: 'DF',
      subtotal: 269.7, frete: 15, desconto: 0, total: 284.7,
      status: 'ENVIADO', pagamentoMethod: 'PIX', pagamentoStatus: 'PAGO',
      items: {
        create: [
          { productId: base.id, variantId: base.variants.find((item) => item.codigo === 'LIGHT-02').id, quantidade: 1, precoUnitario: 119.9, subtotal: 119.9 },
          { productId: glow.id, variantId: glow.variants.find((item) => item.codigo === 'GOLD-02').id, quantidade: 1, precoUnitario: 99.9, subtotal: 99.9 },
          { productId: lapis.id, variantId: lapis.variants.find((item) => item.codigo === 'BROWN-02').id, quantidade: 1, precoUnitario: 49.9, subtotal: 49.9 }
        ]
      }
    }
  })
}

async function clearDatabase() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.review.deleteMany()
  await prisma.address.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()
}

async function main() {
  console.log('Limpando banco...')
  await clearDatabase()

  console.log('Criando usuários...')
  const userByEmail = await seedUsers()

  console.log('Criando produtos e tonalidades...')
  const productBySlug = await seedProducts()

  console.log('Criando endereços...')
  await seedAddresses(userByEmail)

  console.log('Criando cupons...')
  await seedCoupons()

  console.log('Criando favoritos...')
  await seedFavorites(userByEmail, productBySlug)

  console.log('Criando pedidos...')
  await seedOrders(userByEmail, productBySlug)

  console.log('Seed finalizado com sucesso.')
  console.log(`Produtos: ${products.length} | Usuários: ${users.length} | Cupons: ${coupons.length} | Pedidos: 2`)
}

main()
  .catch((error) => {
    console.error('Erro no seed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
