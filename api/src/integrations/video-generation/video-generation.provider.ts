// Provider abstraction for clip generation (contract §5, spec §4.1 / §10.3).
// The render state machine only talks to this interface, so Higgsfield (HTTP) and the local
// Ken Burns fallback are interchangeable.

export type VideoProviderName = 'higgsfield' | 'local';

export interface ImportImageInput {
  imageId: string;
  projectId: string;
  userId: string;
  /** Bucket-relative path of the version to use (original or processed). */
  gcsPath: string;
}

export interface ImportImageResult {
  /** Provider media handle, stored in `images.higgsfield_media_id`. */
  mediaId: string;
}

export interface CostQuery {
  mediaId: string;
  prompt: string;
}

export interface ClipCost {
  /** Provider credits for ONE 5 s clip. 0 for the local provider. */
  creditsPerClip: number;
}

export interface ClipRequest {
  /** Stable index (position in the video) used to match results. */
  index: number;
  imageId: string;
  mediaId: string;
  prompt: string;
  /** Bucket-relative still used by the local provider. */
  sourceGcsPath: string;
  /** Where a locally rendered clip is stored (`work/clips/{imageId}.mp4`). */
  workGcsPath: string;
}

export interface ClipSubmitResult {
  index: number;
  imageId: string;
  ok: boolean;
  jobId?: string;
  /** Set when the provider refused because the account is out of credits. */
  outOfCredits?: boolean;
  /** Internal diagnostic only; never shown to users. */
  errorMessage?: string;
  /** Local provider: the finished clip already lives in GCS at this `gcs://<path>`. */
  completedResultUrl?: string;
}

export interface SubmitHooks {
  /** Called as soon as one request has a result, so the job id can be persisted immediately. */
  onResult?: (result: ClipSubmitResult) => Promise<void>;
}

export type ClipJobStatus = 'processing' | 'completed' | 'failed' | 'nsfw';

export interface ClipJobState {
  jobId: string;
  status: ClipJobStatus;
  /** May contain credentials: never log. */
  resultUrl?: string;
  errorMessage?: string;
}

export interface VideoGenerationProvider {
  readonly name: VideoProviderName;
  /** Remaining credits, or null when the provider does not expose a balance. */
  getBalance(): Promise<number | null>;
  importImage(input: ImportImageInput): Promise<ImportImageResult>;
  getCost(query: CostQuery): Promise<ClipCost>;
  /** Submits one clip per photo. Per-index failures are reported in the result, never thrown. */
  submitClips(requests: ClipRequest[], hooks?: SubmitHooks): Promise<ClipSubmitResult[]>;
  /** One non-blocking status check (at most ~15 s) for a batch of jobs. */
  waitForJobs(jobIds: string[]): Promise<ClipJobState[]>;
  downloadClip(job: { jobId: string; resultUrl: string }, destFile: string): Promise<void>;
}

/** Transient provider problem (network, 5xx, timeouts): the caller may retry later. */
export class ProviderTransientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProviderTransientError';
  }
}

/** The provider refused this specific input (HTTP 4xx): retrying the same call will not help. */
export class ProviderRejectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProviderRejectedError';
  }
}

/** The provider is not usable as configured (missing key/base URL). */
export class ProviderConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProviderConfigError';
  }
}

/** Marker for `ClipSubmitResult.completedResultUrl` / `clip_result_url` pointing at our own bucket. */
export const GCS_URL_PREFIX = 'gcs://';
