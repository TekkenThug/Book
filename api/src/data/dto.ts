import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;
}

export class ApiMessageDto {
  @ApiProperty()
  message: string;
}
