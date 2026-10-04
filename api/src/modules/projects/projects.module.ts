import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';
import { SystemFlagsModule } from '@/modules/system-flags/system-flags.module';
import { UsageModule } from '@/modules/usage/usage.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MediaUrlsService } from './services/media-urls.service';
import { ProjectSerializer } from './services/project-serializer.service';

@Module({
  imports: [PrismaModule, GcsIntegrationModule, SystemFlagsModule, UsageModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, MediaUrlsService, ProjectSerializer],
  exports: [ProjectsService, MediaUrlsService, ProjectSerializer],
})
export class ProjectsModule {}
