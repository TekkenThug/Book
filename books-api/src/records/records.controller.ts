import { Body, Controller, Post, Req } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Request } from 'express';
import { CreateRecordDto } from './records.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiErrorDto, ApiMessageDto } from '../data/dto';

@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @ApiOperation({ summary: 'Create record to event' })
  @ApiCreatedResponse({
    description: 'Record created',
    type: ApiMessageDto,
    example: { message: 'You successfully recorded' },
  })
  @ApiBadRequestResponse({
    description: 'Record already exists',
    type: ApiErrorDto,
    example: {
      statusCode: 400,
      message: 'Record already exists',
      error: 'Bad request',
    },
  })
  @ApiNotFoundResponse({
    description: 'Event not found',
    type: ApiErrorDto,
    example: {
      statusCode: 404,
      message: 'Event not found',
      error: 'Not found',
    },
  })
  @Post()
  async create(
    @Body() createRecordDto: CreateRecordDto,
    @Req() request: Request,
  ) {
    await this.recordsService.createRecordToEvent(
      request.user!.sub,
      createRecordDto.event_id,
    );
    return { message: 'You successfully recorded' };
  }
}
