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
import { createAppRouter } from '@/lib/create-app';
import { authenticate } from '@/middlewares/authenticate';

const postsRouter = createAppRouter();

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
  zValidator('json', postBodySchema),
  authenticate,
  async (c) => {
    const body = await c.req.json<PostBodySchema>();
    const newPost = await createPost(body);
    return c.json({ message: 'Create post', data: newPost });
  }
);

postsRouter.put(
  '/:id',
  zValidator('param', postParamSchema),
  zValidator('json', postBodySchema),
  authenticate,
  async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json<PostBodySchema>();
    const updatedPost = await updatePost(id, body);
    return c.json({ message: `Update post ${id}`, data: updatedPost });
  }
);

postsRouter.delete(
  '/:id',
  zValidator('param', postParamSchema),
  authenticate,
  async (c) => {
    const id = c.req.param('id');
    await deletePost(id);
    return c.json({ message: `Delete post ${id}` });
  }
);

export default postsRouter;
