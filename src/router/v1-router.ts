import { Router } from 'express';
import { authRouter } from '../auth/v1/auth-routes.ts';
import habitRouter from '../habit/v1/habit-routes.ts';
import userRouter from '../user/v1/user-routes.ts';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/habit', habitRouter);
v1Router.use('/user', userRouter);

export default v1Router;
