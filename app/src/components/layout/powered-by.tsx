import type { FC } from "react";

/** "Powered by" credit shown in every page footer. */
export const PoweredBy: FC<{ className?: string }> = ({ className }) => (
  <span className={className}>
    Powered by{" "}
    <a
      href="https://logiqdev.com"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-sm underline-offset-4 hover:underline"
    >
      logiqdev
    </a>
  </span>
);
