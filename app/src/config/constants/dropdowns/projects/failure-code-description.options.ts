import { FailureCodes } from "@/features/projects/interfaces/projects.interfaces";

/** Plain-language fallbacks shown when the API sends a failure_code without a failure_reason. */
export const FailureCodeDescriptionOptions: Record<string, string> = {
  [FailureCodes.SCRAPE_EMPTY]: "We could not find any photos on that page. Try the Upload tab instead.",
  [FailureCodes.SCRAPE_FAILED]: "We could not read that page. Try again, or upload your photos instead.",
  [FailureCodes.PROVIDER_TIMEOUT]: "Our video provider took too long to respond. Your credit was refunded. You can retry.",
  [FailureCodes.TOO_FEW_CLIPS]: "Fewer than 3 clips could be generated. Your credit was refunded. You can retry.",
  [FailureCodes.FFMPEG_ERROR]: "Something went wrong while assembling the final video. Your credit was refunded. You can retry.",
  [FailureCodes.BLOCKED_NO_CREDITS]: "Our video provider is temporarily out of capacity. We are on it.",
};

export const DEFAULT_FAILURE_DESCRIPTION = "We could not finish this video. You can retry, and your credit was not lost.";

export function getFailureDescription(reason: string | null | undefined, code: string | null | undefined): string {
  if (reason) return reason;
  if (code && FailureCodeDescriptionOptions[code]) return FailureCodeDescriptionOptions[code];
  return DEFAULT_FAILURE_DESCRIPTION;
}
