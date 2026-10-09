"use client";

import { useLayoutEffect, type FC } from "react";

/** Resets scroll instantly on mount; the global smooth scroll-behavior would otherwise animate from the previous page's offset. */
export const ScrollToTop: FC = () => {
  useLayoutEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return null;
};
