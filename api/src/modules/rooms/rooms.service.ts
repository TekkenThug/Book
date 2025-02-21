import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatMessage, Room } from './rooms.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '@/modules/events/event.entity';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private repository: Repository<Room>,
    private userService: UsersService,
  ) {}

  async create(event: Event) {
    const room = new Room();

    room.event = event;

    await this.repository.save(room);
  }

  async getById(id: number, user_id: number) {
    return await this.repository.findOneBy({
      event_id: id,
      event: { records: { user_id } },
    });
  }

  async addMessageToChat(
    room_id: number,
    user_id: number,
    message: ChatMessage,
  ) {
    const room = await this.getById(room_id, user_id);

    if (!room) {
      throw new NotFoundException();
    }

    room.chat_log = [...room.chat_log, message];

    this.repository.save(room);
  }

  async serializeMessage(user_id: number, message: string) {
    const user = await this.userService.getById(user_id);

    if (!user) {
      throw new NotFoundException();
    }

    return {
      id: uuid(),
      fullname: `${user.last_name} ${user.first_name}`,
      datetime: new Date().toISOString(),
      text: message,
    };
  }
}
