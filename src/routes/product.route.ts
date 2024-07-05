import { Router } from 'express'
import { requireAdmin, upload, validateInput } from '../middleware'
import { ProductController } from '../controllers'
import { productSchema, singleProductSchema } from '../schema/product.schema'

const router = Router()

router.route('/')
  .get(ProductController.getAllProductsHandler)
  .post(
    [upload.single('file'), requireAdmin, validateInput(productSchema)], 
    ProductController.createProductHandler
  )

router.patch(
  '/edit/:product_id', 
  [requireAdmin, validateInput(productSchema)], 
  ProductController.editProductHandler
)

router.get(
  '/:product_id', 
  validateInput(singleProductSchema), 
  ProductController.getSingleProductHandler
)

router.get(
  '/category/:category', 
  validateInput(singleProductSchema), 
  ProductController.getByCategory
)

export default router
