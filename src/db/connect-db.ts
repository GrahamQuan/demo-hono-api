import { drizzle } from 'drizzle-orm/neon-http';
import type { AppContext } from '@/types/app-context';
import { env } from 'hono/adapter';
import { neon } from '@neondatabase/serverless';

export const connectDb = async (c: AppContext) => {
  const envObject = env(c);

  const sql = neon(envObject.DATABASE_URL);

  const db = drizzle({ client: sql });

  return db;
};

export type Database = Awaited<ReturnType<typeof connectDb>>;
