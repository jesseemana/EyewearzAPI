import argon2 from 'argon2'
import { log } from '../utils'
import mongoose, { Document, Schema, InferSchemaType } from 'mongoose'

type UserType = InferSchemaType<typeof user_schema>

export interface IUser extends UserType, Document {
  reset_code: string | null
  verifyPassword(candidate_password: string): Promise<Boolean>
}

const user_schema = new Schema({
  first_name: { type: String, required: true, },
  last_name: { type: String, required: true, },
  email: { 
    type: String, 
    required: true,
    unique: true, 
  },
  admin: { type: Boolean, default: false, },
  password: { type: String, required: true, },
  location: { type: String, required: true, },
  reset_code: { type: Schema.Types.Mixed },
})

user_schema.pre('save', async function(next) {
  if (this.isModified('password')) { 
    this.password = await argon2.hash(this.password)
    return next()
  }

  return next()
})

user_schema.methods.verifyPassword = async function(candidate_password: string) {
  let user = this as IUser
  try {
    return await argon2.verify(user.password, candidate_password)
  } catch(err) {
    log.error(err, 'Failed to validate password')
    return false
  }
}

const UserModel = mongoose.model<IUser>('User', user_schema)

export default UserModel
