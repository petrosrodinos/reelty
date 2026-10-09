import type { AppConfigItem } from "@/features/admin/interfaces/admin.interfaces";
import type { CreditRateTier, CreditTier } from "@/features/credits/interfaces/credits.interfaces";
import { priceCents, rateFor } from "@/features/credits/utils/credit-pricing.utils";

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
  /** Credits per €1 this pack is priced at: the base rate or a better volume tier. */
  rate: number;
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
 * One checkout of `credits` credits, priced like the API: the base rate (rates.creditsPerEur) or the best volume
 * tier reached. `stripeFeePct` is the real average fee Stripe charged on past purchases; null when there are none.
 */
export function packEconomics(
  credits: number,
  rates: EconomicsRates,
  stripeFeePct: number | null,
  rateTiers: Pick<CreditRateTier, "min_eur" | "credits_per_eur">[] = [],
): PackEconomics {
  const rate = rateFor(credits, rates.creditsPerEur, rateTiers);
  const amountCents = priceCents(credits, rate);
  const feeCents = Math.round((amountCents * (stripeFeePct ?? 0)) / 100);
  const netCents = amountCents - feeCents;
  return {
    credits,
    rate,
    amountCents,
    feeCents,
    netCents,
    netCentsPerCredit: credits > 0 ? netCents / credits : 0,
    exactCents: rate > 0 && (credits * 100) % rate === 0,
    wholeEuros: rate > 0 && credits % rate === 0,
  };
}

/**
 * Mirror of the API rule (rateTierProblems) plus the DTO's whole-number checks: every rate beats the base,
 * amounts are unique and rates rise with them. Empty array means valid.
 */
export function rateTierProblems(tiers: { min_eur: number; credits_per_eur: number }[], baseRate: number): string[] {
  const problems: string[] = [];
  for (const t of tiers) {
    if (!Number.isInteger(t.min_eur) || t.min_eur < 1) problems.push("Amounts must be whole euros, 1 or more.");
    if (!Number.isInteger(t.credits_per_eur)) problems.push("Rates must be whole credits.");
    else if (t.credits_per_eur <= baseRate)
      problems.push(`Every rate must be more than the base ${baseRate} credits per €1.`);
  }
  const sorted = [...tiers].sort((a, b) => a.min_eur - b.min_eur);
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const cur = sorted[i];
    if (cur.min_eur === prev.min_eur) problems.push(`Two tiers start at €${cur.min_eur}.`);
    else if (cur.credits_per_eur <= prev.credits_per_eur)
      problems.push(`The rate from €${cur.min_eur} must be more than the ${prev.credits_per_eur} from €${prev.min_eur}.`);
  }
  return [...new Set(problems)];
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
