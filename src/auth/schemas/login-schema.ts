import z from 'zod';

export const loginSchema = z.object(
  {
    email: z.email(`'email' must be valid email address`),
    password: z
      .string(`'password' must be string`)
      .min(8, `'password' must be at least 8 characters`)
      .max(25, `'password' must have max length of 25`),
  },
  {
    error: `'email' and 'password' is required for login`,
  }
);

export type LoginDto = z.infer<typeof loginSchema>;
