import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Public } from '@/decorators/public/public.decorator';
import { EventsService } from './events.service';
import { Request } from 'express';
import { CreateEventDto, EventDto, EventDtoChecked } from './events.dto';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { createErrorDoc, createSuccessDoc } from '@/utils/api';

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
  @ApiCreatedResponse(createSuccessDoc(201, EventDto))
  @ApiNotAcceptableResponse(createErrorDoc(406, 'Too many events on this date'))
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

  @ApiOperation({ summary: 'Get event by id' })
  @ApiOkResponse(createSuccessDoc(200, EventDto))
  @ApiNotFoundResponse(createErrorDoc(404))
  @ApiParam({ name: 'id', description: 'Event`s id' })
  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.eventsService.getById(id);
  }
}
