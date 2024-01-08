import { BookingModel } from '../models'
import { Appointment } from '../models/appointment.model'

async function getBookings() {
  return BookingModel.find({})
}

async function createAppointment(data: Partial<Appointment>) {
  return BookingModel.create(data)
}

export default {
  getBookings,
  createAppointment
}
