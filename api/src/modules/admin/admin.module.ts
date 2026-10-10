import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';
import { AppConfigModule } from '@/modules/app-config/app-config.module';
import { SystemFlagsModule } from '@/modules/system-flags/system-flags.module';
import { UsageModule } from '@/modules/usage/usage.module';
import { CreditsModule } from '@/modules/credits/credits.module';
import { BillingModule } from '@/modules/billing/billing.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AnalyticsService } from './services/analytics.service';

@Module({
  imports: [PrismaModule, GcsIntegrationModule, SystemFlagsModule, AppConfigModule, UsageModule, CreditsModule, BillingModule],
  controllers: [AdminController],
  providers: [AdminService, AnalyticsService],
})
export class AdminModule {}
