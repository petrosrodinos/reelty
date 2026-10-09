import type { FC } from "react";
import Image from "next/image";
import { CheckIcon } from "lucide-react";

const points = [
  "Your video renders in the background, so you can close the tab and come back later.",
  "If something goes wrong along the way, we pick up where we left off instead of starting over.",
  "If a video can't be made, your credits go straight back to your balance.",
  "Your photos and videos stay private, and download links expire after 15 minutes.",
];

export const ReliabilitySection: FC = () => (
  <section className="py-16 md:py-24">
    <div className="page-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-eyebrow text-muted-foreground">You&apos;re covered</p>
        <h2 className="text-display-md mt-3">Start your video and walk away. We&apos;ll handle the rest.</h2>
        <ul className="mt-6 flex flex-col gap-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <CheckIcon className="mt-1 size-[18px] shrink-0 text-teal" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <Image
        src="/screens/credits.png"
        alt="The Reelty credits page showing a balance of 12 credits and a slider to choose how many videos to buy"
        width={730}
        height={620}
        sizes="(min-width: 1024px) 560px, 100vw"
        className="h-auto w-full rounded-lg border border-hairline shadow-sm"
      />
    </div>
  </section>
);
