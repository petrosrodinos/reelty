import type { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KpiTileProps {
  label: string;
  value: string;
  hint?: ReactNode;
  tone?: "default" | "negative";
  /** Larger figure for the headline numbers. */
  emphasis?: boolean;
}

export const KpiTile: FC<KpiTileProps> = ({ label, value, hint, tone = "default", emphasis = false }) => (
  <div className="rounded-lg border border-hairline bg-canvas p-4">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p
      className={cn(
        "mt-1 font-semibold text-ink",
        emphasis ? "text-2xl sm:text-3xl" : "text-xl",
        tone === "negative" && "text-destructive",
      )}
    >
      {value}
    </p>
    {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
  </div>
);
