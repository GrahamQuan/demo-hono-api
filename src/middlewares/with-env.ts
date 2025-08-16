import { createMiddleware } from 'hono/factory';
import type { AppEnv } from '@/types/app-context';

import { validateEnv } from '@/lib/validation/env';

export const withEnv = createMiddleware<AppEnv>(async (c, next) => {
  await validateEnv(c);

  return await next();
});
