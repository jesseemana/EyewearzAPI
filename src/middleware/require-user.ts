import { Request, Response, NextFunction } from 'express';

const requireUser = (_req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) return res.sendStatus(403);
  next();
}

export default requireUser;
