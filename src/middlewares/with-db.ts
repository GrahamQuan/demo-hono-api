import { connectDb } from '@/db/connect-db';
import { createMiddleware } from 'hono/factory';
import type { AppEnv } from '@/types/app-context';

export const withDatabase = createMiddleware<AppEnv>(async (c, next) => {
  // Connect to database
  const db = await connectDb(c);

  // add db to context
  c.set('db', db);

  await next();
});
