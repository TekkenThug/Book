import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty({ example: 1 })
  event_id: number;

  @ApiProperty({
    type: () => [ChatDto],
    example: [
      {
        id: 1,
        text: 'Hello!',
        fullname: 'Joe Peach',
        datetime: '2025-03-17T08:21:59+00:00',
      },
    ],
  })
  chat_log: ChatDto[];

  @ApiProperty({ example: [1, 2, 3], type: [Number] })
  participants: number[];
}

export class ParticipantDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Joe' })
  first_name: string;

  @ApiProperty({ example: 'Peach' })
  last_name: string;

  @ApiProperty({ example: 'https://some.s3.com/some_bucket/images/avatar.png' })
  avatar: string;
}

class ChatDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  datetime: string;
}
