import { Router } from 'express'
import * as authController from '../controllers/authController.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

// POST /auth/register - Registrar novo usuário
router.post('/register', authController.register)

// POST /auth/login - Login
router.post('/login', authController.login)

// GET /auth/me - Dados do usuário logado (protegido)
router.get('/me', auth, authController.getMe)

// PATCH /auth/change-password - Trocar senha (protegido)
router.patch('/change-password', auth, authController.changePassword)

// POST /auth/recover-password - Solicitar recuperação
router.post('/recover-password', authController.recoverPassword)

// POST /auth/reset-password - Resetar senha com token
router.post('/reset-password', authController.resetPassword)

export default router