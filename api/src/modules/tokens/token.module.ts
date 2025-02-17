import { EnvModule } from '@/env/env.module';
import { EnvService } from '@/env/env.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { Token } from './token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EnvModule,
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
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
