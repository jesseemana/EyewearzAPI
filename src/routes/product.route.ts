import { Router } from 'express'
import { 
  createProduct, 
  getOneProduct, 
  filterProduct, 
  getProductsHandler,
} from '../controllers/product.controller'
import upload from '../middleware/multer'
import requireUser from '../middleware/require-user'

const router = Router()

router.get('/', getProductsHandler)
router.get('/:id', getOneProduct)
router.post('/filter', filterProduct)
router.post('/create', [upload.single('file'), requireUser], createProduct)

export default router
