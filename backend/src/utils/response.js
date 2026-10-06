/**
 * Cria resposta de sucesso padronizada
 * @param {any} data - Dados a retornar
 * @param {string} message - Mensagem opcional
 * @returns {Object} Resposta padronizada
 */
export function successResponse(data, message = 'Sucesso') {
  return {
    success: true,
    message,
    data
  }
}

/**
 * Cria resposta de erro padronizada
 * @param {string} message - Mensagem de erro
 * @param {number} statusCode - Código HTTP
 * @returns {Object} Resposta de erro
 */
export function errorResponse(message, statusCode = 400) {
  return {
    success: false,
    error: message,
    statusCode
  }
}

/**
 * Cria resposta de paginação
 * @param {Array} data - Dados da página
 * @param {number} page - Página atual
 * @param {number} total - Total de registros
 * @param {number} limit - Limite por página
 * @returns {Object} Resposta paginada
 */
export function paginatedResponse(data, page, total, limit = 10) {
  return {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  }
}