import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../../interfaces/auth/authenticated-request.interface.ts';

export const userController = {
  findById(req: AuthenticatedRequest, res: Response) {
    res.json({ message: `user found with id: ${req.params.id}` });
    return;
  },
  create(req: Request, res: Response) {
    res.json({ message: 'user created successfully' });
    return;
  },
};

export default userController;
