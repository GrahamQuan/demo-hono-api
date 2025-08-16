import { z } from 'zod';

export const postParamSchema = z.object({ id: z.string() });

export const postBodySchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});
