import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { JobNames, Limits } from '@/core/queues/queues.constants';
import { GcsObjectsService } from '@/integrations/storage/gcs/services/gcs-objects.service';
import { StoragePaths } from '@/integrations/storage/gcs/storage-paths';
import { ApifyError, ApifyService } from '@/integrations/apify/apify.service';
import { JobEventsService } from '../common/job-events.service';
import { SystemFlagsService } from '../common/system-flags.service';
import { AppConfigService } from '@/modules/app-config/app-config.service';
import { WorkerConfigService } from '../common/worker-config.service';
import { safeDownloadBuffer } from '../common/safe-http';
import { makeThumbnail, normalizeToJpeg, sha256Hex, sniffImageType } from '../common/image.utils';
import {
  AirbnbItem,
  airbnbImageUrls,
  buildAirbnbActorInput,
  buildWebsiteActorInput,
  extractAirbnbListingText,
  extractAirbnbRoomId,
  extractWebsiteListingText,
  filterImageCandidates,
  ListingText,
  WebsiteItem,
} from './scrape.utils';

export const ScrapeMessages = {
  unavailable: "Importing photos from a link isn't available right now. Please try again later, or upload your photos instead.",
  empty: "We couldn't find any usable photos on that page. Try another link, or upload your photos instead.",
  failed: "We couldn't fetch photos from that link. Please try again, or upload your photos instead.",
} as const;

export interface ScrapeContext {
  bullmqJobId?: string;
  /** True when BullMQ will not retry this job after a failure. */
  isLastAttempt: boolean;
}

interface Collected {
  candidates: string[];
  text: ListingText;
  runId: string;
  usageUsd: number | null;
  actorId: string;
}

interface ProcessedImage {
  original: Buffer;
  thumb: Buffer;
  width: number;
  height: number;
  hash: string;
}

const DOWNLOAD_CONCURRENCY = 4;

@Injectable()
export class ScrapeService {
  private readonly logger = new Logger(ScrapeService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly gcs: GcsObjectsService,
    private readonly apify: ApifyService,
    private readonly config: WorkerConfigService,
    private readonly flags: SystemFlagsService,
    private readonly events: JobEventsService,
    private readonly appConfig: AppConfigService,
  ) {}

  async run(projectId: string, ctx: ScrapeContext): Promise<void> {
    const project = await this.prisma.project.findFirst({ where: { id: projectId, deleted_at: null } });
    // Stale / duplicate job: only a project that is still FETCHING is processed.
    if (!project || project.status !== 'FETCHING') return;

    const jobName = project.source_type === 'airbnb' ? JobNames.SCRAPE_AIRBNB : JobNames.SCRAPE_WEBSITE;
    const log = (status: string, message?: string) =>
      this.events.log({ projectId, jobName, status, step: 'scrape', message, bullmqJobId: ctx.bullmqJobId });

    if (project.source_type === 'upload' || !project.source_url) {
      await this.failScrape(projectId, 'scrape_failed', ScrapeMessages.failed);
      await log('failed', 'Project has no source URL');
      return;
    }

    const flags = await this.flags.get();
    if (!flags.scrape_enabled) {
      await this.failScrape(projectId, 'scrape_failed', ScrapeMessages.unavailable);
      await log('failed', 'scrape_enabled flag is off');
      return;
    }
    if (!this.apify.isConfigured()) {
      await this.failScrape(projectId, 'scrape_failed', ScrapeMessages.unavailable);
      await log('failed', 'APIFY_TOKEN is not configured');
      return;
    }

    await log('started');

    let collected: Collected;
    try {
      collected = await this.collect(project.source_type, project.source_url);
    } catch (error) {
      const msg = (error as Error).message;
      this.logger.warn(`Scrape of project ${projectId} failed: ${msg}`);
      await log('error', msg);
      if (error instanceof ApifyError && (error.kind === 'not_configured' || error.kind === 'unavailable')) {
        await this.failScrape(projectId, 'scrape_failed', ScrapeMessages.unavailable);
        return;
      }
      if (ctx.isLastAttempt) {
        await this.failScrape(projectId, 'scrape_failed', ScrapeMessages.failed);
        return;
      }
      throw error; // BullMQ retries with exponential backoff
    }

    if (collected.candidates.length === 0) {
      await this.recordLedger(project.user_id, projectId, collected);
      await this.failScrape(projectId, 'scrape_empty', ScrapeMessages.empty);
      await log('empty', 'No usable image URLs found');
      return;
    }

    const stored = await this.storeImages(project.user_id, projectId, collected.candidates);
    await this.recordLedger(project.user_id, projectId, collected);

    const total = await this.prisma.image.count({ where: { project_id: projectId, removed: false, ready: true } });
    if (total === 0) {
      await this.failScrape(projectId, 'scrape_empty', ScrapeMessages.empty);
      await log('empty', `${collected.candidates.length} candidates, none usable`);
      return;
    }

    await this.prefillAndFinish(projectId, collected.text);
    await log('completed', `${stored} new images stored (${total} total)`);
  }

  // -------------------------------------------------------------------------

  private async collect(sourceType: 'website' | 'airbnb' | 'upload', sourceUrl: string): Promise<Collected> {
    if (sourceType === 'airbnb') {
      const roomId = extractAirbnbRoomId(sourceUrl);
      if (!roomId) throw new ApifyError('run_failed', 'Not a valid Airbnb listing URL');
      const actorId = this.config.apifyAirbnbActorId;
      const run = await this.apify.runActor<AirbnbItem>(actorId, buildAirbnbActorInput(roomId), { maxItems: 5 });
      const item = run.items[0];
      return {
        candidates: item ? filterImageCandidates(airbnbImageUrls(item)) : [],
        text: item ? extractAirbnbListingText(item) : { title: null, subtitle: null, location_line: null },
        runId: run.runId,
        usageUsd: run.usageUsd,
        actorId,
      };
    }

    const actorId = this.config.apifyWebsiteActorId;
    const run = await this.apify.runActor<WebsiteItem>(actorId, buildWebsiteActorInput(sourceUrl), { maxItems: 5 });
    const item = run.items[0];
    return {
      candidates: item ? filterImageCandidates(item.images ?? []) : [],
      text: item ? extractWebsiteListingText(item) : { title: null, subtitle: null, location_line: null },
      runId: run.runId,
      usageUsd: run.usageUsd,
      actorId,
    };
  }

  private async fetchAndProcess(url: string): Promise<ProcessedImage | null> {
    try {
      const dl = await safeDownloadBuffer(url, {
        maxBytes: Limits.MAX_UPLOAD_BYTES,
        contentTypePrefixes: ['image/'],
        maxRedirects: 3,
      });
      if (!sniffImageType(dl.buffer)) return null;
      const norm = await normalizeToJpeg(dl.buffer);
      const thumb = await makeThumbnail(norm.data);
      return { original: norm.data, thumb, width: norm.width, height: norm.height, hash: sha256Hex(norm.data) };
    } catch (error) {
      this.logger.debug(`Skipping image (${(error as Error).message})`);
      return null;
    }
  }

  /** Downloads in small parallel batches, then stores sequentially so positions stay in page order. */
  private async storeImages(userId: string, projectId: string, candidates: string[]): Promise<number> {
    const existing = await this.prisma.image.findMany({
      where: { project_id: projectId },
      select: { source_url: true, content_hash: true, position: true, removed: true },
    });
    const knownUrls = new Set(existing.map((i) => i.source_url).filter(Boolean) as string[]);
    const knownHashes = new Set(existing.map((i) => i.content_hash).filter(Boolean) as string[]);
    let nextPosition = Math.max(0, ...existing.filter((i) => !i.removed).map((i) => i.position)) + 1;

    const todo = candidates.filter((u) => !knownUrls.has(u)).slice(0, Limits.MAX_SCRAPE_CANDIDATES);
    let stored = 0;

    for (let i = 0; i < todo.length; i += DOWNLOAD_CONCURRENCY) {
      const batch = todo.slice(i, i + DOWNLOAD_CONCURRENCY);
      const processed = await Promise.all(batch.map((u) => this.fetchAndProcess(u)));
      for (let j = 0; j < batch.length; j++) {
        const img = processed[j];
        if (!img || knownHashes.has(img.hash)) continue;
        knownHashes.add(img.hash);
        const imageId = randomUUID();
        const originalPath = StoragePaths.imageOriginal(userId, projectId, imageId, 'jpg');
        const thumbPath = StoragePaths.imageThumb(userId, projectId, imageId);
        try {
          await this.gcs.uploadBuffer(originalPath, img.original, 'image/jpeg');
          await this.gcs.uploadBuffer(thumbPath, img.thumb, 'image/jpeg');
          await this.prisma.image.create({
            data: {
              id: imageId,
              project_id: projectId,
              position: nextPosition,
              gcs_original_path: originalPath,
              gcs_thumb_path: thumbPath,
              width: img.width,
              height: img.height,
              bytes: img.original.length,
              content_hash: img.hash,
              source_url: batch[j],
              ready: true,
            },
          });
          nextPosition++;
          stored++;
        } catch (error) {
          // a storage failure for one image must not abort the others; retried jobs skip stored URLs
          this.logger.warn(`Could not store a scraped image for project ${projectId}: ${(error as Error).message}`);
          await this.gcs.deleteObject(originalPath).catch(() => undefined);
          await this.gcs.deleteObject(thumbPath).catch(() => undefined);
        }
      }
    }
    return stored;
  }

  /** Prefill title/subtitle/location only when the user has not typed anything yet (FR-INTAKE-8). */
  private async prefillAndFinish(projectId: string, text: ListingText): Promise<void> {
    const current = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { title: true, subtitle: true, location_line: true },
    });
    const data: Record<string, unknown> = {
      status: 'READY',
      scrape_error: null,
      failure_code: null,
      failure_reason: null,
    };
    if (current && !current.title?.trim() && text.title) data.title = text.title;
    if (current && !current.subtitle?.trim() && text.subtitle) data.subtitle = text.subtitle;
    if (current && !current.location_line?.trim() && text.location_line) data.location_line = text.location_line;
    // guard against a concurrent delete / status change
    await this.prisma.project.updateMany({ where: { id: projectId, status: 'FETCHING' }, data });
  }

  /** Project goes back to DRAFT so the UI can offer the Upload tab; messages are plain language. */
  private async failScrape(projectId: string, code: 'scrape_empty' | 'scrape_failed', message: string): Promise<void> {
    await this.prisma.project.updateMany({
      where: { id: projectId, status: 'FETCHING' },
      data: { status: 'DRAFT', scrape_error: message, failure_code: code, failure_reason: message },
    });
  }

  private async recordLedger(userId: string, projectId: string, c: Collected): Promise<void> {
    try {
      const cost = await this.appConfig.apifyCost(c.usageUsd);
      await this.prisma.usageLedger.create({
        data: {
          user_id: userId,
          project_id: projectId,
          kind: 'scrape',
          provider_units: cost.cost_usd,
          cost_usd: cost.cost_usd,
          cost_estimated: cost.estimated,
          note: `apify ${c.actorId} run ${c.runId}`,
        },
      });
    } catch (error) {
      this.logger.warn(`Could not write scrape ledger row: ${(error as Error).message}`);
    }
  }
}
