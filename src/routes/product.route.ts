import { Router } from 'express'
import { requireAdmin, upload, validateInput } from '../middleware'
import { ProductController } from '../controllers'
import { productSchema } from '../schema'

const router = Router()

router.route('/')
  .get(ProductController.getAllProductsHandler)
  .post(
    [upload.single('file'), requireAdmin, validateInput(productSchema)], 
    ProductController.createProductHandler
  )

router.get('/featured', ProductController.getFeaturedProductsHandler)
router.get('/sunglasses', ProductController.getSunGlassesHandler)
router.get('/eyeglasses', ProductController.getEyeGlassesHandler)
router.get('/:id', ProductController.getSingleProductHandler)
router.post('/edit/:id', [requireAdmin], ProductController.editProductHandler)

export default router
