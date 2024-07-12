import { PASSWORD_REGEXP } from '../data/regexp';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../decorators/validation/match.decorator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Length(2)
  first_name: string;

  @ApiProperty()
  @Length(2)
  last_name: string;

  @ApiProperty()
  @Matches(PASSWORD_REGEXP, {
    message:
      'Password must contains at least 1 character in lower case, 1 in upper case, symbol and digit',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @Match('password', { message: "Passwords don't match" })
  @IsNotEmpty()
  repeat_password: string;
}
export class VerifyEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}
