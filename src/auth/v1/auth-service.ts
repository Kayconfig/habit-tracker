import type { User } from '../../db/schema.ts';
import { getEnv } from '../../env/index.ts';
import type { UserService } from '../../user/interfaces/user-service.ts';
import { userService } from '../../user/v1/user-service.ts';
import { PasswordMismatchError } from '../errors/password-mismatch.ts';
import type { HashingService } from '../hashing/hashing-service.interface.ts';
import { hashingService } from '../hashing/hashing-service.ts';
import type { JwtService } from '../jwt/jwt-service.interface.ts';
import { jwtService } from '../jwt/jwt-service.ts';
import type { LoginDto } from '../schemas/login-schema.ts';
import type { RegisterDto } from '../schemas/register-schema.ts';
import type { LoginResponse } from '../types/login-response.ts';
import type { RegisterResponse } from '../types/register-response.ts';

async function generateAccessToken(
  user: User,
  jwtService: JwtService
): Promise<string> {
  const accessTokenExpiresIn = getEnv<string>('JWT_ACCESS_TOKEN_EXPIRES_IN');
  return await jwtService.sign(
    {
      sub: user.id,
      email: user.email,
      username: user.username,
    },
    accessTokenExpiresIn
  );
}

function createAuthService(
  userService: UserService,
  hashingService: HashingService,
  jwtService: JwtService
) {
  return {
    name: true,
    speak: () => console.log(),
    async register(registerDto: RegisterDto): Promise<RegisterResponse> {
      registerDto.password = await hashingService.hash(registerDto.password);
      const createdUser = await userService.create(registerDto);
      const accessToken = await generateAccessToken(createdUser, jwtService);
      return { user: createdUser, accessToken };
    },

    async login(loginDto: LoginDto): Promise<LoginResponse> {
      const user = await userService.findByEmail(loginDto.email);
      const passwordMatch = await hashingService.compare(
        loginDto.password,
        user.password
      );
      if (!passwordMatch) {
        throw PasswordMismatchError.create();
      }
      const accessToken = await generateAccessToken(user, jwtService);
      return { user, accessToken };
    },
  };
}

export const authService = createAuthService(
  userService,
  hashingService,
  jwtService
);
