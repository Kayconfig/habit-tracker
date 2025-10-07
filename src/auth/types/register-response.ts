import type { User } from '../../db/schema.ts';

export type RegisterResponse = {
  user: User;
  accessToken: string;
};
