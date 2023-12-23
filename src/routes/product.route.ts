import { Router } from 'express'
import { getOneProduct, getProductsHandler } from '../controllers/product.controller'

const router = Router()

router.get('/', getProductsHandler)
router.get('/:id', getOneProduct)

export default router
