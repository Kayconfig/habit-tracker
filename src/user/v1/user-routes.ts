import { Router } from 'express';
import { validateJwtToken } from '../../auth/jwt/middleware/validate-jwt-token.ts';
import userController from '../../user/v1/user-controller.ts';
import { asyncHandler } from '../../wrappers/async-handler.ts';

export const userRouter = Router();

userRouter.use(validateJwtToken);

// app is authenticated, so the id will come from the bearer
userRouter.get(
  '/',
  // add authMiddleware
  asyncHandler(userController.findById)
);

export default userRouter;
