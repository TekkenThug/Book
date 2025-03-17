import { INTERVAL_REGEXP } from '@/data/regexp';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookDto } from '../books/books.dto';

class Interval {
  @ApiProperty({ required: false })
  hours?: number;

  @ApiProperty({ required: false })
  minutes?: number;
}

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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class EventDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Is Martin Eden mad person?' })
  title: string;

  @ApiProperty({ example: '2020-02-12T07:20:50.52Z' })
  date: string;

  @ApiProperty({ type: () => Interval, example: { hours: 1, minutes: 30 } })
  duration: Interval;

  @ApiProperty({ example: 15 })
  members_count: number;

  @ApiProperty({ example: '<p>Hello</p>' })
  description: string;
}

export class EventWithBookDto extends EventDto {
  @ApiProperty({ type: () => BookDto })
  book: BookDto;
}

export class UserEventDto extends EventWithBookDto {
  @ApiProperty({ example: 'owner' })
  role: string;
}

export class EventDtoChecked extends EventWithBookDto {
  @ApiProperty({ example: true })
  checked: boolean;
}
