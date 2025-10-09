import {
  array,
  number,
  object,
  string,
  union,
  uuid,
  uuidv4,
  uuidv6,
  uuidv7,
  type infer as ZodInfer,
} from 'zod';

export const createHabitSchema = object({
  name: string().nonempty(),
  frequency: string().nonempty(),
  description: string().optional().default(''),
  targetCount: number().optional(),
  tagsId: array(union([uuid(), uuidv4(), uuidv6(), uuidv7()])).optional(),
});

export type CreateHabit = ZodInfer<typeof createHabitSchema>;
