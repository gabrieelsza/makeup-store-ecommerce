import { Router } from 'express'
import * as userController from '../controllers/userController.js'

const router = Router()

// POST /users - Criar novo usuário (registro alternativo)
router.post('/users', userController.createUser)

// GET /users/:id - Buscar usuário por ID
router.get('/users/:id', userController.getUserById)

// GET /users/email/:email - Buscar usuário por email
router.get('/users/email/:email', userController.getUserByEmail)

// PATCH /users/:id - Atualizar usuário
router.patch('/users/:id', userController.updateUser)

// DELETE /users/:id - Deletar usuário
router.delete('/users/:id', userController.deleteUser)

// GET /users/:id/orders - Pedidos de um usuário
router.get('/users/:id/orders', userController.getUserOrders)

// GET /users/:id/favorites - Favoritos de um usuário
router.get('/users/:id/favorites', userController.getUserFavorites)

// POST /users/:id/favorites/:productId - Adicionar aos favoritos
router.post('/users/:id/favorites/:productId', userController.addToFavorites)

// DELETE /users/:id/favorites/:productId - Remover dos favoritos
router.delete('/users/:id/favorites/:productId', userController.removeFromFavorites)

export default router