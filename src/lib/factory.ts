import type { AppEnv } from '@/types/app-context';
import { Hono, MiddlewareHandler } from 'hono';
import { createMiddleware } from 'hono/factory';

export const createAppRouter = () => {
  const router = new Hono<AppEnv>();
  return router;
};

export const createAppMiddleware = (middleware: MiddlewareHandler<AppEnv>) => {
  return createMiddleware<AppEnv>(middleware);
};
