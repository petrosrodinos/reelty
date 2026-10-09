import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from './shared/config/env/env.module';
import { RedisModule } from './core/databases/redis/redis.module';
import { QueuesModule } from './core/queues/queues.module';
import { BullBoardModule } from './core/queues/bull-board.module';
import { AuthSharedModule } from './shared/auth/auth-shared.module';
import { RateLimitModule } from './shared/services/rate-limit/rate-limit.module';
import { CsrfGuard } from './shared/guards/csrf.guard';
import { AuthModule } from './modules/auth/auth.module';
import { UsageModule } from './modules/usage/usage.module';
import { CreditsModule } from './modules/credits/credits.module';
import { BillingModule } from './modules/billing/billing.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { SoundtracksModule } from './modules/soundtracks/soundtracks.module';
import { ImagesModule } from './modules/images/images.module';
import { AdminModule } from './modules/admin/admin.module';
import { HealthModule } from './modules/health/health.module';
import { ContactModule } from './modules/contact/contact.module';
import { BackgroundModule } from './background/background.module';

@Module({
  imports: [
    ConfigModule,
    // Coarse per-IP protection for every route; stricter limits are set per endpoint with @Throttle.
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 300 }]),
    RedisModule,
    QueuesModule,
    BullBoardModule,
    AuthSharedModule,
    RateLimitModule,
    AuthModule,
    UsageModule,
    CreditsModule,
    BillingModule,
    ProjectsModule,
    SoundtracksModule,
    ImagesModule,
    AdminModule,
    HealthModule,
    ContactModule,
    BackgroundModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: CsrfGuard },
  ],
})
export class AppModule {}
