import { Module } from '@nestjs/common';
import { BackgroundCommonModule } from '@/background/common/background-common.module';
import { DewatermarkService } from './dewatermark.service';

@Module({
  imports: [BackgroundCommonModule],
  providers: [DewatermarkService],
  exports: [DewatermarkService],
})
export class DewatermarkModule {}
