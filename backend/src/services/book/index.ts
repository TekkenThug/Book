import { OpenLibraryResponse, SearchingBook } from "@/services/book/types";
import { AppDataSource } from "@/database";
import { Book } from "@/database/entity/Book";

export default class BookService {
  private static readonly repository = AppDataSource.getRepository(Book);

  public static async getFromAPI(titleQuery: string): Promise<SearchingBook[]> {
    if (!titleQuery) {
      return [];
    }

    const url = new URL("https://openlibrary.org/search.json");

    const limitation = 10;
    url.searchParams.append("title", titleQuery);
    url.searchParams.append("limit", `${limitation}`);
    url.searchParams.append("fields", "author_name,title,key");

    const data: OpenLibraryResponse = await fetch(url).then((res) => res.json());

    return data.docs.map((item) => ({ id: item.key.replace("/works/", ""), author: item.author_name, title: item.title }));
  }
}
