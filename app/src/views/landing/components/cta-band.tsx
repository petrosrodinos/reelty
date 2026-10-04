import type { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Routes } from "@/routes/routes";

/** Full-bleed coral callout (the one place coral is used generously). */
export const CtaBand: FC = () => (
  <section className="pb-16 md:pb-24">
    <div className="page-container">
      <div className="rounded-lg bg-brand px-6 py-12 text-center sm:px-12 md:py-16">
        <h2 className="text-display-md mx-auto max-w-2xl !text-white md:text-5xl">Your next listing deserves a walkthrough.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink">Make your first video in minutes.</p>
        <Button
          size="lg"
          className="mt-8 bg-canvas text-ink hover:bg-surface-card"
          render={<Link href={Routes.register} />}
          nativeButton={false}
        >
          Try Reelty
        </Button>
      </div>
    </div>
  </section>
);
