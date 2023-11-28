import { string, object, TypeOf, z } from 'zod'

const product_schema = object({
  id: string({ required_error: 'Product id is required' }).trim(),
  name: string({ required_error: 'Name id is required' }).trim(),
  image: string({ required_error: 'Image id is required' }).trim(),
  category: z.enum(['sunglasses', 'prescriptoin']),
  gender: z.enum(['male', 'female', 'unisex']),
  description: string({ 
    required_error: 'Image id is required' 
  }).trim().min(10, 'Minimum of 10 characters').max(64, 'Description cannot be longer than 64 characters'),
  price: string({ required_error: 'Image id is required' }).trim(),
})

export type ProductInput = TypeOf<typeof product_schema>
