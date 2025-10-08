export interface JwtService {
  verify<T>(token: string): Promise<T | null>;
  sign(payload: Record<string, any>, expiresIn: string): Promise<string>;
}
