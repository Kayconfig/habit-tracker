import z from 'zod';

const [
  minPasswordLength,
  maxPasswordLength,
  minUsernameLength,
  maxUsernameLength,
  minNameLength,
  maxNameLength,
] = [8, 100, 3, 25, 2, 150];

export const registerSchema = z.object({
  email: z.email('`email` must be valid email address'),
  password: z
    .string(`'password' must be provided`)
    .nonempty(`'password must not be empty string`)
    .min(
      minPasswordLength,
      `password length must be at least ${minPasswordLength} characters`
    )
    .max(
      maxPasswordLength,
      `password length must be not exceed ${maxPasswordLength} characters`
    ),
  username: z
    .string('username must be provided')
    .nonempty('username must not be empty string')
    .min(
      minUsernameLength,
      `username must be at least ${minUsernameLength} characters`
    )
    .max(
      maxUsernameLength,
      `username must not exceed ${maxUsernameLength} characters`
    ),

  firstName: z
    .string()
    .nonempty('firstName must not be empty string')
    .min(
      minNameLength,
      `firstName must be at least ${minNameLength} characters`
    )
    .max(maxNameLength, `firstName must not exceed ${maxNameLength} characters`)
    .optional(),

  lastName: z
    .string()
    .nonempty('lastName must not be empty string')
    .min(minNameLength, `lastName must be at least ${minNameLength} characters`)
    .max(maxNameLength, `lastName must not exceed ${maxNameLength} characters`)
    .optional(),
});

export type RegisterDto = z.infer<typeof registerSchema>;
