import { Router } from 'express'
import * as productController from '../controllers/productController.js'

const router = Router()

router.get('/products', productController.getAllProducts)
router.get('/products/:slug', productController.getProduct)
router.get('/categories', productController.getCategories)

export default router