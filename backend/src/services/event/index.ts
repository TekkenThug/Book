import status from "statuses";
import { MoreThan } from "typeorm";
import omit from "lodash.omit";
import { AppDataSource } from "@/database";
import { Event } from "@/database/entity/Event";
import type { CreatePayload, FilterOptions, EventWithChecked, EventWithRole } from "./types";
import RecordService from "@/services/record";
import { User } from "@/database/entity/User";
import { ApiError } from "@/utils/errors";
import BookService from "@/services/book";

export default class EventService {
  private static readonly repository = AppDataSource.getRepository(Event);

  public static async createEvent(user: User, payload: CreatePayload) {
    const limitationPerDay = 1;
    const existedEventsOnDate = await this.repository
      .createQueryBuilder("event")
      .where("event.authorId = :userId", { userId: user.id })
      .andWhere("DATE(event.date) = :date", { date: payload.datetime })
      .getMany();

    if (existedEventsOnDate.length >= limitationPerDay) {
      throw new ApiError(status("Not acceptable"), "Too many events on this date");
    }

    const relatedBook = await BookService.createIfNotExist(payload.bookId);

    let event = new Event();
    event.title = payload.title;
    event.date = payload.datetime;
    event.author = user;
    event.book = relatedBook;
    event.duration = payload.duration;
    event = await this.repository.save(event, {});

    await RecordService.createRecordToEvent(user.id, event.id);

    const savedEvent = await this.repository.findOneBy({ id: event.id });

    if (savedEvent) {
      return omit(savedEvent, "author", "book");
    }
  }

  public static async get(options?: FilterOptions): Promise<(Event | EventWithChecked)[]> {
    const query = EventService.repository.createQueryBuilder("event").leftJoinAndSelect("event.book", "books");

    if (options) {
      if (options.book) {
        query.where("LOWER(books.title) LIKE LOWER(:q)", { q: `%${options.book}%` });
      }

      if (options.future) {
        query[options.book ? "andWhere" : "where"]("event.date > :currentDatetime", {
          currentDatetime: new Date().toISOString(),
        });
      }

      if (options.withChecked && options.userId) {
        query.leftJoinAndMapOne("event.checked", "event.records", "record", "record.user_id = :userId", {
          userId: options.userId,
        });

        const result = (await query.getMany()) as EventWithChecked[];

        return result.map((event) => ({ ...event, checked: !!event.checked }));
      }
    }

    return await query.getMany();
  }

  public static async getFutureEventById(id: number) {
    return await this.repository.findOneBy({ id, date: MoreThan(new Date().toISOString()) });
  }

  public static async getEventsOfUser(userId: number): Promise<EventWithRole[]> {
    const response = await EventService.repository
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.book", "books")
      .leftJoin("event.records", "records")
      .leftJoinAndSelect("event.author", "author")
      .where("records.user_id = :userId", { userId })
      .getMany();

    return response.map((item) => {
      const { author, ...rest } = item;

      return { ...rest, role: author.id === userId ? "owner" : "member" };
    });
  }

  public static async increaseMemberCount(event: Event) {
    ++event.members_count;
    await EventService.repository.save(event);
  }
}
