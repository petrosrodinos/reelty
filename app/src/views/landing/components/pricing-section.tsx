import type { FC } from "react";
import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/routes/routes";

const perks = [
  "Short to long videos, priced by photo count",
  "Website, Airbnb or upload intake",
  "2 watermark removals per photo",
  "Videos kept until you delete them",
];

export const PricingSection: FC = () => (
  <section id="pricing" className="bg-surface-soft py-16 md:py-24">
    <div className="page-container">
      <p className="text-eyebrow text-muted-foreground">Pricing</p>
      <h2 className="text-display-lg mt-3">Pay only for the videos you make.</h2>
      <div className="mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        <article className="dark rounded-lg bg-surface-dark p-6 text-on-dark sm:p-8">
          <span className="inline-flex rounded-full bg-brand px-3 py-1 text-eyebrow text-ink">Free to start</span>
          <h3 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight">Free credits on signup</h3>
          <p className="mt-1 text-on-dark-soft">No card needed to try it.</p>
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
          <p className="text-[1.375rem] font-medium text-ink">Credits</p>
          <h3 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight text-ink">No subscription.</h3>
          <p className="mt-2 text-muted-foreground">
            Buy credits when you need them and use them for any video. A video costs more credits the more photos it uses,
            plus a small add-on for watermark removal. Credits never expire.
          </p>
          <hr className="my-5 border-hairline-soft" />
          <p className="text-sm text-muted-foreground">Failed renders refund your credits automatically.</p>
        </article>
      </div>
    </div>
  </section>
);
