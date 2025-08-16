import type { AppContext } from '../../types/app-context';
import { postBodySchema } from './posts.schema';
import { z } from 'zod';

const PostSchema = postBodySchema.extend({
  id: z.string(),
});

const posts: z.infer<typeof PostSchema>[] = [
  {
    id: '1',
    title: 'title 1',
    content: 'content 1',
  },
  {
    id: '2',
    title: 'title 2',
    content: 'content 2',
  },
];

export const getAllPosts = async (): Promise<z.infer<typeof PostSchema>[]> => {
  return posts;
};

export const getPostById = async (
  c: AppContext,
  id: string
): Promise<z.infer<typeof PostSchema>> => {
  const db = c.get('db');
  console.log(db);

  const post = posts.find((post) => post.id === id);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

export const createPost = async (
  post: z.infer<typeof postBodySchema>
): Promise<z.infer<typeof PostSchema>> => {
  const newPost = {
    id: '1',
    ...post,
  };
  posts.push(newPost);
  return newPost;
};

export const updatePost = async (
  id: string,
  post: z.infer<typeof postBodySchema>
): Promise<z.infer<typeof PostSchema>> => {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    throw new Error('Post not found');
  }
  posts[index] = {
    ...posts[index],
    ...post,
  };
  return posts[index];
};

export const deletePost = async (id: string): Promise<void> => {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    throw new Error('Post not found');
  }
  posts.splice(index, 1);
};
