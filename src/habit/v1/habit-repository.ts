import { and, eq } from 'drizzle-orm';
import { getDB } from '../../db/connnection.ts';
import { habits, habitTags, type Habit } from '../../db/schema.ts';
import type { OffsetPagination } from '../../interfaces/pagination/pagination.interface.ts';
import type { UpdateHabit } from '../schemas/update-habit.dto.ts';
import type {
  CreateHabitInput,
  HabitRepository,
} from './interfaces/habit-repository.interface.ts';

const db = getDB();

async function find(
  userId: string,
  paginationParams: OffsetPagination
): Promise<Habit[]> {
  return await db.query.habits.findMany({
    where: eq(habits.userId, userId),
  });
}
async function create(newHabit: CreateHabitInput): Promise<Habit> {
  const createdHabit = await db.transaction(async (tx) => {
    const [createdHabit] = await tx
      .insert(habits)
      .values({
        frequency: newHabit.frequency,
        name: newHabit.name,
        userId: newHabit.userId,
        isActive: newHabit.isActive,
        targetCount: newHabit.targetCount,
      })
      .returning();

    if (newHabit.tagsId && newHabit.tagsId.length > 0) {
      const habitTagsValue = newHabit.tagsId.map((tagId) => ({
        tagId,
        habitId: createdHabit.id,
      }));
      await tx.insert(habitTags).values(habitTagsValue);
    }
    return createdHabit;
  });
  return createdHabit;
}
async function update(
  id: string,
  updateHabit: UpdateHabit,
  userId: string
): Promise<Habit | null> {
  const updatedHabit = await db.transaction(async (tx) => {
    const [updatedHabit] = await tx
      .update(habits)
      .set(updateHabit)
      .where(and(eq(habits.userId, userId), eq(habits.id, id)))
      .returning();

    if (updatedHabit && updateHabit.tagsId && updateHabit.tagsId.length > 0) {
      // delete previous habit tags
      await tx.delete(habitTags).where(eq(habitTags.habitId, updatedHabit.id));

      const habitTagsValue = updateHabit.tagsId.map((tagId) => ({
        tagId,
        habitId: updatedHabit.id,
      }));
      await tx.insert(habitTags).values(habitTagsValue);
    }

    return updatedHabit;
  });

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

export default habitRepository;
