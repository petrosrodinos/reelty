import type { FC, ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

interface LegalLayoutProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export const LegalLayout: FC<LegalLayoutProps> = ({ title, updated, children }) => (
  <>
    <SiteHeader />
    <main id="main" className="flex-1">
      <article className="page-container max-w-3xl py-12 md:py-20">
        <p className="text-eyebrow text-muted-foreground">Legal</p>
        <h1 className="text-display-lg mt-3">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated {updated}</p>
        <p className="mt-6 rounded-lg border border-hairline bg-notice-warn px-4 py-3 text-sm text-ink">
          This is a concise working draft that is pending legal review. It is not final legal advice.
        </p>
        <div className="mt-10 flex flex-col gap-8 text-[1.0625rem] leading-relaxed">{children}</div>
      </article>
    </main>
    <SiteFooter />
  </>
);

export const LegalSection: FC<{ heading: string; children: ReactNode }> = ({ heading, children }) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-display-sm">{heading}</h2>
    {children}
  </section>
);

export const LegalList: FC<{ items: ReactNode[] }> = ({ items }) => (
  <ul className="ml-5 flex list-disc flex-col gap-2 marker:text-brand">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
