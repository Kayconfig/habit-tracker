import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number as zodNumber, object as zodObject } from 'zod';
const offsetPaginationSchema = zodObject({
  page: zodNumber().positive().gt(0).optional(),
  limit: zodNumber().positive().gt(0).optional(),
});

export async function validateOffsetPagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsedResult = await offsetPaginationSchema.safeParseAsync(
      req.params
    );
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
    req.params.page = `${parsedResult.data.page}`;
    req.params.limit = `${parsedResult.data.limit}`;
    next();
  } catch (e) {
    next(e);
  }
}
