import { Module } from '@nestjs/common';
import { ConfigModule } from '@/shared/config/env/env.module';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { RedisModule } from '@/core/databases/redis/redis.module';
import { QueuesModule } from '@/core/queues/queues.module';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';
import { NotificationsIntegrationModule } from '@/integrations/notifications/notifications.module';
import { BackgroundCommonModule } from './common/background-common.module';
import { ImageProcessBackgroundModule } from './image-process/image-process.module';
import { NotifyBackgroundModule } from './notify/notify.module';
import { RenderBackgroundModule } from './render/render.module';
import { ScrapeBackgroundModule } from './scrape/scrape.module';

/**
 * Hosts the BullMQ processors (scrape, image-process, render, notify). For now they run inside the API process,
 * on the same machine. To split them out later, bootstrap this module in its own entry point
 * (`NestFactory.createApplicationContext`) and drop it from `AppModule`.
 */
@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    RedisModule,
    QueuesModule,
    GcsIntegrationModule,
    NotificationsIntegrationModule,
    BackgroundCommonModule,
    ScrapeBackgroundModule,
    ImageProcessBackgroundModule,
    RenderBackgroundModule,
    NotifyBackgroundModule,
  ],
})
export class BackgroundModule {}
