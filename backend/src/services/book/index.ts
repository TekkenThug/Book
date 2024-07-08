import { OpenLibraryResponse, SearchingBook } from "@/services/book/types";
import { AppDataSource } from "@/database";
import { Book } from "@/database/entity/Book";

export default class BookService {
  private static readonly API_URL = "https://openlibrary.org/search.json";
  private static readonly repository = AppDataSource.getRepository(Book);

  private static mapResponseFromAPI(response: OpenLibraryResponse) {
    return response.docs.map((item) => ({ id: item.key.replace("/works/", ""), author: item.author_name, title: item.title }));
  }

  private static constructURLForAPI() {
    const url = new URL(this.API_URL);
    url.searchParams.append("fields", "author_name,title,key");

    return url;
  }

  public static async getFromAPI(titleQuery: string): Promise<SearchingBook[]> {
    if (!titleQuery) {
      return [];
    }

    const url = this.constructURLForAPI();

    const limitation = 10;
    url.searchParams.append("title", titleQuery);
    url.searchParams.append("limit", `${limitation}`);

    const data: OpenLibraryResponse = await fetch(url).then((res) => res.json());

    return this.mapResponseFromAPI(data);
  }

  private static async searchByIdFromAPI(id: string) {
    const url = this.constructURLForAPI();

    url.searchParams.append("limit", `${1}`);
    url.searchParams.append("q", id);

    const data: OpenLibraryResponse = await fetch(url).then((res) => res.json());

    return this.mapResponseFromAPI(data);
  }

  private static async getById(id: string) {
    return await BookService.repository.findOneBy({ id });
  }

  public static async createIfNotExist(id: string) {
    const book = await BookService.getById(id);

    if (book) {
      return book;
    }

    const result = await this.searchByIdFromAPI(id);

    const newBook = new Book();
    newBook.author = result[0].author;
    newBook.id = result[0].id;
    newBook.title = result[0].title;

    return await this.repository.save(newBook);
  }
}
