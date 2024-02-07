import { Request, Response } from 'express'
import { AuthService }from '../services'
import { login_schema } from '../schema'
import { LoginInput } from '../schema/user'

const login = async (
  req: Request<{}, {}, LoginInput>, 
  res: Response
) => {
  try {
    const { email, password } = login_schema.parse(req.body)
    const user = await AuthService.findUserByEmail(email)
    
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

const logout = async (_: Request, res: Response) => {
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
  login,
  logout,
}
