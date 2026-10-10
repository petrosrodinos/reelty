import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import type { SystemFlag } from 'generated/prisma';
import { AuthRole, CreditTxKind, ProjectStatus } from 'generated/prisma';
import { GcsObjectsService } from '@/integrations/storage/gcs/services/gcs-objects.service';
import { StoragePaths } from '@/integrations/storage/gcs/storage-paths';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { QueuesService } from '@/core/queues/queues.service';
import { AppConfigService } from '@/modules/app-config/app-config.service';
import type { AdminUsageQueryType } from '@/modules/usage/dto/usage-history-query.schema';
import { UsageService } from '@/modules/usage/usage.service';
import { SystemFlagsService } from '@/modules/system-flags/system-flags.service';
import { BillingService } from '@/modules/billing/billing.service';
import type { AdminPurchasesQueryType } from '@/modules/billing/dto/purchases-query.schema';
import { CreditsService } from '@/modules/credits/credits.service';
import { CreditRatesService } from '@/modules/credits/services/credit-rates.service';
import { CreditTiersService } from '@/modules/credits/services/credit-tiers.service';
import { ReplaceCreditRateTiersDto } from '@/modules/credits/dto/credit-rate-tier.dto';
import { ReplaceCreditTiersDto } from '@/modules/credits/dto/credit-tier.dto';
import { GrantCreditsDto } from '@/modules/credits/dto/grant-credits.dto';
import { ErrorCodes } from '@/shared/config/error-codes';
import { ApiException } from '@/shared/errors/api-exception';
import { UpdateFlagsDto } from './dto/update-flags.dto';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly queues: QueuesService,
    private readonly flags: SystemFlagsService,
    private readonly appConfig: AppConfigService,
    private readonly usage: UsageService,
    private readonly credits: CreditsService,
    private readonly tiers: CreditTiersService,
    private readonly rates: CreditRatesService,
    private readonly billing: BillingService,
    private readonly gcs: GcsObjectsService,
  ) {}

  listConfig() {
    return this.appConfig.list();
  }

  updateConfig(key: string, value: number) {
    return this.appConfig.update(key, value);
  }

  async listUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: { email: 'asc' },
      select: {
        id: true,
        email: true,
        credit_balance: true,
        full_name: true,
        role: true,
        email_verified_at: true,
        created_at: true,
        _count: { select: { projects: true } },
      },
    });
    return users.map(({ _count, ...user }) => ({
      ...user,
      email_verified_at: user.email_verified_at?.toISOString() ?? null,
      created_at: user.created_at.toISOString(),
      projects_count: _count.projects,
    }));
  }

  /**
   * Permanently deletes a user and everything they own: stored files (the whole `users/<id>/` prefix in the
   * bucket) first, then the database rows, which cascade (projects, images, purchases, credits, usage, tokens).
   * Storage goes first so a storage failure leaves the account intact and the call can simply be retried.
   */
  async deleteUser(adminId: string, userId: string): Promise<void> {
    if (userId === adminId) {
      throw new ApiException(HttpStatus.BAD_REQUEST, ErrorCodes.FORBIDDEN, 'You cannot delete your own account here.');
    }
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, role: true } });
    if (!user) throw new ApiException(HttpStatus.NOT_FOUND, ErrorCodes.NOT_FOUND, 'User not found.');
    if (user.role !== AuthRole.USER) {
      throw new ApiException(HttpStatus.FORBIDDEN, ErrorCodes.FORBIDDEN, 'Staff accounts cannot be deleted here.');
    }

    const projects = await this.prisma.project.findMany({
      where: { user_id: userId },
      select: { id: true, status: true, images: { select: { id: true } } },
    });
    if (projects.some((p) => p.status === ProjectStatus.QUEUED || p.status === ProjectStatus.CREATING)) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        ErrorCodes.RENDER_IN_PROGRESS,
        'This user has a video being created. Try again once it has finished.',
      );
    }

    await Promise.all(
      projects.map((p) =>
        this.queues.removeProjectJobs(
          p.id,
          p.images.map((i) => i.id),
        ),
      ),
    );

    try {
      await this.gcs.deletePrefix(StoragePaths.userPrefix(userId));
    } catch (error) {
      this.logger.error(`Failed to delete storage for user ${userId}: ${(error as Error).message}`);
      throw new ApiException(
        HttpStatus.BAD_GATEWAY,
        ErrorCodes.STORAGE_ERROR,
        'Could not delete the stored files. Nothing was deleted, please try again.',
      );
    }

    await this.prisma.user.delete({ where: { id: userId } });
  }

  // ------------------------------------------------------------------ credits

  listCreditTiers() {
    return this.tiers.listJson();
  }

  replaceCreditTiers(dto: ReplaceCreditTiersDto) {
    return this.tiers.replaceAll(dto);
  }

  listCreditRates() {
    return this.rates.listJson();
  }

  replaceCreditRates(dto: ReplaceCreditRateTiersDto) {
    return this.rates.replaceAll(dto);
  }

  getPurchases(query: AdminPurchasesQueryType) {
    return this.billing.listForAdmin(query);
  }

  /** Manual balance change (goodwill, support refunds). Removing more than the balance is refused. */
  async adjustCredits(userId: string, dto: GrantCreditsDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (!user) throw new ApiException(HttpStatus.NOT_FOUND, ErrorCodes.NOT_FOUND, 'User not found');
    await this.prisma.$transaction((tx) =>
      this.credits.apply(tx, userId, dto.credits, CreditTxKind.admin_adjustment, { note: dto.note ?? null }),
    );
    return { user_id: userId, balance: await this.credits.getBalance(userId) };
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
