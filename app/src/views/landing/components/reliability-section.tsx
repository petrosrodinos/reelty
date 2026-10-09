import type { FC } from "react";
import Image from "next/image";
import { CheckIcon } from "lucide-react";

const points = [
  "Resumable render steps, so a restart picks up where it stopped.",
  "Only failed clips are retried. Finished clips are never re-generated.",
  "Fewer than three usable clips? The run fails and your credit is refunded.",
  "Files are private. Downloads use signed links that expire in 15 minutes.",
];

export const ReliabilitySection: FC = () => (
  <section className="py-16 md:py-24">
    <div className="page-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-eyebrow text-muted-foreground">Built to be reliable</p>
        <h2 className="text-display-md mt-3">Long jobs never block you, and never charge you twice.</h2>
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
        src="/placeholder.svg"
        alt="Placeholder"
        width={800}
        height={600}
        unoptimized
        className="h-auto w-full rounded-lg"
      />
    </div>
  </section>
);
