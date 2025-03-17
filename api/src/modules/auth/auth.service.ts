import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { addMinutes, getTime } from 'date-fns';
import { EnvService } from '@/env/env.service';
import { TokenTypes } from '@/data/enums';
import { ApproveResetPasswordDto, SignUpDto, VerifyEmailDto } from './auth.dto';
import { MailService } from '@/modules/mail/mail.service';
import { TokenService } from '@/modules/tokens/token.service';

@Injectable()
export class AuthService {
  constructor(
    private mailService: MailService,
    private usersService: UsersService,
    private envService: EnvService,
    private tokenService: TokenService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);

    if (
      !user ||
      !(await this.usersService.comparePasswords(password, user.password))
    ) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    if (!user.verified_email) {
      throw new UnauthorizedException('Email is not verified');
    }

    if (await this.tokenService.hasToken({ user, type: TokenTypes.REFRESH })) {
      throw new UnauthorizedException('Already login');
    }

    return await this.tokenService.generatePairOfTokens(user);
  }

  async signOut(token: string) {
    await this.tokenService.invalidateToken(token, TokenTypes.REFRESH);
  }

  async signUp(dto: SignUpDto) {
    const createdUser = await this.usersService.createUser(dto);

    const { token, expires } = await this.tokenService.generateToken(
      createdUser.id,
      getTime(
        addMinutes(
          new Date(),
          +this.envService.get('JWT_EMAIL_VERIFY_EXPIRATION_MINUTES'),
        ),
      ),
      TokenTypes.VERIFY_EMAIL,
    );

    await this.tokenService.saveToken(
      token,
      createdUser,
      expires,
      TokenTypes.VERIFY_EMAIL,
    );

    this.mailService.sendWelcomeMail(
      createdUser.email,
      createdUser.first_name,
      token,
    );
  }

  async resetPassword(email: string) {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    const { token, expires } = await this.tokenService.generateToken(
      user.id,
      getTime(
        addMinutes(
          new Date(),
          +this.envService.get('JWT_RESET_PASSWORD_EXPIRATION_MINUTES'),
        ),
      ),
      TokenTypes.RESET_PASSWORD,
    );

    await this.tokenService.saveToken(
      token,
      user,
      expires,
      TokenTypes.RESET_PASSWORD,
    );

    this.mailService.sendResetPasswordEmail(user.email, user.first_name, token);
  }

  async approveResetPassword(dto: ApproveResetPasswordDto) {
    const token = await this.tokenService.verifyToken(dto.token);
    const user = await this.usersService.getById(token.sub);

    if (!user) {
      throw new NotFoundException('Incorrect user');
    }

    await this.tokenService.invalidateToken(
      dto.token,
      TokenTypes.RESET_PASSWORD,
    );
    await this.usersService.updateUser(user.id, { password: dto.password });
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const token = await this.tokenService.verifyToken(dto.token);
    const user = await this.usersService.getById(token.sub);

    if (!user) {
      throw new UnauthorizedException('Email verification failed');
    }

    await this.tokenService.invalidateToken(dto.token, TokenTypes.VERIFY_EMAIL);
    await this.usersService.verifyEmail(user.id);
  }

  public async refreshTokens(token: string) {
    if (
      !(await this.tokenService.hasToken({ token, type: TokenTypes.REFRESH }))
    ) {
      throw new UnauthorizedException();
    }

    const payload = await this.tokenService.verifyToken(token);
    const user = await this.usersService.getById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.tokenService.invalidateToken(token, TokenTypes.REFRESH);

    return await this.tokenService.generatePairOfTokens(user);
  }
}
