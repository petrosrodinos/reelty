import { ConfigService } from '@nestjs/config';
import { Limits } from '@/core/queues/queues.constants';

export interface DomainLimits {
  minImages: number;
  maxImages: number;
  wmMaxAttempts: number;
}

/** Env-overridable domain limits (defaults from queues.constants Limits). */
export function getLimits(config: ConfigService): DomainLimits {
  return {
    minImages: config.get<number>('MIN_IMAGES') ?? Limits.MIN_IMAGES,
    maxImages: config.get<number>('MAX_IMAGES') ?? Limits.MAX_IMAGES,
    wmMaxAttempts: config.get<number>('WM_MAX_ATTEMPTS') ?? Limits.WM_MAX_ATTEMPTS,
  };
}

/** Spec 4.3: 8 + 5N - 0.8 * (N + 1) seconds; 0 below 3 images. */
export function estimateDurationSeconds(imageCount: number): number {
  if (imageCount < 3) return 0;
  return Math.round((8 + 5 * imageCount - 0.8 * (imageCount + 1)) * 10) / 10;
}
