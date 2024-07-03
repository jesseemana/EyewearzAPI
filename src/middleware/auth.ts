import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils'
import { UserService } from '../services'

type UserType = {
  _id: string
  first_name: string
  last_name: string
  role: string
  email: string
  location: string
}

declare global {
  namespace Express {
    interface Request {
      user: UserType
      userId: string
    }
  }
}

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  
  if (!authorization || !authorization.startsWith('Bearer ')) return next()

  const token = authorization.split(' ')[1].trim()

  const decoded = verifyToken<UserType>(token, process.env.ACCESS_TOKEN_PUBLIC_KEY as string)

  if (decoded) { 
    const user = await UserService.findByEmail(decoded.email)
    if (!user) return res.status(401).json({ msg: 'User not found' })
    req.user = user.toObject()
    req.userId = user._id.toString()
  }

  next()
}

export default deserializeUser
