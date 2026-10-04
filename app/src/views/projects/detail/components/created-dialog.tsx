"use client";

import type { FC } from "react";
import Link from "next/link";
import { FilmIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Routes } from "@/routes/routes";

interface CreatedDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Exact "come back later" copy from spec 3.6, shown right after submit. */
export const CreatedDialog: FC<CreatedDialogProps> = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="text-center sm:max-w-md">
      <DialogHeader className="items-center">
        <span className="grid size-14 place-items-center rounded-md bg-surface-card text-brand">
          <FilmIcon className="size-7" aria-hidden="true" />
        </span>
        <DialogTitle className="text-display-sm pr-0">Your video is being created.</DialogTitle>
        <DialogDescription className="text-base">
          This can take several minutes. You don&apos;t need to wait here. Close this page and come back later; your video will appear in{" "}
          <strong className="font-medium text-ink">My Videos</strong> when it&apos;s ready.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col-reverse justify-center gap-3 sm:flex-row">
        <Button variant="outline" size="lg" onClick={onClose}>
          Stay here
        </Button>
        <Button size="lg" render={<Link href={Routes.videos} />} nativeButton={false}>
          Go to My Videos
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
