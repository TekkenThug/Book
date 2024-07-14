import { PASSWORD_REGEXP } from '../data/regexp';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches, ValidateIf } from 'class-validator';
import { Match } from '../decorators/validation/match.decorator';

export class UpdateSettingsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  first_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  last_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Matches(PASSWORD_REGEXP, {
    message:
      'Password must contains at least 1 character in lower case, 1 in upper case, symbol and digit',
  })
  password?: string;

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.password)
  @Match('password', { message: "Passwords don't match" })
  repeat_password?: string;
}

export class SettingsDataDto {
  @ApiProperty({ example: 'John' })
  first_name: string;

  @ApiProperty({ example: 'Daw' })
  last_name: string;

  @ApiProperty({ example: 'johndaw@example.com' })
  email: string;
}
