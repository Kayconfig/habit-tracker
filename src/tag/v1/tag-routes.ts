import { Router } from 'express';
import { validateJwtToken } from '../../auth/jwt/middleware/validate-jwt-token.ts';
import { validateBody } from '../../middlewares/validate-body.middleware.ts';
import { validateParams } from '../../middlewares/validate-params.middleware.ts';
import { idParamsSchema } from '../../schemas/id-params-schema.ts';
import { asyncHandler } from '../../wrappers/async-handler.ts';
import { createTagSchema } from '../dto/create-tag.dto.ts';
import { tagController } from './tag-controller.ts';

export const tagRouter = Router();

tagRouter.use(validateJwtToken);

tagRouter.post(
  '/',
  validateBody(createTagSchema),
  asyncHandler(tagController.create)
);
tagRouter.use('/:id', validateParams(idParamsSchema));
tagRouter.get('/:id', asyncHandler(tagController.findById));
tagRouter.delete('/:id', asyncHandler(tagController.deleteById));
