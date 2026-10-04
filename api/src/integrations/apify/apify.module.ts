import { Module } from '@nestjs/common';
import { BackgroundCommonModule } from '@/background/common/background-common.module';
import { ApifyService } from './apify.service';

@Module({
  imports: [BackgroundCommonModule],
  providers: [ApifyService],
  exports: [ApifyService],
})
export class ApifyModule {}
