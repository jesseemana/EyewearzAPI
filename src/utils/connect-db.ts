import mongoose, { ConnectOptions } from 'mongoose'
import log from './logger'
import dotenv from 'dotenv'

dotenv.config()

class ConnectDatabase {
  protected dbUri: string
  protected options: ConnectOptions

  constructor() {
    this.options = {
      autoIndex: false,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      socketTimeoutMS: 4500,
    }

    this.dbUri = String(process.env.MONGO_URI)
  }

  connect() { 
    mongoose.connect(this.dbUri)

    mongoose.connection.on('connected', () => {
      log.info('Database connected...')
    })
    mongoose.connection.on('error', (error: string) => {
      log.error(`Error connecting to database: ${error}.`)
    })
    mongoose.connection.on('disconnected', () => {
      log.warn('Mongoose database has been disconnected.')
    })
  }

  disconnect() {
    mongoose.connection.close()
    log.warn('Database connection closed due to app termination.')  
  }
}

const database = new ConnectDatabase()
export default database
