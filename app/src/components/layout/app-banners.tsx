"use client";

import type { FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MailIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useResendVerification } from "@/features/auth/hooks/use-auth";
import { useOnlineStatus } from "@/hooks/use-online-status";

/** Shown while the browser is offline. "Retry now" refetches everything; reconnecting also refetches. */
export const OfflineBanner: FC = () => {
  const online = useOnlineStatus();
  const queryClient = useQueryClient();
  if (online) return null;
  return (
    <div role="alert" className="border-b border-hairline bg-notice-warn text-sm text-ink">
      <div className="page-container flex flex-wrap items-center justify-center gap-3 py-2.5 text-center">
        <span className="inline-flex items-center gap-2">
          <WifiOffIcon className="size-4" aria-hidden="true" />
          You are offline. Changes will not save until you reconnect.
        </span>
        <Button size="sm" variant="outline" onClick={() => queryClient.invalidateQueries()}>
          Retry now
        </Button>
      </div>
    </div>
  );
};

/** Unverified accounts can log in but cannot render (spec FR-AUTH-2). */
export const VerificationBanner: FC = () => {
  const resend = useResendVerification();
  return (
    <div className="border-b border-hairline bg-surface-card text-sm text-ink">
      <div className="page-container flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-2.5 text-center">
        <span className="inline-flex items-center gap-2">
          <MailIcon className="size-4" aria-hidden="true" />
          Please verify your email before creating your first video.
        </span>
        <Button size="sm" variant="outline" onClick={() => resend.mutate()} disabled={resend.isPending}>
          {resend.isPending ? <Spinner /> : null}
          Resend email
        </Button>
      </div>
    </div>
  );
};
