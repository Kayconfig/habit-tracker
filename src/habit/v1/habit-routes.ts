import { Router } from 'express';
import { validateJwtToken } from '../../auth/jwt/middleware/validate-jwt-token.ts';
import habitController from '../../habit/v1/habit-controller.ts';
import { validateOffsetPagination } from '../../middlewares/offset-pagination-params.middleware.ts';
import { validateBody } from '../../middlewares/validate-body.middleware.ts';
import { validateParams } from '../../middlewares/validate-params.middleware.ts';
import { idParamsSchema } from '../../schemas/id-params-schema.ts';
import { asyncHandler } from '../../wrappers/async-handler.ts';
import { createHabitSchema } from '../schemas/create-habit.dto.ts';
import { updateHabitSchema } from '../schemas/update-habit.dto.ts';

export const habitRouter = Router();

// all routes is protected
habitRouter.use(validateJwtToken);

habitRouter.post(
  '/',
  validateBody(createHabitSchema),
  asyncHandler(habitController.create)
);
habitRouter.get(
  '/',
  validateOffsetPagination,
  asyncHandler(habitController.find)
);

habitRouter.use('/:id', validateParams(idParamsSchema));
// routes prepended by :id
habitRouter.get('/:id', asyncHandler(habitController.findById));
habitRouter.patch(
  '/:id',
  validateBody(updateHabitSchema),
  asyncHandler(habitController.update)
);
habitRouter.delete('/:id', asyncHandler(habitController.deleteById));

export default habitRouter;
