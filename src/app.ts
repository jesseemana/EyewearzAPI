import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import deserializeuser from './middleware/deserialize-user'
import database from './utils/connect-db'
import log from './utils/logger'
import config from 'config'
import ProductsRoute from './routes/product.route'
import AuthRoute from './routes/auth.route'
import CustomersRoute from './routes/customer.route'
import ReservationRoute from './routes/reservation.route'

const PORT = config.get<number>('port')

const app = express()

app.use(cors({
  // configure CORS stuff here
}))
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
    log.info(`App listening on port ${PORT}`)
  })

  const signals = ['SIGTERM', 'SIGINT']

  const gracefulShutdown = (signal: string) => {
    process.on(signal, () => {
      log.info(`Received signal: ${signal}, shutting down...`)
      server.close()
      database.disconnect()
      log.info('Goodbye')

      process.exit(0)
    })
  }

  for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i])
  }
}

startServer()
