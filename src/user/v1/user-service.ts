import { DrizzleQueryError } from 'drizzle-orm';
import type { User } from '../../db/schema.ts';
import { UserEmailExistError } from '../errors/user-email-exist.ts';
import { UsernameExistError } from '../errors/user-name-exist.ts';
import { UserNotFoundError } from '../errors/user-not-found.ts';
import type { UserRepository } from '../interfaces/user-repository.ts';
import type { UserService } from '../interfaces/user-service.ts';
import type { CreateUser } from '../types/create-user.ts';
import type { UpdateUser } from '../types/update-user.ts';
import { userRepository } from './user-repository.ts';

export function createUserService(userRepository: UserRepository): UserService {
  return {
    async create(createUser: CreateUser): Promise<User> {
      try {
        return await userRepository.create(createUser);
      } catch (e) {
        if (e instanceof DrizzleQueryError) {
          if (
            e.cause.message.includes(
              'duplicate key value violates unique constraint "users_email_unique"'
            )
          ) {
            throw UserEmailExistError.create(createUser.email);
          }

          if (
            e.cause.message.includes(
              'duplicate key value violates unique constraint "users_username_unique"'
            )
          ) {
            throw UsernameExistError.create(createUser.username);
          }
        }

        throw e;
      }
    },

    async findById(id: string): Promise<User> {
      const user = await userRepository.findById(id);
      if (!user) {
        throw UserNotFoundError.create('id', id);
      }
      return user;
    },

    async findByUsername(username: string): Promise<User> {
      const user = await userRepository.findByUsername(username);
      if (!user) {
        throw UserNotFoundError.create('username', username);
      }
      return user;
    },
    async findByEmail(email: string): Promise<User> {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw UserNotFoundError.create('email', email);
      }
      return user;
    },
    async update(id: string, inputDto: UpdateUser): Promise<User> {
      const updatedUser = await userRepository.update(id, inputDto);

      if (!updatedUser) {
        throw UserNotFoundError.create('id', id);
      }
      return updatedUser;
    },
  };
}

export const userService = createUserService(userRepository);
