import { Router } from 'express'
import { 
  filterGender,
  createProduct, 
  getOneProduct, 
  getAllProducts,
} from '../controllers/product.controller'
import { require_user, upload } from '../middleware'

const router = Router()

/**
 * @openapi
 * '/api/products':
 *  get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schema/GetProducts'
 *       404:
 *         descriptions: No products found
 */
router.get('/', getAllProducts)

/**
*  @openapi
* '/api/products/{id}':
*  get:
*     tags:
*       - Products
*     summary: Get a single product by the productId
*     parameters:
*       - name: id
*         in: path
*         description: The id of the product
*         required: true
*     responses:
*       200:
*         description: Success
*         content:
*          application/json:
*           schema:
*              $ref: '#/components/schema/productResponse'
*       404:
*         description: Product not found
*/
router.get('/:id', getOneProduct)

/**
*  @openapi
* '/api/products/filter/{query}':
*  get:
*     tags:
*       - Products
*     summary: Get a single product by the filter query
*     parameters:
*       - name: query
*         in: path
*         description: The filter query of the product
*         required: true
*     responses:
*       200:
*         description: Success
*         content:
*          application/json:
*           schema:
*              $ref: '#/components/schema/productResponse'
*       404:
*         description: Product not found
*/
router.post('/filter/:query', filterGender)

/**
 * @openapi
 * '/api/products/create':
 *  post:
 *      tags:
 *      - Products
 *      summary: Create a new product
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schema/CreateProductInput'
 *      responses:
 *        201:
 *          descriptions: Product created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schema/productResponse'
 *          example:
 *             "_id": "642a1cfcc1bec76d8a2e7ac2"
 *             "name": "sunglasses"
 *             "price": 30,000
 *             "image": "https://i.imgur.com/QlRphfQ.jpg"
 *             "cloudinary_id": "080412bbws!@#!$"
 *             "category": "sunglasses"
 *             "gender": "male"
 *             "description": "designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go."
 *             "createdAt": "2023-04-03T00:25:32.189Z"
 *             "updatedAt": "2023-04-03T00:25:32.189Z"
 *             "__v": 0
 */
router.post('/create', [upload.single('file'), require_user], createProduct)

export default router
