import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import type { Image, Project } from 'generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { JobNames } from '@/core/queues/queues.constants';
import { GcsObjectsService } from '@/integrations/storage/gcs/services/gcs-objects.service';
import { StoragePaths } from '@/integrations/storage/gcs/storage-paths';
import { VideoProviderResolver } from '@/integrations/video-generation/video-provider.resolver';
import {
  ClipRequest,
  ClipSubmitResult,
  GCS_URL_PREFIX,
  ProviderConfigError,
  ProviderRejectedError,
  VideoGenerationProvider,
} from '@/integrations/video-generation/video-generation.provider';
import { JobEventsService } from '../common/job-events.service';
import { mapPool } from '../common/pool';
import { SystemFlagsService } from '../common/system-flags.service';
import { withTempDir } from '../common/temp-dir';
import { WorkerConfigService } from '../common/worker-config.service';
import { NotifyQueueService } from '../notify/notify-queue.service';
import { AssemblyError, AssemblyService } from './assembly.service';
import { selectPrompt } from './prompts';
import {
  BLOCK_MAX_MS,
  BLOCK_RECHECK_MS,
  GENERATING_CAP_MS,
  MAX_RESUBMIT_ROUNDS,
  RENDERS_DISABLED_RECHECK_MS,
  RenderFailure,
  RenderOutcome,
  pollDelayMs,
  userMessageFor,
} from './render.constants';

export interface RenderContext {
  bullmqJobId?: string;
  /** True when BullMQ will not retry this job after a thrown error. */
  isLastAttempt: boolean;
}

const DONE: RenderOutcome = { kind: 'done' };
const delay = (ms: number): RenderOutcome => ({ kind: 'delay', ms });
const ACTIVE_STATUSES = ['QUEUED', 'CREATING'] as const;
const JOB = JobNames.RENDER_VIDEO;

/**
 * Render job as a resumable state machine (spec §5.3). All state lives in Postgres (project.render_step +
 * per-image clip columns); every call to `run` re-reads it, does the next unit of work and either finishes,
 * asks the processor to re-schedule the job (`delay`) or throws for a BullMQ retry.
 */
@Injectable()
export class RenderService {
  private readonly logger = new Logger(RenderService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly gcs: GcsObjectsService,
    private readonly providers: VideoProviderResolver,
    private readonly assembly: AssemblyService,
    private readonly config: WorkerConfigService,
    private readonly flags: SystemFlagsService,
    private readonly events: JobEventsService,
    private readonly notify: NotifyQueueService,
  ) {}

  async run(projectId: string, ctx: RenderContext): Promise<RenderOutcome> {
    try {
      return await this.loop(projectId, ctx);
    } catch (error) {
      if (error instanceof RenderFailure) {
        await this.failProject(projectId, error, ctx);
        return DONE;
      }
      if (error instanceof ProviderConfigError) {
        this.logger.error(`[ALERT] ${error.message}`);
        await this.failProject(projectId, new RenderFailure('provider_error', error.message), ctx);
        return DONE;
      }
      const message = (error as Error).message;
      this.logger.warn(`Render ${projectId} attempt failed: ${message}`);
      if (ctx.isLastAttempt) {
        await this.failProject(projectId, new RenderFailure('internal_error', message), ctx);
        return DONE;
      }
      await this.log(projectId, ctx, 'error', 'RETRY', message);
      throw error; // BullMQ retries with backoff; the state machine resumes from the persisted step
    }
  }

  // -------------------------------------------------------------------------------------------------
  // State machine
  // -------------------------------------------------------------------------------------------------

  private async loop(projectId: string, ctx: RenderContext): Promise<RenderOutcome> {
    for (let guard = 0; guard < 100; guard++) {
      const project = await this.prisma.project.findFirst({ where: { id: projectId, deleted_at: null } });
      if (!project) return DONE;
      if (!(ACTIVE_STATUSES as readonly string[]).includes(project.status)) return DONE; // stale job

      let outcome: RenderOutcome | null;
      switch (project.render_step ?? 'QUEUED') {
        case 'QUEUED':
          outcome = await this.stepStart(project, ctx);
          break;
        case 'PREPARING':
          outcome = await this.stepPrepare(project, ctx);
          break;
        case 'GENERATING':
          outcome = await this.stepGenerate(project, ctx);
          break;
        case 'BLOCKED_NO_CREDITS':
          outcome = await this.stepBlocked(project, ctx);
          break;
        case 'ASSEMBLING':
        case 'UPLOADING':
          await this.stepFinalize(project, ctx);
          return DONE;
        default:
          return DONE; // COMPLETED / FAILED
      }
      if (outcome) return outcome;
    }
    return delay(1_000); // safety net against a logic loop
  }

  /** QUEUED -> PREPARING (holds the job while renders are switched off, before any money is spent). */
  private async stepStart(project: Project, ctx: RenderContext): Promise<RenderOutcome | null> {
    const flags = await this.flags.get();
    if (!flags.renders_enabled) return delay(RENDERS_DISABLED_RECHECK_MS);

    await this.prisma.project.update({
      where: { id: project.id },
      data: { status: 'CREATING', render_step: 'PREPARING', partial: false, skipped_image_ids: [] },
    });
    // photos the provider rejected in an earlier run get another chance
    await this.prisma.image.updateMany({
      where: { project_id: project.id, clip_status: 'failed', higgsfield_media_id: null },
      data: { clip_status: 'none' },
    });
    await this.log(project.id, ctx, 'started', 'RUN_START', `provider=${this.config.videoProvider}`);
    return null;
  }

  /** PREPARING: import images, cost preflight, balance check -> GENERATING (or BLOCKED_NO_CREDITS). */
  private async stepPrepare(project: Project, ctx: RenderContext): Promise<RenderOutcome | null> {
    const provider = this.providers.resolve();
    let images = await this.loadImages(project.id);
    if (images.length < this.config.minImages || images.length > this.config.maxImages) {
      throw new RenderFailure('invalid_images', `Image count ${images.length} outside ${this.config.minImages}-${this.config.maxImages}`);
    }

    // 1. import every image that has no media id yet (media id is persisted immediately, never repeated)
    const missing = images.filter((i) => !i.higgsfield_media_id && i.clip_status !== 'failed');
    await mapPool(missing, 4, async (img) => {
      try {
        const { mediaId } = await provider.importImage({
          imageId: img.id,
          projectId: project.id,
          userId: project.user_id,
          gcsPath: this.selectedPath(img),
        });
        await this.prisma.image.update({ where: { id: img.id }, data: { higgsfield_media_id: mediaId } });
      } catch (error) {
        if (error instanceof ProviderRejectedError) {
          // this single photo cannot be used; the video is built without it
          await this.prisma.image.update({ where: { id: img.id }, data: { clip_status: 'failed' } });
          await this.log(project.id, ctx, 'warning', 'PREPARING', `Image ${img.id} was rejected by the provider`);
          return;
        }
        throw error;
      }
    });
    images = await this.loadImages(project.id);

    // 2. cost preflight + balance (paid providers only)
    const pending = images.filter((i) => this.needsSubmission(i));
    if (pending.length > 0 && provider.name !== 'local') {
      const first = pending[0];
      const { creditsPerClip } = await provider.getCost({
        mediaId: first.higgsfield_media_id as string,
        prompt: selectPrompt(first.room_type),
      });
      if (creditsPerClip > this.config.higgsfieldMaxClipCredits) {
        this.logger.error(
          `[ALERT] Clip cost ${creditsPerClip} exceeds max clip credits (${this.config.higgsfieldMaxClipCredits})`,
        );
        throw new RenderFailure('cost_ceiling', `Cost per clip ${creditsPerClip} is above the configured ceiling`);
      }
      const balance = await provider.getBalance();
      if (balance !== null && balance < creditsPerClip * pending.length) {
        return this.enterBlocked(project, ctx, `balance ${balance} < needed ${creditsPerClip * pending.length}`);
      }
    }

    await this.prisma.project.update({
      where: { id: project.id },
      data: {
        render_step: 'GENERATING',
        render_started_at: new Date(),
        clips_total: images.length,
        clips_done: images.filter((i) => i.clip_status === 'completed').length,
      },
    });
    await this.log(project.id, ctx, 'ok', 'PREPARING', `${images.length} images ready, ${pending.length} clips to submit`);
    return null;
  }

  /** GENERATING: submit missing clips, poll, retry failed indices (max 2 rounds), decide. */
  private async stepGenerate(project: Project, ctx: RenderContext): Promise<RenderOutcome | null> {
    const provider = this.providers.resolve();

    if (!project.render_started_at) {
      await this.prisma.project.update({ where: { id: project.id }, data: { render_started_at: new Date() } });
    } else if (Date.now() - project.render_started_at.getTime() > GENERATING_CAP_MS) {
      throw new RenderFailure('provider_timeout', 'GENERATING exceeded 20 minutes');
    }

    // A. poll clips already submitted and store the finished ones
    await this.pollSubmitted(project, provider, ctx);

    // B. submit fresh clips and resubmit failed ones (never an image with a non-failed job id)
    let images = await this.loadImages(project.id);
    const fresh = images.filter((i) => i.clip_status === 'none' && !!i.higgsfield_media_id);
    const failed = images.filter((i) => i.clip_status === 'failed' && !!i.higgsfield_media_id);
    let resubmit: Image[] = [];
    if (failed.length > 0 && (await this.countRounds(project.id)) < MAX_RESUBMIT_ROUNDS) {
      resubmit = failed;
      await this.log(project.id, ctx, 'info', 'RESUBMIT_ROUND', `Resubmitting ${failed.length} clip(s)`);
    }
    const toSubmit = [...fresh, ...resubmit];
    if (toSubmit.length > 0) {
      const blocked = await this.submit(project, provider, toSubmit, ctx);
      if (blocked) return this.enterBlocked(project, ctx, 'provider reported out of credits');
    }

    // C. decide
    images = await this.loadImages(project.id);
    const completed = images.filter((i) => i.clip_status === 'completed');
    const inFlight = images.filter((i) => i.clip_status === 'submitted');
    const retriable = images.filter((i) => i.clip_status === 'failed' && !!i.higgsfield_media_id);

    await this.prisma.project.update({
      where: { id: project.id },
      data: { clips_total: images.length, clips_done: completed.length },
    });

    if (inFlight.length > 0) return delay(pollDelayMs());
    if (retriable.length > 0 && (await this.countRounds(project.id)) < MAX_RESUBMIT_ROUNDS) return null; // next loop resubmits

    if (completed.length >= this.config.minImages) {
      const skipped = images.filter((i) => i.clip_status !== 'completed').map((i) => i.id);
      await this.prisma.project.update({
        where: { id: project.id },
        data: { partial: skipped.length > 0, skipped_image_ids: skipped, render_step: 'ASSEMBLING' },
      });
      await this.log(
        project.id,
        ctx,
        'ok',
        'GENERATING',
        `${completed.length}/${images.length} clips ready${skipped.length ? `, ${skipped.length} skipped` : ''}`,
      );
      return null;
    }
    throw new RenderFailure('too_few_clips', `${completed.length} of ${images.length} clips succeeded`);
  }

  /** BLOCKED_NO_CREDITS: re-check the balance periodically; resume without resubmitting finished clips. */
  private async stepBlocked(project: Project, ctx: RenderContext): Promise<RenderOutcome | null> {
    const blockedAt = await this.blockedSince(project.id);
    if (blockedAt && Date.now() - blockedAt.getTime() > BLOCK_MAX_MS) {
      throw new RenderFailure('blocked_no_credits', 'Blocked on provider credits for too long');
    }

    const provider = this.providers.resolve();
    const images = await this.loadImages(project.id);
    const pending = images.filter((i) => this.needsSubmission(i));
    if (pending.length > 0 && provider.name !== 'local') {
      const first = pending[0];
      const { creditsPerClip } = await provider.getCost({
        mediaId: first.higgsfield_media_id as string,
        prompt: selectPrompt(first.room_type),
      });
      const balance = await provider.getBalance();
      if (balance !== null && balance < creditsPerClip * pending.length) return delay(BLOCK_RECHECK_MS);
    }

    // Resume: the time spent blocked must not count against the 20 minute GENERATING cap.
    const blockedMs = blockedAt ? Date.now() - blockedAt.getTime() : 0;
    const started = project.render_started_at ? new Date(project.render_started_at.getTime() + blockedMs) : new Date();
    await this.prisma.project.update({
      where: { id: project.id },
      data: { render_step: 'GENERATING', render_started_at: started },
    });
    await this.log(project.id, ctx, 'resumed', 'BLOCKED_NO_CREDITS', 'Provider credits available again');
    return null;
  }

  private async enterBlocked(project: Project, ctx: RenderContext, reason: string): Promise<RenderOutcome> {
    if (project.render_step !== 'BLOCKED_NO_CREDITS') {
      await this.prisma.project.update({ where: { id: project.id }, data: { render_step: 'BLOCKED_NO_CREDITS' } });
      await this.log(project.id, ctx, 'blocked', 'BLOCKED_NO_CREDITS', reason);
      this.logger.error(`[ALERT] Render ${project.id} is blocked: provider out of credits (${reason})`);
    }
    return delay(BLOCK_RECHECK_MS);
  }

  /** ASSEMBLING / UPLOADING: build the video in a temp dir, QA it, upload, mark COMPLETED. */
  private async stepFinalize(project: Project, ctx: RenderContext): Promise<void> {
    const images = await this.loadImages(project.id);
    const clips = images.filter((i) => i.clip_status === 'completed' && !!i.clip_gcs_path);
    if (clips.length < this.config.minImages) {
      throw new RenderFailure('too_few_clips', `${clips.length} usable clips at assembly time`);
    }
    if (project.render_step !== 'ASSEMBLING') {
      await this.prisma.project.update({ where: { id: project.id }, data: { render_step: 'ASSEMBLING' } });
    }
    await this.log(project.id, ctx, 'started', 'ASSEMBLING', `${clips.length} clips`);

    const completed = await withTempDir(`render-${project.id.slice(0, 8)}`, async (dir) => {
      // download the clips (from our own bucket: resumable and independent of provider URL expiry)
      const clipFiles = clips.map((_, i) => join(dir, `c${i + 1}.mp4`));
      await mapPool(clips, 4, (img, i) => this.gcs.downloadToFile(img.clip_gcs_path as string, clipFiles[i]));

      let result: Awaited<ReturnType<AssemblyService['assemble']>> | null = null;
      let lastError: AssemblyError | null = null;
      for (let attempt = 1; attempt <= 2 && !result; attempt++) {
        try {
          result = await this.assembly.assemble({
            dir,
            clipFiles,
            title: project.title.trim() || 'Property walkthrough',
            subtitle: project.subtitle,
            locationLine: project.location_line,
            closingLine: project.closing_line,
            music: project.music_enabled,
          });
        } catch (error) {
          lastError = error as AssemblyError;
          this.logger.warn(`Assembly attempt ${attempt} for ${project.id} failed: ${lastError.message}`);
          await this.log(project.id, ctx, 'error', 'ASSEMBLING', `attempt ${attempt}: ${lastError.details ?? lastError.message}`);
        }
      }
      if (!result) {
        // admins get the ffmpeg details in job_events; the user gets a plain message
        throw new RenderFailure('ffmpeg_error', lastError?.details ?? 'ffmpeg failed');
      }
      if (result.musicFallback) {
        await this.log(project.id, ctx, 'warning', 'ASSEMBLING', 'Soundtrack unavailable; used a silent audio track');
      }

      await this.prisma.project.update({ where: { id: project.id }, data: { render_step: 'UPLOADING' } });
      const videoPath = StoragePaths.videoFinal(project.user_id, project.id);
      const posterPath = StoragePaths.videoPoster(project.user_id, project.id);
      await this.gcs.uploadFile(videoPath, result.finalFile, 'video/mp4');
      await this.gcs.uploadFile(posterPath, result.posterFile, 'image/jpeg');

      const done = await this.prisma.project.updateMany({
        where: { id: project.id, status: { in: [...ACTIVE_STATUSES] } },
        data: {
          status: 'COMPLETED',
          render_step: 'COMPLETED',
          completed_at: new Date(),
          video_gcs_path: videoPath,
          poster_gcs_path: posterPath,
          duration_seconds: result.durationSeconds,
          failure_code: null,
          failure_reason: null,
        },
      });
      if (done.count === 0) return false; // deleted or changed while rendering
      await this.log(project.id, ctx, 'completed', 'COMPLETED', `duration ${result.durationSeconds}s`);
      return true;
    });

    if (completed) await this.notify.videoReady(project.user_id, project.id);
  }

  // -------------------------------------------------------------------------------------------------
  // Generation helpers
  // -------------------------------------------------------------------------------------------------

  /** Polls submitted jobs; completed clips are copied to `work/clips/` in our bucket before they count. */
  private async pollSubmitted(project: Project, provider: VideoGenerationProvider, ctx: RenderContext): Promise<void> {
    const images = await this.loadImages(project.id);
    const submitted = images.filter((i) => i.clip_status === 'submitted' && !!i.clip_job_id);
    if (submitted.length === 0) return;

    // Jobs the provider already finished but whose download failed earlier are retried without asking again.
    const awaitingDownload = submitted.filter((i) => !!i.clip_result_url);
    const toAsk = submitted.filter((i) => !i.clip_result_url);

    const finished: Array<{ img: Image; resultUrl: string }> = awaitingDownload.map((img) => ({
      img,
      resultUrl: img.clip_result_url as string,
    }));

    if (toAsk.length > 0) {
      const states = await provider.waitForJobs(toAsk.map((i) => i.clip_job_id as string));
      const byJob = new Map(states.map((s) => [s.jobId, s]));
      for (const img of toAsk) {
        const st = byJob.get(img.clip_job_id as string);
        if (!st || st.status === 'processing') continue;
        if (st.status === 'completed' && st.resultUrl) {
          await this.prisma.image.update({ where: { id: img.id }, data: { clip_result_url: st.resultUrl } });
          finished.push({ img, resultUrl: st.resultUrl });
        } else {
          // failed / nsfw / completed without a result: eligible for resubmission
          await this.prisma.image.update({ where: { id: img.id }, data: { clip_status: 'failed' } });
          await this.log(project.id, ctx, 'warning', 'GENERATING', `Clip for image ${img.id} ended as ${st.status}`);
        }
      }
    }

    await mapPool(finished, 3, async ({ img, resultUrl }) => {
      try {
        const gcsPath = await this.persistClip(project, img, resultUrl, provider);
        await this.prisma.image.update({
          where: { id: img.id },
          data: { clip_status: 'completed', clip_gcs_path: gcsPath },
        });
      } catch (error) {
        // keep it "submitted": the next tick retries the download until the 20 minute cap
        this.logger.warn(`Clip download for image ${img.id} failed: ${(error as Error).message}`);
      }
    });
  }

  /** Stores the clip at `work/clips/{imageId}.mp4` and returns the bucket path. */
  private async persistClip(project: Project, img: Image, resultUrl: string, provider: VideoGenerationProvider): Promise<string> {
    if (resultUrl.startsWith(GCS_URL_PREFIX)) return resultUrl.slice(GCS_URL_PREFIX.length);
    const target = StoragePaths.workClip(project.user_id, project.id, img.id);
    await withTempDir('clip', async (dir) => {
      const file = join(dir, 'clip.mp4');
      await provider.downloadClip({ jobId: img.clip_job_id as string, resultUrl }, file);
      await this.gcs.uploadFile(target, file, 'video/mp4');
    });
    return target;
  }

  /**
   * Submits clips and persists each job id immediately. Returns true when the provider ran out of credits.
   * Images that are `none` are first submissions; `failed` ones are resubmissions (a new job id replaces the old).
   */
  private async submit(project: Project, provider: VideoGenerationProvider, images: Image[], ctx: RenderContext): Promise<boolean> {
    const requests: ClipRequest[] = images.map((img) => ({
      index: img.position,
      imageId: img.id,
      mediaId: img.higgsfield_media_id as string,
      prompt: selectPrompt(img.room_type),
      sourceGcsPath: this.selectedPath(img),
      workGcsPath: StoragePaths.workClip(project.user_id, project.id, img.id),
    }));

    const results = await provider.submitClips(requests, {
      onResult: (r) => this.persistSubmitResult(r),
    });

    const accepted = results.filter((r) => r.ok).length;
    if (accepted > 0 && provider.name !== 'local') {
      const { creditsPerClip } = await provider.getCost({ mediaId: requests[0].mediaId, prompt: requests[0].prompt });
      await this.prisma.usageLedger.create({
        data: {
          user_id: project.user_id,
          project_id: project.id,
          kind: 'higgsfield',
          provider_units: creditsPerClip * accepted,
          note: `submitted ${accepted} clip(s) at ${creditsPerClip} credits`,
        },
      });
    }
    await this.log(project.id, ctx, 'info', 'GENERATING', `submitted ${accepted}/${results.length} clip(s)`);
    return results.some((r) => r.outOfCredits);
  }

  private async persistSubmitResult(r: ClipSubmitResult): Promise<void> {
    if (r.ok && r.jobId) {
      if (r.completedResultUrl?.startsWith(GCS_URL_PREFIX)) {
        await this.prisma.image.update({
          where: { id: r.imageId },
          data: {
            clip_job_id: r.jobId,
            clip_status: 'completed',
            clip_result_url: r.completedResultUrl,
            clip_gcs_path: r.completedResultUrl.slice(GCS_URL_PREFIX.length),
          },
        });
      } else {
        await this.prisma.image.update({
          where: { id: r.imageId },
          data: { clip_job_id: r.jobId, clip_status: 'submitted', clip_result_url: null, clip_gcs_path: null },
        });
      }
      return;
    }
    if (r.outOfCredits) return; // stays none/failed; resubmitted when credits are back
    await this.prisma.image.update({ where: { id: r.imageId }, data: { clip_status: 'failed' } });
  }

  // -------------------------------------------------------------------------------------------------
  // Small helpers
  // -------------------------------------------------------------------------------------------------

  private loadImages(projectId: string): Promise<Image[]> {
    return this.prisma.image.findMany({
      where: { project_id: projectId, removed: false, ready: true },
      orderBy: { position: 'asc' },
    });
  }

  /** The version the video uses: processed when the user kept it, otherwise the original. */
  private selectedPath(img: Image): string {
    return img.use_processed && img.gcs_processed_path ? img.gcs_processed_path : (img.gcs_original_path as string);
  }

  private needsSubmission(img: Image): boolean {
    return !!img.higgsfield_media_id && (img.clip_status === 'none' || img.clip_status === 'failed');
  }

  /** Resubmit rounds in the current run (since the latest RUN_START event). */
  private async countRounds(projectId: string): Promise<number> {
    const runStart = await this.prisma.jobEvent.findFirst({
      where: { project_id: projectId, job_name: JOB, step: 'RUN_START' },
      orderBy: { created_at: 'desc' },
      select: { created_at: true },
    });
    return this.prisma.jobEvent.count({
      where: {
        project_id: projectId,
        job_name: JOB,
        step: 'RESUBMIT_ROUND',
        ...(runStart ? { created_at: { gte: runStart.created_at } } : {}),
      },
    });
  }

  private async blockedSince(projectId: string): Promise<Date | null> {
    const ev = await this.prisma.jobEvent.findFirst({
      where: { project_id: projectId, job_name: JOB, step: 'BLOCKED_NO_CREDITS', status: 'blocked' },
      orderBy: { created_at: 'desc' },
      select: { created_at: true },
    });
    return ev?.created_at ?? null;
  }

  private log(projectId: string, ctx: RenderContext, status: string, step: string, message?: string) {
    return this.events.log({ projectId, jobName: JOB, status, step, message, bullmqJobId: ctx.bullmqJobId });
  }

  /** Terminal failure: plain-language reason, quota refund (once), user email. */
  private async failProject(projectId: string, failure: RenderFailure, ctx: RenderContext): Promise<void> {
    const project = await this.prisma.project.findFirst({ where: { id: projectId, deleted_at: null } });
    if (!project || !(ACTIVE_STATUSES as readonly string[]).includes(project.status)) return;

    const refund = failure.refund && project.quota_charged;
    const message = userMessageFor(failure.code, refund);

    await this.prisma.$transaction(async (tx) => {
      await tx.project.update({
        where: { id: projectId },
        data: { status: 'FAILED', render_step: 'FAILED', failure_code: failure.code, failure_reason: message },
      });
      if (refund) {
        // the flag flip makes the refund exactly-once even if two workers race here
        const flipped = await tx.project.updateMany({
          where: { id: projectId, quota_charged: true },
          data: { quota_charged: false },
        });
        if (flipped.count === 1) {
          await tx.usageLedger.create({
            data: {
              user_id: project.user_id,
              project_id: projectId,
              kind: 'video_refund',
              quota_units: -1,
              note: `refund: ${failure.code}`,
            },
          });
        }
      }
    });
    await this.log(projectId, ctx, 'failed', failure.code, failure.detail);
    await this.notify.videoFailed(project.user_id, projectId);
  }
}
