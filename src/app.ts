import { createApp } from '@/lib/create-app';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { withDatabase } from '@/middlewares/with-db';
import routes from '@/routes';

const app = createApp();

app.use('*', logger());
app.use('*', cors());
app.use('*', withDatabase);

app.route('/api', routes);

export default app;
