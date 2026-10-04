import type { FC } from "react";
import { CookieNotice } from "@/components/layout/cookie-notice";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CtaBand } from "@/views/landing/components/cta-band";
import { FaqSection } from "@/views/landing/components/faq-section";
import { HeroSection } from "@/views/landing/components/hero-section";
import { HowItWorksSection } from "@/views/landing/components/how-it-works-section";
import { PricingSection } from "@/views/landing/components/pricing-section";
import { ReliabilitySection } from "@/views/landing/components/reliability-section";

const LandingPage: FC = () => (
  <>
    <SiteHeader />
    <main id="main" className="flex-1">
      <HeroSection />
      <HowItWorksSection />
      <ReliabilitySection />
      <PricingSection />
      <FaqSection />
      <CtaBand />
    </main>
    <SiteFooter />
    <CookieNotice />
  </>
);

export default LandingPage;
