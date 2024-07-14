import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { MailModule } from '../modules/mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    EnvModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        global: true,
        secret: envService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${envService.get('JWT_ACCESS_EXPIRATION_MINUTES')}m`,
        },
      }),
      inject: [EnvService],
    }),
    TypeOrmModule.forFeature([Token]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
