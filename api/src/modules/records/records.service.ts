import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';
import { EventsService } from '@/modules/events/events.service';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
    @Inject(forwardRef(() => EventsService))
    private eventsService: EventsService,
  ) {}

  public async createRecordToEvent(user_id: number, event_id: number) {
    const existedRecord = await this.recordsRepository.findOneBy({
      user_id,
      event_id,
    });

    if (existedRecord) {
      throw new BadRequestException('Record already exists');
    }

    const event = await this.eventsService.getFutureEventById(event_id);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    await this.recordsRepository
      .createQueryBuilder()
      .insert()
      .values({ user: { id: user_id }, event: { id: event_id } })
      .execute();

    await this.eventsService.increaseMemberCount(event);
  }

  public async getRecords(user_id: number, params: { event_id?: number }) {
    return await this.recordsRepository.findBy({
      user_id,
      event_id: params?.event_id,
    });
  }
}
