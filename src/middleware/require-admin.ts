import { Request, Response, NextFunction } from 'express';

const requireAdmin = (_req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.User;
  if (!user) return res.sendStatus(403);
  if (user.role !== 'admin') {
    return res.status(401).send('Only admins can make this operation');
  }
  next();
}

export default requireAdmin;
