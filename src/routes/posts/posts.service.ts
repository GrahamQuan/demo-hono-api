import type { PostBodySchema } from './posts.schema';
import { z } from 'zod';
import { posts } from '@/db/schema';
import { eq, isNull, desc, asc } from 'drizzle-orm';
import { db } from '@/db';

export const getAllPosts = async ({
  pageNum = 0,
  pageSize = 10,
  orderDirection = 'latest',
}: {
  pageNum?: number;
  pageSize?: number;
  orderDirection?: 'oldest' | 'latest';
}): Promise<z.infer<typeof posts>[]> => {
  const result = await db
    .select()
    .from(posts)
    .where(isNull(posts.archivedAt))
    .limit(pageSize)
    .offset(pageNum * pageSize)
    .orderBy(
      orderDirection === 'latest' ? desc(posts.createdAt) : asc(posts.createdAt)
    );

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
