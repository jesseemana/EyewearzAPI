import { FilterQuery, UpdateQuery } from 'mongoose'
import SessionModel, { Session } from '../models/session.model'
import { injectable } from 'inversify'

@injectable()
export class AuthRepository {
  private readonly _model = SessionModel

  async getSessions() {
    return this._model.find({})
  }

  async createSession({ user_id }: { user_id: string }) {
    return this._model.create({ user: user_id })
  }

  async findSessionById(id: string) {
    return this._model.findById(id)
  }

  async destroySession(
    filter: FilterQuery<Session>, 
    update: UpdateQuery<Session>
  ) {
    return this._model.findOneAndUpdate(filter, update)
  }
}
