import type { Habit, NewHabit } from '../../../db/schema.ts';
import type { OffsetPagination } from '../../../interfaces/pagination/pagination.interface.ts';
import type { UpdateHabit } from '../../schemas/update-habit.dto.ts';

export interface HabitService {
  create(newHabit: NewHabit): Promise<Habit>;
  update(id: string, updateHabit: UpdateHabit, userId: string);
  findById(id: string, userId: string): Promise<Habit>;
  find(userId: string, paginationParams: OffsetPagination): Promise<Habit[]>;
  deleteById(id: string, userId: string): Promise<Habit>;
}
