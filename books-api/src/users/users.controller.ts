import { Controller, Req, Get, Patch, Body } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { UpdateSettingsDto } from './users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(public usersService: UsersService) {}

  @Get('settings')
  async getSettings(@Req() request: Request) {
    return await this.usersService.getEditableSettings(request.user!.sub);
  }

  @Patch('settings')
  async updateSettings(
    @Req() request: Request,
    @Body() payload: UpdateSettingsDto,
  ) {
    await this.usersService.updateUser(request.user!.sub, payload);
    return { message: 'Settings successfully updated' };
  }
}
