import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { PosthogModule } from '@/integrations/posthog/posthog.module';
import { StripeModule } from '@/integrations/stripe/stripe.module';
import { AppConfigModule } from '@/modules/app-config/app-config.module';
import { CreditsModule } from '@/modules/credits/credits.module';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  imports: [PrismaModule, StripeModule, PosthogModule, AppConfigModule, CreditsModule],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule {}
