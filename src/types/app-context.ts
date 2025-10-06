import type { Context } from 'hono';
import { EnvSchema } from '@/lib/env';
import type { Session, User } from 'better-auth';

export type Locale = 'en' | 'es';

export type AppEnv = {
  Variables: {
    session: {
      session: Session;
      user: User;
    };
    locale: Locale;
  };
  Bindings: {} & EnvSchema;
};

export type AppContext = Context<AppEnv>;
