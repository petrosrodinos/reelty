import { appConfig } from '@/shared/config/app';

export interface DomainLimits {
  wmMaxAttempts: number;
}

/** Domain limits from the shared app config. Photos per video come from the credit tiers (CreditTiersService.imageLimits). */
export function getLimits(): DomainLimits {
  return { wmMaxAttempts: appConfig.limits.wmMaxAttempts };
}

/** Spec 4.3: 8 + 5N - 0.8 * (N + 1) seconds; 0 below 3 images. */
export function estimateDurationSeconds(imageCount: number): number {
  if (imageCount < 3) return 0;
  return Math.round((8 + 5 * imageCount - 0.8 * (imageCount + 1)) * 10) / 10;
}
