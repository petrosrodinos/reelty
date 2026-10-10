import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { environments } from "@/config/environments";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { PostHogAnalytics } from "@/components/analytics/posthog-analytics";
import { CookieNotice } from "@/components/layout/cookie-notice";
import { Providers } from "@/components/providers/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Reelty — Property walkthrough videos",
    template: "%s | Reelty",
  },
  description:
    "Turn listing photos into cinematic walkthrough videos. Paste a listing link or upload your photos, pick the shots and come back to a finished 1080p MP4.",
  applicationName: "Reelty",
  metadataBase: new URL(environments.appUrl),
  openGraph: {
    type: "website",
    siteName: "Reelty",
    title: "Reelty — Property walkthrough videos",
    description:
      "Turn listing photos into cinematic walkthrough videos. Paste a listing link or upload photos and get a finished 1080p MP4.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reelty — Property walkthrough videos",
    description: "Turn listing photos into cinematic walkthrough videos in minutes.",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface-dark focus:px-4 focus:py-2 focus:text-on-dark"
        >
          Skip to content
        </a>
        <Providers>
          {children}
          <PostHogAnalytics />
        </Providers>
        <CookieNotice />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
