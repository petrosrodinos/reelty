import type { FC } from "react";
import Link from "next/link";
import { PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/routes/routes";

/** Flat line-art villa: warm sky, terracotta roof, hills. Stands in for a listing photo. */
const VillaIllustration: FC = () => (
  <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="size-full animate-ken-burns" aria-hidden="true">
    <defs>
      <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f3c9b0" />
        <stop offset="1" stopColor="#f6e9d8" />
      </linearGradient>
      <linearGradient id="hero-light" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity=".5" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="800" height="450" fill="url(#hero-sky)" />
    <circle cx="640" cy="92" r="40" fill="#fff" opacity=".75" />
    <path d="M0 330Q200 300 400 322T800 312V450H0z" fill="#9fb58a" />
    <rect y="385" width="800" height="65" fill="#8fa77c" />
    <rect x="170" y="170" width="460" height="205" fill="#efe6d6" />
    <path d="M140 176L400 66L660 176z" fill="#a9583e" />
    <path d="M140 176L400 66L660 176" fill="none" stroke="#7e3f2c" strokeWidth="4" />
    <rect x="200" y="212" width="96" height="84" fill="#bfe0ee" stroke="#fff" strokeWidth="8" />
    <rect x="504" y="212" width="96" height="84" fill="#bfe0ee" stroke="#fff" strokeWidth="8" />
    <path d="M248 212V296M200 254H296M552 212V296M504 254H600" stroke="#fff" strokeWidth="5" />
    <rect x="352" y="252" width="96" height="123" rx="3" fill="#7b5a43" />
    <circle cx="432" cy="316" r="4" fill="#e8c37a" />
    <path d="M326 375H474L526 450H274z" fill="#d8cfc0" />
    <circle cx="96" cy="310" r="56" fill="#5f8a62" />
    <rect x="92" y="342" width="8" height="52" fill="#6b4e37" />
    <circle cx="722" cy="326" r="42" fill="#6f9a6c" />
    <rect x="718" y="348" width="8" height="42" fill="#6b4e37" />
    <rect x="170" y="170" width="460" height="205" fill="url(#hero-light)" />
  </svg>
);

const Thumb: FC<{ className: string; label: string }> = ({ className, label }) => (
  <span className={`block aspect-video flex-1 rounded-md ${className}`} role="img" aria-label={label} />
);

/** Fake video frame in a dark product card. Sample output is illustrative and static. */
const HeroVisual: FC = () => (
  <div className="dark rounded-xl bg-surface-dark p-4 text-on-dark sm:p-5">
    <div className="relative aspect-video overflow-hidden rounded-lg bg-surface-dark-soft">
      <VillaIllustration />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/85 via-surface-dark/10 to-transparent" />
      <span className="absolute left-3 top-3 rounded-full bg-surface-dark/70 px-2.5 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wider text-on-dark">
        AI-generated
      </span>
      <div className="absolute inset-x-4 bottom-4">
        <p className="text-eyebrow text-on-dark">Plaka, Athens · From €120 per night</p>
        <p className="mt-1 font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">Sunlit Loft in Plaka</p>
        <p className="mt-0.5 text-sm text-on-dark-soft">2 bedrooms · 78 m² · Sleeps 4</p>
      </div>
      <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-canvas/90 text-ink">
        <PlayIcon className="ml-0.5 size-4 fill-current" aria-hidden="true" />
      </span>
    </div>
    <div className="mt-3 flex gap-2" aria-hidden="true">
      <Thumb className="bg-[#c9b79c]" label="Exterior" />
      <Thumb className="bg-[#cc785c]/80" label="Living room" />
      <Thumb className="bg-[#9bb5a6]" label="Kitchen" />
      <Thumb className="bg-[#d9c4a4]" label="Bedroom" />
      <Thumb className="bg-[#7fb9cf]" label="Terrace" />
    </div>
    <div className="mt-3 flex items-center justify-between gap-3 text-sm">
      <span className="text-on-dark-soft">Sample output, 0:50</span>
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
        <h1 className="text-display-xl mt-5">Turn listing photos into cinematic walkthroughs.</h1>
        <p className="mt-6 max-w-xl text-lg text-body-strong md:text-xl">
          Paste a listing link or upload your photos. Pick the shots, press create, and come back to a finished 1080p video. No
          editing skills needed.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" render={<Link href={Routes.register} />} nativeButton={false}>
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
