import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

// Middleware para JSON
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173', // libera a porta do Vite
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// // Rotas
app.use('/api', productRoutes)
app.use('/api', orderRoutes)
app.use('/api', cartRoutes)
app.use('/api', userRoutes)
app.use('/api', authRoutes)


// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: 'BLUSH API',
    version: '1.0.0',
    auth: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      me: 'GET /api/auth/me (requer token)',
      'change-password': 'PATCH /api/auth/change-password (requer token)',
      'recover-password': 'POST /api/auth/recover-password',
      'reset-password': 'POST /api/auth/reset-password'
    },
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      orders: '/api/orders',
      cart: '/api/cart',
      user: '/api/user'
    }
  })
})

const PORT = 3333
app.listen(PORT, () => {
  console.log(`🚀 BLUSH API rodando em http://localhost:${PORT}`)
})