import { zValidator } from '@hono/zod-validator';
import {
  postParamSchema,
  postBodySchema,
  PostBodySchema,
} from './posts.schema';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from './posts.service';
import { createRouter } from '@/lib/create-app';
import { withAuth } from '@/middlewares/with-auth';

const postsRouter = createRouter();

postsRouter.get('/', async (c) => {
  const allPosts = await getAllPosts();

  return c.json({ message: 'Get all posts', data: allPosts });
});

postsRouter.get('/:id', zValidator('param', postParamSchema), async (c) => {
  const id = c.req.param('id');
  const post = await getPostById(id);
  return c.json({ message: `Get post ${id}`, data: post });
});

postsRouter.post(
  '/',
  withAuth,
  zValidator('json', postBodySchema),
  async (c) => {
    const body = await c.req.json<PostBodySchema>();
    const newPost = await createPost(body);
    return c.json({ message: 'Create post', data: newPost });
  }
);

postsRouter.put(
  '/:id',
  withAuth,
  zValidator('param', postParamSchema),
  zValidator('json', postBodySchema),
  async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json<PostBodySchema>();
    const updatedPost = await updatePost(id, body);
    return c.json({ message: `Update post ${id}`, data: updatedPost });
  }
);

postsRouter.delete(
  '/:id',
  withAuth,
  zValidator('param', postParamSchema),
  async (c) => {
    const id = c.req.param('id');
    await deletePost(id);
    return c.json({ message: `Delete post ${id}` });
  }
);

export default postsRouter;
