import createPresignedUrl from '@/bucket/presigned-url';
import { createAppRouter } from '@/lib/factory';
import { zValidator } from '@hono/zod-validator';
import {
  BucketMultiPartsPresignedUrlCompleteSchema,
  bucketMultiPartsPresignedUrlCompleteSchema,
  FileSchema,
  fileSchema,
} from './bucket.schema';
import { createMultiPartsPresignedUrl } from '@/bucket/multi-parts-presigned-url';
import { completeMultiPartsPresignedUrl } from '@/bucket/multi-parts-presigned-url';
import { authenticate } from '@/middlewares/authenticate';
import { HTTP_STATUS_CODE } from '@/constants/http-status-code';

const bucketRouter = createAppRouter();

bucketRouter.post(
  '/presigned-url',
  zValidator('json', fileSchema),
  authenticate,
  async (c) => {
    try {
      const { mimeType } = await c.req.json<FileSchema>();
      const { publicUrl, presignedUrl } = await createPresignedUrl(mimeType);
      return c.json({ publicUrl, presignedUrl });
    } catch (error) {
      return c.json(
        { error: 'Failed to create presigned url' },
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }
  }
);

bucketRouter.post(
  '/multi-parts-presigned-url',
  zValidator('json', fileSchema),
  authenticate,
  async (c) => {
    try {
      const { mimeType, fileSize } = await c.req.json<FileSchema>();
      const { key, uploadId, presignedUrlList } =
        await createMultiPartsPresignedUrl({ mimeType, fileSize });
      return c.json({ key, uploadId, presignedUrlList });
    } catch (error) {
      return c.json(
        { error: 'Failed to create multi parts presigned url' },
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }
  }
);

bucketRouter.post(
  '/multi-parts-presigned-url/complete',
  zValidator('json', bucketMultiPartsPresignedUrlCompleteSchema),
  authenticate,
  async (c) => {
    try {
      const { key, uploadId, parts } =
        await c.req.json<BucketMultiPartsPresignedUrlCompleteSchema>();

      const publicUrl = await completeMultiPartsPresignedUrl({
        key,
        uploadId,
        parts,
      });

      return c.json({ publicUrl });
    } catch (error) {
      return c.json(
        { error: 'Failed to complete multipart upload' },
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }
  }
);

export default bucketRouter;
