"use client";

import type { FC } from "react";
import Script from "next/script";
import { environments } from "@/config/environments";

const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{4,}$/;

/**
 * Loads GA4 when NEXT_PUBLIC_GA_MEASUREMENT_ID is set. Ad storage and personalization stay denied.
 */
export const GoogleAnalytics: FC = () => {
  const id = environments.gaMeasurementId;
  if (!MEASUREMENT_ID_PATTERN.test(id)) return null;

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
