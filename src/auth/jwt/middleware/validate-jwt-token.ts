import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { AuthenticatedRequest } from '../../../interfaces/auth/authenticated-request.interface.ts';
import type { JwtPayload } from '../jwt-payload.schema.ts';
import { jwtService } from '../jwt-service.ts';
export async function validateJwtToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'unauthorized',
      });
      return;
    }

    const payload = await jwtService.verify<JwtPayload>(token);
    if (!payload) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'unauthorized',
      });
      return;
    }
    req.user = payload;
    next();
  } catch (e) {
    next(e);
  }
}
