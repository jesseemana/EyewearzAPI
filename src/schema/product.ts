import { string, object, TypeOf, z } from 'zod'

/**
 * @openapi
 * components:
 *  schema:
 *    GetProducts:
 *      type: array
 *      items:
 *        type: object
 *        required:
 *          - name
 *          - price
 *          - category
 *          - gender
 *          - image
 *          - cloudinary_id
 *          - description
 *        properties:
 *          _id:
 *            type: string
 *          name:
 *            type: string
 *          price:
 *            type: string
 *          category:
 *            type: string
 *          gender:
 *            type: string
 *          image:
 *            type: string
 *          cloudinary_id:
 *            type: string
 *          description:
 *            type: string
 *          __v:
 *            type: number
 *    CreateProductInput:
 *      type: object
 *      required:
 *        - name
 *        - price
 *        - category
 *        - gender
 *        - description
 *      properties:
 *        name:
 *          type: string
 *          default: sunglasses
 *        price:
 *          type: string
 *          default: 30000
 *        category:
 *          type: string
 *          default: sunglasses
 *        gender:
 *          type: string
 *          default: male
 *        description:
 *          type: string
 *          default: designed for first-time DSLR owners who want impressive results straight out of the box. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.
 *    productResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 *        price:
 *          type: string
 *        category:
 *          type: string
 *        gender:
 *          type: string
 *        image:
 *          type: string
 *        cloudinary_id:
 *          type: string
 *        description:
 *          type: string
 *        __v:
 *          type: number
 */
const product_schema = object({
  name: string({ 
    required_error: 'Name is required' 
  }).trim(),
  price: string({ 
    required_error: 'Image is required' 
  }).trim(),
  category: z.enum(['sunglasses', 'prescription', 'bluelight', 'kids']),
  gender: z.enum(['male', 'female', 'unisex']),
  description: string({ 
    required_error: 'Product description is required' 
  })
  .trim()
  .min(10, 'Minimum of 10 characters')
  .max(300, 'Description cannot be longer than 64 characters'),
})

export type ProductInput = TypeOf<typeof product_schema>

export default product_schema
