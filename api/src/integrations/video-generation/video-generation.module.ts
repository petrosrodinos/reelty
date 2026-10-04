import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BackgroundCommonModule } from '@/background/common/background-common.module';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';
import { FfmpegModule } from '@/integrations/ffmpeg/ffmpeg.module';
import { HiggsfieldProvider } from './higgsfield/higgsfield.provider';
import { LocalKenBurnsProvider } from './local/local-ken-burns.provider';
import { VideoProviderResolver } from './video-provider.resolver';

@Module({
  imports: [ConfigModule, BackgroundCommonModule, GcsIntegrationModule, FfmpegModule],
  providers: [HiggsfieldProvider, LocalKenBurnsProvider, VideoProviderResolver],
  exports: [VideoProviderResolver, HiggsfieldProvider, LocalKenBurnsProvider],
})
export class VideoGenerationModule {}
