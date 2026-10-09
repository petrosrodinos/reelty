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
  priceCents,
  PURCHASE_MAX_VIDEOS as MAX_VIDEOS,
  PURCHASE_VIDEO_STEP as VIDEO_STEP,
} from "@/features/credits/utils/credit-pricing.utils";
import { formatEurCents, pluralize } from "@/lib/format.utils";

interface BuyCreditsCardProps {
  pricing: CreditsPricing;
}

export const BuyCreditsCard: FC<BuyCreditsCardProps> = ({ pricing }) => {
  const checkout = useCreateCheckout();
  const perVideo = creditsPerVideo(pricing);
  const defaultTier = pricing.tiers.find((tier) => tier.is_default) ?? pricing.tiers[0];
  const maxByCredits = Math.floor(pricing.max_credits_per_purchase / Math.max(perVideo, 1) / VIDEO_STEP) * VIDEO_STEP;
  const maxVideos = Math.max(VIDEO_STEP, Math.min(MAX_VIDEOS, maxByCredits));

  const [videos, setVideos] = useState(VIDEO_STEP);
  const credits = videos * perVideo;
  const cents = priceCents(credits, pricing.credits_per_eur);

  return (
    <section aria-labelledby="buy-heading" className="rounded-lg border border-hairline bg-canvas p-5 sm:p-6">
      <h2 id="buy-heading" className="text-lg font-medium text-ink">
        Buy credits
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose how many videos you want to make. Each one is priced as a {defaultTier?.name ?? "standard"} video
        ({pluralize(perVideo, "credit")}); shorter videos cost less, longer ones more.
      </p>

      <div className="mt-6 flex items-baseline justify-between gap-4">
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

      <div className="mt-6 flex flex-col gap-4 border-t border-hairline-soft pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-semibold tabular-nums">{formatEurCents(cents)}</p>
        </div>
        <Button
          size="lg"
          onClick={() => checkout.mutate({ credits, videos_selected: videos })}
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
