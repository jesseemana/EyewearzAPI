import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
// @ts-ignore
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import { Database, log } from './utils';
import { deserializeUser, errorHandler }from './middleware';
import { authRoute, userRoute, orderRoute, bookingRoute, productRoute, } from './routes';

const app = express();
const database = Database.getInstance();
const PORT = parseInt(process.env.PORT as string) || 3030;

// middleware
app.use(xss());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(deserializeUser);
app.use(express.json({ limit: '5MB'}));
app.use(express.urlencoded({ limit: '5MB', extended: true }));

// check app health
app.get('/health-check', (_req: Request, res: Response) => res.sendStatus(200));

// app routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/reservation', bookingRoute);

// error handling middleware
app.use(errorHandler);

function startServer() {
  const server = app.listen(PORT, () => {
    database.connect();
    log.info(`Server listening at: http://localhost:${PORT}`);
  })

  const signals = ['SIGTERM', 'SIGINT'];

  const gracefulShutdown = (signal: string) => {
    process.on(signal, () => {
      log.info(`Received signal: ${signal}, shutting down...`);
      server.close();
      database.disconnect();
      log.info('Goodbye...');
      process.exit(0);
    })
  }

  signals.forEach((_signal, index) => gracefulShutdown(signals[index]));
}

startServer();
