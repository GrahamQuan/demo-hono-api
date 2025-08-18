import { HTTP_STATUS_CODE } from '@/constants/http-status-code';
import { auth } from '@/lib/auth';
import { createAppMiddleware } from '@/lib/create-app';
import { tryCatch } from '@/lib/promise-utils';

export const authenticate = createAppMiddleware(async (c, next) => {
  const [err, sessionObject] = await tryCatch(
    auth.api.getSession({
      headers: c.req.raw.headers,
    })
  );

  if (err) {
    return c.json(
      { error: 'Internal server error' },
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    );
  }

  if (!sessionObject) {
    return c.json({ error: 'Unauthorized' }, HTTP_STATUS_CODE.UNAUTHORIZED);
  }

  c.set('session', sessionObject);

  await next();
});
