import type { Request, Response } from 'express';

export interface HabitController {
  find(req: Request, res: Response): Promise<void>;
  findById(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  deleteById(req: Request, res: Response): Promise<void>;
}
