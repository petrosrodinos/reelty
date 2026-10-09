import {
  VideoAddonKeys,
  type CreditsPricing,
  type CreditTier,
  type VideoQuote,
} from "@/features/credits/interfaces/credits.interfaces";
import { VideoLimits } from "@/lib/format.utils";

export interface VideoImageLimits {
  minImages: number;
  maxImages: number;
}

/** Photos per video allowed by the tiers: lowest min to highest max (mirrors CreditTiersService.imageLimits). */
export function imageLimitsFromTiers(tiers: CreditTier[] | undefined): VideoImageLimits {
  if (!tiers?.length) return { minImages: VideoLimits.minImages, maxImages: VideoLimits.maxImagesCeiling };
  return {
    minImages: Math.max(VideoLimits.minImages, Math.min(...tiers.map((t) => t.min_clips))),
    maxImages: Math.max(VideoLimits.minImages, Math.max(...tiers.map((t) => t.max_clips))),
  };
}

interface QuoteInput {
  clips: number;
  dewatermarked: boolean;
  /** Projects imported from a link pay the import add-on. */
  imported: boolean;
}

/**
 * Client-side mirror of the API price (CreditsService.quote) for instant feedback while editing.
 * The API recomputes it on submit, so this is display only. Clip counts outside the tiers are clamped.
 */
export function quoteVideo(pricing: CreditsPricing, input: QuoteInput): VideoQuote {
  const tiers = pricing.tiers;
  const min = tiers[0]?.min_clips ?? 0;
  const max = tiers[tiers.length - 1]?.max_clips ?? 0;
  const clips = Math.min(Math.max(input.clips, min), max);
  const tier = tiers.find((t) => clips >= t.min_clips && clips <= t.max_clips) ?? null;

  const addons: VideoQuote["addons"] = [];
  if (input.dewatermarked && pricing.addons.watermark_removal > 0) {
    addons.push({ key: VideoAddonKeys.WATERMARK_REMOVAL, credits: pricing.addons.watermark_removal });
  }
  if (input.imported && pricing.addons.import_fetch > 0) {
    addons.push({ key: VideoAddonKeys.IMPORT_FETCH, credits: pricing.addons.import_fetch });
  }

  return {
    clips: input.clips,
    tier,
    addons,
    total: (tier?.credits ?? 0) + addons.reduce((sum, addon) => sum + addon.credits, 0),
  };
}

/** The purchase slider moves in whole packs of this many videos. A UI choice only; the API accepts any credit count. */
export const PURCHASE_VIDEO_STEP = 3;
export const PURCHASE_MAX_VIDEOS = 60;

/** Credits per "video" on the purchase slider: the default tier's price. */
export function creditsPerVideo(pricing: CreditsPricing): number {
  return (pricing.tiers.find((t) => t.is_default) ?? pricing.tiers[0])?.credits ?? 1;
}

/** Price in euro cents, rounded like the API (BillingService.priceCents). */
export function priceCents(credits: number, creditsPerEur: number): number {
  if (creditsPerEur <= 0) return 0;
  return Math.round((credits / creditsPerEur) * 100);
}

interface TierShape {
  name: string;
  min_clips: number;
  max_clips: number;
  is_default: boolean;
}

/**
 * Mirror of the API rule (tierCoverageProblems): tiers are contiguous (no gaps or overlaps), start at
 * `floor` photos or more, end at `ceiling` or less, and exactly one is the default. Empty array means valid.
 */
export function tierCoverageProblems(tiers: TierShape[], floor: number, ceiling: number): string[] {
  if (!tiers.length) return ["Add at least one tier."];
  const problems: string[] = [];
  for (const t of tiers) {
    if (!t.name.trim()) problems.push("Every tier needs a name.");
    if (t.min_clips > t.max_clips) problems.push(`"${t.name}": min clips is greater than max clips.`);
  }
  const sorted = [...tiers].sort((a, b) => a.min_clips - b.min_clips);
  if (sorted[0].min_clips < floor) problems.push(`The first tier must start at ${floor} photos or more.`);
  if (sorted[sorted.length - 1].max_clips > ceiling) problems.push(`The last tier can go up to ${ceiling} photos at most.`);
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const cur = sorted[i];
    if (cur.min_clips <= prev.max_clips) problems.push(`"${prev.name}" and "${cur.name}" overlap.`);
    else if (cur.min_clips > prev.max_clips + 1) problems.push(`No tier covers ${prev.max_clips + 1}-${cur.min_clips - 1} clips.`);
  }
  if (tiers.filter((t) => t.is_default).length !== 1) problems.push("Exactly one tier must be the default.");
  return problems;
}
