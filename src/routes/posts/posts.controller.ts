import { zValidator } from '@hono/zod-validator';
import { postParamSchema, postBodySchema } from './posts.schema';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from './posts.service';
import { createRouter } from '@/lib/create-app';

const postsRouter = createRouter();

postsRouter.get('/', async (c) => {
  const allPosts = await getAllPosts(c);

  return c.json({ message: 'Get all posts', data: allPosts });
});

postsRouter.get('/:id', zValidator('param', postParamSchema), async (c) => {
  const id = c.req.param('id');
  const post = await getPostById(c, id);
  return c.json({ message: `Get post ${id}`, data: post });
});

postsRouter.post('/', zValidator('json', postBodySchema), async (c) => {
  const body = await c.req.json();
  const newPost = await createPost(c, body);
  return c.json({ message: 'Create post', data: newPost });
});

postsRouter.put('/:id', zValidator('param', postParamSchema), async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const updatedPost = await updatePost(c, id, body);
  return c.json({ message: `Update post ${id}`, data: updatedPost });
});

postsRouter.delete('/:id', zValidator('param', postParamSchema), async (c) => {
  const id = c.req.param('id');
  await deletePost(c, id);
  return c.json({ message: `Delete post ${id}` });
});

export default postsRouter;
