import { Request, Response } from 'express';
import { BookingService }from '../services';
import { BookingInput } from '../schema/booking.schema';

async function getAppointmentsHandler(_req: Request, res: Response) {
  try {
    const bookings = await BookingService.getBookings();
    return res.status(200).send(bookings);
  } catch (error) {
    return res.status(500).send('Internal Server Error.');
  }
}

const createAppointmentHandler = async (
  req: Request<{}, {}, BookingInput>, 
  res: Response
) => {
  const data = req.body;
  const user = res.locals.user;
  try {
    const booking = await BookingService.createAppointment({ user: user._id, ...data });
    return res.send(200).send(booking);
  } catch (error) {
    return res.status(500).send('Internal Server Error.');
  }
}

export default {
  getAppointmentsHandler,
  createAppointmentHandler,
}
