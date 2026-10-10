"use client";

import { useEffect, type FC } from "react";
import Script from "next/script";
import { environments } from "@/config/environments";
import { clearAnalyticsCookies } from "@/lib/analytics.utils";
import { useAnalyticsConsent } from "@/lib/consent.utils";

const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{4,}$/;

/**
 * Loads GA4 only after the visitor accepts cookies. Without NEXT_PUBLIC_GA_MEASUREMENT_ID (or without consent)
 * no Google script is requested and no analytics cookie is set. Ad storage and personalization stay denied.
 */
export const GoogleAnalytics: FC = () => {
  const consent = useAnalyticsConsent();
  const id = environments.gaMeasurementId;
  const valid = MEASUREMENT_ID_PATTERN.test(id);

  useEffect(() => {
    if (!valid) return;
    const flag = `ga-disable-${id}`;
    const target = window as unknown as Record<string, unknown>;
    if (consent === "granted") {
      target[flag] = false;
      return;
    }
    // Consent denied or withdrawn: stop an already-loaded tag and drop its cookies.
    target[flag] = true;
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
    clearAnalyticsCookies();
  }, [consent, id, valid]);

  if (!valid || consent !== "granted") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());
gtag('config','${id}');`}
      </Script>
    </>
  );
};
