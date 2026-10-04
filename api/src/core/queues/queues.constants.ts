// Queue / job contract shared by the API (producers) and the workers (consumers).
// Spec §5. Payloads carry IDs only — never URLs or secrets.

export const BULL_BOARD_ADAPTER = 'BULL_BOARD_ADAPTER';

export const QueueNames = {
  SCRAPE: 'scrape',
  IMAGE_PROCESS: 'image-process',
  RENDER: 'render',
  NOTIFY: 'notify',
} as const;
export type QueueName = (typeof QueueNames)[keyof typeof QueueNames];

export const JobNames = {
  SCRAPE_WEBSITE: 'scrape-website',
  SCRAPE_AIRBNB: 'scrape-airbnb',
  DEWATERMARK: 'dewatermark',
  RENDER_VIDEO: 'render-video',
  SEND_EMAIL: 'send-email',
} as const;
export type JobName = (typeof JobNames)[keyof typeof JobNames];

export interface ScrapeJobData {
  projectId: string;
}
export interface DewatermarkJobData {
  imageId: string;
  projectId: string;
  attempt: number;
}
export interface RenderJobData {
  projectId: string;
}

export const EmailKinds = {
  VERIFY_EMAIL: 'verify-email',
  RESET_PASSWORD: 'reset-password',
  VIDEO_READY: 'video-ready',
  VIDEO_FAILED: 'video-failed',
} as const;
export type EmailKind = (typeof EmailKinds)[keyof typeof EmailKinds];

// For verify/reset the raw one-time token is passed in the payload (needed to build the link).
// Redis must therefore be private; tokens are short-lived and stored hashed in Postgres.
export interface SendEmailJobData {
  kind: EmailKind;
  userId: string;
  projectId?: string;
  token?: string;
}

// Deterministic job IDs (spec §5.2). BullMQ forbids ':' in custom ids, so use '__'.
export const JobIds = {
  scrape: (projectId: string) => `scrape__${projectId}`,
  dewatermark: (imageId: string, attempt: number) => `dewatermark__${imageId}__${attempt}`,
  render: (projectId: string) => `render__${projectId}`,
  email: (kind: EmailKind, userId: string, projectId?: string, nonce?: string) =>
    ['email', kind, userId, projectId, nonce].filter(Boolean).join('__'),
} as const;

const DAY = 24 * 60 * 60;
export const QueueDefaults = {
  [QueueNames.SCRAPE]: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 30_000 },
    removeOnComplete: { age: DAY },
    removeOnFail: { age: 14 * DAY },
  },
  [QueueNames.IMAGE_PROCESS]: {
    attempts: 2,
    backoff: { type: 'exponential', delay: 10_000 },
    removeOnComplete: { age: DAY },
    removeOnFail: { age: 14 * DAY },
  },
  [QueueNames.RENDER]: {
    attempts: 2,
    backoff: { type: 'exponential', delay: 60_000 },
    removeOnComplete: { age: DAY },
    removeOnFail: { age: 14 * DAY },
  },
  [QueueNames.NOTIFY]: {
    attempts: 5,
    backoff: { type: 'exponential', delay: 5_000 },
    removeOnComplete: { age: DAY },
    removeOnFail: { age: 14 * DAY },
  },
} as const;

export const WorkerConcurrency = {
  [QueueNames.SCRAPE]: 5,
  [QueueNames.IMAGE_PROCESS]: 3,
  [QueueNames.RENDER]: 2,
  [QueueNames.NOTIFY]: 10,
} as const;

// Domain limits (env overridable, defaults per spec §18.1)
export const Limits = {
  MIN_IMAGES: 3,
  MAX_IMAGES: 12,
  WM_MAX_ATTEMPTS: 2,
  MAX_SCRAPE_CANDIDATES: 30,
  MAX_UPLOAD_BYTES: 20 * 1024 * 1024,
  MIN_SIDE_REJECT: 640,
  MIN_SIDE_WARN: 1024,
  SIGNED_URL_TTL_SECONDS: 15 * 60,
} as const;
