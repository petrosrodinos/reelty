"use client";

import { useState, type FC } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

interface WatermarkConsentDialogProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/** First watermark removal per project needs an explicit rights confirmation (FR-WM-8). */
export const WatermarkConsentDialog: FC<WatermarkConsentDialogProps> = ({ isOpen, isLoading, onClose, onConfirm }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open || isLoading) return;
        setAccepted(false);
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Before you remove a watermark</DialogTitle>
          <DialogDescription>
            Removing someone else&apos;s watermark can infringe their rights. We store this confirmation with your account and project.
          </DialogDescription>
        </DialogHeader>
        <Label className="items-start gap-3 text-sm font-normal leading-snug text-body">
          <Checkbox checked={accepted} onCheckedChange={(checked) => setAccepted(checked === true)} className="mt-0.5 size-5" />
          <span>I confirm I have the right to edit these images.</span>
        </Label>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={!accepted || isLoading}>
            {isLoading ? <Spinner /> : null}
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
