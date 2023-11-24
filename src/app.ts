import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import deserializeuser from './middleware/deserialize-user'

// npm i express jwt bcrypt @typegoose/typegoose mongoose helmet dotenv cors cookie-parser express-rate-limit nanoid config pino dayjs
// npm i --save-dev @types/node @types/pino-pretty ts-node-dev @types/express @types/jwt @types/bcrypt @types/config @types/mongoose @types/helmet @types/cors @types/cookie-parser @types/express-rate-limit @types/nanoid

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


app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
