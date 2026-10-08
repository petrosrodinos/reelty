import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ConsentType,
  LedgerKind,
  Prisma,
  type Project,
  ProjectStatus,
  RenderStep,
  SourceType,
  WatermarkStatus,
} from 'generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { JobNames } from '@/core/queues/queues.constants';
import { QueuesService } from '@/core/queues/queues.service';
import { StoragePaths } from '@/integrations/storage/gcs/storage-paths';
import { GcsObjectsService } from '@/integrations/storage/gcs/services/gcs-objects.service';
import { ErrorCodes } from '@/shared/config/error-codes';
import { ApiException } from '@/shared/errors/api-exception';
import { SystemFlagsService } from '@/modules/system-flags/system-flags.service';
import { UsageService } from '@/modules/usage/usage.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SubmitProjectDto } from './dto/submit-project.dto';
import type { ProjectQueryType } from './dto/project-query.schema';
import type {
  Paginated,
  ProjectJson,
  SignedDownloadResponse,
  SignedUrlResponse,
} from './interfaces/project.interface';
import { MediaUrlsService } from './services/media-urls.service';
import { ProjectSerializer } from './services/project-serializer.service';
import { getLimits } from './utils/limits.utils';
import { normalizeWebsiteUrl, parseAirbnbUrl, slugify } from './utils/source-url.utils';

type ProjectDetail = Prisma.ProjectGetPayload<{
  include: { images: true; consents: { select: { id: true } } };
}>;

const READY_IMAGES = { removed: false, ready: true } as const;

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly queues: QueuesService,
    private readonly usage: UsageService,
    private readonly flags: SystemFlagsService,
    private readonly gcs: GcsObjectsService,
    private readonly media: MediaUrlsService,
    private readonly serializer: ProjectSerializer,
  ) {}

  // ------------------------------------------------------------------ access

  /** Project owned by the user (not soft-deleted) or 404. */
  async findOwnedOrThrow(userId: string, projectId: string): Promise<Project> {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, user_id: userId, deleted_at: null },
    });
    if (!project) this.notFound();
    return project;
  }

  isLocked(project: Pick<Project, 'submitted_at'>): boolean {
    return project.submitted_at !== null;
  }

  assertUnlocked(project: Pick<Project, 'submitted_at'>) {
    if (this.isLocked(project)) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        ErrorCodes.PROJECT_LOCKED,
        'This video was already submitted and can no longer be edited.',
      );
    }
  }

  private notFound(): never {
    throw new ApiException(HttpStatus.NOT_FOUND, ErrorCodes.NOT_FOUND, 'Not found');
  }

  // ------------------------------------------------------------------ create

  async create(userId: string, dto: CreateProjectDto): Promise<ProjectJson> {
    let sourceUrl: string | null = null;
    const isLink = dto.source_type !== SourceType.upload;

    if (dto.source_type === SourceType.website) {
      sourceUrl = normalizeWebsiteUrl(dto.source_url);
    } else if (dto.source_type === SourceType.airbnb) {
      sourceUrl = parseAirbnbUrl(dto.source_url).url;
    }

    if (isLink) {
      const flags = await this.flags.get();
      if (!flags.scrape_enabled) {
        throw new ApiException(
          HttpStatus.SERVICE_UNAVAILABLE,
          ErrorCodes.SCRAPE_DISABLED,
          'Fetching photos from links is temporarily unavailable. You can upload photos instead.',
        );
      }
      if (!this.config.get<string>('APIFY_TOKEN')) {
        throw new ApiException(
          HttpStatus.SERVICE_UNAVAILABLE,
          ErrorCodes.SCRAPE_UNAVAILABLE,
          'Fetching photos from links is not available. You can upload photos instead.',
        );
      }
    }

    const project = await this.prisma.project.create({
      data: {
        user_id: userId,
        source_type: dto.source_type,
        source_url: sourceUrl,
        status: isLink ? ProjectStatus.FETCHING : ProjectStatus.DRAFT,
      },
    });

    if (isLink) {
      try {
        await this.queues.enqueueScrape(project.id, dto.source_type as 'website' | 'airbnb');
      } catch (error) {
        await this.prisma.project.delete({ where: { id: project.id } }).catch(() => undefined);
        throw error;
      }
    }

    return this.serializeDetail(await this.loadDetail(userId, project.id), false);
  }

  // -------------------------------------------------------------------- read

  async findAll(userId: string, query: ProjectQueryType): Promise<Paginated<ProjectJson>> {
    const where: Prisma.ProjectWhereInput = {
      user_id: userId,
      deleted_at: null,
      ...(query.status ? { status: query.status } : {}),
    };

    const [rows, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        include: {
          consents: { where: { type: ConsentType.watermark }, select: { id: true }, take: 1 },
          images: {
            where: READY_IMAGES,
            orderBy: { position: 'asc' },
            take: 4,
            select: { gcs_thumb_path: true },
          },
          _count: { select: { images: { where: READY_IMAGES } } },
        },
      }),
      this.prisma.project.count({ where }),
    ]);

    const data = await Promise.all(
      rows.map(({ images, consents, _count, ...project }) =>
        this.serializer.toListItem(project as Project, {
          imageCount: _count.images,
          watermarkConsent: consents.length > 0,
          previewThumbPaths: images.map((i) => i.gcs_thumb_path).filter((p): p is string => !!p),
        }),
      ),
    );

    const totalPages = Math.ceil(total / query.limit);
    return {
      data,
      pagination: {
        total,
        page: query.page,
        limit: query.limit,
        total_pages: totalPages,
        has_next: query.page < totalPages,
        has_prev: query.page > 1,
      },
    };
  }

  async findOne(userId: string, projectId: string): Promise<ProjectJson> {
    return this.serializeDetail(await this.loadDetail(userId, projectId), true);
  }

  /** Reloads and serializes a project with its images (used by other modules). */
  async getDetailJson(userId: string, projectId: string): Promise<ProjectJson> {
    return this.findOne(userId, projectId);
  }

  private async loadDetail(userId: string, projectId: string): Promise<ProjectDetail> {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, user_id: userId, deleted_at: null },
      include: {
        images: { where: READY_IMAGES, orderBy: { position: 'asc' } },
        consents: { where: { type: ConsentType.watermark }, select: { id: true }, take: 1 },
      },
    });
    if (!project) this.notFound();
    return project;
  }

  private serializeDetail(detail: ProjectDetail, withImages: boolean): Promise<ProjectJson> {
    const { images, consents, ...project } = detail;
    return this.serializer.toProject(project as Project, {
      imageCount: images.length,
      watermarkConsent: consents.length > 0,
      images: withImages ? images : undefined,
    });
  }

  // ------------------------------------------------------------------ update

  async update(userId: string, projectId: string, dto: UpdateProjectDto): Promise<ProjectJson> {
    const project = await this.findOwnedOrThrow(userId, projectId);
    this.assertUnlocked(project);

    const blankToNull = (value: string | null | undefined) =>
      value === undefined ? undefined : value === null || value.trim() === '' ? null : value.trim();

    await this.prisma.project.update({
      where: { id: project.id },
      data: {
        ...(dto.title !== undefined && dto.title !== null ? { title: dto.title.trim() } : {}),
        subtitle: blankToNull(dto.subtitle),
        location_line: blankToNull(dto.location_line),
        closing_line: blankToNull(dto.closing_line),
        ...(dto.music_enabled !== undefined && dto.music_enabled !== null
          ? { music_enabled: dto.music_enabled }
          : {}),
      },
    });

    return this.findOne(userId, projectId);
  }

  // ------------------------------------------------------------------ delete

  async remove(userId: string, projectId: string): Promise<void> {
    const project = await this.findOwnedOrThrow(userId, projectId);

    // Claim the project (hides it everywhere) unless a render is active.
    const claimed = await this.prisma.project.updateMany({
      where: {
        id: project.id,
        deleted_at: null,
        status: { notIn: [ProjectStatus.QUEUED, ProjectStatus.CREATING] },
      },
      data: { deleted_at: new Date() },
    });
    if (claimed.count === 0) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        ErrorCodes.RENDER_IN_PROGRESS,
        'This video is being created and cannot be deleted yet.',
      );
    }

    const processing = await this.prisma.image.findMany({
      where: { project_id: project.id, wm_status: WatermarkStatus.processing },
      select: { id: true },
    });
    await this.queues.removeProjectJobs(
      project.id,
      processing.map((i) => i.id),
    );

    try {
      if (this.media.isConfigured()) {
        await this.gcs.deletePrefix(StoragePaths.projectPrefix(userId, project.id));
      }
    } catch (error) {
      this.logger.error(`Failed to delete storage for project ${project.id}: ${(error as Error).message}`);
      await this.prisma.project.update({ where: { id: project.id }, data: { deleted_at: null } });
      throw new ApiException(
        HttpStatus.BAD_GATEWAY,
        ErrorCodes.STORAGE_ERROR,
        'Could not delete the stored files. Nothing was deleted, please try again.',
      );
    }

    await this.prisma.project.delete({ where: { id: project.id } });
  }

  // ------------------------------------------------------------------ submit

  async submit(
    userId: string,
    projectId: string,
    dto: SubmitProjectDto,
    ip: string | null,
  ): Promise<ProjectJson> {
    const limits = getLimits();
    const [project, user] = await Promise.all([
      this.findOwnedOrThrow(userId, projectId),
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { email_verified_at: true, monthly_video_quota: true },
      }),
    ]);

    if (!user?.email_verified_at) {
      throw new ApiException(
        HttpStatus.FORBIDDEN,
        ErrorCodes.EMAIL_NOT_VERIFIED,
        'Please verify your email address before creating a video.',
      );
    }
    if (project.status !== ProjectStatus.READY || project.submitted_at) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        ErrorCodes.INVALID_STATUS,
        'This video is not ready to be created.',
      );
    }

    const images = await this.prisma.image.findMany({
      where: { project_id: project.id, ...READY_IMAGES },
      select: { wm_status: true },
    });
    if (images.length < limits.minImages || images.length > limits.maxImages) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.IMAGE_COUNT_INVALID,
        `A video needs between ${limits.minImages} and ${limits.maxImages} photos.`,
      );
    }
    if (images.some((i) => i.wm_status === WatermarkStatus.processing)) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        ErrorCodes.WATERMARK_PROCESSING,
        'Watermark removal is still running on some photos. Please wait for it to finish.',
      );
    }

    await this.assertRenderSlot(this.prisma, userId, project.id, user.monthly_video_quota, true);
    await this.assertRendersEnabled();

    const now = new Date();
    await this.runSerializable(async (tx) => {
      await this.assertRenderSlot(tx, userId, project.id, user.monthly_video_quota, true);

      const claimed = await tx.project.updateMany({
        where: {
          id: project.id,
          user_id: userId,
          status: ProjectStatus.READY,
          submitted_at: null,
          deleted_at: null,
        },
        data: {
          status: ProjectStatus.QUEUED,
          render_step: RenderStep.QUEUED,
          submitted_at: now,
          rights_attested_at: project.rights_attested_at ?? now,
          quota_charged: true,
          partial: false,
          failure_reason: null,
          failure_code: null,
          completed_at: null,
          clips_total: images.length,
          clips_done: 0,
        },
      });
      if (claimed.count === 0) {
        throw new ApiException(
          HttpStatus.CONFLICT,
          ErrorCodes.INVALID_STATUS,
          'This video is not ready to be created.',
        );
      }

      await tx.usageLedger.create({
        data: {
          user_id: userId,
          project_id: project.id,
          kind: LedgerKind.video,
          quota_units: 1,
          note: 'render submitted',
        },
      });
    });

    try {
      await this.queues.enqueueRender(project.id);
    } catch (error) {
      await this.revertSubmit(project);
      throw error;
    }

    return this.findOne(userId, projectId);
  }

  private async revertSubmit(project: Project) {
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.project.update({
          where: { id: project.id },
          data: {
            status: ProjectStatus.READY,
            render_step: null,
            submitted_at: null,
            quota_charged: false,
            clips_total: project.clips_total,
          },
        });
        await tx.usageLedger.deleteMany({
          where: { project_id: project.id, kind: LedgerKind.video, note: 'render submitted' },
        });
      });
    } catch (error) {
      this.logger.error(`Failed to revert submit of ${project.id}: ${(error as Error).message}`);
    }
  }

  // ------------------------------------------------------------------- retry

  async retry(userId: string, projectId: string): Promise<ProjectJson> {
    const project = await this.findOwnedOrThrow(userId, projectId);

    if (project.status !== ProjectStatus.FAILED) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        ErrorCodes.INVALID_STATUS,
        'Only a failed video can be retried.',
      );
    }

    // A link import that failed before submit: run the scrape again.
    if (!project.submitted_at) {
      return this.retryScrape(userId, project);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { monthly_video_quota: true },
    });
    const quotaLimit = user?.monthly_video_quota ?? 0;

    await this.assertRendersEnabled();

    let retryNumber = 0;
    let recharged = false;

    await this.runSerializable(async (tx) => {
      // Charged = net quota units on this project's ledger rows (refunds are negative rows).
      const net = await tx.usageLedger.aggregate({
        where: { project_id: project.id, user_id: userId },
        _sum: { quota_units: true },
      });
      recharged = (net._sum.quota_units ?? 0) < 1;

      await this.assertRenderSlot(tx, userId, project.id, quotaLimit, recharged);

      const previousRetries = await tx.jobEvent.count({
        where: { project_id: project.id, job_name: JobNames.RENDER_VIDEO, step: 'RETRY' },
      });
      retryNumber = previousRetries + 1;

      const claimed = await tx.project.updateMany({
        where: { id: project.id, user_id: userId, status: ProjectStatus.FAILED, deleted_at: null },
        data: {
          status: ProjectStatus.QUEUED,
          render_step: RenderStep.QUEUED,
          failure_reason: null,
          failure_code: null,
          completed_at: null,
          render_started_at: null,
          quota_charged: true,
        },
      });
      if (claimed.count === 0) {
        throw new ApiException(
          HttpStatus.CONFLICT,
          ErrorCodes.INVALID_STATUS,
          'Only a failed video can be retried.',
        );
      }

      if (recharged) {
        await tx.usageLedger.create({
          data: {
            user_id: userId,
            project_id: project.id,
            kind: LedgerKind.video,
            quota_units: 1,
            note: 'render retried',
          },
        });
      }
      await tx.jobEvent.create({
        data: {
          project_id: project.id,
          job_name: JobNames.RENDER_VIDEO,
          step: 'RETRY',
          status: 'requested',
          message: `retry ${retryNumber}`,
        },
      });
    });

    try {
      await this.queues.enqueueRender(project.id, retryNumber);
    } catch (error) {
      await this.revertRetry(project, recharged, retryNumber);
      throw error;
    }

    return this.findOne(userId, projectId);
  }

  private async retryScrape(userId: string, project: Project): Promise<ProjectJson> {
    if (project.source_type === SourceType.upload) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        ErrorCodes.INVALID_STATUS,
        'Only a failed video can be retried.',
      );
    }
    const flags = await this.flags.get();
    if (!flags.scrape_enabled) {
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.SCRAPE_DISABLED,
        'Fetching photos from links is temporarily unavailable. You can upload photos instead.',
      );
    }

    const claimed = await this.prisma.project.updateMany({
      where: { id: project.id, status: ProjectStatus.FAILED, submitted_at: null },
      data: { status: ProjectStatus.FETCHING, failure_reason: null, failure_code: null, scrape_error: null },
    });
    if (claimed.count === 0) {
      throw new ApiException(HttpStatus.CONFLICT, ErrorCodes.INVALID_STATUS, 'Only a failed video can be retried.');
    }

    try {
      await this.queues.enqueueScrape(project.id, project.source_type as 'website' | 'airbnb');
    } catch (error) {
      await this.prisma.project.update({
        where: { id: project.id },
        data: {
          status: ProjectStatus.FAILED,
          failure_reason: project.failure_reason,
          failure_code: project.failure_code,
        },
      });
      throw error;
    }

    return this.findOne(userId, project.id);
  }

  private async revertRetry(project: Project, recharged: boolean, retryNumber: number) {
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.project.update({
          where: { id: project.id },
          data: {
            status: ProjectStatus.FAILED,
            render_step: project.render_step,
            failure_reason: project.failure_reason,
            failure_code: project.failure_code,
            completed_at: project.completed_at,
            render_started_at: project.render_started_at,
            quota_charged: project.quota_charged,
          },
        });
        if (recharged) {
          await tx.usageLedger.deleteMany({
            where: { project_id: project.id, kind: LedgerKind.video, note: 'render retried' },
          });
        }
        await tx.jobEvent.deleteMany({
          where: { project_id: project.id, step: 'RETRY', message: `retry ${retryNumber}` },
        });
      });
    } catch (error) {
      this.logger.error(`Failed to revert retry of ${project.id}: ${(error as Error).message}`);
    }
  }

  // --------------------------------------------------------------- video URLs

  async getPlayUrl(userId: string, projectId: string): Promise<SignedUrlResponse> {
    const project = await this.requireCompletedVideo(userId, projectId);
    const url = await this.media.requireRead(project.video_gcs_path as string, {
      contentType: 'video/mp4',
    });
    return { url, expires_in: this.media.expiresIn };
  }

  async getDownloadUrl(userId: string, projectId: string): Promise<SignedDownloadResponse> {
    const project = await this.requireCompletedVideo(userId, projectId);
    const filename = `${slugify(project.title) || 'video'}.mp4`;
    const url = await this.media.requireRead(project.video_gcs_path as string, {
      downloadFilename: filename,
      contentType: 'video/mp4',
    });
    return { url, expires_in: this.media.expiresIn, filename };
  }

  private async requireCompletedVideo(userId: string, projectId: string): Promise<Project> {
    const project = await this.findOwnedOrThrow(userId, projectId);
    if (project.status !== ProjectStatus.COMPLETED || !project.video_gcs_path) {
      throw new ApiException(HttpStatus.CONFLICT, ErrorCodes.VIDEO_NOT_READY, 'Your video is not ready yet.');
    }
    return project;
  }

  // ----------------------------------------------------------------- helpers

  private async assertRendersEnabled() {
    const flags = await this.flags.get();
    if (!flags.renders_enabled) {
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.RENDERS_DISABLED,
        'Video creation is temporarily paused. Please try again later.',
      );
    }
  }

  /** Quota (402) and one-active-render (409) rules. Works on the prisma client or a transaction. */
  private async assertRenderSlot(
    db: Pick<PrismaService, 'usageLedger' | 'project' | 'user'>,
    userId: string,
    projectId: string,
    quotaLimit: number,
    needsCharge: boolean,
  ) {
    if (needsCharge) {
      const quota = await this.usage.getQuota(userId, quotaLimit, db);
      if (quota.remaining <= 0) {
        throw new ApiException(
          HttpStatus.PAYMENT_REQUIRED,
          ErrorCodes.QUOTA_EXCEEDED,
          'You have used all your videos for this month.',
        );
      }
    }

    const active = await this.usage.findActiveRenderProjectId(userId, projectId, db);
    if (active) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        ErrorCodes.RENDER_IN_PROGRESS,
        'You already have a video being created. Please wait until it finishes.',
        { active_render_project_id: active },
      );
    }
  }

  /** Serializable transaction; a write conflict means another render slot was taken concurrently. */
  private async runSerializable<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    try {
      return await this.prisma.$transaction(fn, {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000,
        timeout: 15000,
      });
    } catch (error) {
      if ((error as { code?: string }).code === 'P2034') {
        throw new ApiException(
          HttpStatus.CONFLICT,
          ErrorCodes.RENDER_IN_PROGRESS,
          'You already have a video being created. Please wait until it finishes.',
        );
      }
      throw error;
    }
  }
}
