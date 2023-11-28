import { Request, Response } from 'express'
import { ReservationService } from '../services/reservation.service'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { BookingInput, create_reservation } from '../schema/booking'

@controller('/bookings')
export class ReservationController {
  private readonly _reservationService: ReservationService

  constructor(_reservationService: ReservationService) { this._reservationService = _reservationService }

  @httpGet('/')
  async getAppointments(_: Request, res: Response) {
    try {
      const bookings = await this._reservationService.getBookings()
      res.status(200).send({ bookings })
    } catch (error) {
      return res.status(500).send('Internal server error!')
    }
  }

  @httpPost('/create')
  async bookAppointment(
    req: Request<{}, {}, BookingInput>, 
    res: Response
  ) {
    const data = create_reservation.parse(req.body)
    try {
      const booking = await this._reservationService.createAppointment(data)
      res.send(200).send({ booking })
    } catch (error) {
      return res.status(500).send('Internal server error!')
    }
  }
}
