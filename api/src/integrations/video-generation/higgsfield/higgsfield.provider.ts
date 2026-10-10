import { Injectable, Logger } from '@nestjs/common';
import { WorkerConfigService } from '@/background/common/worker-config.service';
import { safeDownloadToFile } from '@/background/common/safe-http';
import { AppConfigService } from '@/modules/app-config/app-config.service';
import { AppConfigKeys } from '@/modules/app-config/app-config.constants';
import { GcsObjectsService } from '@/integrations/storage/gcs/services/gcs-objects.service';
import {
  ClipCost,
  ClipJobState,
  ClipRequest,
  ClipSubmitResult,
  CostQuery,
  ImportImageInput,
  ImportImageResult,
  ProviderConfigError,
  ProviderRejectedError,
  ProviderTransientError,
  SubmitHooks,
  VideoGenerationProvider,
} from '../video-generation.provider';
import { HIGGSFIELD_CONFIG, HiggsfieldEndpoint } from './higgsfield.config';
import { looksLikeOutOfCredits, parseEstimateCredits, parseJobState, parseRequestId } from './higgsfield.parsers';
import { mapPool } from '@/background/common/pool';

class HiggsfieldHttpError extends Error {
  constructor(
    readonly status: number,
    readonly bodyText: string,
  ) {
    super(`Higgsfield HTTP ${status}`);
    this.name = 'HiggsfieldHttpError';
  }
}

/**
 * HTTP client for Higgsfield. Endpoint paths and parameter names are an ASSUMPTION (spec Q1) and are
 * all defined in `higgsfield.config.ts`. Signed URLs and API keys are never logged.
 */
@Injectable()
export class HiggsfieldProvider implements VideoGenerationProvider {
  readonly name = 'higgsfield' as const;
  private readonly logger = new Logger(HiggsfieldProvider.name);

  constructor(
    private readonly config: WorkerConfigService,
    private readonly gcs: GcsObjectsService,
    private readonly appConfig: AppConfigService,
  ) {}

  isConfigured(): boolean {
    return !!this.config.higgsfieldApiKey && !!this.config.higgsfieldBaseUrl;
  }

  // -- VideoGenerationProvider -------------------------------------------------------------------

  async getBalance(): Promise<number | null> {
    return null; // Higgsfield exposes no balance endpoint; submit errors (402) reveal exhausted credits
  }

  /** Uploads the image to Higgsfield storage; the returned "media id" is its public URL. */
  async importImage(input: ImportImageInput): Promise<ImportImageResult> {
    const contentType = /\.png$/i.test(input.gcsPath) ? 'image/png' : /\.webp$/i.test(input.gcsPath) ? 'image/webp' : 'image/jpeg';
    const data = await this.gcs.downloadToBuffer(input.gcsPath);
    let json: unknown;
    try {
      json = await this.call(HIGGSFIELD_CONFIG.endpoints.uploadUrl, { content_type: contentType });
    } catch (error) {
      this.throwIfAccountProblem(error, true);
      if (error instanceof HiggsfieldHttpError) throw new ProviderRejectedError(`Higgsfield rejected the upload request (HTTP ${error.status}: ${error.bodyText.slice(0, 200)})`);
      throw error;
    }
    const o = (json && typeof json === 'object' ? json : {}) as { public_url?: string; upload_url?: string; upload_headers?: Record<string, string> };
    if (!o.public_url || !o.upload_url) throw new ProviderTransientError('Higgsfield upload URL response was incomplete');
    let res: Response;
    try {
      // Presigned storage URL: never send our API credentials here.
      res = await fetch(o.upload_url, {
        method: 'PUT',
        headers: { 'Content-Type': contentType, ...(o.upload_headers ?? {}) },
        body: new Uint8Array(data),
        signal: AbortSignal.timeout(HIGGSFIELD_CONFIG.requestTimeoutMs * 2),
      });
    } catch (error) {
      throw new ProviderTransientError(`Higgsfield upload failed (${(error as Error).name})`);
    }
    if (!res.ok) throw new ProviderTransientError(`Higgsfield upload failed (HTTP ${res.status})`);
    return { mediaId: o.public_url };
  }

  /** Authoritative per-clip price from Higgsfield's estimate endpoint; the configured fallback if it is unavailable. */
  async getCost(query: CostQuery): Promise<ClipCost> {
    try {
      const json = await this.call(HIGGSFIELD_CONFIG.endpoints.estimate, {
        prompt: query.prompt,
        image_url: query.mediaId,
        duration: HIGGSFIELD_CONFIG.generation.duration,
      });
      const credits = parseEstimateCredits(json);
      if (credits !== undefined) return { creditsPerClip: credits };
    } catch (error) {
      if (error instanceof ProviderConfigError) throw error;
      this.throwIfAccountProblem(error, false);
      this.logger.warn(`Higgsfield cost estimate failed: ${(error as Error).message}`);
    }
    const fallback = await this.appConfig.getNumber(AppConfigKeys.HIGGSFIELD_FALLBACK_CREDITS_PER_CLIP);
    return { creditsPerClip: fallback };
  }

  async submitClips(requests: ClipRequest[], hooks: SubmitHooks = {}): Promise<ClipSubmitResult[]> {
    return mapPool(requests, HIGGSFIELD_CONFIG.concurrency, async (r) => {
      const result = await this.submitOne(r);
      if (hooks.onResult) await hooks.onResult(result);
      return result;
    });
  }

  async waitForJobs(jobIds: string[]): Promise<ClipJobState[]> {
    const states = await mapPool(jobIds, HIGGSFIELD_CONFIG.concurrency, async (jobId) => {
      let json: unknown;
      try {
        json = await this.call(HIGGSFIELD_CONFIG.endpoints.requestStatus(jobId));
      } catch (error) {
        this.throwIfAccountProblem(error, false);
        throw error;
      }
      return parseJobState(jobId, json);
    });
    return states;
  }

  async downloadClip(job: { jobId: string; resultUrl: string }, destFile: string): Promise<void> {
    // Plain GET without our API key: the result URL points at a CDN and must not receive credentials.
    // TG §4 lesson 6: some networks get 403 here, so a download failure is surfaced as transient and retried.
    try {
      await safeDownloadToFile(job.resultUrl, destFile, {
        maxBytes: HIGGSFIELD_CONFIG.maxClipBytes,
        contentTypePrefixes: ['video/', 'application/octet-stream', 'binary/octet-stream'],
        totalTimeoutMs: 5 * 60 * 1000,
        headers: { accept: 'video/mp4,video/*;q=0.9,*/*;q=0.5' },
      });
    } catch (error) {
      throw new ProviderTransientError(`Clip download failed (${(error as Error).message})`);
    }
  }

  // -- internals ---------------------------------------------------------------------------------

  private async submitOne(r: ClipRequest): Promise<ClipSubmitResult> {
    try {
      const json = await this.call(HIGGSFIELD_CONFIG.endpoints.generateVideo, {
        prompt: r.prompt,
        image_url: r.mediaId,
        duration: HIGGSFIELD_CONFIG.generation.duration,
      });
      const jobId = parseRequestId(json);
      if (jobId) return { index: r.index, imageId: r.imageId, ok: true, jobId };
      return { index: r.index, imageId: r.imageId, ok: false, errorMessage: 'no request id returned' };
    } catch (error) {
      if (error instanceof HiggsfieldHttpError) {
        this.throwIfAccountProblem(error, false);
        const outOfCredits = error.status === 402 || looksLikeOutOfCredits(error.bodyText);
        return { index: r.index, imageId: r.imageId, ok: false, outOfCredits, errorMessage: `HTTP ${error.status}: ${error.bodyText.slice(0, 200)}` };
      }
      throw error;
    }
  }

  /**
   * Rejected credentials (401/403) and, when `includeCredits`, an exhausted balance are problems with OUR account,
   * not with the photo: surface them as a config error so the user sees "temporarily unavailable" and is refunded,
   * instead of the photo being skipped. (Credits at submit time are handled separately by the BLOCKED_NO_CREDITS flow.)
   */
  private throwIfAccountProblem(error: unknown, includeCredits: boolean): void {
    if (!(error instanceof HiggsfieldHttpError)) return;
    const auth = error.status === 401 || error.status === 403;
    const credits = includeCredits && (error.status === 402 || looksLikeOutOfCredits(error.bodyText));
    if (auth || credits) {
      throw new ProviderConfigError(`Higgsfield account problem (HTTP ${error.status}): ${auth ? 'credentials rejected' : 'out of credits'}`);
    }
  }

  private async call(endpoint: HiggsfieldEndpoint, body?: unknown): Promise<unknown> {
    const key = this.config.higgsfieldApiKey;
    const base = this.config.higgsfieldBaseUrl;
    if (!key || !base) {
      throw new ProviderConfigError('HIGGSFIELD_API_KEY is required for the Higgsfield provider');
    }
    const auth = HIGGSFIELD_CONFIG.auth;
    const headers: Record<string, string> = {
      accept: 'application/json',
      [auth.header]: auth.scheme ? `${auth.scheme} ${key}` : key,
    };
    if (body !== undefined) headers['content-type'] = 'application/json';

    let res: Response;
    try {
      res = await fetch(`${base.replace(/\/+$/, '')}${endpoint.path}`, {
        method: endpoint.method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(HIGGSFIELD_CONFIG.requestTimeoutMs),
      });
    } catch (error) {
      throw new ProviderTransientError(`Higgsfield request failed (${(error as Error).name})`);
    }

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      if (res.status >= 500 || res.status === 429 || res.status === 408) {
        throw new ProviderTransientError(`Higgsfield HTTP ${res.status}`);
      }
      throw new HiggsfieldHttpError(res.status, text.slice(0, 2000));
    }
    return res.json().catch(() => ({}));
  }
}
