import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export default (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.getOrThrow('DB_HOST'),
    port: +configService.getOrThrow('DB_PORT'),
    database: configService.getOrThrow('DB_NAME'),
    username: configService.getOrThrow('DB_USER'),
    password: configService.getOrThrow('DB_PASSWORD'),
    autoLoadEntities: true,
    synchronize: true,
  };
};
