import { Router } from 'express'
import * as cartController from '../controllers/cartController.js'

const router = Router()

// GET /api/cart/:userId - Carrinho de um usuário
router.get('/cart/:userId', cartController.getCartByUser)

// POST /api/cart/:userId/items - Adicionar item ao carrinho
router.post('/cart/:userId/items', cartController.addItemToCart)

// PATCH /api/cart/items/:itemId - Atualizar quantidade de um item
router.patch('/cart/items/:itemId', cartController.updateCartItem)

// DELETE /api/cart/items/:itemId - Remover item do carrinho
router.delete('/cart/items/:itemId', cartController.removeItemFromCart)

// DELETE /api/cart/:userId - Limpar carrinho inteiro
router.delete('/cart/:userId', cartController.clearCart)

export default router