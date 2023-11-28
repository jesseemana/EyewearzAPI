import { DocumentType } from '@typegoose/typegoose'
import AppointmentModel, { Appointment } from '../models/appointment.model'
import { injectable } from 'inversify'

@injectable()
export class ReservationRepository {
  private readonly _model = AppointmentModel

  async getBookings() {
    return this._model.find({})
  }

  async createAppointment(data: Partial<Appointment>) {
    return this._model.create(data)
  }
}
