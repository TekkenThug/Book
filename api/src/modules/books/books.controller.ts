import { Controller, Get, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { BookDto } from './books.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ summary: 'Get books' })
  @ApiQuery({ name: 'title', required: false })
  @ApiExtraModels(BookDto)
  @ApiOkResponse({
    description: 'OK',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(BookDto) },
    },
  })
  @Get()
  async findAll(@Query() query: { title: string }) {
    return await this.booksService.getFromAPI(query.title);
  }
}
