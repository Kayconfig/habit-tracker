import type { infer as ZodInfer } from 'zod';
import {
  email as ZodEmail,
  object as ZodObject,
  string as ZodString,
} from 'zod';

export const jwtPayloadSchema = ZodObject({
  sub: ZodString().nonempty(),
  email: ZodEmail(),
  username: ZodString().nonempty(),
});

export type JwtPayload = ZodInfer<typeof jwtPayloadSchema>;
