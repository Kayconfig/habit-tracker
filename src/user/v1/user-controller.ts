import type { Request, Response } from 'express';

export const userController = {
  findById(req: Request, res: Response) {
    res.json({ message: `user found with id: ${req.params.id}` });
    return;
  },
  create(req: Request, res: Response) {
    res.json({ message: 'user created successfully' });
    return;
  },
};

export default userController;
