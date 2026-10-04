import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { SystemFlagsService } from './system-flags.service';

@Module({
  imports: [PrismaModule],
  providers: [SystemFlagsService],
  exports: [SystemFlagsService],
})
export class SystemFlagsModule {}
