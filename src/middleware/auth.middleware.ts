import { Request, Response, NextFunction } from 'express'
import { verifyToken, decodeToken } from '../utils'
import { AuthService, UserService } from '../services'
import { IUser } from '../models/user.model'
import { ISession } from '../models/session.model'

declare global {
  namespace Express {
    interface Request {
      user: IUser
      userId: string
      sessionId: string
    }
  }
}

type DecodedType = {
  user: Omit<IUser, 'reset_code' | 'password'>
  session: ISession
}

async function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers
  
  if (!authorization || !authorization.startsWith('Bearer ')) return next()
    
  const token = authorization.split(' ')[1].trim()
  const decoded = decodeToken<DecodedType>(token)
  // const decoded = verifyToken<DecodedType>(token, process.env.ACCESS_TOKEN_PUBLIC_KEY as string)

  if (decoded) { 
    const [user, session] = await Promise.all([
      await UserService.findByEmail(decoded.user.email),
      await AuthService.findSessionById(decoded.session._id.toString())
    ]) 
    
    if (!user || !session) {
      return res.status(401).json({ msg: 'Invalid user' })
    }

    req.user = user.toObject()
    req.userId = user._id.toString()
    req.sessionId = session._id.toString()
  }

  next()
}

export default deserializeUser
