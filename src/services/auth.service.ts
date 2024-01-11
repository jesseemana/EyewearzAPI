import dotenv from 'dotenv'
import { jwt } from '../utils'
import { omit } from 'lodash'
import { User } from '../models/user.model'
import { Session } from '../models/session.model'
import { UserModel, SessionModel } from '../models'
import { FilterQuery, UpdateQuery } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'
import { private_fields } from '../models/user.model'

dotenv.config()

const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email })
}

const findUserById = async (id: string) => {
  return UserModel.findById(id)
}

const createSession = async ({ user_id }: { user_id: string }) => {
  return SessionModel.create({ user_id })
}

const findSessionById = async (id: string) => {
  return SessionModel.findById(id)
}

const signAccessToken = (
  user: DocumentType<User>, 
  session: DocumentType<Session>
): string => {
  const user_payload = omit(user.toJSON(), private_fields)
  const access_token = jwt.signJwt(
    { ...user_payload, session }, 
    String(process.env.ACCESS_TOKEN_PRIVATE_KEY), 
    { expiresIn: '15m' }
  )

  return access_token 
}

const destroySession = async (
  filter: FilterQuery<Session>, 
  update: UpdateQuery<Session>
) => {
  return SessionModel.updateOne(filter, update)
}

export default {
  findUserById, 
  createSession, 
  destroySession,
  signAccessToken, 
  findSessionById,
  findUserByEmail, 
}
