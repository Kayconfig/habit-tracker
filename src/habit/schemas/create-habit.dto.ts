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
  tagsId: array(
    union(
      [uuid(), uuidv4(), uuidv6(), uuidv7()],
      'provided tagsId element must be uuid'
    )
  )
    .min(
      1,
      'tagsId when specified cannot be empty array, it should have at least one tagId'
    )
    .max(30, 'tagsId cannot exceed 30')
    .optional(),
});

export type CreateHabit = ZodInfer<typeof createHabitSchema>;
