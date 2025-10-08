import { SignJWT, jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';
import { getEnv } from '../../env/index.ts';
import type { JwtService } from './jwt-service.interface.ts';

const jwtSecret = getEnv('JWT_SECRET') as string;
const issuer = getEnv('ISSUER') as string;
const secretKey = createSecretKey(jwtSecret, 'utf-8');

export const jwtService: JwtService = {
  async verify<T>(token: string): Promise<T | null> {
    try {
      const { payload } = await jwtVerify(token, secretKey, { issuer });
      return (payload as T) || null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  async sign(payload: Record<string, any>, expiresIn: string): Promise<string> {
    const token = new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuer(issuer)
      .setExpirationTime(expiresIn)
      .sign(secretKey);

    return token;
  },
};
