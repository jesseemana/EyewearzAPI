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

import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'

import { UserRepository } from './modules/user/user.repository'
import { UserService } from './modules/user/user.service'
import { ProductRepository } from './modules/product/product.repository'
import { ProductService } from './modules/product/product.service'
import { AuthRepository } from './modules/auth/auth.repository'
import { AuthService } from './modules/auth/auth.service'

import './modules/user/user.controller'
import './modules/product/product.controller'
import './modules/reservation/reservation.repository'
import './modules/auth/auth.controller'

const container = new Container()
const server = new InversifyExpressServer(container)

// npm i lodash
// npm i --save-dev @types/lodash @types/jsonwebtoken

const app = server.build()

const PORT = config.get<number>('port')

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

  container.bind(UserRepository).toSelf()
  container.bind(UserService).toSelf()
  container.bind(ProductRepository).toSelf()
  container.bind(ProductService).toSelf()
  container.bind(AuthRepository).toSelf()
  container.bind(AuthService).toSelf()

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
