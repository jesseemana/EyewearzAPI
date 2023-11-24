import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import log from '../utils/logger'

const deserializeuser = (req: Request, res: Response, next: NextFunction) => {
  let token

  if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
    log.info(token)
  }

  const decoded = verifyToken(token, 'accessTokenPublicKey')

  if (decoded) 
    res.locals.user = decoded

  return next()
}

export default deserializeuser
