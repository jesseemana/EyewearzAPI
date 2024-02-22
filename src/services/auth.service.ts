import { omit } from 'lodash'
import { signJwt } from '../utils'
import { SessionModel } from '../models'
import { User } from '../models/user.model'
import { Session } from '../models/session.model'
import { FilterQuery, UpdateQuery } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'
import { private_fields } from '../models/user.model'

const create_session = async ({ user_id }: { user_id: string }) => {
  return SessionModel.create({ user_id })
}

const find_session_by_id = async (id: string) => {
  return SessionModel.findById(id)
}

const sign_access_token = (user: DocumentType<User>, session: DocumentType<Session>): string => {
  const user_payload = omit(user.toJSON(), private_fields)
  const access_token = signJwt(
    { ...user_payload, session }, 
    String(process.env.ACCESS_TOKEN_PRIVATE_KEY), 
    { expiresIn: process.env.ACCESS_TOKEN_TIME_TO_LIVE }
  )
  return access_token 
}

const destroy_session = async (filter: FilterQuery<Session>, update: UpdateQuery<Session>) => {
  return SessionModel.updateOne(filter, update)
}

export default {
  create_session, 
  destroy_session,
  sign_access_token, 
  find_session_by_id,
}
