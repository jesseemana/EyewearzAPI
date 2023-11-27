import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { controller, httpGet, httpPost } from 'inversify-express-utils'
import { verifyToken } from '../../utils/jwt'

@controller('/auth')
export class AuthController {
  private readonly _authService: AuthService

  constructor(_authService: AuthService) {
    this._authService = _authService
  }

  @httpPost('/login')
  async login(req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const user = await this._authService.findUserByEmail(email)
      
      if (!user || !user.verifyPassword(password)) 
        return res.status(400).send('Ivalid user credentails given')

      const session = await this._authService.createSession({ user_id: String(user._id)})
      const access_token = this._authService.signAccessToken(user, session)
      const refresh_token = this._authService.signRefreshToken(session)

      res.cookie('refresh_token', refresh_token, {
        maxAge: 30*24*60*60*1000, // 30 days
        httpOnly: true,
        secure: false,
        sameSite: 'strict', // cross-site access
        path: '/',
      });

      res.status(200).send({ user, access_token })
    } catch (error) {
      return res.status(500).send('Internal server error!')
    }
  }

  @httpGet('/refresh')
  async refresh(req: Request, res: Response) {
    try {
      const cookies = req.cookies
      if (!cookies?.refresh_token) return res.sendStatus(204)

      const refresh_token = cookies.refresh_token as string

      const decoded = verifyToken<{ session: string }>(refresh_token, 'refreshTokenPublicKey')
      if (!decoded) 
        return res.status(403).send('Token not founf or is invalid!')

      const session = await this._authService.findSessionById(decoded.session)
      if (!session) 
        return res.status(404).send('Session not found!')

      const user = await this._authService.findUserById(String(session.user))
      if (!user) 
        return res.status(404).send('User not found!')

      const access_token = this._authService.signAccessToken(user, session)

      res.status(200).send({ access_token })
    } catch (error) {
      return res.status(500).send('Internal server error!')
    }
  }

  @httpPost('/logout')
  async logout(req: Request, res: Response) {
    try {
      const cookies = req.cookies
      if (!cookies?.refresh_token) return res.sendStatus(204)

      const session_id = res.locals.user.session._id as string;

      const session = await this._authService.findSessionById(session_id)

      if (!session || !session.valid) 
        return res.status(401).send('Session is not found or is invalid');

      await this._authService.destroySession({ _id: session_id }, { valid: false })

      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
      })

      res.send('User loged out successfully.')
    } catch (error) {
      return res.status(500).send('Internal server error!')
    }
  }
}
