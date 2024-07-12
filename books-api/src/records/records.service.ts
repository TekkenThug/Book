import {
  BadRequestException, forwardRef, Inject,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';
import { EventsService } from "../events/events.service";

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
    @Inject(forwardRef(() => EventsService))
    private eventsService: EventsService
  ) {}

  public async createRecordToEvent(userId: number, eventId: number) {
    const existedRecord = await this.recordsRepository.findOneBy({
      user_id: userId,
      event_id: eventId,
    });

    if (existedRecord) {
      throw new BadRequestException('Record already exists');
    }

    const event = await this.eventsService.getFutureEventById(eventId);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    await this.recordsRepository
      .createQueryBuilder()
      .insert()
      .values({ user: { id: userId }, event: { id: eventId } })
      .execute();

    await this.eventsService.increaseMemberCount(event);
  }
}
