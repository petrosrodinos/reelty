import type { FC } from "react";
import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/routes/routes";

const perks = [
  "Up to 12 photos per video",
  "Website, Airbnb or upload intake",
  "2 watermark removals per photo",
  "Videos kept until you delete them",
];

export const PricingSection: FC = () => (
  <section id="pricing" className="bg-surface-soft py-16 md:py-24">
    <div className="page-container">
      <p className="text-eyebrow text-muted-foreground">Pricing</p>
      <h2 className="text-display-lg mt-3">Free while we are in beta.</h2>
      <div className="mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        <article className="dark rounded-lg bg-surface-dark p-6 text-on-dark sm:p-8">
          <span className="inline-flex rounded-full bg-brand px-3 py-1 text-eyebrow text-ink">Beta</span>
          <h3 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight">3 videos per month</h3>
          <p className="mt-1 text-on-dark-soft">No card needed.</p>
          <ul className="mt-6 flex flex-col gap-2.5 text-[0.9375rem]">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 size-[18px] shrink-0 text-teal" aria-hidden="true" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
          <Button size="lg" className="mt-8 w-full" render={<Link href={Routes.register} />} nativeButton={false}>
            Start free
          </Button>
        </article>
        <article className="rounded-lg border border-hairline bg-canvas p-6 sm:p-8">
          <p className="text-[1.375rem] font-medium text-ink">Paid plans</p>
          <h3 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight text-ink">Not yet.</h3>
          <p className="mt-2 text-muted-foreground">
            Payments, credit packs and retention tiers are planned for a later release. Until then, usage is controlled by the
            monthly quota.
          </p>
          <hr className="my-5 border-hairline-soft" />
          <p className="text-sm text-muted-foreground">Failed renders refund your quota automatically.</p>
        </article>
      </div>
    </div>
  </section>
);
