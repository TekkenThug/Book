import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { Request } from 'express';
import { CreateRecordDto, RecordDto } from './records.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiExtraModels,
  getSchemaPath,
  ApiParam,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { ApiErrorDto, ApiMessageDto } from '@/data/dto';
import { createErrorDoc, createMessageCod } from '@/utils/api';

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
  async create(@Body() dto: CreateRecordDto, @Req() request: Request) {
    await this.recordsService.createRecordToEvent(
      request.user!.sub,
      dto.event_id,
    );
    return { message: 'You successfully recorded' };
  }

  @ApiOperation({ summary: 'Get records' })
  @ApiExtraModels(RecordDto)
  @ApiOkResponse({
    description: 'OK',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(RecordDto) },
    },
  })
  @ApiQuery({
    name: 'event_id',
    required: false,
    description: 'Record`s event id',
  })
  @Get()
  async get(@Query() query: { event_id?: number }, @Req() request: Request) {
    return await this.recordsService.getRecords(request.user!.sub, {
      event_id: query.event_id,
    });
  }

  @ApiOperation({ summary: 'Delete record' })
  @ApiOkResponse(createMessageCod(200, 'Record successfully deleted'))
  @ApiNotFoundResponse(createErrorDoc(404))
  @ApiForbiddenResponse(
    createErrorDoc(403, 'You can`t delete the record, because you are owner'),
  )
  @ApiParam({ name: 'id', description: 'Event`s id' })
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() request: Request) {
    await this.recordsService.deleteRecord(id, request.user!.sub);

    return {
      message: 'Record successfully deleted',
    };
  }
}
