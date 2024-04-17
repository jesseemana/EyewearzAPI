import { omit } from 'lodash';
import { signJwt } from '../utils';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { User } from '../models/user.model';
import { Session } from '../models/session.model';
import { SessionModel } from '../models';
import { DocumentType } from '@typegoose/typegoose';

const findSessions = async () => {
  const sessions = await SessionModel.find({})
    .sort({ createdAt: -1 })
    .limit(10);

  return sessions;
}

const createSession = async (data: Session) => {
  const session = await SessionModel.create(data);
  return session;
}

async function findSessionById(id: string) {
  const session = SessionModel.findById(id);
  return session;
}

async function signAccessToken(
  user: DocumentType<User>, 
  session: DocumentType<Session>
): Promise<string> {
  const user_payload = omit(user.toJSON(), 'password', 'password_reset_code')
  const access_token = signJwt(
    { ...user_payload, session }, 
    String(process.env.ACCESS_TOKEN_PRIVATE_KEY), 
    { expiresIn: process.env.ACCESS_TOKEN_TIME_TO_LIVE }
  )
  return access_token 
}

async function destroySession(
  filter: FilterQuery<Session>, 
  update: UpdateQuery<Session>
) {
  const updated = await SessionModel.updateOne(filter, update);
  if (updated) return true;
  return false;
}

export default {
  signAccessToken, 
  findSessions,
  destroySession,
  createSession, 
  findSessionById,
}
