import { string, object, TypeOf, z } from 'zod'

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
