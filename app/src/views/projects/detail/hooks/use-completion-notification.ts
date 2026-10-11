"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { InProgressStatuses, ProjectStatuses, type Project } from "@/features/projects/interfaces/projects.interfaces";
import {
  getBrowserNotificationPermission,
  requestBrowserNotificationPermission,
  showBrowserNotification,
  type BrowserNotificationPermission,
} from "@/lib/browser-notification.utils";

const storageKey = (projectId: string) => `reelty:notify-when-done:${projectId}`;

const readOptIn = (projectId: string): boolean => {
  try {
    return localStorage.getItem(storageKey(projectId)) === "1";
  } catch {
    return false;
  }
};

const writeOptIn = (projectId: string, enabled: boolean) => {
  try {
    if (enabled) localStorage.setItem(storageKey(projectId), "1");
    else localStorage.removeItem(storageKey(projectId));
  } catch {
    // storage unavailable: the opt-in just lasts until the page is closed
  }
};

export interface CompletionNotification {
  permission: BrowserNotificationPermission;
  enabled: boolean;
  toggle: () => Promise<void>;
}

/**
 * Opt-in browser notification for when this project's video finishes (or fails).
 * Works while the tab stays open (a background tab is fine); the page's own polling detects the change.
 */
export const useCompletionNotification = (project: Project | undefined): CompletionNotification => {
  const projectId = project?.id;
  const status = project?.status;
  const title = project?.title;
  const [permission, setPermission] = useState<BrowserNotificationPermission>("default");
  const [enabled, setEnabled] = useState(false);
  const previousStatus = useRef(status);

  useEffect(() => {
    setPermission(getBrowserNotificationPermission());
    if (projectId) setEnabled(readOptIn(projectId));
  }, [projectId]);

  useEffect(() => {
    const before = previousStatus.current;
    previousStatus.current = status;
    if (!projectId || !status || !before || !InProgressStatuses.includes(before)) return;
    if (status !== ProjectStatuses.COMPLETED && status !== ProjectStatuses.FAILED) return;
    if (!readOptIn(projectId)) return;

    const name = title || "Your video";
    if (status === ProjectStatuses.COMPLETED) {
      showBrowserNotification("Your video is ready", `"${name}" has finished. Open it to watch and download.`, projectId);
    } else {
      showBrowserNotification("Your video could not be finished", `"${name}" ran into a problem. Open it to see what happened.`, projectId);
    }
    writeOptIn(projectId, false);
    setEnabled(false);
  }, [projectId, status, title]);

  const toggle = useCallback(async () => {
    if (!projectId) return;
    if (enabled) {
      writeOptIn(projectId, false);
      setEnabled(false);
      return;
    }
    const result = getBrowserNotificationPermission() === "granted" ? "granted" : await requestBrowserNotificationPermission();
    setPermission(result);
    if (result === "granted") {
      writeOptIn(projectId, true);
      setEnabled(true);
    }
  }, [projectId, enabled]);

  return { permission, enabled, toggle };
};
