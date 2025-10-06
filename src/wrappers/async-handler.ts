import type { NextFunction, Request, Response } from 'express';

type AsyncHandlerInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;
export function asyncHandler(fn: AsyncHandlerInput) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
