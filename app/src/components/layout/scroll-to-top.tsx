"use client";

import { useLayoutEffect, type FC } from "react";

/**
 * Resets scroll instantly on mount; the global smooth scroll-behavior would otherwise animate from the previous page's offset.
 * It repeats after a frame and a short delay because a menu or sheet closing during navigation (e.g. logout) unlocks
 * body scroll and restores the offset it saved, which would otherwise land the visitor at the bottom of the page.
 */
export const ScrollToTop: FC = () => {
  useLayoutEffect(() => {
    if (window.location.hash) return;
    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    reset();
    const frame = requestAnimationFrame(reset);
    const timer = window.setTimeout(reset, 150);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);
  return null;
};
