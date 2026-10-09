"use client";

import { useState, type FC } from "react";
import { CreditCardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { useCreateCheckout } from "@/features/billing/hooks/use-billing";
import type { CreditsPricing } from "@/features/credits/interfaces/credits.interfaces";
import {
  creditsPerVideo,
  nextRateTier,
  priceCents,
  PURCHASE_MAX_VIDEOS as MAX_VIDEOS,
  PURCHASE_VIDEO_STEP as VIDEO_STEP,
  rateFor,
  tierMinCredits,
} from "@/features/credits/utils/credit-pricing.utils";
import { formatEurCents, pluralize } from "@/lib/format.utils";

interface BuyCreditsCardProps {
  pricing: CreditsPricing;
  /** Project to return to after paying (its edit page); omitted means the credits page. */
  returnProjectId?: string;
  /** Short version for the buy-credits modal: no card chrome, no heading or intro (the dialog supplies them). */
  compact?: boolean;
}

export const BuyCreditsCard: FC<BuyCreditsCardProps> = ({ pricing, returnProjectId, compact = false }) => {
  const checkout = useCreateCheckout();
  const perVideo = creditsPerVideo(pricing);
  const defaultTier = pricing.tiers.find((tier) => tier.is_default) ?? pricing.tiers[0];
  const maxByCredits = Math.floor(pricing.max_credits_per_purchase / Math.max(perVideo, 1) / VIDEO_STEP) * VIDEO_STEP;
  const maxVideos = Math.max(VIDEO_STEP, Math.min(MAX_VIDEOS, maxByCredits));
  const baseRate = pricing.credits_per_eur;

  const [videos, setVideos] = useState(VIDEO_STEP);
  const credits = videos * perVideo;
  const rate = rateFor(credits, baseRate, pricing.rate_tiers);
  const cents = priceCents(credits, rate);
  const baseCents = priceCents(credits, baseRate);
  // The next better rate, as the first slider stop that reaches it (customers pick videos, not credits).
  const next = nextRateTier(credits, baseRate, pricing.rate_tiers);
  const nextVideos = next
    ? Math.ceil(tierMinCredits(next) / Math.max(perVideo, 1) / VIDEO_STEP) * VIDEO_STEP
    : null;
  // What that pack saves against the base price, in euros.
  const nextCredits = (nextVideos ?? 0) * perVideo;
  const nextSavingCents =
    priceCents(nextCredits, baseRate) - priceCents(nextCredits, rateFor(nextCredits, baseRate, pricing.rate_tiers));

  return (
    <section
      aria-labelledby={compact ? undefined : "buy-heading"}
      className={compact ? undefined : "rounded-lg border border-hairline bg-canvas p-5 sm:p-6"}
    >
      {compact ? null : (
        <>
          <h2 id="buy-heading" className="text-lg font-medium text-ink">
            Buy credits
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose how many videos you want to make. Shorter videos cost less, longer ones more.
          </p>
        </>
      )}

      <div className={compact ? "flex items-baseline justify-between gap-4" : "mt-6 flex items-baseline justify-between gap-4"}>
        <p className="text-display-sm tabular-nums">{pluralize(videos, "video")}</p>
        <p className="text-sm text-muted-foreground tabular-nums">{pluralize(credits, "credit")}</p>
      </div>

      <Slider
        className="mt-5"
        min={VIDEO_STEP}
        max={maxVideos}
        step={VIDEO_STEP}
        value={[videos]}
        onValueChange={(value) => setVideos(Array.isArray(value) ? value[0] : value)}
        aria-label="Number of videos"
        disabled={checkout.isPending}
      />
      <div className="mt-2 flex justify-between text-xs text-muted-foreground tabular-nums">
        <span>{VIDEO_STEP}</span>
        <span>{maxVideos}</span>
      </div>
      {next && nextVideos !== null && nextVideos <= maxVideos ? (
        <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
          Buy {nextVideos}+ videos and{" "}
          <span className="font-medium text-ink">save {formatEurCents(nextSavingCents)}</span>.
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 border-t border-hairline-soft pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-semibold tabular-nums">
            {formatEurCents(cents)}
            {cents < baseCents ? (
              <span className="ml-2 text-base font-normal text-muted-foreground line-through">
                {formatEurCents(baseCents)}
              </span>
            ) : null}
          </p>
          {cents < baseCents ? (
            <p className="text-sm font-medium text-success tabular-nums">
              You save {formatEurCents(baseCents - cents)}
            </p>
          ) : null}
        </div>
        <Button
          size="lg"
          onClick={() => checkout.mutate({ credits, videos_selected: videos, return_project_id: returnProjectId })}
          disabled={!pricing.payments_enabled || checkout.isPending || cents < 50}
        >
          {checkout.isPending ? <Spinner /> : <CreditCardIcon />}
          Pay with Stripe
        </Button>
      </div>
      {!pricing.payments_enabled ? (
        <p className="mt-3 text-sm text-muted-foreground">Payments are not available right now. Please check back soon.</p>
      ) : (
        <p className="mt-3 text-xs text-muted-foreground">
          You will be sent to Stripe to pay securely. Credits never expire.
        </p>
      )}
    </section>
  );
};
