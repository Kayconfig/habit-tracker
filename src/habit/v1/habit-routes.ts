import { Router } from 'express';
import habitController from '../../habit/v1/habit-controller.ts';
import { validateParams } from '../../middlewares/validate-params.middleware.ts';
import { idParamsSchema } from '../../schemas/id-params-schema.ts';
import { asyncHandler } from '../../wrappers/async-handler.ts';

export const habitRouter = Router();
const habitIdRouter = Router();

habitRouter.post('/', asyncHandler(habitController.create));
habitRouter.get('/', asyncHandler(habitController.find));

habitRouter.use('/:id', validateParams(idParamsSchema), habitIdRouter);
// routes prepended by :id
habitIdRouter.get('/', asyncHandler(habitController.findById));
habitIdRouter.patch('/', asyncHandler(habitController.update));
habitIdRouter.delete('/', asyncHandler(habitController.deleteById));

export default habitRouter;
