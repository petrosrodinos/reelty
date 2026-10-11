import type { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Routes } from "@/routes/routes";

const HERO_VIDEO_URL = "https://0elvzqvrl5nq3cj7.public.blob.vercel-storage.com/sunlift-villa-in-corfu.mp4";

/** Sample output in a dark product card: a real generated video that loops silently, with controls to unmute. */
const HeroVisual: FC = () => (
  <div className="dark rounded-xl bg-surface-dark p-4 text-on-dark sm:p-5">
    <div className="relative aspect-video overflow-hidden rounded-lg bg-surface-dark-soft">
      <video
        className="size-full bg-black object-contain"
        src={HERO_VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label="Sample video created with Reelty: Sunlit villa in Corfu"
      />
    </div>
    <div className="mt-3 flex items-center justify-between gap-3 text-sm">
      <span className="text-on-dark-soft">Sample output</span>
      <span className="inline-flex items-center gap-2 rounded-full bg-surface-dark-elevated px-3 py-1 text-[0.8125rem] font-medium">
        <span className="size-2 rounded-full bg-success" aria-hidden="true" />
        Completed
      </span>
    </div>
  </div>
);

export const HeroSection: FC = () => (
  <section className="py-12 md:py-20 lg:py-24">
    <div className="page-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <span className="inline-flex rounded-full bg-brand px-3 py-1 text-eyebrow text-ink">Beta</span>
        <h1 className="text-display-xl mt-5">Turn property photos into proffessional videos.</h1>
        <p className="mt-6 max-w-xl text-lg text-body-strong md:text-xl">
          Paste your property link or upload your photos. Pick the images, press create, and come back to a proffessional video. No
          editing skills needed.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" render={<Link href={Routes.register} data-track="cta_click" data-track-location="hero" />} nativeButton={false}>
            Create your first video
          </Button>
          <Button size="lg" variant="outline" render={<Link href={Routes.homeSection("how")} />} nativeButton={false}>
            See how it works
          </Button>
        </div>
        <ul className="mt-7 flex flex-wrap gap-2.5 text-[0.8125rem] font-medium text-ink">
          <li className="rounded-full bg-surface-card px-3 py-1">16:9 · 1080p MP4</li>
          <li className="rounded-full bg-surface-card px-3 py-1">Music optional</li>
          <li className="rounded-full bg-surface-card px-3 py-1">AI-generated</li>
        </ul>
      </div>
      <HeroVisual />
    </div>
  </section>
);
