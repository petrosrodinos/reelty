"use client";

import type { FC } from "react";
import { ClockIcon, InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ApiError } from "@/config/api/axios";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import { useResendVerification } from "@/features/auth/hooks/use-auth";

interface SummaryPanelProps {
  blockers: string[];
  isSubmitting: boolean;
  submitError: unknown;
  onSubmit: () => void;
}

export const SummaryPanel: FC<SummaryPanelProps> = ({ blockers, isSubmitting, submitError, onSubmit }) => {
  const resend = useResendVerification();
  const blocked = blockers.length > 0;

  return (
    <section id="summary" className="rounded-lg border border-hairline bg-canvas p-5 sm:p-6">
      <Button size="lg" className="w-full" onClick={onSubmit} disabled={blocked || isSubmitting} aria-describedby="create-reason">
        {isSubmitting ? <Spinner /> : null}
        Create video
      </Button>

      <p id="create-reason" className="mt-3 flex items-start gap-2 text-[0.8125rem] text-muted-foreground">
        {blocked ? (
          <>
            <InfoIcon className="mt-0.5 size-3.5 shrink-0 text-warning" aria-hidden="true" />
            <span>{blockers[0]}</span>
          </>
        ) : (
          <>
            <ClockIcon className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            <span>Takes several minutes. You can close the page after.</span>
          </>
        )}
      </p>

      {submitError ? (
        <Alert variant="destructive" className="mt-4 border-notice-bad bg-notice-bad">
          <AlertDescription className="text-[#7a2a2a]">
            <span className="block">{getApiErrorMessage(submitError)}</span>
            {submitError instanceof ApiError && submitError.code === "email_not_verified" ? (
              <Button variant="outline" size="sm" className="mt-2" onClick={() => resend.mutate()} disabled={resend.isPending}>
                {resend.isPending ? <Spinner /> : null}
                Resend verification email
              </Button>
            ) : null}
          </AlertDescription>
        </Alert>
      ) : null}
    </section>
  );
};
