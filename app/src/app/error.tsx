"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="page-container flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-display-md">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">An unexpected error happened. Your videos and photos are safe. Try again.</p>
      <Button size="lg" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
