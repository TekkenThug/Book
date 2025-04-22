import { Module } from '@nestjs/common';
import { validate } from './config/common.config';
import databaseConfig from './config/database.config';
import { BooksModule } from '@/modules/books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from '@/modules/events/events.module';
import { UsersModule } from '@/modules/users/users.module';
import { RecordsModule } from '@/modules/records/records.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { MailModule } from '@/modules/mail/mail.module';
import { StorageModule } from './modules/storage/storage.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),
    RoomsModule,
    BooksModule,
    EventsModule,
    UsersModule,
    RecordsModule,
    AuthModule,
    MailModule,
    StorageModule,
  ],
})
export class AppModule {}
