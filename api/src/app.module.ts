import { Module } from '@nestjs/common';
import { validate } from './config/common.config';
import { DatabaseConfigService } from './config/database.config';
import { BooksModule } from '@/modules/books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from '@/modules/events/events.module';
import { UsersModule } from '@/modules/users/users.module';
import { RecordsModule } from '@/modules/records/records.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { EnvModule } from '@/env/env.module';
import { MailModule } from '@/modules/mail/mail.module';
import { StorageModule } from './modules/storage/storage.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      useClass: DatabaseConfigService,
    }),
    RoomsModule,
    BooksModule,
    EventsModule,
    UsersModule,
    RecordsModule,
    AuthModule,
    EnvModule,
    MailModule,
    StorageModule,
  ],
})
export class AppModule {}
