import { auth } from '@/auth';
import { createAppRouter } from '@/lib/create-app';

const authRouter = createAppRouter();

authRouter.on(
  ['POST', 'GET'],
  '/**',
  async (c) => await auth.handler(c.req.raw)
);

export default authRouter;
