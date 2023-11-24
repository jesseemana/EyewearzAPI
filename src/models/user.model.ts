import argon2 from "argon2"
import log from '../utils/logger'
import { prop, getModelForClass, DocumentType, pre, modelOptions, Severity, index } from '@typegoose/typegoose'

@pre<User>('save', function() {
  if (this.isModified('password')) { 
    const hash = argon2.hash(this.password)
    this.password = hash

    return
  }
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

  @prop({ lowercase: true, required:true, unique: true })
  email: string

  @prop({ required: true })
  password: string

  @prop({ default: [] })
  cart: Array<string>

  @prop({ default: [] })
  favorites: Array<string>

  verifyPassword(this: DocumentType<User>, candidate_password: string) {
    try {
      return argon2.verify(this.password, candidate_password)
    } catch(err) {
      log.error(err, 'Failed to validate password')
      return false
    }
  }
}

const UserModel = getModelForClass(User)

export default UserModel
