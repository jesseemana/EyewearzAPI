import { Request, Response } from 'express'
import AuthService from '../services/auth.service'
import { LoginInput, login_schema } from '../schema/user'

export async function login(
  req: Request<{}, {}, LoginInput>, 
  res: Response
) {
  const { email, password } = login_schema.parse(req.body)
  try {
    const user = await AuthService.findUserByEmail(email)
    if (!user || !user.verifyPassword(password))
      return res.status(401).send('Invalid user credentails given')

    const session = await AuthService.createSession({ user_id: String(user._id)})
    const access_token = AuthService.signAccessToken(user, session)

    res.status(200).send({ user, access_token })
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}

export async function logout(_: Request, res: Response) {
  try {
    const session_id = res.locals.user.session._id as string
    const session = await AuthService.findSessionById(session_id)
    if (!session || !session.valid) 
      return res.status(401).send('Session not found or is invalid')

    await AuthService.destroySession({ _id: session_id }, { valid: false })

    res.status(200).send('User loged out successfully.')
  } catch (error) {
    return res.status(500).send('Internal server error!')
  }
}