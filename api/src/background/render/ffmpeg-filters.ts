// Pure, side-effect free builders for the FFmpeg assembly (Technical Guide §2 step 6, spec §4.3 / §6).
// Everything here only returns strings / argument arrays so it can be unit-tested without ffmpeg.
//
// Rules that keep the filter graph safe:
//  - user text is NEVER interpolated into a filter string: it is written to a text file by the caller
//    and referenced with `textfile=` (+ `expansion=none` so `%{...}` sequences are not expanded);
//  - paths that end up inside a filter are escaped with `escapeFilterPath`.

export const VideoSpec = {
  width: 1920,
  height: 1080,
  fps: 30,
  crf: 17,
  /** Intermediate (title/end card, normalised clips) quality: near lossless, fast. */
  intermediateCrf: 14,
  audioBitrate: '192k',
  audioSampleRate: 44100,
} as const;

export const Timing = {
  titleSeconds: 4,
  endSeconds: 4,
  clipSeconds: 5,
  crossfadeSeconds: 0.8,
  fadeOutSeconds: 1,
  musicFadeInSeconds: 1,
  musicFadeOutSeconds: 2,
  musicVolume: 0.35,
} as const;

export const Brand = {
  cardBackground: '0x181715',
  cream: '0xfaf9f5',
  coral: '0xcc785c',
  softText: '0xa09d96',
} as const;

const round3 = (n: number) => Math.round(n * 1000) / 1000;

/** Expected final duration: 8 + 5N - 0.8 (N + 1) seconds (spec §4.3). */
export function expectedDurationSeconds(clipCount: number): number {
  const n = Math.max(0, Math.floor(clipCount));
  return round3(
    Timing.titleSeconds + Timing.endSeconds + Timing.clipSeconds * n - Timing.crossfadeSeconds * (n + 1),
  );
}

export interface TransitionPlan {
  /** xfade offsets, one per transition (segments.length - 1). */
  offsets: number[];
  /** Duration of the chained result. */
  total: number;
}

/** xfade offsets for a chain of segments: offset_k = (duration of the chain so far) - crossfade. */
export function computeTransitionOffsets(
  segmentDurations: number[],
  crossfade: number = Timing.crossfadeSeconds,
): TransitionPlan {
  if (segmentDurations.length === 0) return { offsets: [], total: 0 };
  const offsets: number[] = [];
  let total = segmentDurations[0];
  for (let i = 1; i < segmentDurations.length; i++) {
    offsets.push(round3(total - crossfade));
    total += segmentDurations[i] - crossfade;
  }
  return { offsets, total: round3(total) };
}

/** Segment durations in order: title card, N clips, end card. */
export function segmentDurations(clipCount: number): number[] {
  return [
    Timing.titleSeconds,
    ...Array.from({ length: clipCount }, () => Timing.clipSeconds),
    Timing.endSeconds,
  ];
}

/**
 * Escapes a file path for use inside a single-quoted filter option value (`key='<value>'`).
 * Backslashes become `/` (accepted on Windows) and `:` is escaped for the option parser.
 * Paths containing quotes or line breaks are rejected rather than escaped.
 */
export function escapeFilterPath(path: string): string {
  if (/['\r\n]/.test(path)) {
    throw new Error('Path contains characters that are not allowed inside an ffmpeg filter');
  }
  return path.replace(/\\/g, '/').replace(/:/g, '\\:');
}

// ---------------------------------------------------------------------------
// Title / end cards
// ---------------------------------------------------------------------------

/** Strips control characters and collapses whitespace (card text is a single logical line per field). */
export function sanitizeCardText(text: string | null | undefined): string {
  return (text ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Greedy word wrap using an average glyph width estimate (0.6 em). Splits over-long words. */
export function wrapCardText(
  text: string,
  fontSize: number,
  maxWidthPx = 1560,
  maxLines = 3,
): string[] {
  const clean = sanitizeCardText(text);
  if (!clean) return [];
  const maxChars = Math.max(8, Math.floor(maxWidthPx / (fontSize * 0.6)));
  const lines: string[] = [];
  let current = '';
  const push = () => {
    if (current) lines.push(current);
    current = '';
  };
  for (let word of clean.split(' ')) {
    while (word.length > maxChars) {
      if (current) push();
      lines.push(word.slice(0, maxChars));
      word = word.slice(maxChars);
    }
    if (!word) continue;
    if (!current) current = word;
    else if ((current + ' ' + word).length <= maxChars) current += ' ' + word;
    else {
      push();
      current = word;
    }
  }
  push();
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/.{0,1}$/, '…');
    return kept;
  }
  return lines;
}

export interface CardLayoutLine {
  text: string;
  fontSize: number;
  color: string;
  /** Top y of the line in pixels. */
  y: number;
}

export interface CardLayout {
  lines: CardLayoutLine[];
  /** y of the small coral accent bar above the text block, or null. */
  accentY: number | null;
}

interface CardSection {
  text: string;
  fontSize: number;
  color: string;
  maxLines: number;
}

const LINE_HEIGHT = 1.25;
const SECTION_GAP = 30;

function layoutSections(sections: CardSection[], withAccent: boolean): CardLayout {
  const wrapped = sections
    .map((s) => ({ s, lines: wrapCardText(s.text, s.fontSize, 1560, s.maxLines) }))
    .filter((w) => w.lines.length > 0);
  if (wrapped.length === 0) return { lines: [], accentY: null };

  let height = 0;
  wrapped.forEach((w, i) => {
    height += w.lines.length * w.s.fontSize * LINE_HEIGHT;
    if (i < wrapped.length - 1) height += SECTION_GAP;
  });
  const accentSpace = withAccent ? 44 : 0;
  let y = Math.round((VideoSpec.height - height - accentSpace) / 2) + accentSpace;
  const accentY = withAccent ? y - accentSpace : null;

  const lines: CardLayoutLine[] = [];
  wrapped.forEach((w, i) => {
    for (const text of w.lines) {
      lines.push({ text, fontSize: w.s.fontSize, color: w.s.color, y: Math.round(y) });
      y += w.s.fontSize * LINE_HEIGHT;
    }
    if (i < wrapped.length - 1) y += SECTION_GAP;
  });
  return { lines, accentY };
}

function titleFontSize(title: string): number {
  const len = sanitizeCardText(title).length;
  if (len <= 26) return 92;
  if (len <= 40) return 76;
  return 62;
}

export function layoutTitleCard(input: {
  title: string;
  subtitle?: string | null;
  locationLine?: string | null;
}): CardLayout {
  return layoutSections(
    [
      { text: input.title, fontSize: titleFontSize(input.title), color: Brand.cream, maxLines: 3 },
      { text: input.subtitle ?? '', fontSize: 44, color: Brand.coral, maxLines: 2 },
      { text: input.locationLine ?? '', fontSize: 36, color: Brand.softText, maxLines: 2 },
    ],
    true,
  );
}

/** End card: the closing line, falling back to title + location line when the user left it empty. */
export function layoutEndCard(input: {
  closingLine?: string | null;
  title: string;
  locationLine?: string | null;
}): CardLayout {
  const closing = sanitizeCardText(input.closingLine);
  if (closing) {
    return layoutSections(
      [{ text: closing, fontSize: closing.length <= 40 ? 68 : 54, color: Brand.cream, maxLines: 4 }],
      true,
    );
  }
  return layoutSections(
    [
      { text: input.title, fontSize: titleFontSize(input.title), color: Brand.cream, maxLines: 3 },
      { text: input.locationLine ?? '', fontSize: 36, color: Brand.softText, maxLines: 2 },
    ],
    true,
  );
}

export interface CardDrawItem {
  /** Text file (relative to the ffmpeg cwd or absolute) holding exactly one wrapped line. */
  textFile: string;
  fontSize: number;
  color: string;
  y: number;
}

/**
 * `-vf` value drawing the accent bar and the text lines. Lines fade in one after the other.
 * Text comes only from `textfile` (never from the filter string) and expansion is disabled.
 */
export function buildCardFilter(
  items: CardDrawItem[],
  fontFile: string,
  accentY: number | null,
  firstFadeStart = 0.4,
): string {
  const font = escapeFilterPath(fontFile);
  const parts: string[] = [];
  if (accentY !== null) {
    parts.push(
      `drawbox=x=(iw-120)/2:y=${Math.round(accentY)}:w=120:h=4:color=${Brand.coral}@1:t=fill`,
    );
  }
  items.forEach((item, i) => {
    const start = round3(firstFadeStart + i * 0.25);
    parts.push(
      `drawtext=fontfile='${font}':textfile='${escapeFilterPath(item.textFile)}':expansion=none` +
        `:fontsize=${Math.round(item.fontSize)}:fontcolor=${item.color}` +
        `:x=(w-text_w)/2:y=${Math.round(item.y)}` +
        `:alpha='min(1,max(0,(t-${start})/0.8))'`,
    );
  });
  // A card without text (should not happen) still needs a valid filter.
  return parts.length > 0 ? parts.join(',') : 'null';
}

export function buildCardArgs(input: { vf: string; seconds: number; outFile: string }): string[] {
  const { width, height, fps } = VideoSpec;
  return [
    '-f', 'lavfi',
    '-i', `color=c=${Brand.cardBackground}:s=${width}x${height}:r=${fps}:d=${input.seconds}`,
    '-vf', `${input.vf},format=yuv420p`,
    '-t', String(input.seconds),
    '-an',
    '-c:v', 'libx264',
    '-crf', String(VideoSpec.intermediateCrf),
    '-preset', 'fast',
    '-pix_fmt', 'yuv420p',
    '-r', String(fps),
    input.outFile,
  ];
}

// ---------------------------------------------------------------------------
// Clip normalisation (blurred fill, exactly 5 s @ 30 fps, 1920x1080)
// ---------------------------------------------------------------------------

/**
 * Filter graph with input `[0:v]` and output `[v]`.
 * - forces exactly `clipSeconds` of video (tpad clones the last frame if the clip is short);
 * - sharp copy fitted inside 1920x1080 over a blurred, darkened, enlarged copy of itself
 *   (the blur is computed on a 480x270 downscale, which is much faster and visually equivalent).
 */
export function buildNormalizeFilter(): string {
  const { width: W, height: H, fps } = VideoSpec;
  const secs = Timing.clipSeconds;
  return [
    `[0:v]setsar=1,fps=${fps},tpad=stop_mode=clone:stop_duration=${secs + 1},trim=duration=${secs},setpts=PTS-STARTPTS,split[a][b]`,
    `[a]scale=480:270:force_original_aspect_ratio=increase,crop=480:270,boxblur=8:2,scale=${W}:${H},eq=brightness=-0.08[bg]`,
    `[b]scale=${W}:${H}:force_original_aspect_ratio=decrease:flags=lanczos[fg]`,
    `[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1,format=yuv420p[v]`,
  ].join(';');
}

export function buildNormalizeArgs(input: { inputFile: string; outFile: string }): string[] {
  return [
    '-i', input.inputFile,
    '-filter_complex', buildNormalizeFilter(),
    '-map', '[v]',
    '-an',
    '-c:v', 'libx264',
    '-crf', String(VideoSpec.intermediateCrf),
    '-preset', 'fast',
    '-pix_fmt', 'yuv420p',
    '-r', String(VideoSpec.fps),
    input.outFile,
  ];
}

// ---------------------------------------------------------------------------
// Final assembly
// ---------------------------------------------------------------------------

export interface AssemblyGraphInput {
  clipCount: number;
  music: boolean;
}

export interface AssemblyGraph {
  filterComplex: string;
  videoLabel: string;
  audioLabel: string;
  /** Input index of the audio source (after the title card, the clips and the end card). */
  audioInputIndex: number;
  /** Number of video inputs: title + clips + end. */
  videoInputCount: number;
  expectedDuration: number;
  offsets: number[];
}

/**
 * Full filter graph: xfade chain over [title, clips..., end] (video only), 1 s fade out, and the audio branch.
 *  - music on:  atrim -> loudnorm -> volume 0.35 -> afade in 1 s / out 2 s
 *  - music off: silent track (anullsrc) so every player accepts the file
 * Inputs: 0 = title card, 1..N = normalised clips, N+1 = end card, N+2 = audio source.
 */
export function buildAssemblyFilterGraph(input: AssemblyGraphInput): AssemblyGraph {
  if (!Number.isInteger(input.clipCount) || input.clipCount < 1) {
    throw new Error('Assembly requires at least one clip');
  }
  const durations = segmentDurations(input.clipCount);
  const videoInputCount = durations.length;
  const { offsets, total } = computeTransitionOffsets(durations);
  const expected = expectedDurationSeconds(input.clipCount);
  const parts: string[] = [];

  // Make every input identical for xfade: 30 fps (timebase 1/30), zero-based pts, same sar / pixel format.
  for (let i = 0; i < videoInputCount; i++) {
    parts.push(`[${i}:v]fps=${VideoSpec.fps},setpts=PTS-STARTPTS,setsar=1,format=yuv420p[s${i}]`);
  }

  let current = 's0';
  for (let i = 1; i < videoInputCount; i++) {
    const out = i === videoInputCount - 1 ? 'xend' : `x${i}`;
    parts.push(
      `[${current}][s${i}]xfade=transition=fade:duration=${Timing.crossfadeSeconds}:offset=${offsets[i - 1].toFixed(3)}[${out}]`,
    );
    current = out;
  }

  const fadeStart = round3(total - Timing.fadeOutSeconds);
  parts.push(`[${current}]fade=t=out:st=${fadeStart.toFixed(3)}:d=${Timing.fadeOutSeconds},format=yuv420p[vout]`);

  const audioIdx = videoInputCount;
  const d = total.toFixed(3);
  if (input.music) {
    const fadeOutStart = round3(total - Timing.musicFadeOutSeconds).toFixed(3);
    parts.push(
      `[${audioIdx}:a]aformat=sample_fmts=fltp:channel_layouts=stereo,atrim=0:${d},asetpts=PTS-STARTPTS,` +
        `loudnorm=I=-14:TP=-1.5:LRA=11,volume=${Timing.musicVolume},` +
        `afade=t=in:st=0:d=${Timing.musicFadeInSeconds},afade=t=out:st=${fadeOutStart}:d=${Timing.musicFadeOutSeconds},` +
        `aresample=${VideoSpec.audioSampleRate}[aout]`,
    );
  } else {
    parts.push(
      `[${audioIdx}:a]aformat=sample_fmts=fltp:channel_layouts=stereo,atrim=0:${d},asetpts=PTS-STARTPTS,` +
        `aresample=${VideoSpec.audioSampleRate}[aout]`,
    );
  }

  return {
    filterComplex: parts.join(';'),
    videoLabel: 'vout',
    audioLabel: 'aout',
    audioInputIndex: audioIdx,
    videoInputCount,
    expectedDuration: total,
    offsets,
  };
}

export type AudioSource = { kind: 'music'; file: string } | { kind: 'silent' };

export function buildAssemblyArgs(input: {
  /** title card, normalised clips in order, end card */
  videoFiles: string[];
  audio: AudioSource;
  graph: AssemblyGraph;
  outFile: string;
}): string[] {
  if (input.videoFiles.length !== input.graph.videoInputCount) {
    throw new Error(
      `Expected ${input.graph.videoInputCount} video inputs, got ${input.videoFiles.length}`,
    );
  }
  const args: string[] = [];
  for (const f of input.videoFiles) args.push('-i', f);
  if (input.audio.kind === 'music') {
    // Loop as a safety net in case a track is shorter than the video (the longest is 57.6 s).
    args.push('-stream_loop', '-1', '-i', input.audio.file);
  } else {
    args.push('-f', 'lavfi', '-i', `anullsrc=r=${VideoSpec.audioSampleRate}:cl=stereo`);
  }
  args.push(
    '-filter_complex', input.graph.filterComplex,
    '-map', `[${input.graph.videoLabel}]`,
    '-map', `[${input.graph.audioLabel}]`,
    '-c:v', 'libx264',
    '-crf', String(VideoSpec.crf),
    '-preset', 'medium',
    '-pix_fmt', 'yuv420p',
    '-r', String(VideoSpec.fps),
    '-profile:v', 'high',
    '-c:a', 'aac',
    '-b:a', VideoSpec.audioBitrate,
    '-movflags', '+faststart',
    '-t', input.graph.expectedDuration.toFixed(3),
    input.outFile,
  );
  return args;
}

/** A poster frame taken from the first clip (after the title card and its crossfade). */
export function posterTimestamp(totalSeconds: number): number {
  const t = Timing.titleSeconds - Timing.crossfadeSeconds + 1.5;
  return round3(Math.min(t, Math.max(0, totalSeconds / 2)));
}

export function buildPosterArgs(input: { inputFile: string; outFile: string; atSeconds: number }): string[] {
  return [
    '-ss', input.atSeconds.toFixed(3),
    '-i', input.inputFile,
    '-frames:v', '1',
    '-vf', 'scale=1280:-2',
    '-q:v', '3',
    input.outFile,
  ];
}
