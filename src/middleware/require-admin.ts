import { Request, Response, NextFunction } from 'express'

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user
  if (!user) return res.sendStatus(403)
  if (!user.admin) {
    return res.status(401).json({ 
      msg: 'Only admins can make this operation' 
    })
  }
  next()
}

export default requireAdmin
