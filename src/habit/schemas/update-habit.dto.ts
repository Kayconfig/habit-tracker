import { boolean, object, type infer as ZodInfer } from 'zod';
export const updateHabitSchema = object({
  isActive: boolean().optional(),
});

export type UpdateHabit = ZodInfer<typeof updateHabitSchema>;
