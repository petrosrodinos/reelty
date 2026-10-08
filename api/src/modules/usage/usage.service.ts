import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, ProjectStatus } from 'generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { ApiException } from '@/shared/errors/api-exception';
import { ErrorCodes } from '@/shared/config/error-codes';
import type { AdminUsageQueryType } from './dto/usage-history-query.schema';
import type {
  CostBreakdownItem,
  CostHistoryResponse,
  CostSummary,
  Pagination,
  ProjectCostSummary,
  UsageResponse,
} from './interfaces/usage.interface';

type Db = Pick<PrismaService, 'usageLedger' | 'project' | 'user'>;

export const ACTIVE_RENDER_STATUSES = [ProjectStatus.QUEUED, ProjectStatus.CREATING];

@Injectable()
export class UsageService {
  constructor(private readonly prisma: PrismaService) {}

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

  /** Credit balance plus the render in progress (polled by the app while a video is being created). */
  async getUsage(userId: string): Promise<UsageResponse> {
    const [user, activeId] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId }, select: { credit_balance: true } }),
      this.findActiveRenderProjectId(userId),
    ]);
    return { credit_balance: user?.credit_balance ?? 0, active_render_project_id: activeId };
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
