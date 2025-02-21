import { forwardRef, Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { BooksModule } from '@/modules/books/books.module';
import { UsersModule } from '@/modules/users/users.module';
import { RecordsModule } from '@/modules/records/records.module';
import { RoomsModule } from '@/modules/rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    BooksModule,
    UsersModule,
    RoomsModule,
    forwardRef(() => RecordsModule),
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
