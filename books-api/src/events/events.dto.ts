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
