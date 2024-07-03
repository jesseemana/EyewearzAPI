import { Request, Response } from 'express'
import { AuthService, UserService }from '../services'
import { LoginInput, ResetInput } from '../schema/user.schema'
import { log, sendEmail } from '../utils'
import { v4 as uuidv4 } from 'uuid'


const getSessions = async (_req: Request, res: Response) => {
  const sessions = await AuthService.findSessions()
  return res.status(200).json(sessions)
}


async function loginHandler(
  req: Request<{}, {}, LoginInput>, 
  res: Response
) {
  const { email, password } = req.body

  const user = await UserService.findByEmail(email)
  if (!user) return res.status(401).json({ msg: 'User not found.' })
  if (!user.verifyPassword(password)) {
    return res.status(401).json({ msg: 'Password is incorrect.' })
  }

  let payload: any = {}
  payload['ip'] = req.ip
  payload['user_agent'] = req.headers['user-agent']

  const session = await AuthService.createSession({ 
    ...payload, 
    user: user._id, 
  })

  const access_token = await AuthService.signAccessToken(user, session)

  res.status(200).json({ access_token })
}


async function forgotPasswordHandler(
  req: Request<{}, {}, ResetInput['body']>, 
  res: Response
) {
  const { email } = req.body

  const user = await UserService.findByEmail(email)
  if (!user) return res.status(404).json({ msg: 'User not found.' })

  const reset_code = uuidv4()
  user.reset_code = reset_code
  await user.save()

  // generate password reset link 
  const link = `${process.env.BASE_URL as string}/${user._id.toString()}/reset/${reset_code}`

  log.info(`Password reset link: ${link}`)

  await sendEmail({
    to: email,
    from: 'test@example.com',
    subject: 'Reset Your Password.',
    text: `Follow the link to reset your password: ${link}`,
    html: `<b>Click <a href=${link}>here</a> to reset your password.<b/>`,
  })

  res.status(200).json({ msg: `Password reset link sent to users' email.` })
}


async function resetPasswordHandler(
  req: Request<ResetInput['params'], {}, ResetInput['body']>, 
  res: Response
) {
  const { id, reset_code } = req.params
  const { password } = req.body

  const user = await UserService.findUserById(id)
  if (!user) return res.status(404).json({ msg: 'User not found.' })

  if (user.reset_code === reset_code) {
    user.password = password
    user.reset_code = null
    await user.save()
    return res.status(200).json({ msg: `Users' password has been updated successfully.` })
  }
  
  res.status(400).json({ msg: `Invalid password reset code.` })
}


async function logoutHandler(req: Request, res: Response) {
  const session_id = req.sessionId

  const session = await AuthService.findSessionById(session_id)
  if (!session || !session.valid) {
    return res.status(401).json({ msg: 'Session not found or is invalid' })
  }

  await AuthService.destroySession({ _id: session_id }, { valid: false })

  res.status(200).json({ msg: 'User logged out successfully.' })
}


export default {
  forgotPasswordHandler, 
  loginHandler,
  getSessions,
  logoutHandler,
  resetPasswordHandler, 
}
