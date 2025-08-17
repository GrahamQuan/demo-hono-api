// import { db } from '@/db';
import { createMiddleware } from 'hono/factory';
import type { AppEnv } from '@/types/app-context';

export const withDatabase = createMiddleware<AppEnv>(async (c, next) => {
  // c.set('db', db);

  await next();
});
