"use client";

import { useEffect, type FC } from "react";
import posthog from "posthog-js";
import { useMe } from "@/features/auth/hooks/use-auth";
import { environments } from "@/config/environments";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics.utils";

/**
 * PostHog captures page views (including client-side route changes) and custom product events alongside Google Analytics.
 * Autocapture and session replay are off.
 */
export const PostHogAnalytics: FC = () => {
  const key = environments.posthogKey;
  const me = useMe({ requireSessionHint: true, enabled: !!key }).data;
  const userId = me?.id;
  const role = me?.role;
  const emailVerified = me?.email_verified;

  useEffect(() => {
    if (!key) return;
    if (!posthog.__loaded) {
      posthog.init(key, {
        api_host: "/ingest",
        ui_host: environments.posthogHost.replace(".i.posthog.com", ".posthog.com"),
        autocapture: false,
        capture_pageview: "history_change",
        capture_pageleave: true,
        disable_session_recording: true,
        person_profiles: "identified_only",
      });
    }
  }, [key]);

  // Link events to the signed-in user by id only (no email or name). Anonymous history is merged on identify.
  useEffect(() => {
    if (!key || !posthog.__loaded) return;
    if (userId) {
      posthog.identify(userId, { role, email_verified: emailVerified });
    } else if (posthog.get_distinct_id() && posthog._isIdentified()) {
      posthog.reset();
    }
  }, [key, userId, role, emailVerified]);

  // Delegated click tracking for server-rendered CTAs: <a data-track="cta_click" data-track-location="hero">.
  useEffect(() => {
    if (!key) return;
    const onClick = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (el?.dataset.track === AnalyticsEvents.CTA_CLICK) {
        trackEvent(AnalyticsEvents.CTA_CLICK, { location: el.dataset.trackLocation, label: el.textContent?.trim() });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [key]);

  return null;
};
