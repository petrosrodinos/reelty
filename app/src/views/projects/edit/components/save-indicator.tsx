"use client";

import type { FC } from "react";
import { AlertTriangleIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { SaveState } from "@/views/projects/edit/hooks/use-video-details-autosave";

export const SaveIndicator: FC<{ state: SaveState; onRetry: () => void }> = ({ state, onRetry }) => (
  <p className="flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground" role="status" aria-live="polite">
    {state === "saving" ? (
      <>
        <Spinner className="size-3.5" /> Saving…
      </>
    ) : state === "error" ? (
      <>
        <AlertTriangleIcon className="size-3.5 text-error" aria-hidden="true" />
        <span className="text-error">Could not save.</span>
        <Button variant="link" size="xs" className="h-auto p-0 text-primary" onClick={onRetry}>
          Retry
        </Button>
      </>
    ) : (
      <>
        <CheckIcon className="size-3.5" aria-hidden="true" /> All changes saved
      </>
    )}
  </p>
);
