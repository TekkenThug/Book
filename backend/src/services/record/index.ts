import status from "statuses";
import { AppDataSource } from "@/database";
import { Record } from "@/database/entity/Record";
import { ApiError } from "@/utils/errors";
import EventService from "@/services/event";

export default class RecordService {
  private static readonly repository = AppDataSource.getRepository(Record);

  public static async createRecordToEvent(userId: number, eventId: number) {
    const existedRecord = await RecordService.repository.findOneBy({ user: { id: userId }, event: { id: eventId } });

    if (existedRecord) {
      throw new ApiError(status("Bad request"), "Record already exists");
    }

    const event = await EventService.getById(eventId);

    if (!event) {
      throw new ApiError(status("Not found"), "Event not found");
    }

    await RecordService.repository
      .createQueryBuilder()
      .insert()
      .values({ user: { id: userId }, event: { id: eventId } })
      .execute();

    await EventService.increaseMemberCount(event);
  }
}
