import posts from './posts/posts.controller';
import { createRouter } from '@/lib/create-app';

const routes = createRouter();

routes.get('/health', (c) => {
  return c.text('ok');
});

routes.route('/posts', posts);

export default routes;
