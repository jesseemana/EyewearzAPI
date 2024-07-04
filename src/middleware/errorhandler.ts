import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`An error occurred. ${err}`)
  if (err.code === 11000) {
    return res.status(400).send('Email already in use.')
  }
  return res.status(500).json({ msg: 'Internal Server Error' })
}

export default errorHandler
