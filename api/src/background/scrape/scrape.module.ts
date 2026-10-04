import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';
import { ApifyModule } from '@/integrations/apify/apify.module';
import { BackgroundCommonModule } from '../common/background-common.module';
import { ScrapeProcessor } from './scrape.processor';
import { ScrapeService } from './scrape.service';

@Module({
  imports: [
    PrismaModule,
    GcsIntegrationModule,
    ApifyModule,
    BackgroundCommonModule,
  ],
  providers: [ScrapeProcessor, ScrapeService],
})
export class ScrapeBackgroundModule {}
