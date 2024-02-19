import { Router } from 'express'
import { ProductController } from '../controllers'
import { require_admin, upload } from '../middleware'

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
router.get('/', ProductController.getAllProductsHandler)

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
router.get('/:id', ProductController.getOneProductHandler)

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
router.post('/filter/:query', ProductController.filterGenderHandler)

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
 *              example:
 *                "_id": "642a1cfcc1bec76d8a2e7ac2"
 *                "name": "sunglasses"
 *                "price": 30,000
 *                "category": "sunglasses"
 *                "gender": "male"
 *                "image": "https://i.imgur.com/QlRphfQ.jpg"
 *                "cloudinary_id": "0#82bb$j091&@091#"
 *                "description": "designed for first-time DSLR owners who want impressive results straight out of the box. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go."
 *                "__v": 0
 *        401:
 *          description: Unauthorized
 *        403:
 *          description: Forbiden
 *        500:
 *          description: Internal server error
 */
router.post(
  '/create', 
  [upload.single('file'), require_admin], 
  ProductController.createProductHandler
)

export default router
