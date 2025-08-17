import type { AppContext } from '../../types/app-context';
import { postBodySchema } from './posts.schema';
import { z } from 'zod';
import { posts } from '@/db/schema/posts';
import { eq } from 'drizzle-orm';

const PostSchema = postBodySchema.extend({
  id: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  archivedAt: z.date().nullable().optional(),
});

export const getAllPosts = async (
  c: AppContext
): Promise<z.infer<typeof PostSchema>[]> => {
  const db = c.get('db');

  const result = await db.select().from(posts);
  // .where(eq(posts.archivedAt, null));

  return result;
};

export const getPostById = async (
  c: AppContext,
  id: string
): Promise<z.infer<typeof PostSchema>> => {
  const db = c.get('db');

  const result = await db.select().from(posts).where(eq(posts.id, id));

  if (result.length === 0) {
    throw new Error('Post not found');
  }

  return result[0];
};

export const createPost = async (
  c: AppContext,
  post: z.infer<typeof postBodySchema>
): Promise<z.infer<typeof PostSchema>> => {
  const db = c.get('db');

  const result = await db
    .insert(posts)
    .values({
      title: post.title,
      content: post.content,
    })
    .returning();

  return result[0];
};

export const updatePost = async (
  c: AppContext,
  id: string,
  post: z.infer<typeof postBodySchema>
): Promise<z.infer<typeof PostSchema>> => {
  const db = c.get('db');

  const result = await db
    .update(posts)
    .set({
      title: post.title,
      content: post.content,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id))
    .returning();

  if (result.length === 0) {
    throw new Error('Post not found');
  }

  return result[0];
};

export const deletePost = async (c: AppContext, id: string): Promise<void> => {
  const db = c.get('db');

  const result = await db
    .update(posts)
    .set({
      archivedAt: new Date(),
    })
    .where(eq(posts.id, id))
    .returning();

  if (result.length === 0) {
    throw new Error('Post not found');
  }
};
