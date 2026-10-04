"use client";

import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface MobileCreateBarProps {
  blockers: string[];
  isSubmitting: boolean;
  onSubmit: () => void;
}

/** Bottom-sticky Create bar for phones. The reason links to the summary, where the blocker can be fixed. */
export const MobileCreateBar: FC<MobileCreateBarProps> = ({ blockers, isSubmitting, onSubmit }) => {
  const blocked = blockers.length > 0;
  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-canvas/95 px-4 pt-3 backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <a
          href="#summary"
          className="min-w-0 flex-1 text-[0.8125rem] leading-snug text-muted-foreground underline-offset-2 hover:underline"
        >
          {blocked ? blockers[0] : "Takes several minutes. You can close the page after."}
        </a>
        <Button size="lg" className="shrink-0" onClick={onSubmit} disabled={blocked || isSubmitting}>
          {isSubmitting ? <Spinner /> : null}
          Create video
        </Button>
      </div>
    </div>
  );
};
