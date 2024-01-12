import { Request, Response } from 'express'
import { BookingService }from '../services'
import { booking_schema } from '../schema'
import { BookingInput } from '../schema/booking'

const getAppointments = async (_: Request, res: Response) => {
  try {
    const bookings = await BookingService.getBookings()
    return res.status(200).send({ bookings })
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

const bookAppointment = async (
  req: Request<{}, {}, BookingInput>, 
  res: Response
) => {
  const data = booking_schema.parse(req.body)
  try {
    const booking = await BookingService.createAppointment(data)
    return res.send(200).send({ booking })
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

export default {
  getAppointments,
  bookAppointment,
}
