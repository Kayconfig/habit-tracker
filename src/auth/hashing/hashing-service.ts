import { compare, genSalt, hash } from 'bcrypt';
import type { HashingService } from './hashing-service.interface.ts';

export const hashingService: HashingService = {
  async hash(plainPassword: string): Promise<string> {
    return await hash(plainPassword, await genSalt());
  },

  async compare(plainPassword, encryptedPassword) {
    return await compare(plainPassword, encryptedPassword);
  },
};
