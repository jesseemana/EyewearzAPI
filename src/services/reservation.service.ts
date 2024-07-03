import { BookingModel } from '../models';
import { Appointment } from '../models/appointment.model';

async function getBookings() {
  const bookings = await BookingModel.find({});
  return bookings;
}

async function createAppointment(data: Appointment) {
  const booking = await BookingModel.create(data);
  return booking;
}

export default {
  getBookings,
  createAppointment,
}
