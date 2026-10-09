import type { FC } from "react";
import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchPublicPricing } from "@/features/credits/services/public-pricing.service";
import { priceCents } from "@/features/credits/utils/credit-pricing.utils";
import { Routes } from "@/routes/routes";

const perks = [
  "Short to long videos, priced by photo count",
  "Website, Airbnb or upload intake",
  "Watermark removals per photo",
  "Videos kept until you delete them",
];

const euro = (cents: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(
    cents / 100,
  );

const photoRange = (min: number, max: number) =>
  min === max ? `${min} photos` : `${min} to ${max} photos`;

export const PricingSection: FC = async () => {
  const pricing = await fetchPublicPricing();
  const tiers = pricing
    ? [...pricing.tiers].sort((a, b) => a.min_clips - b.min_clips)
    : [];
  const watermark = pricing?.addons.watermark_removal ?? 0;
  const baseRate = pricing?.credits_per_eur ?? 0;
  const packs =
    pricing && baseRate > 0
      ? [...pricing.rate_tiers].sort((a, b) => a.min_eur - b.min_eur)
      : [];
  const defaultTier = tiers.find((t) => t.is_default) ?? tiers[0];

  return (
    <section id="pricing" className="bg-surface-soft py-16 md:py-24">
      <div className="page-container">
        <p className="text-eyebrow text-muted-foreground">Pricing</p>
        <h2 className="text-display-lg mt-3">
          Pay only for the videos you make.
        </h2>
        <div className="mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          <article className="dark rounded-lg bg-surface-dark p-6 text-on-dark sm:p-8">
            <span className="inline-flex rounded-full bg-brand px-3 py-1 text-eyebrow text-ink">
              Free to start
            </span>
            <h3 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight">
              Free credits on signup
            </h3>
            <p className="mt-1 text-on-dark-soft">No card needed to try it.</p>
            <ul className="mt-6 flex flex-col gap-2.5 text-[0.9375rem]">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <CheckIcon
                    className="mt-0.5 size-[18px] shrink-0 text-teal"
                    aria-hidden="true"
                  />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="mt-8 w-full"
              render={<Link href={Routes.register} />}
              nativeButton={false}
            >
              Start free
            </Button>
          </article>
          <article className="rounded-lg border border-hairline bg-canvas p-6 sm:p-8">
            <p className="text-[1.375rem] font-medium text-ink">Credits</p>
            <h3 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight text-ink">
              No subscription.
            </h3>
            <p className="mt-2 text-muted-foreground">
              Buy credits when you need them and use them for any video. A video
              costs more credits the more photos it uses, plus a small add-on
              for watermark removal. Credits never expire.
            </p>
            <hr className="my-5 border-hairline-soft" />
            <p className="text-sm text-muted-foreground">
              Failed renders refund your credits automatically.
            </p>
          </article>
        </div>
        {pricing && tiers.length > 0 && baseRate > 0 ? (
          <div className="mt-10 max-w-4xl">
            <h3 className="text-[1.375rem] font-medium text-ink">
              What a video costs
            </h3>
            <p className="mt-1 text-muted-foreground">
              One credit costs {euro(priceCents(1, baseRate))}. Your new account
              starts with {pricing.signup_grant} free credits.
            </p>
            <dl className="mt-5 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
              {tiers.map((tier) => (
                <div key={tier.id} className="bg-canvas p-5">
                  <dt className="text-eyebrow text-muted-foreground">
                    {photoRange(tier.min_clips, tier.max_clips)}
                  </dt>
                  <dd className="mt-2 text-lg font-medium text-ink">
                    {euro(priceCents(tier.credits, baseRate))}{" "}
                    <span className="text-muted-foreground">
                      ({tier.credits} credits)
                    </span>
                  </dd>
                  {watermark > 0 ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      With watermark removal:{" "}
                      {euro(priceCents(tier.credits + watermark, baseRate))} (
                      {tier.credits + watermark} credits)
                    </p>
                  ) : null}
                </div>
              ))}
            </dl>
            {packs.length > 0 && defaultTier ? (
              <>
                <h3 className="mt-8 text-[1.375rem] font-medium text-ink">
                  Buy more, pay less per credit
                </h3>
                <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
                  {packs.map((pack) => {
                    const credits = pack.min_eur * pack.credits_per_eur;
                    return (
                      <li key={pack.id}>
                        {euro(pack.min_eur * 100)} gets you {credits} credits,
                        about {Math.floor(credits / defaultTier.credits)} videos
                        of{" "}
                        {photoRange(
                          defaultTier.min_clips,
                          defaultTier.max_clips,
                        )}
                        .
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};
