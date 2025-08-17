import { posts } from '@/db/schema';
import { connectDb } from '@/db';
import { seed } from 'drizzle-seed';

export const seedPosts = async () => {
  const db = await connectDb();
  await seed(db, { posts }, { count: 10 }).refine((f) => ({
    posts: {
      columns: {
        id: f.uuid(),
        title: f.loremIpsum({ sentencesCount: 3 }),
        content: f.loremIpsum({ sentencesCount: 5 }),
        createdAt: f.date(),
        updatedAt: f.date(),
      },
    },
  }));
};
