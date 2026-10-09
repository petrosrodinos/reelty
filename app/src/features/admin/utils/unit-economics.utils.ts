import type { AppConfigItem } from "@/features/admin/interfaces/admin.interfaces";
import type { CreditTier } from "@/features/credits/interfaces/credits.interfaces";
import { priceCents } from "@/features/credits/utils/credit-pricing.utils";

/** The app_config values the calculator reads, keyed by what they mean. */
export interface EconomicsRates {
  creditsPerEur: number;
  usdPerEur: number;
  higgsfieldUsdPerCredit: number;
  higgsfieldCreditsPerClip: number;
  dewatermarkCreditsPerImage: number;
  dewatermarkUsdPerCredit: number;
  apifyUsdPerRun: number;
  watermarkAddonCredits: number;
  importAddonCredits: number;
}

const RATE_KEYS: Record<keyof EconomicsRates, string> = {
  creditsPerEur: "billing.credits_per_eur",
  usdPerEur: "billing.usd_per_eur",
  higgsfieldUsdPerCredit: "higgsfield.usd_per_credit",
  higgsfieldCreditsPerClip: "higgsfield.fallback_credits_per_clip",
  dewatermarkCreditsPerImage: "dewatermark.credits_per_image",
  dewatermarkUsdPerCredit: "dewatermark.usd_per_credit",
  apifyUsdPerRun: "apify.fallback_usd_per_run",
  watermarkAddonCredits: "credits.watermark_removal",
  importAddonCredits: "credits.import_fetch",
};

export function ratesFromConfig(items: AppConfigItem[]): EconomicsRates {
  const byKey = new Map(items.map((item) => [item.key, item.value]));
  return Object.fromEntries(
    Object.entries(RATE_KEYS).map(([name, key]) => [name, byKey.get(key) ?? 0]),
  ) as unknown as EconomicsRates;
}

export interface PackEconomics {
  credits: number;
  amountCents: number;
  feeCents: number;
  netCents: number;
  /** What we actually keep per credit sold in this pack, after the Stripe fee (fractional cents). */
  netCentsPerCredit: number;
  /** False when credits / credits-per-€ is not a whole number of cents, so the price is rounded. */
  exactCents: boolean;
  /** True when the pack price is a whole number of euros. */
  wholeEuros: boolean;
}

/**
 * One checkout of `credits` credits, priced like BillingService.priceCents. `stripeFeePct` is the real average
 * fee Stripe charged on past purchases (from their balance transactions); null when there are none yet.
 */
export function packEconomics(credits: number, rates: EconomicsRates, stripeFeePct: number | null): PackEconomics {
  const amountCents = priceCents(credits, rates.creditsPerEur);
  const feeCents = Math.round((amountCents * (stripeFeePct ?? 0)) / 100);
  const netCents = amountCents - feeCents;
  return {
    credits,
    amountCents,
    feeCents,
    netCents,
    netCentsPerCredit: credits > 0 ? netCents / credits : 0,
    exactCents: rates.creditsPerEur > 0 && (credits * 100) % rates.creditsPerEur === 0,
    wholeEuros: rates.creditsPerEur > 0 && credits % rates.creditsPerEur === 0,
  };
}

export interface VideoAddonsInput {
  watermarkRemoval: boolean;
  imported: boolean;
}

export interface TierEconomics {
  tier: CreditTier;
  /** Clip count the cost is computed at: the top of the tier (worst case). */
  clips: number;
  credits: number;
  revenueCents: number;
  costCents: number;
  marginCents: number;
  /** Margin as % of revenue; null when revenue is 0. */
  marginPct: number | null;
}

/**
 * One video in `tier`, paid for with credits bought at `netCentsPerCredit`. Provider cost is taken at the
 * tier's max clips with the configured fallback prices (every clip one Higgsfield generation, every photo
 * dewatermarked when that add-on is on), converted from USD at `usdPerEur`.
 */
export function tierEconomics(
  tier: CreditTier,
  netCentsPerCredit: number,
  addons: VideoAddonsInput,
  rates: EconomicsRates,
): TierEconomics {
  const clips = tier.max_clips;
  let credits = tier.credits;
  let costUsd = clips * rates.higgsfieldCreditsPerClip * rates.higgsfieldUsdPerCredit;
  if (addons.watermarkRemoval) {
    credits += rates.watermarkAddonCredits;
    costUsd += clips * rates.dewatermarkCreditsPerImage * rates.dewatermarkUsdPerCredit;
  }
  if (addons.imported) {
    credits += rates.importAddonCredits;
    costUsd += rates.apifyUsdPerRun;
  }
  const revenueCents = credits * netCentsPerCredit;
  const costCents = rates.usdPerEur > 0 ? (costUsd / rates.usdPerEur) * 100 : 0;
  const marginCents = revenueCents - costCents;
  return {
    tier,
    clips,
    credits,
    revenueCents,
    costCents,
    marginCents,
    marginPct: revenueCents > 0 ? (marginCents / revenueCents) * 100 : null,
  };
}

/**
 * Credits-per-€ values (1..`limit`) for which every pack of `step` videos costs a whole number of euros.
 * With credits_per_eur = N that holds when N divides step * creditsPerVideo (packs are multiples of it).
 */
export function wholeEuroRates(step: number, creditsPerVideo: number, limit = 12): number[] {
  const packCredits = step * creditsPerVideo;
  const rates: number[] = [];
  for (let n = 1; n <= limit; n++) if (packCredits % n === 0) rates.push(n);
  return rates;
}
