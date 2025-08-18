import { HTTP_STATUS_CODE } from '@/constants/http-code.js';
import type { NotFoundHandler } from 'hono';

export const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `Not Found - ${c.req.path}`,
    },
    HTTP_STATUS_CODE.NOT_FOUND
  );
};
