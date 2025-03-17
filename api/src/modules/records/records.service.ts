import {
  BadRequestException,
  ForbiddenException,
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

  public async deleteRecord(id: number, user_id: number) {
    const event = await this.eventsService.getById(id);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const record = await this.recordsRepository.findOneBy({
      user_id,
      event_id: id,
    });

    if (event.author === record?.user) {
      throw new ForbiddenException(
        'You can`t delete the record, because you are owner',
      );
    }

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    return await this.recordsRepository.remove(record);
  }
}
