import { Injectable, NotFoundException } from '@nestjs/common';
import { Token } from './token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenTypes } from '@/data/enums';
import { User } from '@/modules/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from '@/env/env.service';
import { addDays, addMinutes, getTime } from 'date-fns';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
    private jwtService: JwtService,
    private envService: EnvService,
  ) {}

  public async generateToken(
    userId: number,
    expires: number,
    type: TokenTypes,
  ) {
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

  public async generatePairOfTokens(user: User) {
    const accessToken = await this.generateToken(
      user.id,
      getTime(
        addMinutes(
          new Date(),
          +this.envService.get('JWT_ACCESS_EXPIRATION_MINUTES'),
        ),
      ),
      TokenTypes.ACCESS,
    );
    const refreshToken = await this.generateToken(
      user.id,
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
      user,
      refreshToken.expires,
      TokenTypes.REFRESH,
    );

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  public async saveToken(
    token: string,
    user: User,
    expires: number,
    type: TokenTypes,
  ) {
    const newToken = new Token();

    newToken.token = token;
    newToken.user = user;
    newToken.type = type;
    newToken.expires = expires;

    return await this.tokensRepository.save(newToken);
  }

  public async invalidateToken(token: string, type: TokenTypes) {
    const foundedToken = await this.tokensRepository.findOneBy({ token, type });

    if (!foundedToken) {
      throw new NotFoundException('Token not found');
    }

    await this.tokensRepository.remove(foundedToken);
  }

  public async hasToken({
    user,
    type,
    token,
  }: {
    user?: User;
    type: TokenTypes;
    token?: string;
  }) {
    if (user) {
      return !!(await this.tokensRepository.findOneBy({
        user,
        type,
      }));
    }

    return await this.tokensRepository.findOneBy({
      token,
      type: TokenTypes.REFRESH,
    });
  }

  public async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}
