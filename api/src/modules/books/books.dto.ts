import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({ example: 'OL17930368W' })
  id: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    example: ['James Clear'],
  })
  author: string[];

  @ApiProperty({ example: 'Atomic Habits' })
  title: string;
}
