import { Customer } from './customer.model'
import { getModelForClass, prop, Ref } from '@typegoose/typegoose'

export class Session {
  @prop({ ref: () => Customer })
  user: Ref<Customer>
  
  @prop({ default: true })
  valid: boolean
}

const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    timestamps: true
  }
})

export default SessionModel 
