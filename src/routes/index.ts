import { Hono } from 'hono';
import posts from './posts/posts.controller';
import type { AppEnv } from '../types/app-context';

const routes = new Hono<AppEnv>();

routes.get('/health', (c) => {
  return c.text('ok');
});

routes.route('/posts', posts);

export default routes;
