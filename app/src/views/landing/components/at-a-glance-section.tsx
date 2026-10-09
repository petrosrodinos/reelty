import type { FC } from "react";
import Link from "next/link";
import { Routes } from "@/routes/routes";

const facts = [
  { label: "Photos per video", value: "3 to 12" },
  { label: "Output", value: "1920x1080 MP4, 30 fps" },
  { label: "Typical render time", value: "A few minutes for ten photos" },
  { label: "Intake", value: "Website link, Airbnb link or upload" },
  { label: "Pricing", value: "Credits by photo count, free credits on signup" },
  { label: "Failed renders", value: "Credits refunded automatically" },
];

export const AtAGlanceSection: FC = () => (
  <section id="at-a-glance" className="py-16 md:py-24">
    <div className="page-container">
      <p className="text-eyebrow text-muted-foreground">At a glance</p>
      <h2 className="text-display-lg mt-3 max-w-3xl">What Reelty does, in numbers.</h2>
      <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-canvas p-6">
            <dt className="text-eyebrow text-muted-foreground">{fact.label}</dt>
            <dd className="mt-2 text-lg font-medium text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-body">
        New to listing video? Read{" "}
        <Link href={Routes.guideListingVideo} className="underline underline-offset-4">
          how to make a real estate listing video from photos
        </Link>
        , the{" "}
        <Link href={Routes.guideAirbnbVideo} className="underline underline-offset-4">
          Airbnb host guide
        </Link>{" "}
        or{" "}
        <Link href={Routes.guideVsVideographer} className="underline underline-offset-4">
          how Reelty compares with hiring a videographer
        </Link>
        .
      </p>
    </div>
  </section>
);
