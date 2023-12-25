import { Router } from 'express'
import { createProduct, getOneProduct, getProductsHandler } from '../controllers/product.controller'
import upload from '../middleware/multer'

const router = Router()

router.get('/', getProductsHandler)
router.post('/create', upload.single('file'), createProduct)
router.get('/:id', getOneProduct)

export default router
