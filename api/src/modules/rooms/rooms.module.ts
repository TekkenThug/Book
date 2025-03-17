import { Module } from '@nestjs/common';
import { RoomsGateway } from './rooms.gateway';
import { Room } from './rooms.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TokenModule } from '@/modules/tokens/token.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), TokenModule, UsersModule],
  providers: [RoomsGateway, RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
