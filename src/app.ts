import dotenv from 'dotenv'
import express, { Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { 
  auth_route, 
  user_route, 
  booking_route,
  product_route, 
} from './routes'
import cookieParser from 'cookie-parser'
import { database, log, swaggerDocs } from './utils'
import deserializeuser from './middleware/deserialize-user'

dotenv.config()

// install cross site scripting what what, maybe re-write user model in mongoose🤷🏾‍♂️
const PORT = Number(process.env.PORT)

const app = express()

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(deserializeuser)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * @openapi
 * /api/healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
app.get('/api/healthcheck', (_, res: Response) => { res.sendStatus(200) })

app.use('/api/auth', auth_route)
app.use('/api/users', user_route)
app.use('/api/products', product_route)
app.use('/api/reservation', booking_route)

function startServer() {
  const server = app.listen(PORT, () => {
    log.info(`App listening on: http://localhost:${PORT}`)
    database.connect()
    swaggerDocs(app, PORT)
  })

  const signals = ['SIGTERM', 'SIGINT']

  const gracefulShutdown = (signal: string) => {
    process.on(signal, () => {
      log.info(`Received signal: ${signal}, shutting down...`)
      server.close()
      database.disconnect()
      log.info('Goodbye...')
      process.exit(0)
    })
  }

  for (let i=0; i < signals.length; i++) {
    gracefulShutdown(signals[i])
  }
}

startServer()
