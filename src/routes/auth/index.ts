import { auth } from '@/lib/auth';
import { createAppRouter } from '@/lib/create-app';

const authRouter = createAppRouter();

authRouter.on(['POST', 'GET'], '/**', (c) => auth.handler(c.req.raw));

export default authRouter;
