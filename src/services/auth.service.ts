import { omit } from 'lodash'
import { signJwt } from '../utils'
import { SessionModel } from '../models'
import { User } from '../models/user.model'
import { Session } from '../models/session.model'
import { FilterQuery, UpdateQuery } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'
import { private_fields } from '../models/user.model'

const createSession = async ({ user_id }: { user_id: string }) => {
  return SessionModel.create({ user_id })
}

const findSessionById = async (id: string) => {
  return SessionModel.findById(id)
}

const signAccessToken = (user: DocumentType<User>, session: DocumentType<Session>): string => {
  const user_payload = omit(user.toJSON(), private_fields)
  const access_token = signJwt(
    { ...user_payload, session }, 
    String(process.env.ACCESS_TOKEN_PRIVATE_KEY), 
    { expiresIn: process.env.ACCESS_TOKEN_TIME_TO_LIVE }
  )
  return access_token 
}

const destroySession = async (filter: FilterQuery<Session>, update: UpdateQuery<Session>) => {
  return SessionModel.updateOne(filter, update)
}

export default {
  createSession, 
  destroySession,
  signAccessToken, 
  findSessionById,
}
