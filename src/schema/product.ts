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
 *          default: simple product description so that we don't live the fields empty, catch my drift?
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
