import { z } from 'zod'

export const checkOutSchema = z.object({
  body: z.object({
    total_amount: z.string({
      required_error: 'Please provide order total'
    }),
    delivery_details: z.object({
      first_name: z.string({
        required_error: 'first name is required'
      })
        .min(3, 'provide valid name')
        .trim(),
      last_name: z.string({
        required_error: 'last name is required'
      })
        .min(3, 'provide valid name')
        .trim(),
      email: z.string({
        required_error: 'email is required'
      })
        .email('provide a valid email')
        .trim(),
      // TODO: check phone number regex
      phone: z.string({
        required_error: 'phone number is required'
      })
        .min(10, 'provide a valid phone number')
        .trim(),
      location: z.string({
        required_error: 'location is required'
      })
        .min(5, 'provide a valid location')
        .trim(),
    })
  })
})

export const orderStatusSchema = z.object({
  params: z.object({
    orderId: z.string()
  }),
  body: z.object({
    status: z.enum(['placed', 'paid', 'en-route', 'delivered'])
  }),
})

export type OrderStatusType = z.infer<typeof orderStatusSchema>
export type CheckoutType = z.infer<typeof checkOutSchema>['body']
