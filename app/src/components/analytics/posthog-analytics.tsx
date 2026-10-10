"use client";

import { useEffect, type FC } from "react";
import posthog from "posthog-js";
import { useMe } from "@/features/auth/hooks/use-auth";
import { environments } from "@/config/environments";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics.utils";
import { useAnalyticsConsent } from "@/lib/consent.utils";

/**
 * PostHog captures page views (including client-side route changes) and custom product events alongside Google Analytics. It is initialised after the
 * visitor accepts cookies and opted out again if they withdraw. Autocapture and session replay are off.
 */
export const PostHogAnalytics: FC = () => {
  const consent = useAnalyticsConsent();
  const key = environments.posthogKey;
  const me = useMe({ requireSessionHint: true, enabled: !!key && consent === "granted" }).data;
  const userId = me?.id;
  const role = me?.role;
  const emailVerified = me?.email_verified;

  useEffect(() => {
    if (!key) return;
    if (consent === "granted") {
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
      posthog.opt_in_capturing();
    } else if (posthog.__loaded) {
      posthog.opt_out_capturing();
      posthog.reset();
    }
  }, [consent, key]);

  // Link events to the signed-in user by id only (no email or name). Anonymous history is merged on identify.
  useEffect(() => {
    if (!key || consent !== "granted" || !posthog.__loaded) return;
    if (userId) {
      posthog.identify(userId, { role, email_verified: emailVerified });
    } else if (posthog.get_distinct_id() && posthog._isIdentified()) {
      posthog.reset();
    }
  }, [consent, key, userId, role, emailVerified]);

  // Delegated click tracking for server-rendered CTAs: <a data-track="cta_click" data-track-location="hero">.
  useEffect(() => {
    if (!key || consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (el?.dataset.track === AnalyticsEvents.CTA_CLICK) {
        trackEvent(AnalyticsEvents.CTA_CLICK, { location: el.dataset.trackLocation, label: el.textContent?.trim() });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent, key]);

  return null;
};
