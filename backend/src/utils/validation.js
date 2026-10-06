/**
 * Valida se é um email válido
 * @param {string} email - Email a validar
 * @returns {boolean} True se válido
 */
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Valida CPF (apenas formato)
 * @param {string} cpf - CPF a validar
 * @returns {boolean} True se válido
 */
export function isValidCPF(cpf) {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
  return regex.test(cpf) || /^\d{11}$/.test(cpf)
}

/**
 * Valida CEP (apenas formato)
 * @param {string} cep - CEP a validar
 * @returns {boolean} True se válido
 */
export function isValidCEP(cep) {
  const regex = /^\d{5}-?\d{3}$/
  return regex.test(cep)
}

/**
 * Valida telefone/celular brasileiro
 * @param {string} phone - Telefone a validar
 * @returns {boolean} True se válido
 */
export function isValidPhone(phone) {
  const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/
  return regex.test(phone)
}

/**
 * Valida se valor é número positivo
 * @param {any} value - Valor a validar
 * @returns {boolean} True se válido
 */
export function isPositiveNumber(value) {
  return typeof value === 'number' && !isNaN(value) && value > 0
}

/**
 * Valida dados de endereço
 * @param {Object} address - Objeto de endereço
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export function validateAddress(address) {
  const errors = []
  
  if (!address.cep || !isValidCEP(address.cep)) {
    errors.push('CEP inválido')
  }
  
  if (!address.rua || address.rua.trim().length === 0) {
    errors.push('Rua é obrigatória')
  }
  
  if (!address.numero || address.numero.trim().length === 0) {
    errors.push('Número é obrigatório')
  }
  
  if (!address.cidade || address.cidade.trim().length === 0) {
    errors.push('Cidade é obrigatória')
  }
  
  if (!address.estado || address.estado.length !== 2) {
    errors.push('Estado inválido')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Valida dados de usuário
 * @param {Object} user - Dados do usuário
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export function validateUser(user) {
  const errors = []
  
  if (!user.nome || user.nome.trim().length < 3) {
    errors.push('Nome deve ter pelo menos 3 caracteres')
  }
  
  if (!user.email || !isValidEmail(user.email)) {
    errors.push('Email inválido')
  }
  
  if (!user.cpf || !isValidCPF(user.cpf)) {
    errors.push('CPF inválido')
  }
  
  if (user.telefone && !isValidPhone(user.telefone)) {
    errors.push('Telefone inválido')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Valida itens do carrinho
 * @param {Array} items - Itens do carrinho
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export function validateCartItems(items) {
  const errors = []
  
  if (!Array.isArray(items) || items.length === 0) {
    errors.push('Carrinho vazio')
    return { valid: false, errors }
  }
  
  items.forEach((item, index) => {
    if (!item.productId) {
      errors.push(`Item ${index + 1}: productId obrigatório`)
    }
    
    if (!item.quantidade || item.quantidade < 1) {
      errors.push(`Item ${index + 1}: quantidade inválida`)
    }
  })
  
  return {
    valid: errors.length === 0,
    errors
  }
}