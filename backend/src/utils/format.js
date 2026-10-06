/**
 * Formata número para moeda brasileira (BRL)
 * @param {number} value - Valor em centavos ou decimal
 * @returns {string} Valor formatado como R$
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

/**
 * Formata data para padrão brasileiro
 * @param {Date|string} date - Data a formatar
 * @returns {string} Data formatada (DD/MM/YYYY)
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR')
}

/**
 * Formata data com hora
 * @param {Date|string} date - Data a formatar
 * @returns {string} Data e hora formatadas
 */
export function formatDateTime(date) {
  return new Date(date).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

/**
 * Gera slug a partir de texto
 * @param {string} text - Texto original
 * @returns {string} Slug formatado
 */
export function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Calcula preço com desconto
 * @param {number} price - Preço original
 * @param {number} discount - Desconto (porcentagem ou valor fixo)
 * @param {'percent'|'fixed'} type - Tipo de desconto
 * @returns {number} Preço com desconto aplicado
 */
export function applyDiscount(price, discount, type = 'percent') {
  if (type === 'percent') {
    return price - (price * discount / 100)
  }
  return Math.max(0, price - discount)
}

/**
 * Calcula subtotal do carrinho
 * @param {Array} items - Itens do carrinho
 * @returns {number} Subtotal
 */
export function calculateSubtotal(items) {
  return items.reduce((acc, item) => {
    const price = item.product.precoPromocional || item.product.preco
    return acc + (price * item.quantidade)
  }, 0)
}

/**
 * Calcula total do pedido
 * @param {number} subtotal - Subtotal dos itens
 * @param {number} frete - Valor do frete
 * @param {number} desconto - Desconto aplicado
 * @returns {number} Total final
 */
export function calculateTotal(subtotal, frete = 0, desconto = 0) {
  return subtotal + frete - desconto
}