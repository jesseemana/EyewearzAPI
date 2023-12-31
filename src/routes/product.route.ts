import { Router } from 'express'
import { 
  createProduct, 
  getOneProduct, 
  filterProducts, 
  getAllProducts,
} from '../controllers/product.controller'
import upload from '../middleware/multer'
import requireUser from '../middleware/require-user'

const router = Router()

router.get('/', getAllProducts)
router.get('/:id', getOneProduct)
router.post('/filter', filterProducts)
router.post('/create', [upload.single('file'), requireUser], createProduct)

export default router
