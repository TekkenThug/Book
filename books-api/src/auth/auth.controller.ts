import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { getUnixTime } from 'date-fns';
import { SignInDto, SignUpDto, VerifyEmailDto } from './auth.dto';
import { Public } from '../decorators/public/public.decorator';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

const setRefreshToken = (
  res: Response,
  token: { token: string; expires: number },
) => {
  res.cookie('refreshToken', token.token, {
    maxAge: token.expires - getUnixTime(new Date()) * 1000,
    path: '/api/v1/auth',
    httpOnly: true,
  });
};

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @ApiOperation({ summary: 'Login as user' })
  @ApiOkResponse({ description: 'The record has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    setRefreshToken(response, tokens.refresh);

    return tokens.access;
  }

  @ApiOperation({ summary: 'Register as user' })
  @Public()
  @Post('register')
  async register(
    @Body()
    signUpDto: SignUpDto,
  ) {
    await this.authService.signUp(signUpDto);
    return { message: 'Check your email for confirmation registration' };
  }

  @ApiOperation({ summary: 'Logout from app' })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.signOut(request.cookies.refreshToken);
    response.clearCookie('refreshToken');
  }

  @ApiOperation({ summary: 'Refresh JWT tokens' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.refreshTokens(
      request.cookies.refreshToken,
    );
    setRefreshToken(response, tokens.refresh);

    return tokens.access;
  }

  @ApiOperation({ summary: 'Verify email' })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    await this.authService.verifyEmail(verifyEmailDto);
    return { message: 'Email is verified successfully' };
  }
}
