import { Client } from 'minio';
import crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { Destination } from '@/modules/storage/storage.types';
import { ConfigService } from '@nestjs/config';
import { Config } from '@/config/common.config';

@Injectable()
export class StorageService {
  private minioClient: Client;
  private readonly bucketName: string;

  constructor(private configService: ConfigService<Config>) {
    this.minioClient = new Client({
      endPoint: configService.getOrThrow('S3_HOST'),
      port: configService.getOrThrow('S3_PORT'),
      useSSL: false,
      accessKey: configService.getOrThrow('S3_ACCESS_KEY'),
      secretKey: configService.getOrThrow('S3_SECRET_KEY'),
    });

    this.bucketName = this.configService.getOrThrow('S3_BUCKET');

    void this.checkBucketExisting();
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
    return `${this.configService.getOrThrow('S3_EXTERNAL_URL')}:${this.configService.getOrThrow('S3_PORT')}/${this.bucketName}/${filename}`;
  }

  async putFile(file: Express.Multer.File, destination: Destination) {
    const filepath = this.createFilePath(file, destination);

    await this.minioClient.putObject(this.bucketName, filepath, file.buffer);

    return this.getLinkToFile(filepath);
  }
}
