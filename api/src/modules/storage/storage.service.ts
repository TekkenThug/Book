import { Client } from 'minio';
import crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { EnvService } from '@/env/env.service';
import { Destination } from '@/modules/storage/storage.types';

@Injectable()
export class StorageService {
  private minioClient: Client;
  private readonly bucketName = this.envService.get('S3_BUCKET');

  constructor(private envService: EnvService) {
    this.minioClient = new Client({
      endPoint: envService.get('S3_HOST'),
      port: envService.get('S3_PORT'),
      useSSL: false,
      accessKey: envService.get('S3_ACCESS_KEY'),
      secretKey: envService.get('S3_SECRET_KEY'),
    });

    this.checkBucketExisting();
  }

  private async checkBucketExisting() {
    const isExist = await this.minioClient.bucketExists(this.bucketName);

    if (!isExist) {
      await this.minioClient.makeBucket(this.bucketName);
    }
  }

  private createFileTitle(file: Express.Multer.File) {
    const hashedName = crypto
      .createHash('md5')
      .update(Date.now().toString())
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );

    return `${hashedName}.${ext}`;
  }

  private createFilePath(file: Express.Multer.File, destination: Destination) {
    return `${destination}/${this.createFileTitle(file)}`;
  }

  private getLinkToFile(filename: string) {
    return `${this.envService.get('S3_EXTERNAL_URL')}:${this.envService.get('S3_PORT')}/${this.bucketName}/${filename}`;
  }

  async putFile(file: Express.Multer.File, destination: Destination) {
    const filepath = this.createFilePath(file, destination);

    await this.minioClient.putObject(this.bucketName, filepath, file.buffer);

    return this.getLinkToFile(filepath);
  }
}
