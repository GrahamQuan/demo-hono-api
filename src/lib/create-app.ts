import { Hono, type MiddlewareHandler } from 'hono';
import { createMiddleware } from 'hono/factory';

import type { AppEnv } from '@/types/app-context';
import { onError } from '@/middlewares/on-error';
import { notFound } from '@/middlewares/not-found';

import { cors } from 'hono/cors';
import { logger } from '@/middlewares/logger';

export const createApp = () => {
  const app = new Hono<AppEnv>();

  app.onError(onError);
  app.notFound(notFound);

  app.use('*', logger());
  app.use('*', cors());

  return app;
};

export const createAppRouter = () => {
  const router = new Hono<AppEnv>();
  return router;
};

export const createAppMiddleware = (middleware: MiddlewareHandler<AppEnv>) => {
  return createMiddleware<AppEnv>(middleware);
};
