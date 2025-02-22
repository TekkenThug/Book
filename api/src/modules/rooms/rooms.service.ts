import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatMessage, Room } from './rooms.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '@/modules/events/event.entity';
import { UsersService } from '@/modules/users/users.service';
import pick from 'lodash.pick';

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

  async getById(
    id: number,
    user_id: number,
    with_participants: boolean = true,
  ) {
    const t = await this.repository.findOne({
      where: {
        event_id: id,
        event: { records: { user_id } },
      },
      relations: {
        participants: with_participants,
      },
    });

    console.log(t);
    return await this.repository.findOne({
      where: {
        event_id: id,
        event: { records: { user_id } },
      },
      relations: {
        participants: with_participants,
      },
    });
  }

  async addParticipantToRoom(id: number, user_id: number) {
    const room = await this.getById(id, user_id);

    if (!room) {
      throw new NotFoundException();
    }

    if (room.participants.find((user) => user.id === user_id)) {
      return;
    }

    const user = await this.userService.getById(user_id);

    if (!user) {
      throw new NotFoundException();
    }

    room.participants = [...room.participants, user];

    void this.repository.save(room);
  }

  async deleteParticipantFromRoom(id: number, user_id: number) {
    const room = await this.getById(id, user_id);

    if (!room) {
      throw new NotFoundException();
    }

    if (!room.participants.find((user) => user.id === user_id)) {
      return;
    }

    room.participants = room.participants.filter(({ id }) => id !== user_id);

    void this.repository.save(room);
  }

  async addMessageToChat(
    room_id: number,
    user_id: number,
    message: ChatMessage,
  ) {
    const room = await this.getById(room_id, user_id, false);

    if (!room) {
      throw new NotFoundException();
    }

    room.chat_log = [...room.chat_log, message];

    void this.repository.save(room);
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

  async getParticipants(room_id: number, user_id: number) {
    const room = await this.getById(room_id, user_id);

    if (!room) {
      throw new NotFoundException();
    }

    return room.participants.map((item) =>
      pick(item, ['avatar', 'first_name', 'last_name']),
    );
  }
}
