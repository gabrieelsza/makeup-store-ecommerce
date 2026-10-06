import { Router } from 'express'
import * as orderController from '../controllers/orderController.js'

const router = Router()

// GET /api/orders - Listar todos os pedidos (admin)
router.get('/orders', orderController.getAllOrders)

// GET /api/orders/:userId - Pedidos de um usuário
router.get('/orders/:userId', orderController.getOrdersByUser)

// GET /api/orders/:id - Pedido específico
router.get('/orders/detail/:id', orderController.getOrderById)

// POST /api/orders - Criar novo pedido
router.post('/orders', orderController.createOrder)

// PATCH /api/orders/:id/status - Atualizar status do pedido
router.patch('/orders/:id/status', orderController.updateOrderStatus)

// DELETE /api/orders/:id - Cancelar pedido
router.delete('/orders/:id', orderController.cancelOrder)

export default router