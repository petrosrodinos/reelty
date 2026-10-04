// Constants and helpers for the render state machine (spec §5.3 / §5.4). Pure.

/** Hard cap for the GENERATING phase (spec §5.3). */
export const GENERATING_CAP_MS = 20 * 60 * 1000;
/** Failed clip indices are resubmitted at most this many times (spec §5.4). */
export const MAX_RESUBMIT_ROUNDS = 2;
/** While BLOCKED_NO_CREDITS the balance is re-checked at this interval. */
export const BLOCK_RECHECK_MS = 5 * 60 * 1000;
/** A render blocked on provider credits for longer than this fails (and refunds). */
export const BLOCK_MAX_MS = 12 * 60 * 60 * 1000;
/** Queued renders wait this long between checks while SystemFlag.renders_enabled is off. */
export const RENDERS_DISABLED_RECHECK_MS = 60 * 1000;

/** Delayed re-poll every 10-15 s (spec §5.3). */
export function pollDelayMs(random: () => number = Math.random): number {
  return 10_000 + Math.floor(random() * 5_001);
}

export type RenderOutcome = { kind: 'done' } | { kind: 'delay'; ms: number };

/** A terminal, expected failure of the render. `detail` is for admins (job_events), never shown to users. */
export class RenderFailure extends Error {
  constructor(
    readonly code: string,
    readonly detail?: string,
    /** Give the quota unit back (always true except for failures that are the user's doing). */
    readonly refund: boolean = true,
  ) {
    super(code);
    this.name = 'RenderFailure';
  }
}

const REFUND_NOTE = ' Your video credit has been returned.';

/** Plain-language `failure_reason` shown in the UI. Never contains provider errors. */
export function userMessageFor(code: string, refunded: boolean): string {
  const note = refunded ? REFUND_NOTE : '';
  switch (code) {
    case 'provider_timeout':
      return `Creating the clips took longer than expected, so we stopped.${note} Please try again.`;
    case 'too_few_clips':
      return `We could not turn enough of your photos into scenes (at least 3 are needed).${note} Try again, or use different photos.`;
    case 'ffmpeg_error':
      return `We hit a problem while putting your video together.${note} Please try again.`;
    case 'blocked_no_credits':
      return `Video creation is delayed on our side and could not be finished in time.${note} Please try again later.`;
    case 'invalid_images':
      return 'This project does not have the 3 to 12 usable photos needed for a video. Please check your photos and try again.';
    case 'cost_ceiling':
    case 'provider_error':
      return `Video creation is temporarily unavailable.${note} Please try again later.`;
    default:
      return `Something went wrong on our side while creating your video.${note} Please try again.`;
  }
}
