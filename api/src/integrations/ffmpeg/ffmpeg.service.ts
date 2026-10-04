import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { ProcessResult, runProcess, RunProcessOptions } from './process.utils';

export interface ProbeStream {
  codec_type?: string;
  codec_name?: string;
  width?: number;
  height?: number;
  r_frame_rate?: string;
  avg_frame_rate?: string;
  pix_fmt?: string;
  duration?: string;
}

export interface ProbeResult {
  streams: ProbeStream[];
  format: { duration?: string; size?: string; format_name?: string };
}

/** Default bold font per platform; `FFMPEG_FONT_PATH` overrides (the worker Dockerfile installs fonts-dejavu-core). */
export function defaultFontPath(platform: NodeJS.Platform): string {
  if (platform === 'win32') return 'C:/Windows/Fonts/arialbd.ttf';
  if (platform === 'darwin') return '/System/Library/Fonts/Supplemental/Arial Bold.ttf';
  return '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';
}

function resolveFfmpegStatic(): string | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const p = require('ffmpeg-static') as string | null;
    return p || null;
  } catch {
    return null;
  }
}

function resolveFfprobeStatic(): string | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const p = require('ffprobe-static') as { path?: string };
    return p?.path || null;
  } catch {
    return null;
  }
}

/** Binary resolution (FFMPEG_PATH / FFPROBE_PATH, else ffmpeg-static / ffprobe-static) and process helpers. */
@Injectable()
export class FfmpegService {
  private readonly logger = new Logger(FfmpegService.name);
  readonly ffmpegPath: string;
  readonly ffprobePath: string;
  private readonly configuredFont?: string;

  constructor(config: ConfigService) {
    this.ffmpegPath = config.get<string>('FFMPEG_PATH') || resolveFfmpegStatic() || 'ffmpeg';
    this.ffprobePath = config.get<string>('FFPROBE_PATH') || resolveFfprobeStatic() || 'ffprobe';
    this.configuredFont = config.get<string>('FFMPEG_FONT_PATH') || undefined;
  }

  /** Absolute font file used by drawtext. Throws a clear error when missing. */
  getFontPath(): string {
    const font = this.configuredFont || defaultFontPath(process.platform);
    if (!existsSync(font)) {
      throw new Error(`Font file not found at "${font}". Set FFMPEG_FONT_PATH to a TrueType font.`);
    }
    return font;
  }

  run(args: string[], opts: RunProcessOptions = {}): Promise<ProcessResult> {
    return runProcess(this.ffmpegPath, ['-hide_banner', '-nostdin', '-y', '-loglevel', 'error', ...args], {
      timeoutMs: 20 * 60 * 1000,
      ...opts,
    });
  }

  async probe(file: string): Promise<ProbeResult> {
    const { stdout } = await runProcess(
      this.ffprobePath,
      ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', file],
      { timeoutMs: 60_000, maxBufferBytes: 2 * 1024 * 1024 },
    );
    const parsed = JSON.parse(stdout) as Partial<ProbeResult>;
    return { streams: parsed.streams ?? [], format: parsed.format ?? {} };
  }

  /** Full decode test (`ffmpeg -v error -i file -f null -`). Returns stderr (empty = clean). */
  async decodeTest(file: string): Promise<string> {
    const { stderr } = await runProcess(
      this.ffmpegPath,
      ['-hide_banner', '-nostdin', '-v', 'error', '-i', file, '-f', 'null', '-'],
      { timeoutMs: 10 * 60 * 1000 },
    );
    return stderr.trim();
  }
}
