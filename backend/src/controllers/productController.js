import * as productService from '../services/productService.js'
import { successResponse, errorResponse } from '../utils/index.js'

export async function getAllProducts(req, res) {
  try {
    const filters = {
      categoria: req.query.categoria,
      subcategoria: req.query.subcategoria,
      busca: req.query.busca,
      min: req.query.min,
      max: req.query.max
    }
    
    const products = await productService.getAllProducts(filters)
    
    res.json(successResponse(products, 'Produtos encontrados'))
  } catch (error) {
    console.error('Erro no controller:', error)
    res.status(500).json(errorResponse('Erro ao buscar produtos'))
  }
}

export async function getProduct(req, res) {
  try {
    const { slug } = req.params
    
    const product = await productService.getProductBySlug(slug)
    res.json(product)
  } catch (error) {
    if (error.message === 'Produto não encontrado') {
      return res.status(404).json({ error: error.message })
    }
    
    console.error('Erro no controller:', error)
    res.status(500).json({ error: 'Erro ao buscar produto' })
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await productService.getCategories()
    res.json(categories)
  } catch (error) {
    console.error('Erro no controller:', error)
    res.status(500).json({ error: 'Erro ao buscar categorias' })
  }
}