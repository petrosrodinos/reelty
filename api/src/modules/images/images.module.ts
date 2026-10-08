import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';
import { ProjectsModule } from '@/modules/projects/projects.module';
import { SystemFlagsModule } from '@/modules/system-flags/system-flags.module';
import { CreditsModule } from '@/modules/credits/credits.module';
import { ImagesController, ProjectImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [PrismaModule, GcsIntegrationModule, ProjectsModule, SystemFlagsModule, CreditsModule],
  controllers: [ProjectImagesController, ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
