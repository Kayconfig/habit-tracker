import { HttpStatusCode } from 'axios';
import cors from 'cors';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { isTest } from '../env.ts';
import { authRouter } from './auth/v1/auth-routes.ts';
import habitRouter from './habit/v1/habit-routes.ts';
import userRoutes from './user/v1/user-routes.ts';
import { timestamp } from './utils/timestamps.ts';

export const app = express();

// register middlewares
app.use(helmet());
app.use(cors({ origin: 'localhost' }));
app.use(
  morgan('dev', {
    skip: () => isTest,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'Ok',
    timestamp: timestamp.nowInISO(),
    service: 'Habit Tracker API',
  });
});

// register routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/habit', habitRouter);
app.use('/api/v1/user', userRoutes);

// unhandled routes
app.use('/', (req, res) => {
  const statusCode = HttpStatusCode.NotFound;
  res.status(statusCode).json({ statusCode, message: 'not found' });
});

// handle errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // log error, you can use sentry
  console.error(err);
  res.status(HttpStatusCode.InternalServerError).json({
    statusCode: HttpStatusCode.InternalServerError,
    message: 'unable process request, please try again later',
  });
});

export default app;
