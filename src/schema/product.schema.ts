import { TypeOf, z } from 'zod'

export const singleProductSchema = z.object({
  params: z.object({
    product_id: z.string({ 
      required_error: 'product id is required.', 
    }).optional(),
    category: z.string({ 
      required_error: 'product category is required.', 
    }).optional()
  }),
})

export const productSchema = z.object({
  params: z.object({
    product_id: z.string({ 
      required_error: 'product id is required.', 
    }).optional()
  }),
  body: z.object({
    name: z.string({ 
      required_error: 'Product name is required', 
    }).trim(),
    price: z.string({ 
      required_error: 'Product price is required', 
    }),
    category: z.enum(['sunglasses', 'eyeglasses', 'blue light', 'kids']),
    gender: z.enum(['male', 'female', 'unisex']),
    description: z.string({ 
      required_error: 'Product description is required', 
    })
      .trim()
      .min(10, 'Minimum of 10 characters')
  })
})

export type ProductParam = TypeOf<typeof singleProductSchema>['params']
export type ProductInput = TypeOf<typeof productSchema>
