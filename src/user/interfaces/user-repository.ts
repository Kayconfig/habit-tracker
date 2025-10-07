import type { User } from '../../db/schema.ts';
import type { CreateUser } from '../types/create-user.ts';
import type { UpdateUser } from '../types/update-user.ts';

export interface UserRepository {
  create(data: CreateUser): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  update(id: string, inputDto: UpdateUser): Promise<User | null>;
}
