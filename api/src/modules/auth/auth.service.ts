import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';
import { addDays, addMinutes, getTime } from 'date-fns';
import { EnvService } from '@/env/env.service';
import { Token } from './token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenTypes } from '@/data/enums';
import { SignUpDto, VerifyEmailDto } from './auth.dto';
import { MailService } from '@/modules/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
    private mailService: MailService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private envService: EnvService,
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

    if (
      await this.tokensRepository.findOneBy({
        user,
        type: TokenTypes.REFRESH,
      })
    ) {
      throw new UnauthorizedException('Already login');
    }

    return await this.generatePairOfTokens(user.id);
  }

  async signOut(token: string) {
    await this.invalidateToken(token, TokenTypes.REFRESH);
  }

  async signUp(dto: SignUpDto) {
    const createdUser = await this.usersService.createUser(dto);

    const token = await this.generateToken(
      createdUser.id,
      getTime(
        addMinutes(
          new Date(),
          +this.envService.get('JWT_EMAIL_VERIFY_EXPIRATION_MINUTES'),
        ),
      ),
      TokenTypes.VERIFY_EMAIL,
    );

    await this.saveToken(
      token.token,
      createdUser.id,
      token.expires,
      TokenTypes.VERIFY_EMAIL,
    );

    this.mailService.sendWelcomeMail(
      createdUser.email,
      createdUser.first_name,
      token.token,
    );
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const token = await this.jwtService.verifyAsync(dto.token);
    const user = await this.usersService.getById(token.sub);

    if (!user) {
      throw new UnauthorizedException('Email verification failed');
    }

    await this.invalidateToken(dto.token, TokenTypes.VERIFY_EMAIL);
    await this.usersService.verifyEmail(user);
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.tokensRepository.findOneBy({
      token: refreshToken,
      type: TokenTypes.REFRESH,
    });

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(refreshToken);

    const user = await this.usersService.getById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.invalidateToken(refreshToken, TokenTypes.REFRESH);

    return await this.generatePairOfTokens(user.id);
  }

  private async generatePairOfTokens(userId: number) {
    const accessToken = await this.generateToken(
      userId,
      getTime(
        addMinutes(
          new Date(),
          +this.envService.get('JWT_ACCESS_EXPIRATION_MINUTES'),
        ),
      ),
      TokenTypes.ACCESS,
    );
    const refreshToken = await this.generateToken(
      userId,
      getTime(
        addDays(
          new Date(),
          +this.envService.get('JWT_REFRESH_EXPIRATION_DAYS'),
        ),
      ),
      TokenTypes.REFRESH,
    );

    await this.saveToken(
      refreshToken.token,
      userId,
      refreshToken.expires,
      TokenTypes.REFRESH,
    );

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  private async generateToken(userId: number, expires: number, type: string) {
    const payload = {
      sub: userId,
      iat: getTime(new Date()),
      type,
    };

    return {
      token: await this.jwtService.signAsync(payload),
      expires,
    };
  }

  private async saveToken(
    token: string,
    userId: number,
    expires: number,
    type: TokenTypes,
  ) {
    const user = await this.usersService.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newToken = new Token();

    newToken.token = token;
    newToken.user = user;
    newToken.type = type;
    newToken.expires = expires;

    return await this.tokensRepository.save(newToken);
  }

  private async invalidateToken(token: string, type: TokenTypes) {
    const foundedToken = await this.tokensRepository.findOneBy({ token, type });

    if (!foundedToken) {
      throw new NotFoundException('Not found');
    }

    await this.tokensRepository.remove(foundedToken);
  }
}
