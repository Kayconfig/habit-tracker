import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TagNotFoundError } from '../errors/tag-not-found.error.ts';
import { tagService, type TagService } from './tag-service.ts';

export interface TagController {
  create(req: Request, res: Response): Promise<void>;
  findById(req: Request, res: Response): Promise<void>;
  deleteById(req: Request, res: Response): Promise<void>;
}

function createTagController(tagService: TagService): TagController {
  return {
    async create(req, res) {
      const { name, color } = req.body;
      const tag = await tagService.create({ name, color });
      const statusCode = StatusCodes.CREATED;
      res.status(statusCode).json({
        statusCode,
        message: 'tag created',
        data: { tag },
      });
    },
    async findById(req, res) {
      try {
        const id = req.params.id;
        const tag = await tagService.findById(id);
        const statusCode = StatusCodes.OK;
        res.status(statusCode).json({
          statusCode,
          message: 'tag found',
          data: { tag },
        });
      } catch (e) {
        if (e instanceof TagNotFoundError) {
          const statusCode = StatusCodes.NOT_FOUND;
          res.status(statusCode).json({
            statusCode,
            message: 'Tag not found',
            data: null,
          });
          return;
        }
        throw e;
      }
    },
    async deleteById(req, res) {
      try {
        const id = req.params.id;
        await tagService.deleteById(id);
        const statusCode = StatusCodes.OK;
        res.status(statusCode).json({
          statusCode,
          message: 'Tag deleted',
        });
      } catch (e) {
        if (e instanceof TagNotFoundError) {
          // sending ok, even when tag does not exist
          const statusCode = StatusCodes.OK;
          res.status(statusCode).json({
            statusCode,
            message: 'Tag does not exist.',
          });
          return;
        }
        throw e;
      }
    },
  };
}

export const tagController = createTagController(tagService);
