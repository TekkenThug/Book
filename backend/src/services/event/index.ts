import { AppDataSource } from "@/database";
import { Event } from "@/database/entity/Event";
import type { CreatePayload, FilterOptions, EventWithChecked, EventWithRole } from "./types";

export default class EventService {
  private static readonly repository = AppDataSource.getRepository(Event);

  public static async createEvent(payload: CreatePayload) {
    console.log(payload);
    // return await EventService.repository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Event)
    //   .values({
    //     title: payload.title,
    //     date: payload.date,
    //     author: payload.userId,
    //     duration: payload.duration,
    //     book: payload.bookId,
    //     members_count: 0,
    //   })
    //   .execute();
  }

  public static async get(options?: FilterOptions): Promise<(Event | EventWithChecked)[]> {
    const query = EventService.repository.createQueryBuilder("event").leftJoinAndSelect("event.book", "books");

    if (options) {
      if (options.book) {
        query.where("LOWER(books.title) LIKE LOWER(:q)", { q: `%${options.book}%` });
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

  public static async getById(id: number) {
    return await EventService.repository.findOneBy({ id });
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
