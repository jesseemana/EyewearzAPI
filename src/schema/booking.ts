import { string, object, TypeOf, date } from 'zod'

const reservationSchema = object({
  phone: string({ required_error: 'Provide your phone number' }).trim(),
  reason: string({ required_error: 'Provide reason for booking' }).trim(),
  location: string({ required_error: 'Provide location' }).trim(),
  date: date()
})

export type BookingInput = TypeOf<typeof reservationSchema>

export default reservationSchema
