import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@/modules/users/users.module';
import { EnvModule } from '@/env/env.module';
import { MailModule } from '@/modules/mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { TokenModule } from '@/modules/tokens/token.module';

@Module({
  imports: [UsersModule, EnvModule, MailModule, TokenModule],
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
