import { auth } from '@/lib/auth';
import { createAppMiddleware } from '@/lib/create-app';
import { tryCatch } from '@/lib/promise-utils';

export const withAuth = createAppMiddleware(async (c, next) => {
  const [err, sessionObject] = await tryCatch(
    auth.api.getSession({
      headers: c.req.raw.headers,
    })
  );

  if (err) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  if (!sessionObject) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  c.set('session', sessionObject);

  await next();
});
