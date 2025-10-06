import { Router } from 'express';
import userController from '../../user/v1/user-controller.ts';
import { asyncHandler } from '../../wrappers/async-handler.ts';

export const userRoutes = Router();

// app is authenticated, so the id will come from the bearer
userRoutes.get(
  '/',
  // add authMiddleware
  asyncHandler(userController.findById)
);

export default userRoutes;
