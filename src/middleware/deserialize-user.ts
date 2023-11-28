import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

const deserialize_user = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const token = req.headers.authorization.split(' ')[1].trim()
    const decoded = verifyToken<string>(token, 'accessTokenPublicKey')
    if (decoded) { res.locals.user = decoded }
    return next()
  }
}

export default deserialize_user
