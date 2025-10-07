import type { User } from '../../db/schema.ts';

export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }

  static create(key: keyof User, value: string): UserNotFoundError {
    return new UserNotFoundError(`user with ${key}: ${value} not found`);
  }
}
