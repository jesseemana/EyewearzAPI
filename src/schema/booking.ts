import { string, object, TypeOf, date } from 'zod'

const create_reservation = object({
  phone: string({ required_error: 'Provide your phone number' }).trim(),
  reason: string({ required_error: 'Provide reason for booking' }).trim(),
  location: string({ required_error: 'Provide location' }).trim(),
  date: date()
})

export type BookingInput = TypeOf<typeof create_reservation>

export default create_reservation
