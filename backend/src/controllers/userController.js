import * as userService from '../services/userService.js'
import { 
  successResponse, 
  errorResponse,
  validateUser,
  validateAddress
} from '../utils/index.js'

/**
 * POST /users
 * Cria um novo usuário (registro)
 */
export async function createUser(req, res) {
  try {
    const { email, password, nome, cpf, telefone } = req.body
    
    // Validar dados
    const validation = validateUser({ email, password, nome, cpf, telefone })
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      })
    }
    
    // Verificar se email já existe
    const existingEmail = await userService.getUserByEmail(email)
    if (existingEmail) {
      return res.status(400).json(
        errorResponse('Email já cadastrado', 400)
      )
    }
    
    // Verificar se CPF já existe
    const existingCPF = await userService.getUserByCPF(cpf)
    if (existingCPF) {
      return res.status(400).json(
        errorResponse('CPF já cadastrado', 400)
      )
    }
    
    // Criar usuário
    const user = await userService.createUser({
      email,
      password,
      nome,
      cpf,
      telefone
    })
    
    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user
    
    res.status(201).json(
      successResponse(userWithoutPassword, 'Usuário criado com sucesso')
    )
    
  } catch (error) {
    console.error('Erro no createUser:', error)
    
    res.status(500).json(
      errorResponse('Erro ao criar usuário', 500)
    )
  }
}

/**
 * GET /users/:id
 * Busca usuário por ID
 */
export async function getUserById(req, res) {
  try {
    const { id } = req.params
    
    if (!id) {
      return res.status(400).json(
        errorResponse('ID é obrigatório', 400)
      )
    }
    
    const user = await userService.getUserById(parseInt(id))
    
    if (!user) {
      return res.status(404).json(
        errorResponse('Usuário não encontrado', 404)
      )
    }
    
    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user
    
    res.json(successResponse(userWithoutPassword))
    
  } catch (error) {
    console.error('Erro no getUserById:', error)
    
    res.status(500).json(
      errorResponse('Erro ao buscar usuário', 500)
    )
  }
}

/**
 * GET /users/email/:email
 * Busca usuário por email
 */
export async function getUserByEmail(req, res) {
  try {
    const { email } = req.params
    
    if (!email) {
      return res.status(400).json(
        errorResponse('Email é obrigatório', 400)
      )
    }
    
    const user = await userService.getUserByEmail(email)
    
    if (!user) {
      return res.status(404).json(
        errorResponse('Usuário não encontrado', 404)
      )
    }
    
    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user
    
    res.json(successResponse(userWithoutPassword))
    
  } catch (error) {
    console.error('Erro no getUserByEmail:', error)
    
    res.status(500).json(
      errorResponse('Erro ao buscar usuário', 500)
    )
  }
}

/**
 * PATCH /users/:id
 * Atualiza usuário
 */
export async function updateUser(req, res) {
  try {
    const { id } = req.params
    const { nome, telefone, email, cpf } = req.body
    
    if (!id) {
      return res.status(400).json(
        errorResponse('ID é obrigatório', 400)
      )
    }
    
    // Validar dados se foram enviados
    if (email || cpf) {
      const validation = validateUser({ email, cpf })
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          errors: validation.errors
        })
      }
    }
    
    const user = await userService.updateUser(parseInt(id), {
      nome,
      telefone,
      email,
      cpf
    })
    
    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user
    
    res.json(
      successResponse(userWithoutPassword, 'Usuário atualizado com sucesso')
    )
    
  } catch (error) {
    console.error('Erro no updateUser:', error)
    
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json(
        errorResponse('Usuário não encontrado', 404)
      )
    }
    
    if (error.message.includes('já cadastrado')) {
      return res.status(400).json(
        errorResponse(error.message, 400)
      )
    }
    
    res.status(500).json(
      errorResponse('Erro ao atualizar usuário', 500)
    )
  }
}

/**
 * DELETE /users/:id
 * Deleta usuário
 */
export async function deleteUser(req, res) {
  try {
    const { id } = req.params
    
    if (!id) {
      return res.status(400).json(
        errorResponse('ID é obrigatório', 400)
      )
    }
    
    await userService.deleteUser(parseInt(id))
    
    res.json(
      successResponse(null, 'Usuário deletado com sucesso')
    )
    
  } catch (error) {
    console.error('Erro no deleteUser:', error)
    
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json(
        errorResponse('Usuário não encontrado', 404)
      )
    }
    
    res.status(500).json(
      errorResponse('Erro ao deletar usuário', 500)
    )
  }
}

/**
 * GET /users/:id/orders
 * Lista pedidos de um usuário
 */
export async function getUserOrders(req, res) {
  try {
    const { id } = req.params
    
    if (!id) {
      return res.status(400).json(
        errorResponse('ID é obrigatório', 400)
      )
    }
    
    const orders = await userService.getUserOrders(parseInt(id))
    
    res.json(
      successResponse(orders, `${orders.length} pedidos encontrados`)
    )
    
  } catch (error) {
    console.error('Erro no getUserOrders:', error)
    
    res.status(500).json(
      errorResponse('Erro ao buscar pedidos', 500)
    )
  }
}

/**
 * GET /users/:id/favorites
 * Lista favoritos de um usuário
 */
export async function getUserFavorites(req, res) {
  try {
    const { id } = req.params
    
    if (!id) {
      return res.status(400).json(
        errorResponse('ID é obrigatório', 400)
      )
    }
    
    const favorites = await userService.getUserFavorites(parseInt(id))
    
    res.json(
      successResponse(favorites, `${favorites.length} favoritos encontrados`)
    )
    
  } catch (error) {
    console.error('Erro no getUserFavorites:', error)
    
    res.status(500).json(
      errorResponse('Erro ao buscar favoritos', 500)
    )
  }
}

/**
 * POST /users/:id/favorites/:productId
 * Adiciona produto aos favoritos
 */
export async function addToFavorites(req, res) {
  try {
    const { id, productId } = req.params
    
    if (!id || !productId) {
      return res.status(400).json(
        errorResponse('ID do usuário e productId são obrigatórios', 400)
      )
    }
    
    const favorites = await userService.addToFavorites({
      userId: parseInt(id),
      productId: parseInt(productId)
    })
    
    res.status(201).json(
      successResponse(favorites, 'Produto adicionado aos favoritos')
    )
    
  } catch (error) {
    console.error('Erro no addToFavorites:', error)
    
    if (error.message.includes('não encontrado')) {
      return res.status(404).json(
        errorResponse(error.message, 404)
      )
    }
    
    if (error.message.includes('já está nos favoritos')) {
      return res.status(400).json(
        errorResponse(error.message, 400)
      )
    }
    
    res.status(500).json(
      errorResponse('Erro ao adicionar aos favoritos', 500)
    )
  }
}

/**
 * DELETE /users/:id/favorites/:productId
 * Remove produto dos favoritos
 */
export async function removeFromFavorites(req, res) {
  try {
    const { id, productId } = req.params
    
    if (!id || !productId) {
      return res.status(400).json(
        errorResponse('ID do usuário e productId são obrigatórios', 400)
      )
    }
    
    const favorites = await userService.removeFromFavorites({
      userId: parseInt(id),
      productId: parseInt(productId)
    })
    
    res.json(
      successResponse(favorites, 'Produto removido dos favoritos')
    )
    
  } catch (error) {
    console.error('Erro no removeFromFavorites:', error)
    
    if (error.message.includes('não encontrado')) {
      return res.status(404).json(
        errorResponse(error.message, 404)
      )
    }
    
    res.status(500).json(
      errorResponse('Erro ao remover dos favoritos', 500)
    )
  }
}