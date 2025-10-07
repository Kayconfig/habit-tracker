import type { JwtPayload } from './jwt-payload.schema.ts';

export interface JwtService {
  verify<T>(token: string): Promise<T | null>;
  sign(payload: Record<string, any>, expiresIn: string): Promise<string>;
  signAccessToken(payload: JwtPayload): Promise<string>;
  verifyAccessToken(token: string): Promise<JwtPayload | null>;
}
