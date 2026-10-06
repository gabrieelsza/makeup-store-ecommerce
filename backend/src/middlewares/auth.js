import jwt from 'jsonwebtoken'

/**
 * Middleware para verificar token JWT
 * Uso: app.use('/api/protected', auth)
 */
export function auth(req, res, next) {
  try {
    // Pegar token do header
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'Token não fornecido'
      })
    }
    
    // Formato: "Bearer <token>"
    const [scheme, token] = authHeader.split(' ')
    
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        success: false,
        error: 'Token mal formatado'
      })
    }
    
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Adicionar userId ao request
    req.userId = decoded.userId
    
    next()
    
  } catch (error) {
    console.error('Erro na autenticação:', error)
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expirado'
      })
    }
    
    return res.status(401).json({
      success: false,
      error: 'Token inválido'
    })
  }
}

/**
 * Middleware opcional: adiciona userId se token existir
 * Uso: para rotas que funcionam logado ou não
 */
export function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    
    if (authHeader) {
      const [scheme, token] = authHeader.split(' ')
      
      if (scheme === 'Bearer' && token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
      }
    }
    
    next()
  } catch (error) {
    // Se der erro, continua sem userId (não bloqueia)
    next()
  }
}