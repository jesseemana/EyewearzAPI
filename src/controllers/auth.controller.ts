import { Request, Response } from 'express'
import { authService, userService }from '../services'
import { EmailType, LoginInput, ResetInput } from '../schema/user.schema'
import { v4 as uuidv4 } from 'uuid'
import { log, sendEmail } from '../utils'


async function loginHandler(
  req: Request<{}, {}, LoginInput>, 
  res: Response
) {
  const { email, password } = req.body

  const user = await userService.FindByEmail(email)
  if (!user) return res.status(401).json({ msg: 'User not found.' })
  const is_valid = await user.verifyPassword(password)
  if (!is_valid) return res.status(401).json({ msg: 'Password is incorrect.' })

  let payload: any = {}
  payload['ip'] = req.ip
  payload['user_agent'] = req.headers['user-agent']

  const session = await authService.CreateSession({ 
    ...payload, 
    valid: true,
    user: user._id, 
  })

  const access_token = await authService.SignAccessToken(user, session)

  res.status(200).json({ access_token })
}


async function forgotPasswordHandler(
  req: Request<{}, {}, EmailType>, 
  res: Response
) {
  const user = await userService.FindByEmail(req.body.email)
  if (!user) return res.status(404).json({ msg: 'User not found.' })

  user.reset_code = uuidv4()
  await user.save()

  // Generate password reset link
  const BASE_URL = process.env.BASE_URL!
  const link = `${BASE_URL}/api/v1/auth/${user._id.toString()}/reset/${user.reset_code}`
  // log.info(`Reset link: ${link}`)

  await sendEmail({
    to: req.body.email,
    from: 'test@example.com',
    subject: 'Reset Your Password.',
    text: `Follow the link to reset your password: ${link}`,
    html: `<b>Click <a href=${link}>here</a> to reset your password.<b/>`,
  })

  res.status(200).json({ 
    msg: `Password reset link sent to users' email.` 
  })
}


async function resetPasswordHandler(
  req: Request<ResetInput['params'], {}, ResetInput['body']>, 
  res: Response
) {
  const { user_id, reset_code } = req.params

  const user = await userService.FindUserById(user_id)
  if (!user) return res.status(404).json({ msg: 'User not found.' })

  if (user.reset_code === reset_code) {
    user.password = req.body.password
    user.reset_code = null
    await user.save()
    return res.status(200).json({ 
      msg: `Users' password has been updated successfully.` 
    })
  }
  
  res.status(400).json({ msg: `Invalid password reset code.` })
}


async function logoutHandler(req: Request, res: Response) {
  const session_id = req.sessionId

  const session = await authService.FindSessionById(session_id)
  if (!session) 
    return res.status(401).json({ msg: 'Session not found' })
  await authService.DestroySession({ _id: session_id }, { valid: false })

  res.status(200).json({ msg: 'User logged out successfully.' })
}


export default {
  forgotPasswordHandler, 
  loginHandler,
  logoutHandler,
  resetPasswordHandler, 
}
