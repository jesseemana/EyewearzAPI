import { Request, Response, NextFunction } from 'express';
import { log, verifyToken } from '../utils';

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  
  if (!authorization || !authorization.startsWith('Bearer ')) return next();

  const token = authorization.split(' ')[1].trim();
  const decoded = verifyToken(token, String(process.env.ACCESS_TOKEN_PUBLIC_KEY));
  log.info(decoded);
  if (decoded) { res.locals.user = decoded }

  next();
}

export default deserializeUser;
