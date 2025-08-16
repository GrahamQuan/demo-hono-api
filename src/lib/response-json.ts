import type { AppContext } from '../types/app-context';

export const responseJson = <T extends any>(
  c: AppContext,
  { msg, data }: { msg: string; data: T }
) => {
  return c.json({
    status: c.status,
    message: msg,
    data,
  });
};
