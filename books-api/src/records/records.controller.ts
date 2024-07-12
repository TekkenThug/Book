import { Body, Controller, Post, Req } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Request } from 'express';
import { CreateRecordDto } from './records.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

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
