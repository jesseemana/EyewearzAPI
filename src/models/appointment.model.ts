import { User } from './user.model'
import { getModelForClass, prop, Ref } from '@typegoose/typegoose'

export class Appointment {
  @prop({ ref: () => User })
  user: Ref<User>

  @prop({ required: true })
  phone: string

  @prop({ required: true })
  reason: string

  @prop({ required: true })
  location: string

  @prop({ required: true })
  reservation_data: Date
}

const AppointmentModel = getModelForClass(Appointment, {
  schemaOptions: {
    timestamps: true
  }
})

export default AppointmentModel
