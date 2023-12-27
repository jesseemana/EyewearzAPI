import rateLimit from 'express-rate-limit'
import { Request, Response, NextFunction } from 'express'

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,
  message: { message: 'Too many login attempts, please try again after a 1 minute pause' },
  handler: (req: Request, res: Response, next: NextFunction, options) => {
    res.status(options.statusCode).send(options.message)
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export default loginLimiter
