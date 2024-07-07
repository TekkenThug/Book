import { AppDataSource } from "@/database";
import { Event } from "@/database/entity/Event";

interface CreatePayload {
  userId: number;
  title: string;
  date: string;
  bookId: number;
  duration: string;
}

interface FilterOptions {
  book?: string | null;
  withChecked?: boolean;
  userId?: number;
}

interface EventWithChecked extends Event {
  checked: boolean;
}
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

  public static async getEventsOfUser(userId: number): Promise<(Omit<Event, "author"> & { role: "owner" | "member" })[]> {
    const response = await EventService.repository
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.book", "books")
      .leftJoin("event.author", "author")
      .where("event.authorId = :userId", { userId })
      .getMany();

    return response.map((item) => ({ ...item, role: "owner" }));
  }
}
