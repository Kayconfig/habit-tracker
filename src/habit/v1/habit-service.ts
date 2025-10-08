import { HabitNotFoundError } from '../error/habit-not-found.error.ts';
import { habitRepository } from './habit-repository.ts';
import type { HabitRepository } from './interfaces/habit-repository.interface.ts';
import type { HabitService } from './interfaces/habit-service.interface.ts';

function createHabitService(repository: HabitRepository): HabitService {
  return {
    async create(newHabit) {
      return await repository.create(newHabit);
    },
    async find(userId, paginationParams) {
      return await repository.find(userId, paginationParams);
    },
    async findById(id, userId) {
      const habit = await repository.findById(id, userId);
      if (!habit) {
        throw HabitNotFoundError.create(id, userId);
      }
      return habit;
    },
    async update(id, updateHabit, userId) {
      const habit = await repository.update(id, updateHabit, userId);
      if (!habit) {
        throw HabitNotFoundError.create(id, userId);
      }
      return habit;
    },
    async deleteById(id, userId) {
      const deletedHabit = await repository.deleteById(id, userId);
      if (!deletedHabit) {
        throw HabitNotFoundError.create(id, userId);
      }
      return deletedHabit;
    },
  };
}

export const habitService = createHabitService(habitRepository);
