import 'dotenv/config'
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
import { Database, log, swaggerDocs } from './utils'
import { deserialize_user, error_handler }from './middleware'

// install cross site scripting what what, maybe re-write user model in mongoose🤷🏾‍♂️
const app = express()
const PORT = Number(process.env.PORT)
const database = Database.getInstance()

// middleware
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(deserialize_user)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * @openapi
 * /health-check:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
app.get('/health-check', (_, res: Response) => res.sendStatus(200))
// routes
app.use('/api/auth', auth_route)
app.use('/api/users', user_route)
app.use('/api/products', product_route)
app.use('/api/reservation', booking_route)
// error handling middleware
app.use(error_handler)

function start_server() {
  const server = app.listen(PORT, () => {
    log.info(`App listening at: http://localhost:${PORT}`)
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

start_server()
