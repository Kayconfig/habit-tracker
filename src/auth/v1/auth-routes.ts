import { Router } from 'express';
import { validateBody } from '../../middlewares/validate-body.middleware.ts';
import { asyncHandler } from '../../wrappers/async-handler.ts';
import { loginSchema } from '../schemas/login-schema.ts';
import { registerSchema } from '../schemas/register-schema.ts';
import authController from './auth-controller.ts';

export const authRouter = Router();

authRouter.post(
  '/login',
  validateBody(loginSchema),
  asyncHandler(authController.login)
);
authRouter.post(
  '/register',
  validateBody(registerSchema),
  asyncHandler(authController.register)
);
