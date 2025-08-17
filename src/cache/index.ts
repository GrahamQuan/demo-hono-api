import env from '@/lib/env';
import { Redis } from 'ioredis';

const redis = new Redis(env.CACHE_URL);

const cache = redis;

export { cache };
