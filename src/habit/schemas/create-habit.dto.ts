import { number, object, string, type infer as ZodInfer } from 'zod';

export const createHabitSchema = object({
  name: string().nonempty(),
  frequency: string().nonempty(),
  description: string().optional().default(''),
  targetCount: number().optional(),
});

export type CreateHabit = ZodInfer<typeof createHabitSchema>;
