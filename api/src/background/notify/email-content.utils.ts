// Pure builders for the transactional email content (subject, plain text, template data).
import { EmailTemplate, EmailTemplates } from '@/integrations/notifications/resend/interfaces/mail.interfaces';

export interface BuiltEmail {
  template: EmailTemplate;
  subject: string;
  text: string;
  data: Record<string, unknown>;
  /** True when the plain text contains a one-time link and must not be written to production logs. */
  containsSecretLink: boolean;
}

export function buildLink(appUrl: string, path: string, query?: Record<string, string>): string {
  const base = appUrl.replace(/\/+$/, '');
  const qs = query
    ? '?' +
      Object.entries(query)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&')
    : '';
  return `${base}${path}${qs}`;
}

/** 48.4 -> "0:48", 125 -> "2:05" */
export function formatDuration(seconds: number | null | undefined): string | null {
  if (seconds === null || seconds === undefined || !Number.isFinite(seconds) || seconds <= 0) return null;
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

/** Subject lines must stay on one line and short. */
export function safeSubjectText(text: string, max = 60): string {
  const t = text.replace(/"/g, "'").replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

export function buildVerifyEmail(appUrl: string, token: string): BuiltEmail {
  const url = buildLink(appUrl, '/verify', { token });
  return {
    template: EmailTemplates.VERIFY_EMAIL,
    subject: 'Confirm your email for Reelty',
    text: `Confirm your email\n\nThanks for signing up for Reelty. Confirm your address to start creating videos:\n${url}\n\nThis link works for 24 hours.`,
    data: { url },
    containsSecretLink: true,
  };
}

export function buildResetEmail(appUrl: string, token: string): BuiltEmail {
  const url = buildLink(appUrl, '/reset', { token });
  return {
    template: EmailTemplates.RESET_PASSWORD,
    subject: 'Reset your Reelty password',
    text: `Reset your password\n\nChoose a new password here:\n${url}\n\nThe link works for 1 hour and only once. If you did not ask for this, ignore this email.`,
    data: { url },
    containsSecretLink: true,
  };
}

export interface VideoReadyInput {
  projectId: string;
  title: string;
  durationSeconds: number | null;
  partial: boolean;
  skippedCount: number;
}

export function buildVideoReadyEmail(appUrl: string, p: VideoReadyInput): BuiltEmail {
  const url = buildLink(appUrl, `/projects/${encodeURIComponent(p.projectId)}`);
  const title = p.title.trim();
  const duration = formatDuration(p.durationSeconds);
  const partialNote = p.partial
    ? `\n\nHeads up: we could not use ${p.skippedCount} of your photos, so the video has a few fewer scenes than planned.`
    : '';
  return {
    template: EmailTemplates.VIDEO_READY,
    subject: title ? `Your video "${safeSubjectText(title)}" is ready` : 'Your video is ready',
    text: `Your video is ready\n\n${title ? `"${title}" is finished` : 'Your video is finished'}${duration ? ` (${duration})` : ''}. Watch it and download it from My Videos:\n${url}${partialNote}`,
    data: {
      url,
      videoTitle: title || null,
      duration,
      partial: p.partial,
      skippedCount: p.skippedCount,
    },
    containsSecretLink: false,
  };
}

export interface VideoFailedInput {
  projectId: string;
  title: string;
  /** Plain-language reason already safe to show. */
  reason: string | null;
  /** The quota unit was returned. */
  refunded: boolean;
}

export function buildVideoFailedEmail(appUrl: string, p: VideoFailedInput): BuiltEmail {
  const url = buildLink(appUrl, `/projects/${encodeURIComponent(p.projectId)}`);
  const title = p.title.trim();
  return {
    template: EmailTemplates.VIDEO_FAILED,
    subject: 'We could not finish your video',
    text:
      `We could not finish your video\n\n${title ? `Something went wrong while creating "${title}".` : 'Something went wrong while creating your video.'}` +
      `${p.reason ? `\n${p.reason}` : ''}` +
      `${p.refunded ? '\nYour video credit has been returned.' : ''}` +
      `\n\nOpen your project to try again:\n${url}`,
    data: { url, videoTitle: title || null, reason: p.reason, refunded: p.refunded },
    containsSecretLink: false,
  };
}
