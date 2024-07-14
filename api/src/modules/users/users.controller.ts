import { Controller, Req, Get, Patch, Body } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { SettingsDataDto, UpdateSettingsDto } from './users.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiErrorDto, ApiMessageDto } from '@/data/dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(public usersService: UsersService) {}

  @ApiOperation({ summary: 'Get data for settings' })
  @ApiOkResponse({ description: 'OK', type: SettingsDataDto })
  @Get('settings')
  async getSettings(@Req() request: Request) {
    return await this.usersService.getEditableSettings(request.user!.sub);
  }

  @ApiOperation({ summary: 'Update settings' })
  @ApiOkResponse({
    description: 'OK',
    type: ApiMessageDto,
    example: { message: 'Settings successfully updated' },
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: ApiErrorDto,
    example: { message: 'Bad request', statusCode: 400, error: 'Bad request' },
  })
  @Patch('settings')
  async updateSettings(
    @Req() request: Request,
    @Body() payload: UpdateSettingsDto,
  ) {
    await this.usersService.updateUser(request.user!.sub, payload);
    return { message: 'Settings successfully updated' };
  }
}
