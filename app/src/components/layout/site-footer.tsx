import type { FC } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";
import { CookieSettingsButton } from "@/components/layout/cookie-settings-button";
import { PoweredBy } from "@/components/layout/powered-by";
import { Routes } from "@/routes/routes";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Create a video", href: Routes.new },
      { label: "My Videos", href: Routes.videos },
      { label: "How it works", href: Routes.homeSection("how") },
      { label: "Pricing", href: Routes.homeSection("pricing") },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "Real estate listing video", href: Routes.guideListingVideo },
      { label: "Airbnb listing video", href: Routes.guideAirbnbVideo },
      { label: "Reelty vs videographer", href: Routes.guideVsVideographer },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: Routes.terms },
      { label: "Privacy Policy", href: Routes.privacy },
      { label: "Contact us", href: Routes.contact },
    ],
  },
];

/** Dark footer that closes every public page (DESIGN.MD: the footer never inverts). */
export const SiteFooter: FC = () => (
  <footer className="dark bg-surface-dark text-on-dark-soft">
    <div className="page-container py-12 md:py-16">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <BrandLogo tone="dark" />
          <p className="mt-4 max-w-xs text-sm">
            Walkthrough videos from your property photos. AI-generated output may differ from the real property.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-eyebrow text-on-dark">{column.title}</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="rounded-sm text-on-dark-soft transition-colors hover:text-on-dark">
                    {link.label}
                  </Link>
                </li>
              ))}
              {column.title === "Legal" && (
                <li>
                  <CookieSettingsButton className="rounded-sm text-on-dark-soft transition-colors hover:text-on-dark" />
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-2 border-t border-surface-dark-elevated pt-6 text-[0.8125rem] md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Reelty. All rights reserved.</span>
        <span>Processors: Google Cloud · Apify · Dewatermark · Higgsfield · email provider</span>
        <PoweredBy className="self-end text-on-dark-soft transition-colors hover:text-on-dark md:self-auto" />
      </div>
    </div>
  </footer>
);
