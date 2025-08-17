import auth from '@/routes/auth';
import posts from '@/routes/posts/posts.controller';
import { createRouter } from '@/lib/create-app';

const routes = createRouter();

routes.get('/health', (c) => {
  return c.text('ok');
});

routes.route('/auth', auth);
routes.route('/posts', posts);

export default routes;
