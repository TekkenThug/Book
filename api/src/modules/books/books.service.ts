import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface OpenLibraryItem extends Record<string, string | string[]> {
  key: string;
  author_name: string[];
  title: string;
}

export interface OpenLibraryResponse {
  docs: OpenLibraryItem[];
}

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  private readonly API_URL = 'https://openlibrary.org/search.json';

  private mapResponseFromAPI(response: OpenLibraryResponse) {
    return response.docs.map((item) => ({
      id: item.key.replace('/works/', ''),
      author: item.author_name,
      title: item.title,
    }));
  }

  private constructURLForAPI() {
    const url = new URL(this.API_URL);
    url.searchParams.append('fields', 'author_name,title,key');

    return url;
  }

  public async getFromAPI(titleQuery: string) {
    if (!titleQuery) {
      return [];
    }

    const url = this.constructURLForAPI();

    const limitation = 10;
    url.searchParams.append('title', titleQuery);
    url.searchParams.append('limit', `${limitation}`);

    const data: OpenLibraryResponse = await fetch(url).then((res) =>
      res.json(),
    );

    return this.mapResponseFromAPI(data);
  }

  private async searchByIdFromAPI(id: string) {
    const url = this.constructURLForAPI();

    url.searchParams.append('limit', `${1}`);
    url.searchParams.append('q', id);

    const data: OpenLibraryResponse = await fetch(url).then((res) =>
      res.json(),
    );

    return this.mapResponseFromAPI(data);
  }

  public async createIfNotExist(id: string) {
    const book = await this.booksRepository.findOneBy({ id });

    if (book) {
      return book;
    }

    const result = await this.searchByIdFromAPI(id);

    const newBook = new Book();
    newBook.author = result[0].author;
    newBook.id = result[0].id;
    newBook.title = result[0].title;

    return await this.booksRepository.save(newBook);
  }
}
