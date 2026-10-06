import { HttpStatus, Injectable } from '@nestjs/common';
import { LedgerKind, Prisma, ProjectStatus } from 'generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { ApiException } from '@/shared/errors/api-exception';
import { ErrorCodes } from '@/shared/config/error-codes';
import type { AdminUsageQueryType, UsageHistoryQueryType } from './dto/usage-history-query.schema';
import type {
  CostBreakdownItem,
  CostHistoryResponse,
  CostSummary,
  Pagination,
  ProjectCostSummary,
  QuotaHistoryResponse,
  Quota,
  UsageResponse,
} from './interfaces/usage.interface';

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

  /** The user's own quota activity (charges and refunds). Provider costs are never exposed here. */
  async getQuotaHistory(userId: string, query: UsageHistoryQueryType): Promise<QuotaHistoryResponse> {
    const where: Prisma.UsageLedgerWhereInput = {
      user_id: userId,
      kind: query.kind ?? { in: [LedgerKind.video, LedgerKind.video_refund] },
    };

    const [rows, total] = await Promise.all([
      this.prisma.usageLedger.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        include: { project: { select: { title: true } } },
      }),
      this.prisma.usageLedger.count({ where }),
    ]);

    return {
      data: rows.map((row) => ({
        id: row.id,
        project_id: row.project_id,
        project_title: row.project?.title ?? null,
        kind: row.kind as 'video' | 'video_refund',
        quota_units: row.quota_units,
        created_at: row.created_at.toISOString(),
      })),
      pagination: this.paginate(total, query.page, query.limit),
    };
  }

  /** Operator view: every ledger row across users with credits and USD cost, plus totals over the filtered set. */
  async getCostHistory(query: AdminUsageQueryType): Promise<CostHistoryResponse> {
    const where: Prisma.UsageLedgerWhereInput = {
      ...(query.kind ? { kind: query.kind } : {}),
      ...(query.user_id ? { user_id: query.user_id } : {}),
      ...(query.project_id ? { project_id: query.project_id } : {}),
      ...(query.from || query.to
        ? {
            created_at: {
              ...(query.from ? { gte: new Date(query.from) } : {}),
              ...(query.to ? { lt: new Date(query.to) } : {}),
            },
          }
        : {}),
    };

    const [rows, total, summary] = await Promise.all([
      this.prisma.usageLedger.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        include: { project: { select: { title: true } }, user: { select: { email: true } } },
      }),
      this.prisma.usageLedger.count({ where }),
      this.summarize(where),
    ]);

    return {
      data: rows.map((row) => ({
        id: row.id,
        user_id: row.user_id,
        user_email: row.user.email,
        project_id: row.project_id,
        project_title: row.project?.title ?? null,
        kind: row.kind,
        quota_units: row.quota_units,
        credits: row.credits,
        cost_usd: row.cost_usd,
        cost_estimated: row.cost_estimated,
        note: row.note,
        created_at: row.created_at.toISOString(),
      })),
      pagination: this.paginate(total, query.page, query.limit),
      summary,
    };
  }

  /** Operator view: cost of one project (any user, including soft-deleted ones), grouped by ledger kind. */
  async getProjectCost(projectId: string): Promise<ProjectCostSummary> {
    const project = await this.prisma.project.findUnique({ where: { id: projectId }, select: { id: true } });
    if (!project) throw new ApiException(HttpStatus.NOT_FOUND, ErrorCodes.NOT_FOUND, 'Not found');

    const summary = await this.summarize({ project_id: projectId });
    return { project_id: projectId, ...summary };
  }

  private paginate(total: number, page: number, limit: number): Pagination {
    const totalPages = Math.ceil(total / limit);
    return { total, page, limit, total_pages: totalPages, has_next: page < totalPages, has_prev: page > 1 };
  }

  private async summarize(where: Prisma.UsageLedgerWhereInput): Promise<CostSummary> {
    const [groups, estimated] = await Promise.all([
      this.prisma.usageLedger.groupBy({
        by: ['kind'],
        where,
        _count: { _all: true },
        _sum: { quota_units: true, credits: true, cost_usd: true },
        orderBy: { kind: 'asc' },
      }),
      this.prisma.usageLedger.aggregate({
        where: { ...where, cost_estimated: true },
        _sum: { cost_usd: true },
      }),
    ]);

    const breakdown: CostBreakdownItem[] = groups.map((g) => ({
      kind: g.kind,
      entries: g._count._all,
      quota_units: g._sum.quota_units ?? 0,
      credits: g._sum.credits ?? 0,
      cost_usd: g._sum.cost_usd ?? 0,
    }));

    return {
      entries: breakdown.reduce((n, b) => n + b.entries, 0),
      total_cost_usd: breakdown.reduce((n, b) => n + b.cost_usd, 0),
      estimated_cost_usd: estimated._sum.cost_usd ?? 0,
      breakdown,
    };
  }
}
