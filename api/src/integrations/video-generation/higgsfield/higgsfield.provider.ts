import { Injectable, Logger } from '@nestjs/common';
import { WorkerConfigService } from '@/background/common/worker-config.service';
import { safeDownloadToFile } from '@/background/common/safe-http';
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
import {
  looksLikeOutOfCredits,
  parseBalance,
  parseBatchResults,
  parseCredits,
  parseJobStates,
  parseMediaId,
} from './higgsfield.parsers';

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
  ) {}

  isConfigured(): boolean {
    return !!this.config.higgsfieldApiKey && !!this.config.higgsfieldBaseUrl;
  }

  // -- VideoGenerationProvider -------------------------------------------------------------------

  async getBalance(): Promise<number | null> {
    try {
      return parseBalance(await this.call(HIGGSFIELD_CONFIG.endpoints.balance));
    } catch (error) {
      if (error instanceof ProviderConfigError) throw error;
      this.logger.warn(`Could not read Higgsfield balance: ${(error as Error).message}`);
      return null; // unknown balance: do not block, submit errors still reveal exhausted credits
    }
  }

  async importImage(input: ImportImageInput): Promise<ImportImageResult> {
    // Short-lived signed URL: handed to Higgsfield only, never stored or logged.
    const url = await this.gcs.getSignedReadUrl(input.gcsPath, {
      expiresSeconds: HIGGSFIELD_CONFIG.importUrlTtlSeconds,
    });
    let json: unknown;
    try {
      json = await this.call(HIGGSFIELD_CONFIG.endpoints.importMedia, { url, type: 'image' });
    } catch (error) {
      if (error instanceof HiggsfieldHttpError) throw new ProviderRejectedError(`Higgsfield rejected the image (HTTP ${error.status})`);
      throw error;
    }
    const mediaId = parseMediaId(json);
    if (!mediaId) throw new ProviderTransientError('Higgsfield import returned no media id');
    return { mediaId };
  }

  async getCost(query: CostQuery): Promise<ClipCost> {
    const json = await this.call(HIGGSFIELD_CONFIG.endpoints.generateVideo, {
      ...this.params(query.mediaId, query.prompt),
      get_cost: true,
    });
    const credits = parseCredits(json);
    if (credits === undefined) {
      this.logger.warn('Cost preflight answered in an unexpected shape; using the documented 7.5 credits per clip');
      return { creditsPerClip: HIGGSFIELD_CONFIG.fallbackCreditsPerClip };
    }
    return { creditsPerClip: credits };
  }

  async submitClips(requests: ClipRequest[], hooks: SubmitHooks = {}): Promise<ClipSubmitResult[]> {
    const results: ClipSubmitResult[] = [];
    const size = HIGGSFIELD_CONFIG.maxBatchSize;
    for (let i = 0; i < requests.length; i += size) {
      const chunk = requests.slice(i, i + size);
      const chunkResults = await this.submitBatch(chunk);
      for (const r of chunkResults) {
        if (hooks.onResult) await hooks.onResult(r);
        results.push(r);
      }
    }
    return results;
  }

  async waitForJobs(jobIds: string[]): Promise<ClipJobState[]> {
    const states: ClipJobState[] = [];
    const size = HIGGSFIELD_CONFIG.maxWaitBatch;
    for (let i = 0; i < jobIds.length; i += size) {
      const chunk = jobIds.slice(i, i + size);
      const json = await this.call(HIGGSFIELD_CONFIG.endpoints.jobsWait, {
        job_ids: chunk,
        timeout_seconds: HIGGSFIELD_CONFIG.waitTimeoutSeconds,
      });
      states.push(...parseJobStates(json));
    }
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

  private params(mediaId: string, prompt: string) {
    const g = HIGGSFIELD_CONFIG.generation;
    return {
      model: g.model,
      aspect_ratio: g.aspect_ratio,
      duration: g.duration,
      genre: g.genre,
      sound: g.sound,
      medias: [{ role: g.mediaRole, value: mediaId }],
      prompt,
    };
  }

  private async submitBatch(chunk: ClipRequest[]): Promise<ClipSubmitResult[]> {
    let json: unknown;
    try {
      json = await this.call(HIGGSFIELD_CONFIG.endpoints.generateVideoBatch, {
        requests: chunk.map((c) => ({ index: c.index, params: this.params(c.mediaId, c.prompt) })),
      });
    } catch (error) {
      if (error instanceof HiggsfieldHttpError && (error.status === 402 || looksLikeOutOfCredits(error.bodyText))) {
        return chunk.map((c) => ({ index: c.index, imageId: c.imageId, ok: false, outOfCredits: true }));
      }
      if (error instanceof HiggsfieldHttpError) {
        return chunk.map((c) => ({ index: c.index, imageId: c.imageId, ok: false, errorMessage: `HTTP ${error.status}` }));
      }
      throw error;
    }

    const parsed = parseBatchResults(json);
    return chunk.map((c, position) => {
      // match by the index we sent; fall back to response order
      const item = parsed.find((p) => p.index === c.index) ?? (parsed.every((p) => p.index === undefined) ? parsed[position] : undefined);
      if (item?.jobId) return { index: c.index, imageId: c.imageId, ok: true, jobId: item.jobId };
      return {
        index: c.index,
        imageId: c.imageId,
        ok: false,
        outOfCredits: looksLikeOutOfCredits(item?.error),
        errorMessage: item?.error ?? 'no job id returned',
      };
    });
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
        signal: AbortSignal.timeout(HIGGSFIELD_CONFIG.requestTimeoutMs + HIGGSFIELD_CONFIG.waitTimeoutSeconds * 1000),
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
