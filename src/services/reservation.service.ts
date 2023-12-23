import AppointmentModel, { Appointment } from '../models/appointment.model'

async function getBookings() {
  return AppointmentModel.find({})
}

async function createAppointment(data: Partial<Appointment>) {
  return AppointmentModel.create(data)
}

export default {
  getBookings,
  createAppointment
}
