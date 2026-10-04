import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { UsageModule } from '@/modules/usage/usage.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './services/token.service';
import { AuthCookiesService } from './services/auth-cookies.service';

@Module({
  imports: [PrismaModule, UsageModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, AuthCookiesService],
  exports: [AuthService],
})
export class AuthModule {}
