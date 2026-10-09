import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

export interface SystemFlags {
  renders_enabled: boolean;
  dewatermark_enabled: boolean;
  scrape_enabled: boolean;
}

/** Reads the singleton `system_flags` row (id = "global"). A missing row means everything is enabled. */
@Injectable()
export class SystemFlagsService {
  constructor(private readonly prisma: PrismaService) {}

  async get(): Promise<SystemFlags> {
    const row = await this.prisma.systemFlag.findUnique({ where: { id: 'global' } });
    return {
      renders_enabled: row?.renders_enabled ?? true,
      dewatermark_enabled: row?.dewatermark_enabled ?? true,
      scrape_enabled: row?.scrape_enabled ?? true,
    };
  }
}
