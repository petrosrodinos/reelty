import { ApiError } from "@/config/api/axios";

/** Plain-language messages for API error codes (contract section 4). Falls back to the server message. */
export const ApiErrorMessageOptions: Record<string, string> = {
  insufficient_credits: "You do not have enough credits for this video. Buy more credits to continue.",
  payments_unavailable: "Payments are temporarily unavailable. Please try again later.",
  render_in_progress: "You already have a video being created. Only one at a time, please wait for it to finish.",
  email_not_verified: "Please verify your email address before creating a video. We can resend the link.",
  watermark_processing: "A watermark removal is still running. Wait for it to finish, then create your video.",
  consent_required: "Please confirm you have the right to edit these images first.",
  attempts_exhausted: "You have used both watermark removal attempts for this photo.",
  project_locked: "This video has already been submitted, so it can no longer be edited.",
  too_many_attempts: "Too many attempts. Please wait a few minutes and try again.",
  invalid_credentials: "Email or password is incorrect.",
  invalid_token: "This link is invalid or has expired. Request a new one.",
  invalid_refresh: "Your session expired. Please log in again.",
  csrf_failed: "Your session could not be verified. Refresh the page and try again.",
  invalid_airbnb_url: "That looks like a search page. Paste a link to one listing (airbnb.com/rooms/…).",
  video_not_ready: "This video is not ready yet.",
  not_found: "We could not find that. It may have been deleted.",
  network_error: "We could not reach Reelty. Check your connection and try again.",
  renders_disabled: "Video creation is paused for maintenance. Please try again later.",
  dewatermark_disabled: "Watermark removal is temporarily unavailable. You can continue without it.",
};

/** Human-readable message for any thrown value, preferring our mapped copy by error code. */
export function getApiErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (error instanceof ApiError) {
    return ApiErrorMessageOptions[error.code] ?? (error.message || fallback);
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
