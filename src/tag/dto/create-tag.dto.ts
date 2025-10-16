import { object, string, type infer as zInfer } from 'zod';

export const createTagSchema = object({
  name: string(),
  color: string()
    .min(7, 'color should be hexadecimal format, e.g #7fefef')
    .max(7, 'color should be hexadecimal format, e.g #fefefe'),
});

export type CreateTag = zInfer<typeof createTagSchema>;
