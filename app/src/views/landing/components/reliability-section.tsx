import type { FC } from "react";
import { CheckIcon } from "lucide-react";

const points = [
  "Resumable render steps, so a restart picks up where it stopped.",
  "Only failed clips are retried. Finished clips are never re-generated.",
  "Fewer than three usable clips? The run fails and your credit is refunded.",
  "Files are private. Downloads use signed links that expire in 15 minutes.",
];

type LogTone = "comment" | "state" | "time";
const log: { tone: LogTone; text: string }[] = [
  { tone: "comment", text: "# render:video  projectId=8f2k1x" },
  { tone: "state", text: "09:41:02  QUEUED" },
  { tone: "state", text: "09:41:04  PREPARING" },
  { tone: "comment", text: "  imported 10/10 photos" },
  { tone: "state", text: "09:41:09  GENERATING" },
  { tone: "comment", text: "  clips 10/10 complete (0 resubmitted)" },
  { tone: "state", text: "09:42:31  ASSEMBLING" },
  { tone: "comment", text: "  1920x1080 · 30 fps · crossfade 0.8s" },
  { tone: "state", text: "09:43:18  COMPLETED" },
  { tone: "comment", text: "  video/final.mp4 uploaded (50s)" },
];

const toneClass: Record<LogTone, string> = {
  comment: "text-muted-soft",
  state: "text-teal",
  time: "text-on-dark-soft",
};

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
      <div className="dark rounded-lg bg-surface-dark p-5 text-on-dark sm:p-6" aria-hidden="true">
        <div className="mb-4 flex items-center gap-1.5">
          <i className="size-2.5 rounded-full bg-surface-dark-elevated" />
          <i className="size-2.5 rounded-full bg-surface-dark-elevated" />
          <i className="size-2.5 rounded-full bg-surface-dark-elevated" />
          <span className="ml-2 font-mono text-xs text-on-dark-soft">render:job</span>
        </div>
        <pre className="overflow-x-auto rounded-md bg-surface-dark-soft p-4 font-mono text-[0.8125rem] leading-7">
          {log.map((line, index) => (
            <span key={index} className={`block ${toneClass[line.tone]}`}>
              {line.text}
            </span>
          ))}
        </pre>
      </div>
    </div>
  </section>
);
