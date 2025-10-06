import { HttpStatusCode } from 'axios';
import type { Request, Response } from 'express';
import type { LoginDto } from '../schemas/login-schema.ts';

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    const registerDto = req.body;
    res
      .status(HttpStatusCode.Created)
      .json({ message: 'user signed up successfully' });
    return;
  },

  async login(req: Request, res: Response): Promise<void> {
    const loginDto: LoginDto = req.body;
    res.status(HttpStatusCode.Ok).json({
      message: 'user logged in successfully',
      payload: loginDto,
    });
    return;
  },
};

export default authController;
