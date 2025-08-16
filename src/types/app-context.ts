import type { Context } from 'hono';
import type { Database } from '@/db/connect-db';

export type AppEnv = {
  Variables: {
    db: Database;
    session: string;
  };
  Bindings: {
    DATABASE_URL: string;
    ENVIRONMENT: 'development' | 'production';
  };
};

export type AppContext = Context<AppEnv>;
