import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Public } from '../decorators/public/public.decorator';
import { EventsService } from './events.service';
import { Request } from 'express';
import { CreateEventDto, EventDto, EventDtoChecked } from './events.dto';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiErrorDto } from '../data/dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @ApiOperation({ summary: 'Get events' })
  @ApiQuery({
    name: 'book',
    required: false,
    description: 'Find by book title',
  })
  @ApiQuery({
    name: 'future',
    required: false,
    description: 'Only future events',
  })
  @ApiExtraModels(EventDto)
  @ApiOkResponse({
    description: 'OK',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(EventDto) },
    },
  })
  @Get()
  @Public()
  async findAll(@Query() query: { book: string }) {
    return await this.eventsService.get({ book: query.book, future: true });
  }

  @ApiOperation({
    summary: 'Get events with checked property for authorized users',
  })
  @ApiExtraModels(EventDtoChecked)
  @ApiOkResponse({
    description: 'OK',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(EventDtoChecked) },
    },
  })
  @Get('with-checked')
  async findChecked(@Query() query: { book: string }, @Req() request: Request) {
    return await this.eventsService.get({
      book: query.book,
      future: true,
      withChecked: true,
      userId: request.user!.sub,
    });
  }

  @ApiOperation({ summary: 'Get user`s events' })
  @ApiExtraModels(EventDto)
  @ApiOkResponse({
    description: 'OK',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(EventDto) },
    },
  })
  @Get('my')
  async findMy(@Query() query: { book: string }, @Req() request: Request) {
    return await this.eventsService.getEventsOfUser(request.user!.sub);
  }

  @ApiOperation({ summary: 'Create event' })
  @ApiCreatedResponse({ description: 'OK', type: EventDto })
  @ApiNotAcceptableResponse({
    description: 'Too many events on this date',
    type: ApiErrorDto,
    example: {
      message: 'Too many events on this date',
      statusCode: 406,
      error: 'Not Acceptable',
    },
  })
  @Post()
  async create(
    @Body() createEventDto: CreateEventDto,
    @Req() request: Request,
  ) {
    return await this.eventsService.createEvent(
      request.user!.sub,
      createEventDto,
    );
  }
}
