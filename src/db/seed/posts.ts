import { posts } from '@/db/schema';
import { db } from '@/db';
import { seed } from 'drizzle-seed';
import { v7 as uuidv7 } from 'uuid';

export const seedPosts = async () => {
  await seed(db, { posts }, { count: 10 }).refine((f) => ({
    posts: {
      columns: {
        id: uuidv7() as any,
        title: f.loremIpsum({ sentencesCount: 3 }),
        content: f.loremIpsum({ sentencesCount: 5 }),
        createdAt: f.date(),
        updatedAt: f.date(),
      },
    },
  }));
};
