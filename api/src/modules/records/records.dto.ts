import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecordDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  event_id: number;
}

export class CreateRecordDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  event_id: number;
}
