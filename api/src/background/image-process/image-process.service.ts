import { Injectable, Logger } from '@nestjs/common';
import sharp = require('sharp');
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { DewatermarkJobData, JobNames } from '@/core/queues/queues.constants';
import { GcsObjectsService } from '@/integrations/storage/gcs/services/gcs-objects.service';
import { StoragePaths } from '@/integrations/storage/gcs/storage-paths';
import {
  DEWATERMARK_MAX_SIDE,
  DEWATERMARK_RECOMMENDED_BYTES,
  DewatermarkError,
  DewatermarkService,
} from '@/integrations/dewatermark/dewatermark.service';
import { JobEventsService } from '../common/job-events.service';
import { SystemFlagsService } from '../common/system-flags.service';
import { sniffImageType } from '../common/image.utils';

export interface ImageProcessContext {
  bullmqJobId?: string;
  isLastAttempt: boolean;
}

type FailureCause =
  | 'not_configured'
  | 'disabled'
  | 'unauthorized'
  | 'credits_exhausted'
  | 'bad_request'
  | 'invalid_response'
  | 'unavailable'
  | 'original_missing';

type LogFn = (status: string, message?: string) => Promise<void>;

/** Causes that are our fault, not the user's: the attempt they spent is given back. */
const REFUND_ATTEMPT: ReadonlySet<FailureCause> = new Set<FailureCause>([
  'not_configured',
  'disabled',
  'unauthorized',
  'credits_exhausted',
  'unavailable',
]);

/** Admin-facing explanations stored in job_events (images have no error column). Plain language. */
const FAILURE_MESSAGES: Record<FailureCause, string> = {
  not_configured: 'Watermark removal is not configured on this server (missing API key).',
  disabled: 'Watermark removal is switched off at the moment.',
  unauthorized: 'The watermark removal service rejected our credentials.',
  credits_exhausted: 'The watermark removal service has run out of credits; the feature was switched off.',
  bad_request: 'The watermark removal service could not process this image.',
  invalid_response: 'The watermark removal service returned an unusable result.',
  unavailable: 'The watermark removal service is temporarily unavailable.',
  original_missing: 'The original image could not be found.',
};

@Injectable()
export class ImageProcessService {
  private readonly logger = new Logger(ImageProcessService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly gcs: GcsObjectsService,
    private readonly dewatermark: DewatermarkService,
    private readonly flags: SystemFlagsService,
    private readonly events: JobEventsService,
  ) {}

  async run(data: DewatermarkJobData, ctx: ImageProcessContext): Promise<void> {
    const image = await this.prisma.image.findUnique({
      where: { id: data.imageId },
      include: { project: { select: { id: true, user_id: true, deleted_at: true } } },
    });
    if (!image || image.project.deleted_at) return;
    // The API sets wm_status=processing when it enqueues; anything else means this job is stale.
    if (image.wm_status !== 'processing') return;

    const projectId = image.project_id;
    const userId = image.project.user_id;
    const log: LogFn = (status, message) =>
      this.events.log({
        projectId,
        jobName: JobNames.DEWATERMARK,
        status,
        step: `image ${image.id} attempt ${data.attempt}`,
        message,
        bullmqJobId: ctx.bullmqJobId,
      });

    if (!image.gcs_original_path) return this.fail(image.id, 'original_missing', log);
    if (!this.dewatermark.isConfigured()) return this.fail(image.id, 'not_configured', log);
    const flags = await this.flags.get();
    if (!flags.dewatermark_enabled) return this.fail(image.id, 'disabled', log);

    await log('started');

    try {
      const original = await this.gcs.downloadToBuffer(image.gcs_original_path);
      const jpeg = await this.prepareUpload(original);
      const result = await this.dewatermark.eraseWatermark(jpeg);

      // The result is stored as processed.jpg; the original is never touched and nothing else is regenerated.
      const processedPath = StoragePaths.imageProcessed(userId, projectId, image.id);
      const out = await this.toJpeg(result);
      await this.gcs.uploadBuffer(processedPath, out, 'image/jpeg');

      await this.prisma.image.update({
        where: { id: image.id },
        data: { wm_status: 'done', gcs_processed_path: processedPath, use_processed: true },
      });
      await this.recordLedger(userId, projectId, 1, `dewatermark image ${image.id}`);
      await log('completed');
    } catch (error) {
      await this.handleError(error, image.id, ctx, log);
    }
  }

  // -------------------------------------------------------------------------

  /** JPEG, longest side <= 6000 px, and under ~10 MB (quality is lowered stepwise when needed). */
  private async prepareUpload(input: Buffer): Promise<Buffer> {
    let quality = 92;
    let out = await this.encode(input, quality);
    while (out.length > DEWATERMARK_RECOMMENDED_BYTES && quality > 70) {
      quality -= 8;
      out = await this.encode(input, quality);
    }
    return out;
  }

  private encode(input: Buffer, quality: number): Promise<Buffer> {
    return sharp(input, { failOn: 'error', limitInputPixels: 150_000_000 })
      .rotate()
      .flatten({ background: '#ffffff' })
      .resize({ width: DEWATERMARK_MAX_SIDE, height: DEWATERMARK_MAX_SIDE, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
  }

  /** Normalises the vendor output to a JPEG (it may come back as PNG/WebP). */
  private async toJpeg(buf: Buffer): Promise<Buffer> {
    if (sniffImageType(buf) === 'jpeg') {
      await sharp(buf).metadata(); // validates that it decodes
      return buf;
    }
    return sharp(buf, { failOn: 'error' })
      .flatten({ background: '#ffffff' })
      .jpeg({ quality: 92, mozjpeg: true })
      .toBuffer();
  }

  private async handleError(error: unknown, imageId: string, ctx: ImageProcessContext, log: LogFn): Promise<void> {
    if (error instanceof DewatermarkError) {
      switch (error.kind) {
        case 'not_configured':
          return this.fail(imageId, 'not_configured', log);
        case 'unauthorized':
          this.logger.error('[ALERT] Dewatermark API rejected the API key (401). Check DEWATERMARK_API_KEY.');
          return this.fail(imageId, 'unauthorized', log);
        case 'bad_request':
          return this.fail(imageId, 'bad_request', log, `HTTP ${error.status ?? '?'}`);
        case 'invalid_response':
          return this.fail(imageId, 'invalid_response', log);
        case 'credits_exhausted':
          await this.flags.disable('dewatermark_enabled', 'Dewatermark credits are exhausted');
          return this.fail(imageId, 'credits_exhausted', log);
        default:
          break; // server / rate_limited / network: transient, retried via BullMQ
      }
    }

    const message = (error as Error).message;
    this.logger.warn(`dewatermark attempt failed for image ${imageId}: ${message}`);
    if (ctx.isLastAttempt) return this.fail(imageId, 'unavailable', log, message);
    await log('retrying', message);
    throw error;
  }

  /** wm_status -> failed with a clear admin message; our own failures give the user's attempt back. */
  private async fail(imageId: string, cause: FailureCause, log: LogFn, detail?: string): Promise<void> {
    const refund = REFUND_ATTEMPT.has(cause);
    await this.prisma.$transaction(async (tx) => {
      const current = await tx.image.findUnique({ where: { id: imageId }, select: { wm_attempts: true } });
      await tx.image.update({
        where: { id: imageId },
        data: {
          wm_status: 'failed',
          ...(refund && current && current.wm_attempts > 0 ? { wm_attempts: { decrement: 1 } } : {}),
        },
      });
    });
    await log('failed', `${FAILURE_MESSAGES[cause]}${detail ? ` (${detail})` : ''}`);
  }

  private async recordLedger(userId: string, projectId: string, units: number, note: string): Promise<void> {
    try {
      await this.prisma.usageLedger.create({
        data: { user_id: userId, project_id: projectId, kind: 'dewatermark', provider_units: units, note },
      });
    } catch (error) {
      this.logger.warn(`Could not write dewatermark ledger row: ${(error as Error).message}`);
    }
  }
}
