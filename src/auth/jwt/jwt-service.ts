import { SignJWT, jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';
import { getEnv } from '../../../env.ts';
import { jwtPayloadSchema, type JwtPayload } from './jwt-payload.schema.ts';
import type { JwtService } from './jwt-service.interface.ts';

const jwtSecret = getEnv('JWT_SECRET') as string;
const issuer = getEnv('ISSUER') as string;
const secretKey = createSecretKey(jwtSecret, 'utf-8');

export const jwtService: JwtService = {
  async verify<T>(token: string): Promise<T | null> {
    try {
      const payload = await jwtVerify(token, secretKey, { issuer });
      return (payload.payload as T) || null;
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

  async signAccessToken(payload: JwtPayload): Promise<string> {
    const accessTokenExpiresIn = getEnv('JWT_ACCESS_TOKEN_EXPIRES_IN');
    const parsedPayload = jwtPayloadSchema.parse(payload);
    return await this.sign(parsedPayload, accessTokenExpiresIn);
  },

  async verifyAccessToken(token: string): Promise<JwtPayload | null> {
    return (await this.verify(token)) as JwtPayload;
  },
};
