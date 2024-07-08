import { FilterQuery, UpdateQuery } from 'mongoose'
import { omit } from 'lodash'
import { signJwt } from '../utils'
import { IUser } from '../models/user.model'
import SessionModel, { ISession } from '../models/session.model'

const FindSessions = async () => {
  const sessions = await SessionModel.find({})
    .sort({ createdAt: -1 })
    .limit(10)

  return sessions
}

const CreateSession = async (data: ISession) => {
  const session = await SessionModel.create(data)
  return session
}

async function FindSessionById(id: string) {
  const session = await SessionModel.findById(id)
  return session
}

async function SignAccessToken(user: IUser, session: ISession): Promise<string> {
  const user_payload = omit(user.toJSON(), 'password', 'reset_code')

  const payload = { 
    user: user_payload, 
    session: session 
  }
  
  const access_token = signJwt(
    { ...payload }, 
    process.env.ACCESS_TOKEN_SECRET as string, 
    { expiresIn: '1d' }
  )

  return access_token
}

async function DestroySession(filter: FilterQuery<ISession>, update: UpdateQuery<ISession>) {
  const updated = await SessionModel.updateOne(filter, update)
  if (updated) return true
  return false
}

export default {
  SignAccessToken, 
  FindSessions,
  DestroySession,
  CreateSession, 
  FindSessionById,
}
