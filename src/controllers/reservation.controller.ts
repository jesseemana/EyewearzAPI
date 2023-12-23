import { Request, Response } from 'express'
import { BookingInput, create_reservation } from '../schema/booking'
import ReservationService from '../services/reservation.service'


export async function getAppointments(_: Request, res: Response) {
  try {
    const bookings = await ReservationService.getBookings()
    res.status(200).send({ bookings })
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}


export async function bookAppointment(
  req: Request<{}, {}, BookingInput>, 
  res: Response
) {
  const data = create_reservation.parse(req.body)
  try {
    const booking = await ReservationService.createAppointment(data)
    res.send(200).send({ booking })
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}
