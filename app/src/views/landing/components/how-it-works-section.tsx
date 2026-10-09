import type { FC } from "react";
import Image from "next/image";
import { ClockIcon, ImagesIcon, Link2Icon } from "lucide-react";

const steps = [
  {
    icon: Link2Icon,
    title: "Paste a link or upload",
    body: "Use a property website, an Airbnb listing, or your own photos. We copy images into private storage so nothing breaks when the listing changes.",
  },
  {
    icon: ImagesIcon,
    title: "Stay in control",
    body: "Drag to reorder, remove what you do not want, add more, and remove watermarks per photo with a before and after preview. Three to twelve photos per video.",
  },
  {
    icon: ClockIcon,
    title: "Come back later",
    body: "Rendering runs in the background and survives closed tabs. Your video lands in My Videos, ready to play and download, and we email you.",
  },
];

export const HowItWorksSection: FC = () => (
  <section id="how" className="bg-surface-soft py-16 md:py-24">
    <div className="page-container">
      <p className="text-eyebrow text-muted-foreground">How it works</p>
      <h2 className="text-display-lg mt-3 max-w-3xl">From listing link to MP4 in three steps.</h2>
      <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-lg bg-surface-card p-6 sm:p-8">
            <span className="grid size-11 place-items-center rounded-md bg-canvas text-brand">
              <step.icon className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-5 text-eyebrow text-muted-foreground">Step {index + 1}</p>
            <h3 className="mt-1 text-lg font-medium text-ink">{step.title}</h3>
            <p className="mt-2 text-body">{step.body}</p>
          </article>
        ))}
      </div>
      <Image
        src="/screens/new-video.png"
        alt="The Reelty New video page with tabs for a website link, an Airbnb link or uploaded photos"
        width={740}
        height={530}
        sizes="(min-width: 768px) 740px, 100vw"
        className="mx-auto mt-10 h-auto w-full max-w-3xl rounded-lg border border-hairline shadow-sm md:mt-12"
      />
    </div>
  </section>
);
