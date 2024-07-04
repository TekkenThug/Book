import { AppDataSource } from "@/database";
import { Book } from "@/database/entity/Book";

export default class BookService {
  private static readonly repository = AppDataSource.getRepository(Book);

  public static async get(searchQuery?: string) {
    if (searchQuery) {
      return await BookService.repository
        .createQueryBuilder("book")
        .where("LOWER(book.title) LIKE LOWER(:q)", { q: `%${searchQuery}%` })
        .getMany();
    }

    return await BookService.repository.find();
  }
}
