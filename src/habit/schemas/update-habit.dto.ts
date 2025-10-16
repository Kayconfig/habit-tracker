import {
  array,
  boolean,
  object,
  union,
  uuid,
  uuidv4,
  uuidv6,
  uuidv7,
  type infer as ZodInfer,
} from 'zod';
export const updateHabitSchema = object({
  isActive: boolean().optional(),
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

export type UpdateHabit = ZodInfer<typeof updateHabitSchema>;
