"use client";

import type { FC } from "react";
import { ClockIcon, CoinsIcon, InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ApiError } from "@/config/api/axios";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import { VideoAddonFormOptions } from "@/config/constants/dropdowns/credits/video-addon-form.options";
import { useResendVerification } from "@/features/auth/hooks/use-auth";
import type { VideoQuote } from "@/features/credits/interfaces/credits.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";
import { pluralize } from "@/lib/format.utils";

interface SummaryPanelProps {
  blockers: string[];
  quote: VideoQuote | undefined;
  /** The balance does not cover the quote: show a buy link next to the reason. */
  needsCredits: boolean;
  /** Opens the buy-credits modal over the editor. */
  onBuyCredits: () => void;
  isSubmitting: boolean;
  submitError: unknown;
  onSubmit: () => void;
}

export const SummaryPanel: FC<SummaryPanelProps> = ({
  blockers,
  quote,
  needsCredits,
  onBuyCredits,
  isSubmitting,
  submitError,
  onSubmit,
}) => {
  const resend = useResendVerification();
  const blocked = blockers.length > 0;

  return (
    <section id="summary" className="rounded-lg border border-hairline bg-canvas p-5 sm:p-6 lg:sticky lg:top-24">
      {quote?.tier ? (
        <div className="mb-4 flex items-start justify-between gap-3 border-b border-hairline-soft pb-4">
          <div className="flex items-start gap-2 text-sm">
            <CoinsIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="font-medium text-ink">{quote.tier.name} video</p>
              <p className="text-[0.8125rem] text-muted-foreground">
                {[
                  `${quote.tier.credits} for ${quote.tier.min_clips}–${quote.tier.max_clips} photos`,
                  ...quote.addons.map(
                    (addon) => `+${addon.credits} ${getDropdownOptionLabel(VideoAddonFormOptions, addon.key).toLowerCase()}`,
                  ),
                ].join(" · ")}
              </p>
            </div>
          </div>
          <p className="shrink-0 text-sm font-semibold tabular-nums">{pluralize(quote.total, "credit")}</p>
        </div>
      ) : null}
      <Button size="lg" className="w-full" onClick={onSubmit} disabled={blocked || isSubmitting} aria-describedby="create-reason">
        {isSubmitting ? <Spinner /> : null}
        Create video
      </Button>

      <p id="create-reason" className="mt-3 flex items-start gap-2 text-[0.8125rem] text-muted-foreground">
        {blocked ? (
          <>
            <InfoIcon className="mt-0.5 size-3.5 shrink-0 text-warning" aria-hidden="true" />
            <span>
              {blockers[0]}
              {needsCredits ? (
                <>
                  {" "}
                  <button type="button" onClick={onBuyCredits} className="font-medium text-ink underline underline-offset-4">
                    Buy credits
                  </button>
                </>
              ) : null}
            </span>
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
            {submitError instanceof ApiError && submitError.code === "insufficient_credits" ? (
              <Button variant="outline" size="sm" className="mt-2" onClick={onBuyCredits}>
                Buy credits
              </Button>
            ) : null}
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
