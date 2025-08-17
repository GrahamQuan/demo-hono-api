import type { PostBodySchema } from './posts.schema';
import { z } from 'zod';
import { posts } from '@/db/schema';
import { eq, isNull } from 'drizzle-orm';
import { db } from '@/db';

export const getAllPosts = async (): Promise<z.infer<typeof posts>[]> => {
  const result = await db.select().from(posts).where(isNull(posts.archivedAt));

  return result;
};

export const getPostById = async (
  id: string
): Promise<z.infer<typeof posts>> => {
  const result = await db.select().from(posts).where(eq(posts.id, id));

  if (result.length === 0) {
    throw new Error('Post not found');
  }

  return result[0];
};

export const createPost = async (
  post: PostBodySchema
): Promise<z.infer<typeof posts>> => {
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
  id: string,
  post: PostBodySchema
): Promise<z.infer<typeof posts>> => {
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

export const deletePost = async (id: string): Promise<void> => {
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
