import type { Request, Response } from 'express';

export const habitController = {
  async findById(req: Request, res: Response): Promise<void> {
    res.json({ message: `found habit: # ${req.params.id}` });
    return;
  },
  async find(req: Request, res: Response): Promise<void> {
    res.json({ message: `habits` });
    return;
  },
  async create(req: Request, res: Response): Promise<void> {
    res.json({ message: `habit created` });
    return;
  },

  async update(req: Request, res: Response): Promise<void> {
    res.json({ message: `update habit: # ${req.params.id}` });
    return;
  },

  async deleteById(req: Request, res: Response): Promise<void> {
    res.json({ message: `delete habit: # ${req.params.id}` });
    return;
  },
};

export default habitController;
