import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

export interface SystemFlags {
  renders_enabled: boolean;
  dewatermark_enabled: boolean;
  scrape_enabled: boolean;
}

export type SystemFlagName = keyof SystemFlags;

/** Reads the singleton `system_flags` row (id = "global"). A missing row means everything is enabled. */
@Injectable()
export class SystemFlagsService {
  private readonly logger = new Logger(SystemFlagsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async get(): Promise<SystemFlags> {
    const row = await this.prisma.systemFlag.findUnique({ where: { id: 'global' } });
    return {
      renders_enabled: row?.renders_enabled ?? true,
      dewatermark_enabled: row?.dewatermark_enabled ?? true,
      scrape_enabled: row?.scrape_enabled ?? true,
    };
  }

  /** Circuit breaker: disables a flag (e.g. provider credits exhausted). */
  async disable(flag: SystemFlagName, reason: string): Promise<void> {
    await this.prisma.systemFlag.upsert({
      where: { id: 'global' },
      update: { [flag]: false },
      create: { id: 'global', [flag]: false },
    });
    this.logger.error(`[ALERT] System flag "${flag}" was disabled automatically: ${reason}`);
  }
}
