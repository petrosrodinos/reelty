"use client";

import type { FC } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useCredits } from "@/features/credits/hooks/use-credits";
import { pluralize } from "@/lib/format.utils";
import { BuyCreditsCard } from "@/views/credits/components/buy-credits-card";

interface BuyCreditsDialogProps {
  open: boolean;
  onClose: () => void;
  /** Stripe sends the buyer back to this project's edit page so nothing is lost. */
  projectId: string;
  balance: number;
}

/** Short buy-credits flow shown over the editor when the balance does not cover more photos. */
export const BuyCreditsDialog: FC<BuyCreditsDialogProps> = ({ open, onClose, projectId, balance }) => {
  const { data } = useCredits();

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy credits to add more photos</DialogTitle>
          <DialogDescription>
            You have {pluralize(balance, "credit")}, which does not cover more photos. After paying you come straight
            back here with your project as it is.
          </DialogDescription>
        </DialogHeader>
        {data ? (
          <BuyCreditsCard pricing={data.pricing} returnProjectId={projectId} compact />
        ) : (
          <Skeleton className="h-48 w-full rounded-lg" />
        )}
      </DialogContent>
    </Dialog>
  );
};
