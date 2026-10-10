"use client";

import type { FC } from "react";
import { openCookiePreferences } from "@/lib/consent.utils";

export const CookieSettingsButton: FC<{ className?: string }> = ({ className }) => (
  <button type="button" onClick={openCookiePreferences} className={className}>
    Cookie settings
  </button>
);
