import type { Request } from 'express';
import type { JwtPayload } from '../../auth/jwt/jwt-payload.schema.ts';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
