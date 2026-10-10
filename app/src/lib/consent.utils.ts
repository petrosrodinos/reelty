"use client";

import { useSyncExternalStore } from "react";

export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "reelty.cookie-consent";
const CHANGE_EVENT = "reelty:cookie-consent";

let preferencesOpen = false;
const preferenceListeners = new Set<() => void>();

function subscribeChoice(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Stored analytics decision, or null while the visitor has not chosen yet. */
export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // storage unavailable: the choice applies to this page view only
  }
  preferencesOpen = false;
  preferenceListeners.forEach((listener) => listener());
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Re-opens the cookie card so the visitor can change an earlier choice. */
export function openCookiePreferences() {
  preferencesOpen = true;
  preferenceListeners.forEach((listener) => listener());
}

/** Analytics consent. The server snapshot is "denied" so nothing analytics-related renders before hydration. */
export function useAnalyticsConsent(): ConsentChoice | null {
  return useSyncExternalStore(subscribeChoice, readConsent, () => "denied");
}

export function useCookiePreferencesOpen(): boolean {
  return useSyncExternalStore(
    (callback) => {
      preferenceListeners.add(callback);
      return () => preferenceListeners.delete(callback);
    },
    () => preferencesOpen,
    () => false,
  );
}
