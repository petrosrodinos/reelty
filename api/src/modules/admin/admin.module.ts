import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { AppConfigModule } from '@/modules/app-config/app-config.module';
import { SystemFlagsModule } from '@/modules/system-flags/system-flags.module';
import { UsageModule } from '@/modules/usage/usage.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [PrismaModule, SystemFlagsModule, AppConfigModule, UsageModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
