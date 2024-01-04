import { omit } from 'lodash'
import { signJwt } from '../utils/jwt'
import { FilterQuery, UpdateQuery } from 'mongoose'
import { DocumentType } from '@typegoose/typegoose'
import SessionModel, { Session } from '../models/session.model'
import CustomerModel, { Customer, private_fields } from '../models/customer.model'

const findUserByEmail = async (email: string) => {
  return CustomerModel.findOne({ email })
}

const findUserById = async (id: string) => {
  return CustomerModel.findById(id)
}

const createSession = async ({ user_id }: { user_id: string }) => {
  return SessionModel.create({ user_id })
}

const findSessionById = async (id: string) => {
  return SessionModel.findById(id)
}

const signAccessToken = (
  user: DocumentType<Customer>, 
  session: DocumentType<Session>
) => {
  const user_payload = omit(user.toJSON(), private_fields)
  const access_token = signJwt(
    { ...user_payload, session }, 
    'accessTokenPrivateKey', 
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
