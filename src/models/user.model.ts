import argon2 from "argon2"
import log from '../utils/logger'
import { 
  pre, 
  prop, 
  index,
  getModelForClass, 
  DocumentType, 
  modelOptions, 
  Severity, 
} from '@typegoose/typegoose'

export const private_fields = ['cart', 'favorites', 'password']

@pre<User>('save', async function() {
  if (this.isModified('password')) { 
    const hash = await argon2.hash(this.password)
    this.password = hash
    return
  }
  return
})

@index({ email: 1})

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW
  }
})

export class User {
  @prop({ required: true })
  first_name: string

  @prop({ required: true })
  last_name: string

  @prop({ lowercase: true, required: true, unique: true })
  email: string

  @prop({ required: true })
  password: string

  @prop({ default: [] })
  cart: Array<string>

  @prop({ default: [] })
  favorites: Array<string>

  async verifyPassword(this: DocumentType<User>, candidate_password: string) {
    try {
      return await argon2.verify(this.password, candidate_password)
    } catch(err) {
      log.error(err, 'Failed to validate password')
      return false
    }
  }
}

const UserModel = getModelForClass(User)

export default UserModel
