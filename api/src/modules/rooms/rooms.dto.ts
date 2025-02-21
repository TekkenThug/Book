import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty({ example: 1 })
  event_id: number;

  @ApiProperty({ example: ['first', 'second'] })
  chat_log: string[];
}
