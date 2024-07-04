import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`An error occurred. ${err}`)
  return res.status(500).json({ msg: 'Internal Server Error' })
}

export default errorHandler
