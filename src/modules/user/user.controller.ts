import { Request, Response } from 'express'
import { UserService } from './user.service'
import { controller, httpGet } from 'inversify-express-utils'

@controller('/users')
export class UserController {
  private readonly _userService: UserService 

  constructor(_userService: UserService) {
    this._userService = _userService
  }

  @httpGet('/')
  async getAllUsers (_: Request, res: Response) {
    const all_users = this._userService.getAllUsers()
    res.status(200).send(all_users)
  }

  @httpGet('/register')
  async createUserHandler (req: Request, res: Response) {
    try {
      const data = req.body
      const new_user = this._userService.registerUser(data)
      res.status(200).send(`New user ${new_user.first_name} ${new_user.last_name} has been created.`)
    } catch (error: any) {
      if (error.code === 11000) {
        return res.send('Account already exists');
      }
    }
  }

}
