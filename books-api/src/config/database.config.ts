import { Injectable } from '@nestjs/common';
import { EnvService } from '../env/env.service';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private envService: EnvService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.envService.get('DB_HOST'),
      port: +this.envService.get('DB_PORT'),
      database: this.envService.get('DB_NAME'),
      username: this.envService.get('DB_USER'),
      password: this.envService.get('DB_PASSWORD'),
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
