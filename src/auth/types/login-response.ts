import type { User } from '../../db/schema.ts';

export type LoginResponse = {
  accessToken: string;
  user: User;
};
