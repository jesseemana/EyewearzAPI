import CustomerModel from '../models/customer.model'
import { omit } from 'lodash'
import { signJwt } from '../utils/jwt'
import { DocumentType } from '@typegoose/typegoose'
import { Customer, private_fields } from '../models/customer.model'
import { FilterQuery, UpdateQuery } from 'mongoose'
import SessionModel, { Session } from '../models/session.model'

async function findUserByEmail(email: string) {
  return CustomerModel.findOne({ email })
}

async function findUserById(id: string) {
  return CustomerModel.findById(id)
}

async function createSession({ user_id }: { user_id: string }) {
  return SessionModel.create({ user_id })
}

async function findSessionById(id: string) {
  return SessionModel.findById(id)
}

function signAccessToken(
  user: DocumentType<Customer>, 
  session: DocumentType<Session>
) {
  const user_payload = omit(user.toJSON(), private_fields)
  const access_token = signJwt({ ...user_payload, session }, 'accessTokenPrivateKey', { expiresIn: '15m' })

  return access_token 
}

async function destroySession(
  filter: FilterQuery<Session>, 
  update: UpdateQuery<Session>
) {
  return SessionModel.updateOne(filter, update)
}

export default {
  findUserByEmail, 
  findUserById, 
  createSession, 
  signAccessToken, 
  destroySession,
  findSessionById
}
