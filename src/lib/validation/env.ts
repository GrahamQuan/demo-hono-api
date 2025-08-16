import { z, ZodError } from 'zod';
import type { AppContext } from '@/types/app-context';
import { env } from 'hono/adapter';

export const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  ENVIRONMENT: z.enum(['development', 'production']),
});

export const validateEnv = async (c: AppContext): Promise<void> => {
  try {
    const envObject = env(c);
    envSchema.parse(envObject);
  } catch (error) {
    if (error instanceof ZodError) {
      let message = 'Missing required values in .env:\n';
      error.issues.forEach((issue) => {
        message = `${String(issue.path[0])}: ${issue.message}\n`;
      });
      const e = new Error(message);
      e.stack = '';
      throw e;
    } else {
      console.error(error);
    }
  }
};
