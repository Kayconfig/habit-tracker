export interface HashingService {
  hash(plainPassword: string): Promise<string>;
  compare(plainPassword: string, encryptedPassword: string): Promise<boolean>;
}
