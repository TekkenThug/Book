import { forwardRef, Inject, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import omit from 'lodash.omit';
import { Event } from './event.entity';
import { MoreThan, Repository } from "typeorm";
import { CreateEventDto } from './events.dto';
import { BooksService } from '../books/books.service';
import { UsersService } from "../users/users.service";
import { RecordsService } from "../records/records.service";

export interface FilterOptions {
  book?: string | null;
  withChecked?: boolean;
  userId?: number;
  future?: boolean;
}

export interface EventWithChecked extends Event {
  checked: boolean;
}

export interface EventWithRole extends Omit<Event, 'author'> {
  role: 'owner' | 'member';
}

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    private booksService: BooksService,
    private usersService: UsersService,
    @Inject(forwardRef(() => RecordsService))
    private recordsService: RecordsService,
  ) {}

  public async get(
    options?: FilterOptions,
  ): Promise<(Event | EventWithChecked)[]> {
    const query = this.eventsRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.book', 'books');

    if (options) {
      if (options.book) {
        query.where('LOWER(books.title) LIKE LOWER(:q)', {
          q: `%${options.book}%`,
        });
      }

      if (options.future) {
        query[options.book ? 'andWhere' : 'where'](
          'event.date > :currentDatetime',
          {
            currentDatetime: new Date().toISOString(),
          },
        );
      }

      if (options.withChecked && options.userId) {
        query.leftJoinAndMapOne(
          'event.checked',
          'event.records',
          'record',
          'record.user_id = :userId',
          {
            userId: options.userId,
          },
        );

        const result = (await query.getMany()) as EventWithChecked[];

        return result.map((event) => ({ ...event, checked: !!event.checked }));
      }
    }

    return await query.getMany();
  }

  public async getEventsOfUser(userId: number): Promise<EventWithRole[]> {
    const response = await this.eventsRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.book', 'books')
      .leftJoin('event.records', 'records')
      .leftJoinAndSelect('event.author', 'author')
      .where('records.user_id = :userId', { userId })
      .getMany();

    return response.map((item) => {
      const { author, ...rest } = item;

      return { ...rest, role: author.id === userId ? 'owner' : 'member' };
    });
  }

  public async createEvent(userId: number, payload: CreateEventDto) {
    const user = await this.usersService.getById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    const limitationPerDay = 1;
    const existedEventsOnDate = await this.eventsRepository
      .createQueryBuilder('event')
      .where('event.authorId = :userId', { userId: user.id })
      .andWhere('DATE(event.date) = :date', { date: payload.datetime })
      .getMany();

    if (existedEventsOnDate.length >= limitationPerDay) {
      throw new NotAcceptableException('Too many events on this date');
    }

    const relatedBook = await this.booksService.createIfNotExist(payload.book_id)

    let event = new Event();
    event.title = payload.title;
    event.date = payload.datetime;
    event.author = user;
    event.book = relatedBook;
    event.duration = payload.duration;
    event = await this.eventsRepository.save(event);

    await this.recordsService.createRecordToEvent(user.id, event.id);

    const savedEvent = await this.eventsRepository.findOneBy({ id: event.id });

    if (savedEvent) {
      return omit(savedEvent, 'author', 'book');
    }
  }

  public async getFutureEventById(id: number) {
    return await this.eventsRepository.findOneBy({ id, date: MoreThan(new Date().toISOString()) });
  }

  public async increaseMemberCount(event: Event) {
    ++event.members_count;
    await this.eventsRepository.save(event);
  }
}
