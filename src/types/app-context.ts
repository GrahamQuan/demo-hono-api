import type { Context } from 'hono';
// import type { Database } from '@/db';
import { EnvSchema } from '@/lib/env';
import type { Session, User } from 'better-auth';

export type AppEnv = {
  Variables: {
    // db: Database;
    session: {
      session: Session;
      user: User;
    };
  };
  Bindings: {} & EnvSchema;
};

export type AppContext = Context<AppEnv>;
