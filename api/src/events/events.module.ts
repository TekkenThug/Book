import { forwardRef, Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module';
import { RecordsModule } from '../records/records.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    BooksModule,
    UsersModule,
    forwardRef(() => RecordsModule),
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
