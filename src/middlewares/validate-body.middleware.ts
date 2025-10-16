import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ZodType } from 'zod';
export function validateBody(schema: ZodType) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const parsedResult = await schema.safeParseAsync(req.body);
      if (parsedResult.error) {
        const statusCode = StatusCodes.BAD_REQUEST;
        const formattedError = parsedResult.error.issues.map((issue) => ({
          field: issue.path.join('.') || 'body',
          message: issue.message,
        }));
        res.status(statusCode).json({
          statusCode,
          message: 'bad request: body validation failed',
          errors: formattedError,
        });
        return;
      }
      req.body = parsedResult.data;
      next();
    } catch (e) {
      next(e);
    }
  };
}
