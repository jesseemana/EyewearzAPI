import { Request, Response, NextFunction } from 'express';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) return res.sendStatus(403);
  next();
}

export default requireUser;
