import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

import { env } from '@/env';
import { FileStorage, UploadParams } from '@/app/storage/storage';

const client = new S3Client({
  region: 'auto',

  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,

  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

export class R2Storage implements FileStorage {
  async upload(data: UploadParams): Promise<string> {
    await new Upload({
      client,

      params: {
        Bucket: env.CLOUDFLARE_BUCKET_NAME,

        Key: data.fileName,

        Body: data.body,

        ContentType: data.contentType,
      },
    }).done();

    return `${env.CLOUDFLARE_PUBLIC_URL}/${data.fileName}`;
  }
}
