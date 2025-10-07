import { eq } from 'drizzle-orm';
import { getDB } from '../../db/connnection.ts';
import { users, type NewUser, type User } from '../../db/schema.ts';
import type { UserRepository } from '../interfaces/user-repository.ts';
import type { UpdateUser } from '../types/update-user.ts';

function createUserRepository(): UserRepository {
  const db = getDB();
  return {
    async create(inputDto: NewUser): Promise<User> {
      const [user] = await db.insert(users).values(inputDto).returning();
      return user;
    },
    async findById(id: string): Promise<User | null> {
      const user = await db.query.users.findFirst({ where: eq(users.id, id) });
      return user ?? null;
    },

    async update(id: string, inputDto: UpdateUser): Promise<User | null> {
      const [existingUser] = await db
        .update(users)
        .set({ firstName: inputDto.firstName, lastName: inputDto.lasName })
        .where(eq(users.id, id))
        .returning();

      return existingUser ?? null;
    },

    async findByUsername(username: string): Promise<User | null> {
      const user = await db.query.users.findFirst({
        where: eq(users.username, username),
      });
      return user ?? null;
    },

    async findByEmail(email: string): Promise<User | null> {
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      return user ?? null;
    },
  };
}

export const userRepository = createUserRepository();
