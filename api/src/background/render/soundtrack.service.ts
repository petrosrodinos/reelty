import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { GcsObjectsService } from '@/integrations/storage/gcs/services/gcs-objects.service';
import { StoragePaths } from '@/integrations/storage/gcs/storage-paths';
import { FfmpegService } from '@/integrations/ffmpeg/ffmpeg.service';
import { withTempDir } from '../common/temp-dir';
import { SOUNDTRACK_LICENSE_TEXT, buildSoundtrackArgs } from './soundtrack.utils';

/**
 * No third-party track is bundled (contract §5): the worker synthesises one original ambient pad on first
 * use, caches it in GCS (`assets/soundtrack/track.mp3` + `LICENSE.txt`, CC0) and downloads it per render.
 */
@Injectable()
export class SoundtrackService {
  private readonly logger = new Logger(SoundtrackService.name);
  private ensuring: Promise<void> | null = null;

  constructor(
    private readonly gcs: GcsObjectsService,
    private readonly ffmpeg: FfmpegService,
  ) {}

  /** Makes sure the track exists in GCS (synthesising it once) and downloads it to `destFile`. */
  async fetchTrack(destFile: string): Promise<void> {
    await this.ensureInBucket();
    await this.gcs.downloadToFile(StoragePaths.soundtrack(), destFile);
  }

  /** Renders the track to a local file (also used by smoke tests / the first-use synthesis). */
  async synthesize(outFile: string): Promise<void> {
    await this.ffmpeg.run(buildSoundtrackArgs(outFile), { timeoutMs: 5 * 60 * 1000 });
  }

  private ensureInBucket(): Promise<void> {
    if (!this.ensuring) {
      this.ensuring = this.doEnsure().finally(() => {
        this.ensuring = null;
      });
    }
    return this.ensuring;
  }

  private async doEnsure(): Promise<void> {
    const existing = await this.gcs.head(StoragePaths.soundtrack());
    if (existing && existing.size > 0) return;

    this.logger.log('Synthesising the ambient soundtrack (first use)');
    await withTempDir('track', async (dir) => {
      const out = join(dir, 'track.mp3');
      await this.synthesize(out);
      await this.gcs.uploadFile(StoragePaths.soundtrack(), out, 'audio/mpeg');
      await this.gcs.uploadBuffer(
        StoragePaths.soundtrackLicense(),
        Buffer.from(SOUNDTRACK_LICENSE_TEXT, 'utf8'),
        'text/plain; charset=utf-8',
      );
    });
  }
}
