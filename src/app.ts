import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import config from 'config'
import { 
  auth_route, 
  user_route, 
  booking_route,
  product_route, 
} from './routes'
import cookieParser from 'cookie-parser'
import { database, logger } from './utils'
import deserializeuser from './middleware/deserialize-user'

dotenv.config()

const PORT = config.get<number>('port')

const app = express()

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(deserializeuser)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', auth_route)
app.use('/api/customers', user_route)
app.use('/api/products', product_route)
app.use('/api/reservation', booking_route)

function startServer() {
  const server = app.listen(PORT, () => {
    database.connect()
    logger.info(`App listening on: http://localhost:${PORT}`)
  })

  const signals = ['SIGTERM', 'SIGINT']

  const gracefulShutdown = (signal: string) => {
    process.on(signal, () => {
      logger.info(`Received signal: ${signal}, shutting down...`)
      server.close()
      database.disconnect()
      logger.info('Goodbye...')
      process.exit(0)
    })
  }

  for (let i=0; i < signals.length; i++) {
    gracefulShutdown(signals[i])
  }
}

startServer()
