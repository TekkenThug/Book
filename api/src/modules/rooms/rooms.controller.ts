import {
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { Controller, Get, Param, Req } from '@nestjs/common';
import { createErrorDoc, createSuccessDoc } from '@/utils/api';
import { Request } from 'express';
import { ParticipantDto, RoomDto } from './rooms.dto';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @ApiOperation({ summary: 'Get room by event id' })
  @ApiOkResponse(createSuccessDoc(200, RoomDto))
  @ApiNotFoundResponse(createErrorDoc(404))
  @ApiParam({ name: 'id', description: 'Event`s id' })
  @Get(':id')
  async getById(@Param('id') id: number, @Req() request: Request) {
    return await this.roomsService.getById(id, request.user!.sub);
  }

  @ApiOperation({ summary: 'Get participants' })
  @ApiExtraModels(ParticipantDto)
  @ApiOkResponse({
    description: 'OK',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(ParticipantDto) },
    },
  })
  @ApiNotFoundResponse(createErrorDoc(404))
  @ApiParam({ name: 'id', description: 'Event`s id' })
  @Get(':id/participants')
  async getParticipants(@Param('id') id: number, @Req() request: Request) {
    return await this.roomsService.getParticipants(id, request.user!.sub);
  }
}
