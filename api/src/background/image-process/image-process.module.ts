import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';
import { DewatermarkModule } from '@/integrations/dewatermark/dewatermark.module';
import { BackgroundCommonModule } from '../common/background-common.module';
import { ImageProcessProcessor } from './image-process.processor';
import { ImageProcessService } from './image-process.service';

@Module({
  imports: [
    PrismaModule,
    GcsIntegrationModule,
    DewatermarkModule,
    BackgroundCommonModule,
  ],
  providers: [ImageProcessProcessor, ImageProcessService],
})
export class ImageProcessBackgroundModule {}
