import type { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Routes } from "@/routes/routes";

/** Film-reel glyph: a ring with four coral sprocket dots. */
export const ReelMark: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn("size-6", className)}>
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="6.8" r="1.8" fill="var(--color-brand)" />
    <circle cx="17.2" cy="12" r="1.8" fill="var(--color-brand)" />
    <circle cx="12" cy="17.2" r="1.8" fill="var(--color-brand)" />
    <circle cx="6.8" cy="12" r="1.8" fill="var(--color-brand)" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
  </svg>
);

interface BrandLogoProps {
  className?: string;
  tone?: "light" | "dark";
  href?: string;
}

export const BrandLogo: FC<BrandLogoProps> = ({ className, tone = "light", href = Routes.home }) => (
  <Link
    href={href}
    aria-label="Reelty home"
    className={cn(
      "inline-flex items-center gap-2.5 rounded-md font-display text-[1.625rem] font-medium leading-none tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
      tone === "dark" ? "text-on-dark" : "text-ink",
      className,
    )}
  >
    <ReelMark />
    <span>
      Reel<span className="text-brand">ty</span>
    </span>
  </Link>
);
