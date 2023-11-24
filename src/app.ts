import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import deserializeuser from './middleware/deserialize-user'
import database from './utils/connect-db'
import log from './utils/logger'

// npm i express zod inversify jwt bcrypt @typegoose/typegoose mongoose helmet dotenv cors cookie-parser express-rate-limit nanoid config pino dayjs
// npm i --save-dev @types/node @types/inversify @types/pino-pretty ts-node-dev @types/express @types/jwt @types/bcrypt @types/config @types/mongoose @types/helmet @types/cors @types/cookie-parser @types/express-rate-limit @types/nanoid

const app = express()

const PORT = 3000

app.use(cors({
    // configure CORS stuff here
}))
app.use(helmet())
app.use(cookieParser())
app.use(deserializeuser)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const startServer = () => {
  const server = app.listen(PORT, () => {
    database.connect()
    log.info(`App listening on port ${PORT}`)
  })

  const signals = ['SIGTERM', 'SIGINT']

  function gracefulShutdown(signal: string) {
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
