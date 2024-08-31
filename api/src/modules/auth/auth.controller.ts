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
import { SignInDto, SignUpDto, VerifyEmailDto, TokenDto } from './auth.dto';
import { Public } from '@/decorators/public/public.decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ApiErrorDto, ApiMessageDto } from '@/data/dto';

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
  @ApiOkResponse({ description: 'OK', type: TokenDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ApiErrorDto })
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
  @ApiCreatedResponse({
    description: 'Created',
    type: ApiMessageDto,
    example: { message: 'Check your email for confirmation registration' },
  })
  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: ApiErrorDto,
    example: {
      message: 'Invalid email',
      statusCode: 400,
      error: 'Bad request',
    },
  })
  @ApiUnprocessableEntityResponse({
    description: 'User already exists',
    type: ApiErrorDto,
    example: {
      message: 'User already exists',
      statusCode: 422,
      error: 'Unprocessable entity',
    },
  })
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
  @ApiOkResponse({ description: 'OK', type: TokenDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: ApiErrorDto,
    example: {
      message: 'Unauthorized',
      statusCode: 401,
      error: 'Unauthorized',
    },
  })
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
  @ApiOkResponse({
    description: 'OK',
    type: ApiMessageDto,
    example: { message: 'Email is verified successfully' },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: ApiErrorDto,
    example: {
      message: 'Email verification failed',
      statusCode: 401,
      error: 'Unauthorized',
    },
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    await this.authService.verifyEmail(verifyEmailDto);
    return { message: 'Email is verified successfully' };
  }
}
