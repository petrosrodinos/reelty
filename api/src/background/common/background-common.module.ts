import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { AppConfigModule } from '@/modules/app-config/app-config.module';
import { JobEventsService } from './job-events.service';
import { SystemFlagsService } from './system-flags.service';
import { WorkerConfigService } from './worker-config.service';

@Module({
  imports: [ConfigModule, PrismaModule, AppConfigModule],
  providers: [JobEventsService, SystemFlagsService, WorkerConfigService],
  exports: [JobEventsService, SystemFlagsService, WorkerConfigService, AppConfigModule],
})
export class BackgroundCommonModule {}
