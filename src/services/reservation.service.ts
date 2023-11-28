import { DocumentType } from '@typegoose/typegoose'
import { ReservationRepository } from '../repository/reservation.repository'
import { Appointment } from '../models/appointment.model'
import { injectable } from 'inversify'

@injectable()
export class ReservationService {
  private readonly _reservationRepository: ReservationRepository

  constructor(_reservationRepository: ReservationRepository) { 
    this._reservationRepository = _reservationRepository 
  }

  async getBookings() {
    return this._reservationRepository.getBookings()
  }

  async createAppointment(data: DocumentType<Appointment>) {
    return this._reservationRepository.createAppointment(data)
  }
}
