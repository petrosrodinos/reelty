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
 * Root module of the worker process (`src/worker.ts`): an application context without HTTP that hosts the
 * BullMQ processors. The API process only registers producers and never imports this module.
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
export class WorkerModule {}
