import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import env from '@/lib/env';
import * as schema from '@/db/schema';

export const connectDb = async () => {
  const sql = neon(env.DATABASE_URL);

  const db = drizzle({ client: sql, schema });

  return db;
};

export type Database = Awaited<ReturnType<typeof connectDb>>;
