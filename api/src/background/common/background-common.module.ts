import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { JobEventsService } from './job-events.service';
import { SystemFlagsService } from './system-flags.service';
import { WorkerConfigService } from './worker-config.service';

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [JobEventsService, SystemFlagsService, WorkerConfigService],
  exports: [JobEventsService, SystemFlagsService, WorkerConfigService],
})
export class BackgroundCommonModule {}
