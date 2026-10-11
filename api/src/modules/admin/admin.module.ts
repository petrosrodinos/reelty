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
import { ApifyModule } from '@/integrations/apify/apify.module';
import { DewatermarkModule } from '@/integrations/dewatermark/dewatermark.module';
import { VideoGenerationModule } from '@/integrations/video-generation/video-generation.module';
import { ProviderBalancesService } from './services/provider-balances.service';
import { AnalyticsService } from './services/analytics.service';

@Module({
  imports: [PrismaModule, GcsIntegrationModule, SystemFlagsModule, AppConfigModule, UsageModule, CreditsModule, BillingModule, ApifyModule, DewatermarkModule, VideoGenerationModule],
  controllers: [AdminController],
  providers: [AdminService, AnalyticsService, ProviderBalancesService],
})
export class AdminModule {}
