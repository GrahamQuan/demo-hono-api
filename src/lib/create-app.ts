import { Hono, type MiddlewareHandler } from 'hono';
import { createMiddleware } from 'hono/factory';

import type { AppEnv } from '@/types/app-context';
import { withEnv } from '@/middlewares/with-env';
import { withDatabase } from '@/middlewares/with-db';
import { cors } from 'hono/cors';
import routes from '@/routes';
import { logger } from 'hono/logger';

export const createApp = () => {
  const app = new Hono<AppEnv>();
  app.use('*', logger());
  app.use('*', cors());
  app.use('*', withEnv);
  app.use('*', withDatabase);

  app.route('/api', routes);

  return app;
};

export const createRouter = () => {
  const router = new Hono<AppEnv>();
  return router;
};

export const createAppMiddleware = (middleware: MiddlewareHandler<AppEnv>) => {
  return createMiddleware<AppEnv>(middleware);
};
