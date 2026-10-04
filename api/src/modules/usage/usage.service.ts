import { Injectable } from '@nestjs/common';
import { ProjectStatus } from 'generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import type { Quota, UsageResponse } from './interfaces/usage.interface';

type Db = Pick<PrismaService, 'usageLedger' | 'project' | 'user'>;

export const ACTIVE_RENDER_STATUSES = [ProjectStatus.QUEUED, ProjectStatus.CREATING];

@Injectable()
export class UsageService {
  constructor(private readonly prisma: PrismaService) {}

  /** [start, nextStart) of the current UTC calendar month. */
  monthWindow(now = new Date()): { start: Date; end: Date } {
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
    return { start, end };
  }

  /** Quota used = sum of ledger quota_units this UTC month (refunds are negative rows). */
  async usedThisMonth(userId: string, db: Db = this.prisma): Promise<number> {
    const { start, end } = this.monthWindow();
    const result = await db.usageLedger.aggregate({
      where: { user_id: userId, created_at: { gte: start, lt: end } },
      _sum: { quota_units: true },
    });
    return Math.max(0, result._sum.quota_units ?? 0);
  }

  async getQuota(userId: string, limit?: number, db: Db = this.prisma): Promise<Quota> {
    const [used, resolvedLimit] = await Promise.all([
      this.usedThisMonth(userId, db),
      limit !== undefined
        ? Promise.resolve(limit)
        : db.user
            .findUnique({ where: { id: userId }, select: { monthly_video_quota: true } })
            .then((u) => u?.monthly_video_quota ?? 0),
    ]);

    return {
      used,
      limit: resolvedLimit,
      remaining: Math.max(0, resolvedLimit - used),
      resets_at: this.monthWindow().end.toISOString(),
    };
  }

  async findActiveRenderProjectId(userId: string, excludeProjectId?: string, db: Db = this.prisma) {
    const project = await db.project.findFirst({
      where: {
        user_id: userId,
        deleted_at: null,
        status: { in: ACTIVE_RENDER_STATUSES },
        ...(excludeProjectId ? { id: { not: excludeProjectId } } : {}),
      },
      select: { id: true },
      orderBy: { created_at: 'desc' },
    });
    return project?.id ?? null;
  }

  async getUsage(userId: string): Promise<UsageResponse> {
    const [quota, activeId] = await Promise.all([
      this.getQuota(userId),
      this.findActiveRenderProjectId(userId),
    ]);
    return { ...quota, active_render_project_id: activeId };
  }
}
