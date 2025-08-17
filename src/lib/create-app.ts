import { Hono, type MiddlewareHandler } from 'hono';
import { createMiddleware } from 'hono/factory';

import type { AppEnv } from '@/types/app-context';

export const createApp = () => {
  const app = new Hono<AppEnv>();
  return app;
};

export const createRouter = () => {
  const router = new Hono<AppEnv>();
  return router;
};

export const createAppMiddleware = (middleware: MiddlewareHandler<AppEnv>) => {
  return createMiddleware<AppEnv>(middleware);
};
