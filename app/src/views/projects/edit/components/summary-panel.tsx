"use client";

import type { FC } from "react";
import { ClockIcon, InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ApiError } from "@/config/api/axios";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import { useResendVerification } from "@/features/auth/hooks/use-auth";
import type { Me } from "@/features/auth/interfaces/auth.interfaces";
import { estimateDurationSeconds, formatDateLong, formatDuration } from "@/lib/format.utils";

interface SummaryPanelProps {
  me: Me;
  imageCount: number;
  musicEnabled: boolean;
  rightsChecked: boolean;
  onRightsChange: (checked: boolean) => void;
  blockers: string[];
  isSubmitting: boolean;
  submitError: unknown;
  onSubmit: () => void;
}

const Row: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between gap-4 py-1.5 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-right font-medium text-ink">{value}</span>
  </div>
);

export const SummaryPanel: FC<SummaryPanelProps> = ({
  me,
  imageCount,
  musicEnabled,
  rightsChecked,
  onRightsChange,
  blockers,
  isSubmitting,
  submitError,
  onSubmit,
}) => {
  const resend = useResendVerification();
  const estimate = estimateDurationSeconds(imageCount);
  const blocked = blockers.length > 0;

  return (
    <section id="summary" className="rounded-lg border border-hairline bg-canvas p-5 sm:p-6" aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="mb-2 text-lg font-medium text-ink">
        Summary
      </h2>
      <Row label="Photos" value={String(imageCount)} />
      <Row label="Estimated length" value={estimate > 0 ? `~${formatDuration(estimate)}` : "–"} />
      <Row label="Audio" value={musicEnabled ? "Soundtrack on" : "Silent track"} />
      <Row label="Cost" value={`1 video (${me.quota.remaining} left this month)`} />
      {me.quota.remaining <= 0 ? (
        <p className="pb-1 text-[0.8125rem] text-muted-foreground">Your quota resets on {formatDateLong(me.quota.resets_at)}.</p>
      ) : null}

      <hr className="my-4 border-hairline-soft" />

      <Label className="items-start gap-3 text-sm font-normal leading-snug text-body">
        <Checkbox checked={rightsChecked} onCheckedChange={(checked) => onRightsChange(checked === true)} className="mt-0.5 size-5" />
        <span>I own these photos or have permission to use them.</span>
      </Label>

      <Button size="lg" className="mt-5 w-full" onClick={onSubmit} disabled={blocked || isSubmitting} aria-describedby="create-reason">
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
