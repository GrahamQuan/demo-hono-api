import type { Context } from 'hono';
import type { Database } from '@/db/connect-db';
import { EnvSchema } from '@/lib/env';

export type AppEnv = {
  Variables: {
    db: Database;
    session: string;
  };
  Bindings: {} & EnvSchema;
};

export type AppContext = Context<AppEnv>;
