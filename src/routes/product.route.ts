import { Router } from 'express'
import { 
  createProduct, 
  getOneProduct, 
  filterGender,
  filterCategory, 
  getAllProducts,
} from '../controllers/product.controller'
import upload from '../middleware/multer'
import requireUser from '../middleware/require-user'

const router = Router()

router.get('/', getAllProducts)
router.get('/:id', getOneProduct)
router.post('/gender', filterGender)
router.post('/category', filterCategory)
router.post('/create', [upload.single('file'), requireUser], createProduct)

export default router
