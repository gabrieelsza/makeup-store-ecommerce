import * as userService from '../services/userService.js'
import { successResponse, errorResponse, validateUser } from '../utils/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

/**
 * POST /auth/register
 * Registra novo usuário
 */
export async function register(req, res) {
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
    
    // Hashear senha
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Criar usuário
    const user = await userService.createUser({
      email,
      password: hashedPassword,
      nome,
      cpf,
      telefone
    })
    
    // Gerar token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    
    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user
    
    res.status(201).json(
      successResponse({
        user: userWithoutPassword,
        token
      }, 'Usuário registrado com sucesso')
    )
    
  } catch (error) {
    console.error('Erro no register:', error)
    
    res.status(500).json(
      errorResponse('Erro ao registrar usuário', 500)
    )
  }
}

/**
 * POST /auth/login
 * Faz login do usuário
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body
    
    if (!email || !password) {
      return res.status(400).json(
        errorResponse('Email e senha são obrigatórios', 400)
      )
    }
    
    const result = await userService.login(email, password)
    
    res.json(
      successResponse(result, 'Login realizado com sucesso')
    )
    
  } catch (error) {
    console.error('Erro no login:', error)
    
    if (error.message === 'Email ou senha inválidos') {
      return res.status(401).json(
        errorResponse(error.message, 401)
      )
    }
    
    res.status(500).json(
      errorResponse('Erro ao fazer login', 500)
    )
  }
}

/**
 * GET /auth/me
 * Busca dados do usuário logado
 */
export async function getMe(req, res) {
  try {
    const userId = req.userId // Vem do middleware auth
    
    const user = await userService.getUserById(userId)
    
    if (!user) {
      return res.status(404).json(
        errorResponse('Usuário não encontrado', 404)
      )
    }
    
    // Remover senha
    const { password: _, ...userWithoutPassword } = user
    
    res.json(
      successResponse(userWithoutPassword)
    )
    
  } catch (error) {
    console.error('Erro no getMe:', error)
    
    res.status(500).json(
      errorResponse('Erro ao buscar dados do usuário', 500)
    )
  }
}

/**
 * PATCH /auth/change-password
 * Troca senha (usuário logado)
 */
export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body
    const userId = req.userId // Vem do middleware auth
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json(
        errorResponse('Senha atual e nova senha são obrigatórias', 400)
      )
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json(
        errorResponse('Nova senha deve ter pelo menos 6 caracteres', 400)
      )
    }
    
    await userService.updatePassword(userId, currentPassword, newPassword)
    
    res.json(
      successResponse(null, 'Senha alterada com sucesso')
    )
    
  } catch (error) {
    console.error('Erro no changePassword:', error)
    
    if (error.message === 'Senha atual inválida') {
      return res.status(401).json(
        errorResponse(error.message, 401)
      )
    }
    
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json(
        errorResponse(error.message, 404)
      )
    }
    
    res.status(500).json(
      errorResponse('Erro ao alterar senha', 500)
    )
  }
}

/**
 * POST /auth/recover-password
 * Solicita recuperação de senha
 */
export async function recoverPassword(req, res) {
  try {
    const { email } = req.body
    
    if (!email) {
      return res.status(400).json(
        errorResponse('Email é obrigatório', 400)
      )
    }
    
    const token = await userService.recoverPassword(email)
    
    // Em produção: enviar email com token
    // await sendEmail({ to: email, subject: 'Recuperação de senha', body: token })
    
    res.json(
      successResponse({ token }, 'Token de recuperação gerado. Em produção, seria enviado por email.')
    )
    
  } catch (error) {
    console.error('Erro no recoverPassword:', error)
    
    if (error.message === 'Email não encontrado') {
      return res.status(404).json(
        errorResponse(error.message, 404)
      )
    }
    
    res.status(500).json(
      errorResponse('Erro ao solicitar recuperação', 500)
    )
  }
}

/**
 * POST /auth/reset-password
 */
export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body
    
    if (!token || !newPassword) {
      return res.status(400).json(
        errorResponse('Token e nova senha são obrigatórios', 400)
      )
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json(
        errorResponse('Senha deve ter pelo menos 6 caracteres', 400)
      )
    }
    
    await userService.resetPassword(token, newPassword)
    
    res.json(
      successResponse(null, 'Senha redefinida com sucesso')
    )
    
  } catch (error) {
    console.error('Erro no resetPassword:', error)
    
    if (error.message === 'Token expirado' || error.message === 'Token inválido') {
      return res.status(400).json(
        errorResponse(error.message, 400)
      )
    }
    
    res.status(500).json(
      errorResponse('Erro ao redefinir senha', 500)
    )
  }
}