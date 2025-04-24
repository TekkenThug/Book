import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { getUnixTime } from 'date-fns';
import {
  SignInDto,
  SignUpDto,
  VerifyEmailDto,
  TokenDto,
  ResetPasswordDto,
  ApproveResetPasswordDto,
} from './auth.dto';
import { Public } from '@/decorators/public/public.decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ApiErrorDto, ApiMessageDto } from '@/data/dto';
import { createErrorDoc, createSuccessDoc } from '@/utils/api';

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
  @ApiUnauthorizedResponse(createErrorDoc(401))
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
  @ApiBadRequestResponse(createErrorDoc(400))
  @ApiUnprocessableEntityResponse(createErrorDoc(422, 'User already exists'))
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
  @ApiUnauthorizedResponse(createErrorDoc(401))
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
  @ApiOkResponse(
    createSuccessDoc({ code: 200, message: 'Email is verified successfully' }),
  )
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

  @ApiOperation({ summary: 'Send mail with token for reset password' })
  @ApiOkResponse(
    createSuccessDoc({ code: 200, message: 'Check email for reset password' }),
  )
  @ApiNotFoundResponse(createErrorDoc(404, 'User with this email not found'))
  @Public()
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto.email);

    return { message: 'Check email for reset password' };
  }

  @ApiOperation({ summary: 'Reset password by token' })
  @ApiOkResponse(
    createSuccessDoc({ code: 200, message: 'Password changed successfully' }),
  )
  @ApiUnauthorizedResponse(createErrorDoc(401, 'Incorrect user or password'))
  @ApiNotFoundResponse(createErrorDoc(404))
  @ApiBadRequestResponse(createErrorDoc(400))
  @Public()
  @Patch('reset-password')
  async approveResetPassword(@Body() dto: ApproveResetPasswordDto) {
    await this.authService.approveResetPassword(dto);

    return { message: 'Password changed successfully' };
  }
}
