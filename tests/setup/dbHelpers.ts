import { hashingService } from '../../src/auth/hashing/hashing-service.ts';
import { jwtService } from '../../src/auth/jwt/jwt-service.ts';
import { authService } from '../../src/auth/v1/auth-service.ts';
import { getDB } from '../../src/db/connnection.ts';
import {
  entries,
  habits,
  tags,
  users,
  type NewHabit,
  type NewUser,
} from '../../src/db/schema.ts';

const db = getDB();

export const createTestUser = async (userData: Partial<NewUser> = {}) => {
  const usernameSeed = `${Date.now()}-${Math.random()}`;
  const defaultData = {
    email: `test-${usernameSeed}@example.com`,
    username: `testuser-${usernameSeed}`,
    password: 'adminpassword1234',
    firstName: 'Test',
    lastName: 'User',
    ...userData,
  };

  const hashedPassword = await hashingService.hash(defaultData.password);

  const [user] = await db
    .insert(users)
    .values({
      ...defaultData,
      password: hashedPassword,
    })
    .returning();

  const token = await authService.generateAccessToken(user, jwtService);
  return { token, user, rawPassword: defaultData.password };
};

export const createTestHabit = async (
  userId: string,
  preferredHabit: Partial<NewHabit> = {}
) => {
  const defaultData: NewHabit = {
    name: `Test habit ${Date.now()}`,
    description: 'A test habit',
    frequency: 'daily',
    targetCount: 1,
    ...preferredHabit,
    userId,
  };
  const [habit] = await db.insert(habits).values(defaultData).returning();
  return habit;
};

export const cleanUpDatabase = async () => {
  await db.delete(entries);
  await db.delete(tags);
  await db.delete(users);
  await db.delete(habits);
};
