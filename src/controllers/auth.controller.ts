import { Request, RequestHandler, Response } from 'express'
import { AuthService, UserService }from '../services'
import { LoginInput } from '../schema/user'

const login_handler: RequestHandler = async (
  req: Request<{}, {}, LoginInput>, 
  res: Response
) => {
  try {
    const { email, password } = req.body
    const user = await UserService.findUserByEmail(email)
    
    if (!user) return res.status(404).send('User not found.')
    if (!user.verify_password(password)) 
      return res.status(401).send('Password is incorrect.')

    const session = await AuthService.createSession({ user_id: String(user._id)})
    const access_token = AuthService.signAccessToken(user, session)

    return res.status(200).send({ user, access_token })
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

const logout_handler: RequestHandler = async (_: Request, res: Response) => {
  try {
    const session_id = String(res.locals.user.session._id)
    const session = await AuthService.findSessionById(session_id)
    if (!session || !session.valid) 
      return res.status(401).send('Session not found or is invalid')

    await AuthService.destroySession({ _id: session_id }, { valid: false })

    return res.status(200).send('User loged out successfully.')
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

export default {
  login_handler,
  logout_handler,
}
