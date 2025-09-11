import { Hono, type MiddlewareHandler } from 'hono';
import { createMiddleware } from 'hono/factory';

import type { AppEnv } from '@/types/app-context';
import { onError } from '@/middlewares/on-error';
import { notFound } from '@/middlewares/not-found';

import { cors } from 'hono/cors';
import { logger } from '@/middlewares/logger';
import env from './env';

export const createApp = () => {
  const app = new Hono<AppEnv>();

  app.onError(onError);
  app.notFound(notFound);

  app.use('*', logger());
  app.use(
    '*',
    cors({
      origin: [
        env.WEBSITE_URL,
        'http://localhost:3000',
        'http://localhost:3001',
      ],
      allowHeaders: [
        'Content-Type',
        'Authorization',
        'Cookie',
        'Set-Cookie',
        'x-turnstile-token',
      ],
      allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
      exposeHeaders: ['Content-Length', 'Set-Cookie'],
      maxAge: 600,
      credentials: true,
    })
  );

  return app;
};

export const createAppRouter = () => {
  const router = new Hono<AppEnv>();
  return router;
};

export const createAppMiddleware = (middleware: MiddlewareHandler<AppEnv>) => {
  return createMiddleware<AppEnv>(middleware);
};
