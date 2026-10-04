import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import sharp = require('sharp');
import { GcsObjectsService } from '@/integrations/storage/gcs/services/gcs-objects.service';
import { FfmpegService } from '@/integrations/ffmpeg/ffmpeg.service';
import { withTempDir } from '@/background/common/temp-dir';
import { mapPool } from '@/background/common/pool';
import {
  ClipCost,
  ClipJobState,
  ClipRequest,
  ClipSubmitResult,
  CostQuery,
  GCS_URL_PREFIX,
  ImportImageInput,
  ImportImageResult,
  SubmitHooks,
  VideoGenerationProvider,
} from '../video-generation.provider';
import { buildKenBurnsArgs, fitOutputSize, pickMove } from './ken-burns.utils';

const LOCAL_MEDIA_PREFIX = 'local:';
const LOCAL_JOB_PREFIX = 'local__';
const RENDER_CONCURRENCY = 2;

/**
 * Default provider when no Higgsfield key is configured: each "clip" is a 5 s zoompan (Ken Burns) render of
 * the still, produced locally with ffmpeg. It finishes inside `submitClips` (no polling needed), uploads the
 * clip to `work/clips/` itself and reports it as already completed.
 */
@Injectable()
export class LocalKenBurnsProvider implements VideoGenerationProvider {
  readonly name = 'local' as const;
  private readonly logger = new Logger(LocalKenBurnsProvider.name);

  constructor(
    private readonly gcs: GcsObjectsService,
    private readonly ffmpeg: FfmpegService,
  ) {}

  async getBalance(): Promise<number | null> {
    return null;
  }

  async importImage(input: ImportImageInput): Promise<ImportImageResult> {
    return { mediaId: `${LOCAL_MEDIA_PREFIX}${input.imageId}` };
  }

  async getCost(_query: CostQuery): Promise<ClipCost> {
    return { creditsPerClip: 0 };
  }

  async submitClips(requests: ClipRequest[], hooks: SubmitHooks = {}): Promise<ClipSubmitResult[]> {
    return mapPool(requests, RENDER_CONCURRENCY, async (req) => {
      let result: ClipSubmitResult;
      try {
        await this.renderOne(req);
        result = {
          index: req.index,
          imageId: req.imageId,
          ok: true,
          jobId: `${LOCAL_JOB_PREFIX}${req.imageId}`,
          completedResultUrl: `${GCS_URL_PREFIX}${req.workGcsPath}`,
        };
      } catch (error) {
        this.logger.warn(`Local clip render failed for image ${req.imageId}: ${(error as Error).message}`);
        result = { index: req.index, imageId: req.imageId, ok: false, errorMessage: (error as Error).message };
      }
      if (hooks.onResult) await hooks.onResult(result);
      return result;
    });
  }

  /** Local clips are complete as soon as they are submitted. */
  async waitForJobs(jobIds: string[]): Promise<ClipJobState[]> {
    return jobIds.map((jobId) => ({ jobId, status: 'completed' as const }));
  }

  async downloadClip(job: { jobId: string; resultUrl: string }, destFile: string): Promise<void> {
    if (!job.resultUrl.startsWith(GCS_URL_PREFIX)) throw new Error('Local clips are stored in GCS');
    await this.gcs.downloadToFile(job.resultUrl.slice(GCS_URL_PREFIX.length), destFile);
  }

  private async renderOne(req: ClipRequest): Promise<void> {
    await withTempDir('kb', async (dir) => {
      const still = join(dir, 'still.jpg');
      const out = join(dir, 'clip.mp4');
      await this.gcs.downloadToFile(req.sourceGcsPath, still);
      const meta = await sharp(still).metadata();
      const { width, height } = fitOutputSize(meta.width ?? 1920, meta.height ?? 1080);
      await this.ffmpeg.run(
        buildKenBurnsArgs({ inputFile: still, outFile: out, width, height, move: pickMove(req.index) }),
        { cwd: dir, timeoutMs: 5 * 60 * 1000 },
      );
      await this.gcs.uploadFile(req.workGcsPath, out, 'video/mp4');
    });
  }
}
