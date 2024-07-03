import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils'
import { AuthService, UserService } from '../services'
import { UserType, DecodedType } from '../types'

declare global {
  namespace Express {
    interface Request {
      user: UserType
      userId: string
      sessionId: string
    }
  }
}

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  
  if (!authorization || !authorization.startsWith('Bearer ')) return next()

  const token = authorization.split(' ')[1].trim()

  const decoded = verifyToken<DecodedType>(token, process.env.ACCESS_TOKEN_PUBLIC_KEY as string)

  if (decoded) { 
    const user = await UserService.findByEmail(decoded.user.email)
    const session = await AuthService.findSessionById(decoded.session._id)
    if (!user || !session) 
      return res.status(401).json({ msg: 'Invalid user' })

    req.user = user.toObject()
    req.userId = user._id.toString()
    req.sessionId = session._id.toString()
  }

  next()
}

export default deserializeUser
