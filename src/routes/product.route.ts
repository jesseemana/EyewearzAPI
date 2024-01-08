import { Router } from 'express'
import { 
  filterGender,
  createProduct, 
  getOneProduct, 
  filterCategory, 
  getAllProducts,
} from '../controllers/product.controller'
import { require_user, upload } from '../middleware'

const router = Router()

router.get('/', getAllProducts)
router.get('/:id', getOneProduct)
router.post('/gender', filterGender)
router.post('/category', filterCategory)
router.post('/create', [upload.single('file'), require_user], createProduct)

export default router
