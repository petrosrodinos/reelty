import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { ResendModule } from '@/integrations/notifications/resend/resend.module';
import { BackgroundCommonModule } from '../common/background-common.module';
import { NotifyProcessor } from './notify.processor';
import { NotifyQueueService } from './notify-queue.service';
import { NotifyService } from './notify.service';

@Module({
  imports: [
    PrismaModule,
    ResendModule,
    BackgroundCommonModule,
  ],
  providers: [NotifyProcessor, NotifyService, NotifyQueueService],
  exports: [NotifyQueueService],
})
export class NotifyBackgroundModule {}
