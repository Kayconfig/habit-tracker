import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ZodType } from 'zod';
export function validateParams(schema: ZodType) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const parsedResult = await schema.safeParseAsync(req.params);
      if (parsedResult.error) {
        const statusCode = StatusCodes.BAD_REQUEST;
        const formattedError = parsedResult.error.issues.map((issue) => ({
          field: issue.path.join('.') || 'params',
          message: issue.message,
        }));
        res.status(statusCode).json({
          statusCode,
          message: 'bad request: params validation failed',
          errors: formattedError,
        });
        return;
      }

      next();
    } catch (e) {
      next(e);
    }
  };
}
