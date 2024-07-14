import { INTERVAL_REGEXP } from '../data/regexp';
import { IsDateString, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1)
  book_id: string;

  @ApiProperty()
  @IsDateString()
  datetime: string;

  @ApiProperty()
  @Matches(INTERVAL_REGEXP, {
    message: 'Duration is not to match interval template',
  })
  duration: string;
}

export class EventDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Is Martin Eden mad person?' })
  title: string;

  @ApiProperty({ example: 5 })
  book_id: number;

  @ApiProperty({ example: 2 })
  author_id: number;

  @ApiProperty({ example: '2020-02-12T07:20:50.52Z' })
  date: string;

  @ApiProperty({ example: '1 hours 30 minutes' })
  duration: string;

  @ApiProperty({ example: 15 })
  members_count: number;
}

export class EventDtoChecked extends EventDto {
  @ApiProperty({ example: true })
  with_checked: boolean;
}
