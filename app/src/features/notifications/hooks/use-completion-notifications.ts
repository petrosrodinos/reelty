"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import { PROJECTS_QUERY_KEY } from "@/features/projects/hooks/use-projects";
import { getProjects } from "@/features/projects/services/projects.services";
import { InProgressStatuses, ProjectStatuses, type ProjectStatus } from "@/features/projects/interfaces/projects.interfaces";
import {
  getBrowserNotificationPermission,
  requestBrowserNotificationPermission,
  showBrowserNotification,
  type BrowserNotificationPermission,
} from "@/lib/browser-notification.utils";
import { Routes } from "@/routes/routes";

const STORAGE_KEY = "reelty:notify-when-done";
const CHANGE_EVENT = "reelty:notify-pref-change";
const POLL_INTERVAL_MS = 5000;

const readEnabled = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const writeEnabled = (enabled: boolean) => {
  try {
    if (enabled) localStorage.setItem(STORAGE_KEY, "1");
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage unavailable: the preference just does not persist
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

const subscribe = (callback: () => void) => {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

export interface NotificationPreference {
  permission: BrowserNotificationPermission;
  /** True only when the user opted in and the browser allows notifications. */
  enabled: boolean;
  toggle: () => Promise<void>;
}

/** Account-wide (per browser) opt-in: "notify me when any of my videos finishes". */
export const useNotificationPreference = (): NotificationPreference => {
  const optedIn = useSyncExternalStore(subscribe, readEnabled, () => false);
  const permission = useSyncExternalStore(subscribe, getBrowserNotificationPermission, () => "default" as BrowserNotificationPermission);

  const toggle = useCallback(async () => {
    if (readEnabled()) {
      writeEnabled(false);
      return;
    }
    const result = permission === "granted" ? "granted" : await requestBrowserNotificationPermission();
    if (result === "granted") writeEnabled(true);
    else window.dispatchEvent(new Event(CHANGE_EVENT));
  }, [permission]);

  return { permission, enabled: optedIn && permission === "granted", toggle };
};

/**
 * Mounted once in the app shell. While the preference is on, keeps an eye on the user's latest projects and shows a
 * browser notification when one moves from creating to finished or failed. Needs the tab open (background is fine).
 */
export const useCompletionNotifier = () => {
  const { enabled } = useNotificationPreference();
  const seen = useRef(new Map<string, ProjectStatus>());

  const { data } = useQuery({
    queryKey: [PROJECTS_QUERY_KEY, "notifier"],
    queryFn: () => getProjects({ limit: 20 }),
    enabled,
    // the whole point is to notice a finish while the tab is hidden, so keep polling in the background
    refetchIntervalInBackground: true,
    refetchInterval: (q) =>
      q.state.data?.data.some((project) => InProgressStatuses.includes(project.status)) ? POLL_INTERVAL_MS : false,
  });

  useEffect(() => {
    if (!enabled) {
      seen.current.clear();
      return;
    }
    if (!data) return;
    for (const project of data.data) {
      const before = seen.current.get(project.id);
      seen.current.set(project.id, project.status);
      if (!before || !InProgressStatuses.includes(before)) continue;
      const name = project.title || "Your video";
      if (project.status === ProjectStatuses.COMPLETED) {
        showBrowserNotification("Your video is ready", `"${name}" has finished. Open it to watch and download.`, project.id, Routes.project(project.id));
      } else if (project.status === ProjectStatuses.FAILED) {
        showBrowserNotification("Your video could not be finished", `"${name}" ran into a problem. Open it to see what happened.`, project.id, Routes.project(project.id));
      }
    }
  }, [enabled, data]);
};
