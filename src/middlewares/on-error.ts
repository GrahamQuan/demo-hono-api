import { HTTP_STATUS_CODE } from '@/constants/http-code';
import type { ErrorHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

export const onError: ErrorHandler = (err, c) => {
  const currentStatus =
    'status' in err ? err.status : c.newResponse(null).status;
  const statusCode =
    currentStatus !== HTTP_STATUS_CODE.OK
      ? (currentStatus as ContentfulStatusCode)
      : HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
  // eslint-disable-next-line node/prefer-global/process
  const env = c.env?.NODE_ENV || process.env?.NODE_ENV;
  return c.json(
    {
      message: err.message,

      stack: env === 'production' ? undefined : err.stack,
    },
    statusCode
  );
};
