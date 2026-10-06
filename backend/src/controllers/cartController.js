import * as cartService from '../services/cartService.js'
import { successResponse, errorResponse, calculateSubtotal } from '../utils/index.js'

/**
 * GET /cart/:userId
 * Busca o carrinho de um usuário
 */
export async function getCartByUser(req, res) {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(400).json(
                errorResponse('ID do usuário é obrigatório', 400)
            )
        }

        const cart = await cartService.getCartByUser(parseInt(userId))

        // Calcular subtotal
        const subtotal = cart && cart.items ? calculateSubtotal(cart.items) : 0

        res.json(successResponse({
            ...cart,
            subtotal
        }))

    } catch (error) {
        console.error('Erro no getCartByUser:', error)

        res.status(500).json(
            errorResponse('Erro ao buscar carrinho', 500)
        )
    }
}

/**
 * POST /cart/:userId/items
 * Adiciona um item ao carrinho
 */
export async function addItemToCart(req, res) {
    try {
        const { userId } = req.params
        const { productId, variantId, quantidade = 1 } = req.body

        // Validar dados básicos
        if (!userId || !productId) {
            return res.status(400).json(
                errorResponse('userId e productId são obrigatórios', 400)
            )
        }

        if (quantidade < 1) {
            return res.status(400).json(
                errorResponse('Quantidade deve ser pelo menos 1', 400)
            )
        }

        // Adicionar item ao carrinho
        const cart = await cartService.addItemToCart({
            userId: parseInt(userId),
            productId: parseInt(productId),
            variantId: variantId ? parseInt(variantId) : null,
            quantidade: parseInt(quantidade)
        })

        // Calcular subtotal
        const subtotal = calculateSubtotal(cart.items)

        res.status(201).json(
            successResponse({
                ...cart,
                subtotal
            }, 'Item adicionado ao carrinho')
        )

    } catch (error) {
        console.error('Erro no addItemToCart:', error)

        if (error.message.includes('Produto') || error.message.includes('Variante')) {
            return res.status(400).json(
                errorResponse(error.message, 400)
            )
        }

        res.status(500).json(
            errorResponse('Erro ao adicionar item ao carrinho', 500)
        )
    }
}

/**
 * PATCH /cart/items/:itemId
 * Atualiza quantidade de um item do carrinho
 */
export async function updateCartItem(req, res) {
    try {
        const { itemId } = req.params
        const { quantidade } = req.body

        if (!itemId) {
            return res.status(400).json(
                errorResponse('ID do item é obrigatório', 400)
            )
        }

        if (!quantidade || quantidade < 1) {
            return res.status(400).json(
                errorResponse('Quantidade deve ser pelo menos 1', 400)
            )
        }

        const cart = await cartService.updateCartItem({
            itemId: parseInt(itemId),
            quantidade: parseInt(quantidade)
        })

        // Calcular subtotal
        const subtotal = calculateSubtotal(cart.items)

        res.json(
            successResponse({
                ...cart,
                subtotal
            }, 'Carrinho atualizado')
        )

    } catch (error) {
        console.error('Erro no updateCartItem:', error)

        if (error.message === 'Item não encontrado') {
            return res.status(404).json(
                errorResponse('Item não encontrado', 404)
            )
        }

        res.status(500).json(
            errorResponse('Erro ao atualizar carrinho', 500)
        )
    }
}

/**
 * DELETE /cart/items/:itemId
 * Remove um item do carrinho
 */
export async function removeItemFromCart(req, res) {
    try {
        const { itemId } = req.params

        if (!itemId) {
            return res.status(400).json(
                errorResponse('ID do item é obrigatório', 400)
            )
        }

        const cart = await cartService.removeItemFromCart(parseInt(itemId))

        // Calcular subtotal
        const subtotal = calculateSubtotal(cart.items)

        res.json(
            successResponse({
                ...cart,
                subtotal
            }, 'Item removido do carrinho')
        )

    } catch (error) {
        console.error('Erro no removeItemFromCart:', error)

        if (error.message === 'Item não encontrado') {
            return res.status(404).json(
                errorResponse('Item não encontrado', 404)
            )
        }

        res.status(500).json(
            errorResponse('Erro ao remover item do carrinho', 500)
        )
    }
}

/**
 * DELETE /cart/:userId
 * Limpa o carrinho inteiro de um usuário
 */
export async function clearCart(req, res) {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(400).json(
                errorResponse('ID do usuário é obrigatório', 400)
            )
        }

        await cartService.clearCart(parseInt(userId))

        res.json(
            successResponse({
                items: [],
                subtotal: 0
            }, 'Carrinho limpo')
        )

    } catch (error) {
        console.error('Erro no clearCart:', error)

        res.status(500).json(
            errorResponse('Erro ao limpar carrinho', 500)
        )
    }
}