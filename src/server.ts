import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { deserializeUser }from './middleware'
import { Database, log } from './utils'
import { 
  authRoute, 
  userRoute, 
  orderRoute, 
  bookingRoute, 
  productRoute, 
} from './routes'

const app = express()

const database = Database.getInstance()
const PORT = parseInt(process.env.PORT as string) || 3030

// Middleware
app.use(cors())
app.use(helmet())
app.use(deserializeUser)
app.use(express.json({ limit: '5MB'}))
app.use(express.urlencoded({ limit: '5MB', extended: true }))

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ msg: 'Health OK' })
})

// Routes
app.use('/api/v1/orders', orderRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/reservation', bookingRoute)

// Asynchronous error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`An error occurred. ${err}`)
  if (err.code === 11000) {
    return res.status(400).send('Email already in use.')
  }
  return res.status(500).json({ msg: 'Internal Server Error' })
})

async function main() {
  const server = app.listen(PORT, () => {
    database.connect()
    log.info(`server listening at: http://localhost:${PORT}`)
  })

  const signals = ['SIGTERM', 'SIGINT']

  const gracefulShutdown = (signal: string) => {
    process.on(signal, () => {
      log.info(`Received signal: ${signal}. Shutting down...`)
      server.close()
      database.disconnect()
      log.info('Goodbye...')
      process.exit(0)
    })
  }

  signals.forEach((_signal, index) => gracefulShutdown(signals[index]))
}

main()
