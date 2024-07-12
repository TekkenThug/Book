import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Public } from '../decorators/public/public.decorator';
import { EventsService } from './events.service';
import { Request } from 'express';
import { CreateEventDto } from './events.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}
  @Get()
  @Public()
  async findAll(@Query() query: { book: string }) {
    return await this.eventsService.get({ book: query.book, future: true });
  }

  @Get('with-checked')
  async findChecked(@Query() query: { book: string }, @Req() request: Request) {
    return await this.eventsService.get({
      book: query.book,
      future: true,
      withChecked: true,
      userId: request.user!.sub,
    });
  }

  @Get('my')
  async findMy(@Query() query: { book: string }, @Req() request: Request) {
    return await this.eventsService.getEventsOfUser(request.user!.sub);
  }

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
