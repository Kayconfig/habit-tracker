import { HttpStatusCode } from 'axios';
import type { Request, Response } from 'express';
import { UserDto } from '../../user/dtos/user.dto.ts';
import { UserEmailExistError } from '../../user/errors/user-email-exist.ts';
import { UsernameExistError } from '../../user/errors/user-name-exist.ts';
import { UserNotFoundError } from '../../user/errors/user-not-found.ts';
import { PasswordMismatchError } from '../errors/password-mismatch.ts';
import { authService } from './auth-service.ts';

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const registerDto = req.body;
      const { user, accessToken } = await authService.register(registerDto);
      const statusCode = HttpStatusCode.Created;
      res.status(statusCode).json({
        statusCode,
        message: 'user signed up successfully',
        data: { user: UserDto.create(user), accessToken },
      });
      return;
    } catch (e) {
      if (e instanceof UserEmailExistError || e instanceof UsernameExistError) {
        const statusCode = HttpStatusCode.Conflict;
        const affectedField =
          e instanceof UserEmailExistError ? 'email' : 'username';
        res.status(statusCode).json({
          statusCode,
          message: `conflict: ${affectedField} already exists`,
        });
        return;
      }

      throw e;
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginDto = req.body;
      const { user, accessToken } = await authService.login(loginDto);

      const statusCode = HttpStatusCode.Ok;
      res.status(statusCode).json({
        statusCode,
        message: 'login successful',
        data: { user: UserDto.create(user), accessToken },
      });
    } catch (e) {
      if (
        e instanceof PasswordMismatchError ||
        e instanceof UserNotFoundError
      ) {
        const statusCode = HttpStatusCode.Unauthorized;
        res.status(statusCode).json({
          statusCode,
          message: 'unauthorized: invalid email or password',
        });
        return;
      }
      throw e;
    }
  },
};

export default authController;
