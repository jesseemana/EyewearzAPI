import { string, TypeOf, z } from 'zod';

export const productSchema = z.object({
  params: z.object({
    product_id: string({ 
      required_error: 'product id is required.', 
    })
  }),
  body: z.object({
    name: string({ 
      required_error: 'Product name is required', 
    }).trim(),
    price: string({ 
      required_error: 'Product image is required', 
    }).trim(),
    category: z.enum(['sunglasses', 'prescription', 'blue light', 'kids']),
    featured: z.boolean(),
    gender: z.enum(['male', 'female', 'unisex']),
    description: string({ 
      required_error: 'Product description is required', 
    }).trim()
    .min(10, 'Minimum of 10 characters')
    .max(300, 'Description cannot be longer than 64 characters'),
  })
});

export type ProductInput = TypeOf<typeof productSchema>;
