import { Injectable, Logger } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { FfmpegService } from '@/integrations/ffmpeg/ffmpeg.service';
import { mapPool } from '../common/pool';
import {
  AudioSource,
  CardLayout,
  buildAssemblyArgs,
  buildAssemblyFilterGraph,
  buildCardArgs,
  buildCardFilter,
  buildNormalizeArgs,
  buildPosterArgs,
  expectedDurationSeconds,
  layoutEndCard,
  layoutTitleCard,
  posterTimestamp,
  Timing,
} from './ffmpeg-filters';
import { evaluateProbe } from './qa.utils';
import { SoundtrackService } from './soundtrack.service';

export interface AssemblyInput {
  /** Scratch directory (created and removed by the caller). */
  dir: string;
  /** Downloaded provider clips in video order. */
  clipFiles: string[];
  title: string;
  subtitle?: string | null;
  locationLine?: string | null;
  closingLine?: string | null;
  music: boolean;
  /** Which built-in track to use when `music` is on. */
  soundtrackId: string;
}

export interface AssemblyResult {
  finalFile: string;
  posterFile: string;
  durationSeconds: number;
  /** Set when music was requested but the soundtrack could not be prepared (silent track used instead). */
  musicFallback: boolean;
}

/** The QA gate or ffmpeg rejected the output. `details` is for admins only (never shown to users). */
export class AssemblyError extends Error {
  constructor(
    message: string,
    readonly details: string,
  ) {
    super(message);
    this.name = 'AssemblyError';
  }
}

@Injectable()
export class AssemblyService {
  private readonly logger = new Logger(AssemblyService.name);

  constructor(
    private readonly ffmpeg: FfmpegService,
    private readonly soundtrack: SoundtrackService,
  ) {}

  /** Title card + normalised clips + end card -> xfade chain -> audio -> QA gate -> poster frame. */
  async assemble(input: AssemblyInput): Promise<AssemblyResult> {
    const { dir } = input;
    const n = input.clipFiles.length;
    const expected = expectedDurationSeconds(n);

    try {
      const font = this.ffmpeg.getFontPath();

      // 1. cards (text is written to files, never placed in the filter string)
      const titleLayout = layoutTitleCard({
        title: input.title,
        subtitle: input.subtitle,
        locationLine: input.locationLine,
      });
      const endLayout = layoutEndCard({
        closingLine: input.closingLine,
        title: input.title,
        locationLine: input.locationLine,
      });
      await this.renderCard(dir, 'title', titleLayout, Timing.titleSeconds, font);
      await this.renderCard(dir, 'end', endLayout, Timing.endSeconds, font);

      // 2. normalise every clip to 1920x1080 @ 30 fps, exactly 5 s, blurred fill
      const normalized = input.clipFiles.map((_, i) => join(dir, `n${i + 1}.mp4`));
      await mapPool(input.clipFiles, 2, (file, i) =>
        this.ffmpeg.run(buildNormalizeArgs({ inputFile: file, outFile: normalized[i] }), { cwd: dir }),
      );

      // 3. audio source
      const audio = await this.prepareAudio(dir, input.music, input.soundtrackId);

      // 4. xfade chain + fades + audio
      const graph = buildAssemblyFilterGraph({ clipCount: n, music: audio.source.kind === 'music' });
      const finalFile = join(dir, 'final.mp4');
      await this.ffmpeg.run(
        buildAssemblyArgs({
          videoFiles: [join(dir, 'title.mp4'), ...normalized, join(dir, 'end.mp4')],
          audio: audio.source,
          graph,
          outFile: finalFile,
        }),
        { cwd: dir },
      );

      // 5. QA gate: probe + full decode test
      const probe = await this.ffmpeg.probe(finalFile);
      const issues = evaluateProbe(probe, expected, 1);
      if (issues.length) throw new AssemblyError('QA gate failed', issues.join('; '));
      const decodeErrors = await this.ffmpeg.decodeTest(finalFile);
      if (decodeErrors) throw new AssemblyError('Decode test failed', decodeErrors.slice(0, 1000));

      // 6. poster frame
      const posterFile = join(dir, 'poster.jpg');
      await this.ffmpeg.run(
        buildPosterArgs({ inputFile: finalFile, outFile: posterFile, atSeconds: posterTimestamp(graph.expectedDuration) }),
        { cwd: dir },
      );

      return {
        finalFile,
        posterFile,
        durationSeconds: Math.round(Number(probe.format.duration) * 100) / 100,
        musicFallback: input.music && audio.source.kind !== 'music',
      };
    } catch (error) {
      if (error instanceof AssemblyError) throw error;
      const stderr = (error as { stderrTail?: string }).stderrTail;
      throw new AssemblyError('ffmpeg failed', `${(error as Error).message}${stderr ? `: ${stderr.slice(-1500)}` : ''}`);
    }
  }

  private async renderCard(dir: string, name: string, layout: CardLayout, seconds: number, font: string) {
    const items = [] as { textFile: string; fontSize: number; color: string; y: number }[];
    for (let i = 0; i < layout.lines.length; i++) {
      const line = layout.lines[i];
      const textFile = `${name}_${i}.txt`; // relative to cwd = dir
      await writeFile(join(dir, textFile), line.text, 'utf8');
      items.push({ textFile, fontSize: line.fontSize, color: line.color, y: line.y });
    }
    const vf = buildCardFilter(items, font, layout.accentY);
    await this.ffmpeg.run(buildCardArgs({ vf, seconds, outFile: `${name}.mp4` }), { cwd: dir });
  }

  private async prepareAudio(dir: string, music: boolean, soundtrackId: string): Promise<{ source: AudioSource }> {
    if (!music) return { source: { kind: 'silent' } };
    try {
      const file = join(dir, 'track.mp3');
      await this.soundtrack.fetchTrack(soundtrackId, file);
      return { source: { kind: 'music', file } };
    } catch (error) {
      // A missing soundtrack must not fail the render: fall back to the silent AAC track.
      this.logger.warn(`Soundtrack unavailable, using a silent track: ${(error as Error).message}`);
      return { source: { kind: 'silent' } };
    }
  }
}
