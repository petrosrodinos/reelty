import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';
import { FfmpegModule } from '@/integrations/ffmpeg/ffmpeg.module';
import { VideoGenerationModule } from '@/integrations/video-generation/video-generation.module';
import { CreditsModule } from '@/modules/credits/credits.module';
import { BackgroundCommonModule } from '../common/background-common.module';
import { NotifyBackgroundModule } from '../notify/notify.module';
import { AssemblyService } from './assembly.service';
import { RenderProcessor } from './render.processor';
import { RenderService } from './render.service';
import { SoundtrackService } from './soundtrack.service';

@Module({
  imports: [
    PrismaModule,
    GcsIntegrationModule,
    FfmpegModule,
    VideoGenerationModule,
    BackgroundCommonModule,
    NotifyBackgroundModule,
    CreditsModule,
  ],
  providers: [RenderProcessor, RenderService, AssemblyService, SoundtrackService],
})
export class RenderBackgroundModule {}
