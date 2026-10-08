import { Injectable } from '@nestjs/common';
import { copyFile } from 'fs/promises';
import { join } from 'path';
import { SOUNDTRACK_IDS } from '@/shared/constants/soundtracks.constants';

/** Bundled CC0 recordings, shipped with the API image (see `assets/soundtracks/CREDITS.md`). */
const SOUNDTRACK_DIR = join(process.cwd(), 'assets', 'soundtracks');

@Injectable()
export class SoundtrackService {
  /** Copies the bundled track to `destFile` (the worker's scratch directory). */
  async fetchTrack(trackId: string, destFile: string): Promise<void> {
    if (!SOUNDTRACK_IDS.includes(trackId)) throw new Error(`Unknown soundtrack: ${trackId}`);
    await copyFile(join(SOUNDTRACK_DIR, `${trackId}.mp3`), destFile);
  }
}
