import { and, eq } from 'drizzle-orm';
import { getDB } from '../../db/connnection.ts';
import { habits, type Habit, type NewHabit } from '../../db/schema.ts';
import type { OffsetPagination } from '../../interfaces/pagination/pagination.interface.ts';
import type { UpdateHabit } from '../schemas/update-habit.dto.ts';
import type { HabitRepository } from './interfaces/habit-repository.interface.ts';

const db = getDB();

async function find(
  userId: string,
  paginationParams: OffsetPagination
): Promise<Habit[]> {
  return await db.query.habits.findMany({
    where: eq(habits.userId, userId),
  });
}
async function create(newHabit: NewHabit): Promise<Habit> {
  const [createdHabit] = await db.insert(habits).values(newHabit).returning();
  return createdHabit;
}
async function update(
  id: string,
  updateHabit: UpdateHabit,
  userId: string
): Promise<Habit | null> {
  const [updatedHabit] = await db
    .update(habits)
    .set(updateHabit)
    .where(and(eq(habits.userId, userId), eq(habits.id, id)))
    .returning();
  return updatedHabit ?? null;
}
async function findById(id: string, userId: string): Promise<Habit | null> {
  const habit = await db.query.habits.findFirst({
    where: and(eq(habits.id, id), eq(habits.userId, userId)),
  });

  return habit ?? null;
}
async function deleteById(id: string, userId: string): Promise<Habit | null> {
  const [deletedHabit] = await db
    .delete(habits)
    .where(and(eq(habits.id, id), eq(habits.userId, userId)))
    .returning();

  return deletedHabit ?? null;
}

export const habitRepository: HabitRepository = {
  find,
  create,
  update,
  findById,
  deleteById,
};
