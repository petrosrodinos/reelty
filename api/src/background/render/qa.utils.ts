import type { ProbeResult } from '@/integrations/ffmpeg/ffmpeg.service';
import { VideoSpec } from './ffmpeg-filters';

/** Parses "30/1", "30000/1001" or "30" into a number (0 when invalid). */
export function parseFrameRate(value: string | undefined): number {
  if (!value) return 0;
  const [num, den] = value.split('/').map(Number);
  if (!Number.isFinite(num)) return 0;
  if (den === undefined) return num;
  if (!Number.isFinite(den) || den === 0) return 0;
  return num / den;
}

/**
 * QA gate (spec §4.1 step 7 / TG §8): 1920x1080, 30 fps, H.264, AAC audio present,
 * duration within `toleranceSeconds` of the expected value. Returns the list of problems (empty = pass).
 * The full decode test is run separately by the caller.
 */
export function evaluateProbe(
  probe: ProbeResult,
  expectedDurationSeconds: number,
  toleranceSeconds = 1,
): string[] {
  const issues: string[] = [];
  const video = probe.streams.find((s) => s.codec_type === 'video');
  const audio = probe.streams.find((s) => s.codec_type === 'audio');

  if (!video) {
    issues.push('no video stream');
  } else {
    if (video.codec_name !== 'h264') issues.push(`video codec is ${video.codec_name}, expected h264`);
    if (video.width !== VideoSpec.width || video.height !== VideoSpec.height) {
      issues.push(`resolution is ${video.width}x${video.height}, expected ${VideoSpec.width}x${VideoSpec.height}`);
    }
    const fps = parseFrameRate(video.avg_frame_rate) || parseFrameRate(video.r_frame_rate);
    if (Math.abs(fps - VideoSpec.fps) > 0.01) issues.push(`frame rate is ${fps}, expected ${VideoSpec.fps}`);
  }

  if (!audio) issues.push('no audio stream');
  else if (audio.codec_name !== 'aac') issues.push(`audio codec is ${audio.codec_name}, expected aac`);

  const duration = Number(probe.format.duration);
  if (!Number.isFinite(duration)) issues.push('duration unknown');
  else if (Math.abs(duration - expectedDurationSeconds) > toleranceSeconds) {
    issues.push(`duration is ${duration.toFixed(2)} s, expected ${expectedDurationSeconds.toFixed(2)} s`);
  }
  return issues;
}
