import env from '@/lib/env';
import { S3Client } from '@aws-sdk/client-s3';

const BucketClient = new S3Client({
  region: env.BUCKET_REGION,
  endpoint: env.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: env.BUCKET_ACCESS_KEY_ID,
    secretAccessKey: env.BUCKET_SECRET_ACCESS_KEY,
  },
});

export default BucketClient;
