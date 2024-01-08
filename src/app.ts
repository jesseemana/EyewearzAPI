import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import config from 'config'
import { logger } from './utils'
import { database } from './utils'
import cookieParser from 'cookie-parser'
import AuthRoute from './routes/auth.route'
import ProductsRoute from './routes/product.route'
import CustomersRoute from './routes/customer.route'
import deserializeuser from './middleware/deserialize-user'
import ReservationRoute from './routes/reservation.route'

dotenv.config()

const PORT = config.get<number>('port')

const app = express()

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(deserializeuser)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', AuthRoute)
app.use('/api/products', ProductsRoute)
app.use('/api/customers', CustomersRoute)
app.use('/api/reservation', ReservationRoute)

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
      logger.info('Goodbye')

      process.exit(0)
    })
  }

  for (let i=0; i < signals.length; i++) {
    gracefulShutdown(signals[i])
  }
}

startServer()
