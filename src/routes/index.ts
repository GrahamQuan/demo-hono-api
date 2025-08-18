import auth from '@/routes/auth';
import posts from '@/routes/posts/posts.controller';
import { createAppRouter } from '@/lib/create-app';

const routes = createAppRouter();

routes.get('/health', (c) => {
  return c.text('ok');
});

routes.route('/auth', auth);
routes.route('/posts', posts);

export default routes;
