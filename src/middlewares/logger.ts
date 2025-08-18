import { pinoLogger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

import env from '@/lib/env';
import type { MiddlewareHandler } from 'hono';

export const logger = (): MiddlewareHandler => {
  return pinoLogger({
    pino: pino(
      {
        // level: env.LOG_LEVEL || 'info',
        level: 'info',
      },
      env.NODE_ENV === 'production' ? undefined : pretty()
    ),
  });
};
