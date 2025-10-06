import z from 'zod';

export const idParamsSchema = z.object({
  id: z.union([z.uuidv4(), z.uuidv6(), z.uuidv7()], 'id must be valid uuid'),
});
