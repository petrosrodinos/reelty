"use client";

import { useCompletionNotifier } from "@/features/notifications/hooks/use-completion-notifications";

/** Renders nothing; runs the "video finished" browser notification watcher for the whole signed-in app. */
export const CompletionNotifier = () => {
  useCompletionNotifier();
  return null;
};
