import { string, z, TypeOf, date } from 'zod'

const reservationSchema = z.object({
  body: z.object({
    phone: string({ 
      required_error: 'Provide your phone number' 
    }).trim(),
    reason: string({ 
      required_error: 'Provide reason for booking' 
    }).trim(),
    location: string({ 
      required_error: 'Provide location' 
    }).trim(),
    date: date()
  })
})

export type BookingInput = TypeOf<typeof reservationSchema>['body']
export default reservationSchema
