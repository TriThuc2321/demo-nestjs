import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IGetS3PresignedPayload } from '@/type/s3.type';

@Injectable()
export class AwsS3Service {
  private s3Client;

  private bucket;

  private signedUrlExpireSeconds = 60 * 5; // 5 minutes

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') ?? '',
        secretAccessKey:
          this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ?? '',
      },
    });

    this.bucket = this.configService.get<string>('AWS_BUCKET');
  }

  async getS3PresignedUrl({ fileName, privatePath }: IGetS3PresignedPayload) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: privatePath ? `${privatePath}/${fileName}` : fileName,
    });

    return getSignedUrl(this.s3Client, command, {
      expiresIn: this.signedUrlExpireSeconds,
    });
  }
}
