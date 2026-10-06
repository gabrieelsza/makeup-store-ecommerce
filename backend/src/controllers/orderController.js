import * as orderService from '../services/orderService.js'
import {
    successResponse,
    errorResponse,
    validateCartItems,
    validateAddress,
    calculateSubtotal,
    calculateTotal
} from '../utils/index.js'

/**
 * GET /orders
 * Lista todos os pedidos (uso administrativo)
 */
export async function getAllOrders(req, res) {
    try {
        const { status, userId, page = 1, limit = 10 } = req.query

        const filters = {
            status: status || undefined,
            userId: userId ? parseInt(userId) : undefined,
            page: parseInt(page),
            limit: parseInt(limit)
        }

        const orders = await orderService.getAllOrders(filters)

        res.json(successResponse(orders, 'Pedidos encontrados'))

    } catch (error) {
        console.error('Erro no getAllOrders:', error)

        res.status(500).json(
            errorResponse('Erro ao buscar pedidos', 500)
        )
    }
}

/**
 * GET /orders/:userId
 * Lista pedidos de um usuário específico
 */
export async function getOrdersByUser(req, res) {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(400).json(
                errorResponse('ID do usuário é obrigatório', 400)
            )
        }

        const orders = await orderService.getOrdersByUser(parseInt(userId))

        res.json(successResponse(orders, `${orders.length} pedidos encontrados`))

    } catch (error) {
        console.error('Erro no getOrdersByUser:', error)

        res.status(500).json(
            errorResponse('Erro ao buscar pedidos', 500)
        )
    }
}

/**
 * GET /orders/detail/:id
 * Busca um pedido específico pelo ID
 */
export async function getOrderById(req, res) {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json(
                errorResponse('ID do pedido é obrigatório', 400)
            )
        }

        const order = await orderService.getOrderById(parseInt(id))

        res.json(successResponse(order))

    } catch (error) {
        console.error('Erro no getOrderById:', error)

        if (error.message === 'Pedido não encontrado') {
            return res.status(404).json(
                errorResponse('Pedido não encontrado', 404)
            )
        }

        res.status(500).json(
            errorResponse('Erro ao buscar pedido', 500)
        )
    }
}

/**
 * POST /orders
 * Cria um novo pedido
 */
export async function createOrder(req, res) {
    try {
        const { userId, items, endereco, cupomCodigo, pagamentoMethod } = req.body

        // Validar usuário
        if (!userId) {
            return res.status(400).json(
                errorResponse('ID do usuário é obrigatório', 400)
            )
        }

        // Validar itens do carrinho
        const itemsValidation = validateCartItems(items)
        if (!itemsValidation.valid) {
            return res.status(400).json({
                success: false,
                errors: itemsValidation.errors
            })
        }

        // Validar endereço
        const addressValidation = validateAddress(endereco)
        if (!addressValidation.valid) {
            return res.status(400).json({
                success: false,
                errors: addressValidation.errors
            })
        }

        // Validar método de pagamento
        const paymentMethods = ['CARTAO', 'PIX', 'BOLETO']
        if (pagamentoMethod && !paymentMethods.includes(pagamentoMethod)) {
            return res.status(400).json(
                errorResponse('Método de pagamento inválido', 400)
            )
        }

        // Calcular subtotal manualmente
        let subtotal = 0
        for (const item of items) {
            subtotal += item.precoUnitario * item.quantidade
        }

        const frete = 15.0 // Frete fixo
        let desconto = 0  // ← Inicializar com 0

        // Aplicar cupom se existir
        if (cupomCodigo) {
            const coupon = await orderService.validateCoupon(cupomCodigo, subtotal)
            if (coupon) {
                desconto = coupon.valor
            }
        }

        const total = subtotal + frete - desconto

        // Criar pedido
        const order = await orderService.createOrder({
            userId,
            items,
            endereco,
            cupomCodigo: cupomCodigo || null,
            cupomDesconto: desconto > 0 ? desconto : null,
            subtotal,
            frete,
            desconto,
            total,
            pagamentoMethod: pagamentoMethod || 'PIX'
        })

        res.status(201).json(
            successResponse(order, 'Pedido criado com sucesso')
        )

    } catch (error) {
        console.error('Erro no createOrder:', error)

        if (error.message.includes('Produto') || error.message.includes('Variante')) {
            return res.status(400).json(
                errorResponse(error.message, 400)
            )
        }

        res.status(500).json(
            errorResponse('Erro ao criar pedido', 500)
        )
    }
}

/**
 * PATCH /orders/:id/status
 * Atualiza o status de um pedido
 */
export async function updateOrderStatus(req, res) {
    try {
        const { id } = req.params
        const { status } = req.body

        if (!id) {
            return res.status(400).json(
                errorResponse('ID do pedido é obrigatório', 400)
            )
        }

        const validStatus = ['PENDENTE', 'CONFIRMADO', 'PREPARANDO', 'ENVIADO', 'ENTREGUE', 'CANCELADO']
        if (!status || !validStatus.includes(status)) {
            return res.status(400).json(
                errorResponse('Status inválido', 400)
            )
        }

        const order = await orderService.updateOrderStatus(parseInt(id), status)

        res.json(successResponse(order, 'Status atualizado com sucesso'))

    } catch (error) {
        console.error('Erro no updateOrderStatus:', error)

        if (error.message === 'Pedido não encontrado') {
            return res.status(404).json(
                errorResponse('Pedido não encontrado', 404)
            )
        }

        res.status(500).json(
            errorResponse('Erro ao atualizar status', 500)
        )
    }
}

/**
 * DELETE /orders/:id
 * Cancela um pedido
 */
export async function cancelOrder(req, res) {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json(
                errorResponse('ID do pedido é obrigatório', 400)
            )
        }

        const order = await orderService.cancelOrder(parseInt(id))

        res.json(successResponse(order, 'Pedido cancelado com sucesso'))

    } catch (error) {
        console.error('Erro no cancelOrder:', error)

        if (error.message === 'Pedido não encontrado') {
            return res.status(404).json(
                errorResponse('Pedido não encontrado', 404)
            )
        }

        if (error.message === 'Pedido já foi enviado') {
            return res.status(400).json(
                errorResponse('Não é possível cancelar um pedido já enviado', 400)
            )
        }

        res.status(500).json(
            errorResponse('Erro ao cancelar pedido', 500)
        )
    }
}