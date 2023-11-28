import { User } from '../models/user.model'
import { UserRepository } from '../repository/user.repository'
import { injectable } from 'inversify'

@injectable()
export class UserService {
  private readonly _userRepo: UserRepository

  constructor(_userRepo: UserRepository) {
    this._userRepo = _userRepo
  }

  async getAllUsers () {
    return this._userRepo.getAllUsers()
  }

  async registerUser (data: Partial<User>) {
    const new_user = await this._userRepo.save(data)
    return new_user
  }
}
