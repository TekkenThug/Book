import { Controller, Get, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async findAll(@Query() query: { title: string }) {
    return await this.booksService.getFromAPI(query.title);
  }
}
