import { Injectable } from '@nestjs/common';
import type { SystemFlag } from 'generated/prisma';
import { ProjectStatus } from 'generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { QueuesService } from '@/core/queues/queues.service';
import { AppConfigService } from '@/modules/app-config/app-config.service';
import type { AdminUsageQueryType } from '@/modules/usage/dto/usage-history-query.schema';
import { UsageService } from '@/modules/usage/usage.service';
import { SystemFlagsService } from '@/modules/system-flags/system-flags.service';
import { UpdateFlagsDto } from './dto/update-flags.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queues: QueuesService,
    private readonly flags: SystemFlagsService,
    private readonly appConfig: AppConfigService,
    private readonly usage: UsageService,
  ) {}

  listConfig() {
    return this.appConfig.list();
  }

  updateConfig(key: string, value: number) {
    return this.appConfig.update(key, value);
  }

  getCostHistory(query: AdminUsageQueryType) {
    return this.usage.getCostHistory(query);
  }

  getProjectCost(projectId: string) {
    return this.usage.getProjectCost(projectId);
  }

  private serializeFlags(flags: SystemFlag) {
    return {
      renders_enabled: flags.renders_enabled,
      dewatermark_enabled: flags.dewatermark_enabled,
      scrape_enabled: flags.scrape_enabled,
      updated_at: flags.updated_at.toISOString(),
    };
  }

  async getFlags() {
    return this.serializeFlags(await this.flags.get());
  }

  async updateFlags(dto: UpdateFlagsDto) {
    const data = {
      ...(dto.renders_enabled !== undefined ? { renders_enabled: dto.renders_enabled } : {}),
      ...(dto.dewatermark_enabled !== undefined ? { dewatermark_enabled: dto.dewatermark_enabled } : {}),
      ...(dto.scrape_enabled !== undefined ? { scrape_enabled: dto.scrape_enabled } : {}),
    };
    return this.serializeFlags(await this.flags.update(data));
  }

  async getStats() {
    const [queues, recentFailures, flags, grouped, usersTotal, failedProjects] = await Promise.all([
      this.queues.getCounts(),
      this.queues.getRecentFailures(),
      this.flags.get(),
      this.prisma.project.groupBy({
        by: ['status'],
        where: { deleted_at: null },
        _count: { _all: true },
      }),
      this.prisma.user.count(),
      this.prisma.project.findMany({
        where: { status: ProjectStatus.FAILED, deleted_at: null },
        orderBy: { updated_at: 'desc' },
        take: 10,
        select: { id: true, failure_code: true, failure_reason: true, updated_at: true },
      }),
    ]);

    const projectsByStatus: Record<string, number> = {};
    for (const status of Object.values(ProjectStatus)) projectsByStatus[status] = 0;
    for (const row of grouped) projectsByStatus[row.status] = row._count._all;

    return {
      queues,
      recent_failures: recentFailures,
      recent_failed_projects: failedProjects.map((p) => ({
        id: p.id,
        failure_code: p.failure_code,
        failure_reason: p.failure_reason,
        updated_at: p.updated_at.toISOString(),
      })),
      projects_by_status: projectsByStatus,
      users_total: usersTotal,
      flags: this.serializeFlags(flags),
    };
  }
}
