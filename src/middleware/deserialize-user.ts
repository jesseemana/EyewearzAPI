import { Request, Response, NextFunction } from 'express'
import { jwt } from '../utils'

const deserialize_user = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if (
    req.headers && 
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer ')
  ) {
    const token = (req.headers.authorization).split(' ')[1].trim()
    const decoded = jwt.verifyToken(token, 'accessTokenPublicKey')
    if (decoded) { res.locals.user = decoded }
    return next()
  }

  return next()
}

export default deserialize_user
