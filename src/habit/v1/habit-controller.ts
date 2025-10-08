import { HttpStatusCode } from 'axios';
import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '../../interfaces/auth/authenticated-request.interface.ts';
import type { OffsetPagination } from '../../interfaces/pagination/pagination.interface.ts';
import { HabitNotFoundError } from '../error/habit-not-found.error.ts';
import type { CreateHabit } from '../schemas/create-habit.dto.ts';
import type { UpdateHabit } from '../schemas/update-habit.dto.ts';
import { habitService } from './habit-service.ts';
import type { HabitController } from './interfaces/habit-controller.interface.ts';
import type { HabitService } from './interfaces/habit-service.interface.ts';

async function findById(
  req: AuthenticatedRequest,
  res: Response,
  service: HabitService
): Promise<void> {
  try {
    const userId = req.user.sub!;
    const habitId = req.params.id;
    const habit = await service.findById(habitId, userId);

    res.json({
      statusCode: HttpStatusCode.Ok,
      message: `successful`,
      data: { habit },
    });
    return;
  } catch (e) {
    if (e instanceof HabitNotFoundError) {
      const statusCode = HttpStatusCode.NotFound;
      res.status(statusCode).json({
        statusCode,
        message: 'habit not found',
        data: null,
      });
      return;
    }
    throw e;
  }
}
async function find(
  req: AuthenticatedRequest,
  res: Response,
  service: HabitService
): Promise<void> {
  const userId = req.user.sub!;
  const paginationParams: OffsetPagination = {
    limit: +req.params.limit,
    page: +req.params.page,
  };
  const habits = await service.find(userId, paginationParams);

  res.json({
    statusCode: HttpStatusCode.Ok,
    message: `successful`,
    data: { habits },
  });
  return;
}
async function create(
  req: AuthenticatedRequest,
  res: Response,
  service: HabitService
): Promise<void> {
  const userId = req.user.sub!;
  const body = req.body as CreateHabit;
  const habit = await service.create({ ...body, userId });
  res.json({
    statusCode: HttpStatusCode.Created,
    message: `habit created`,
    data: { habit },
  });
  return;
}

async function update(
  req: AuthenticatedRequest,
  res: Response,
  service: HabitService
): Promise<void> {
  try {
    const userId = req.user.sub!;
    const body = req.body as UpdateHabit;
    const habitId = req.params.id;
    const updatedHabit = await service.update(habitId, body, userId);
    res.json({
      statusCode: HttpStatusCode.Ok,
      message: `updated successful`,
      data: { updatedHabit },
    });
    return;
  } catch (e) {
    if (e instanceof HabitNotFoundError) {
      const statusCode = HttpStatusCode.NotFound;
      res.status(statusCode).json({
        statusCode,
        message: 'habit not found',
        data: null,
      });
      return;
    }
    throw e;
  }
}

async function deleteById(
  req: AuthenticatedRequest,
  res: Response,
  service: HabitService
): Promise<void> {
  try {
    const userId = req.user.sub!;
    const habitId = req.params.id;
    const deletedHabit = await service.deleteById(habitId, userId);
    res.json({
      statusCode: HttpStatusCode.Ok,
      message: `deleted habit # ${habitId}`,
      data: {
        deletedHabit,
      },
    });
    return;
  } catch (e) {
    if (e instanceof HabitNotFoundError) {
      const statusCode = HttpStatusCode.NotFound;
      res.status(statusCode).json({
        statusCode,
        message: 'habit not found',
        data: null,
      });
      return;
    }
    throw e;
  }
}

export function createHabitController(
  habitService: HabitService
): HabitController {
  return {
    find(req: Request, res: Response) {
      return find(req, res, habitService);
    },
    findById(req: Request, res: Response) {
      return findById(req, res, habitService);
    },
    create(req: Request, res: Response) {
      return create(req, res, habitService);
    },
    update(req: Request, res: Response) {
      return update(req, res, habitService);
    },
    deleteById(req: Request, res: Response) {
      return deleteById(req, res, habitService);
    },
  };
}

export const habitController = createHabitController(habitService);

export default habitController;
