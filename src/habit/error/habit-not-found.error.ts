export class HabitNotFoundError extends Error {
  constructor(id: string, userId: string) {
    super(`Habit #: ${id} not found for user #: ${userId}`);
  }

  static create(id: string, userId: string): HabitNotFoundError {
    return new HabitNotFoundError(id, userId);
  }
}
