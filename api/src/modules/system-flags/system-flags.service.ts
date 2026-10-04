import { Injectable } from '@nestjs/common';
import type { SystemFlag } from 'generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

export const SYSTEM_FLAG_ID = 'global';

export interface SystemFlagsUpdate {
  renders_enabled?: boolean;
  dewatermark_enabled?: boolean;
  scrape_enabled?: boolean;
}

/** Singleton kill-switch row (id = "global"), created on first read. */
@Injectable()
export class SystemFlagsService {
  constructor(private readonly prisma: PrismaService) {}

  get(): Promise<SystemFlag> {
    return this.prisma.systemFlag.upsert({
      where: { id: SYSTEM_FLAG_ID },
      update: {},
      create: { id: SYSTEM_FLAG_ID },
    });
  }

  update(data: SystemFlagsUpdate): Promise<SystemFlag> {
    return this.prisma.systemFlag.upsert({
      where: { id: SYSTEM_FLAG_ID },
      update: data,
      create: { id: SYSTEM_FLAG_ID, ...data },
    });
  }
}
