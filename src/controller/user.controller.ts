import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { controller, httpGet } from 'inversify-express-utils'
import { UserInput, user_schema } from '../schema/user'

@controller('/users')
export class UserController {
  private readonly _userService: UserService 

  constructor(_userService: UserService) { this._userService = _userService }

  @httpGet('/')
  async getAllUsers (_: Request, res: Response) {
    try {
      const all_users = await this._userService.getAllUsers()
      res.status(200).send(all_users)
    } catch(error) {
      return res.status(500).send('Internal server error!')
    }
  }

  @httpGet('/register')
  async createUserHandler (
    req: Request<{}, {}, UserInput>, 
    res: Response
  ) {
    const data = user_schema.parse(req.body)
    try {
      const new_user = await this._userService.registerUser(data)
      res.status(200).send(`New user ${new_user.first_name} ${new_user.last_name} has been created.`)
    } catch (error: any) {
      if (error.code === 11000) 
        return res.send('Account already exists')
      return res.status(500).send('Internal server error!')
    }
  }
}
