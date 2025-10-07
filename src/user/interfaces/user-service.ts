import type { User } from '../../db/schema.ts';
import type { CreateUser } from '../types/create-user.ts';
import type { UpdateUser } from '../types/update-user.ts';

export interface UserService {
  create(data: CreateUser): Promise<User>;
  findById(id: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(id: string, inputDto: UpdateUser): Promise<User>;
}
