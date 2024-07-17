import { Controller, Req, Get, Patch, Body } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import {
  SettingsDataDto,
  UpdateSettingsDto,
  UserMetadataDto,
} from './users.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  createErrorDoc,
  createMessageCod,
  createSuccessDoc,
} from '@/utils/api';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(public usersService: UsersService) {}

  @ApiOperation({ summary: 'Get data for settings' })
  @ApiOkResponse(createSuccessDoc(200, SettingsDataDto))
  @Get('settings')
  async getSettings(@Req() request: Request) {
    return await this.usersService.getEditableSettings(request.user!.sub);
  }

  @ApiOperation({ summary: 'Update settings' })
  @ApiOkResponse(createMessageCod(200, 'Settings successfully updated'))
  @ApiBadRequestResponse(createErrorDoc(400))
  @Patch('settings')
  async updateSettings(
    @Req() request: Request,
    @Body() payload: UpdateSettingsDto,
  ) {
    await this.usersService.updateUser(request.user!.sub, payload);
    return { message: 'Settings successfully updated' };
  }

  @ApiOperation({ summary: 'Get user`s metadata' })
  @ApiOkResponse(createSuccessDoc(200, UserMetadataDto))
  @ApiNotFoundResponse(createErrorDoc(404, 'User not found'))
  @Get('me')
  async getUserInfo(@Req() request: Request) {
    return await this.usersService.getUserMetadata(request.user!.sub);
  }
}
