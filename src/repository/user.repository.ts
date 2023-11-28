import UserModel, { User } from '../models/user.model'
import { injectable } from 'inversify'

@injectable()
export class UserRepository {
  private readonly _model = UserModel

  async getAllUsers() {
    return this._model.find({})
  }

  async save(data: Partial<User>) {
    return this._model.create(data)
  }

  async getUserByEmail(email: string) {
    return this._model.findOne({ email })
  }

  async getUserById(id: string) {
    return this._model.findById(id)
  }
}
