import { injectable } from 'inversify'
import { UserRepository } from '../user/user.repository'
import { signJwt } from '../../utils/jwt'
import { DocumentType } from '@typegoose/typegoose'
import { Session } from '../../models/session.model'
import { User, private_fields } from '../../models/user.model'
import { AuthRepository } from './auth.repository'
import { FilterQuery, UpdateQuery } from 'mongoose'
import { omit } from 'lodash'

@injectable()
export class AuthService {
  private readonly _userRepository: UserRepository
  private readonly _authRepository: AuthRepository

  constructor (_userRepository: UserRepository, _authRepository: AuthRepository) {
    this._userRepository = _userRepository
    this._authRepository = _authRepository
  }

  async findUserByEmail(email: string) {
    return this._userRepository.getUserByEmail(email)
  }

  async findUserById(id: string) {
    return this._userRepository.getUserById(id)
  }

  async createSession({ user_id }: { user_id: string }) {
    return this._authRepository.createSession({ user_id })
  }

  async findSessionById(id: string) {
    return this._authRepository.findSessionById(id)
  }

  async destroySession(filter: FilterQuery<Session>, update: UpdateQuery<Session>) {
    return this._authRepository.destroySession(filter, update)
  }

  signAccessToken(user: DocumentType<User>, session: DocumentType<Session>) {
    const user_payload = omit(user.toJSON(), private_fields)
    const access_token = signJwt({ ...user_payload, session }, 'accessTokenPrivateKey', { expiresIn: '15m' })

    return access_token 
  }

  signRefreshToken(session: DocumentType<Session>) {
    const refresh_token = signJwt({ session: session._id }, 'accessTokenPrivateKey', { expiresIn: '30d' })
    
    return refresh_token
  }
}
