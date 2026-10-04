import { Injectable, Logger } from '@nestjs/common';
import { WorkerConfigService } from '@/background/common/worker-config.service';
import { sniffImageType } from '@/background/common/image.utils';

export type DewatermarkErrorKind =
  | 'not_configured'
  | 'unauthorized' // 401: wrong key, never retried
  | 'bad_request' // 400: never retried
  | 'credits_exhausted'
  | 'rate_limited'
  | 'server' // 500/503 (already retried once)
  | 'network'
  | 'invalid_response';

export class DewatermarkError extends Error {
  constructor(
    readonly kind: DewatermarkErrorKind,
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'DewatermarkError';
  }
}

export const DEWATERMARK_ERASE_PATH = '/api/object_removal/v2/erase_watermark';
export const DEWATERMARK_CREDITS_PATH = '/api/creditInfo';
/** Vendor limits (spec §10.2). */
export const DEWATERMARK_MAX_SIDE = 6000;
export const DEWATERMARK_RECOMMENDED_BYTES = 10 * 1024 * 1024;

const REQUEST_TIMEOUT_MS = 90_000;
const RETRY_DELAY_MS = 2_000;
const CREDIT_WORDS = /credit|balance|quota|insufficient|payment/i;

/** Classifies an HTTP failure. Exported for unit tests. */
export function classifyDewatermarkStatus(status: number, bodyText: string): DewatermarkErrorKind {
  if (status === 401) return 'unauthorized';
  if (status === 402) return 'credits_exhausted';
  if (status === 403 && CREDIT_WORDS.test(bodyText)) return 'credits_exhausted';
  if (status === 400 && CREDIT_WORDS.test(bodyText)) return 'credits_exhausted';
  if (status === 400 || status === 403 || status === 404 || status === 413 || status === 422) return 'bad_request';
  if (status === 429) return 'rate_limited';
  return 'server';
}

@Injectable()
export class DewatermarkService {
  private readonly logger = new Logger(DewatermarkService.name);

  constructor(private readonly config: WorkerConfigService) {}

  isConfigured(): boolean {
    return !!this.config.dewatermarkApiKey;
  }

  /**
   * Sends a JPEG (longest side <= 6000 px) and returns the processed image bytes.
   * 500/503 are retried once after a short delay; 400/401 are never retried.
   */
  async eraseWatermark(jpeg: Buffer): Promise<Buffer> {
    const key = this.config.dewatermarkApiKey;
    if (!key) throw new DewatermarkError('not_configured', 'DEWATERMARK_API_KEY is not configured');

    try {
      return await this.erase(jpeg, key);
    } catch (error) {
      if (error instanceof DewatermarkError && error.kind === 'server' && [500, 503].includes(error.status ?? 0)) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
        return this.erase(jpeg, key);
      }
      throw error;
    }
  }

  private async erase(jpeg: Buffer, key: string): Promise<Buffer> {
    const form = new FormData();
    form.append('original_preview_image', new Blob([new Uint8Array(jpeg)], { type: 'image/jpeg' }), 'image.jpg');
    form.append('predict_mode', '3.0');

    let res: Response;
    try {
      res = await fetch(`${this.config.dewatermarkBaseUrl}${DEWATERMARK_ERASE_PATH}`, {
        method: 'POST',
        headers: { 'X-API-KEY': key },
        body: form,
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
    } catch (error) {
      throw new DewatermarkError('network', `Request failed: ${(error as Error).name}`);
    }

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new DewatermarkError(classifyDewatermarkStatus(res.status, text.slice(0, 2000)), `HTTP ${res.status}`, res.status);
    }

    let json: { edited_image?: { image?: string } };
    try {
      json = (await res.json()) as typeof json;
    } catch {
      throw new DewatermarkError('invalid_response', 'Response was not JSON');
    }
    return this.decodeImage(json?.edited_image?.image);
  }

  /** Decodes and validates the base64 payload (optional data-URI prefix tolerated). */
  decodeImage(value: string | undefined): Buffer {
    if (!value || typeof value !== 'string') throw new DewatermarkError('invalid_response', 'No image in response');
    const b64 = value.replace(/^data:image\/[a-z+.-]+;base64,/i, '').replace(/\s+/g, '');
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(b64)) throw new DewatermarkError('invalid_response', 'Image is not base64');
    const buf = Buffer.from(b64, 'base64');
    if (buf.length < 1024 || !sniffImageType(buf)) throw new DewatermarkError('invalid_response', 'Decoded data is not an image');
    return buf;
  }

  /** Best-effort remaining credits (`GET /api/creditInfo`); null when unavailable or in an unknown shape. */
  async getCredits(): Promise<number | null> {
    const key = this.config.dewatermarkApiKey;
    if (!key) return null;
    try {
      const res = await fetch(`${this.config.dewatermarkBaseUrl}${DEWATERMARK_CREDITS_PATH}`, {
        headers: { 'X-API-KEY': key },
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) return null;
      const body = (await res.json()) as Record<string, unknown>;
      return findCredits(body);
    } catch {
      return null;
    }
  }
}

/** Looks for a numeric credits field in a few plausible shapes. Exported for unit tests. */
export function findCredits(body: unknown, depth = 0): number | null {
  if (!body || typeof body !== 'object' || depth > 2) return null;
  const o = body as Record<string, unknown>;
  for (const k of ['credits', 'credit', 'remaining_credits', 'credit_balance', 'balance']) {
    const v = o[k];
    if (typeof v === 'number' && Number.isFinite(v)) return v;
    if (typeof v === 'string' && v.trim() !== '' && Number.isFinite(Number(v))) return Number(v);
  }
  for (const v of Object.values(o)) {
    const nested = findCredits(v, depth + 1);
    if (nested !== null) return nested;
  }
  return null;
}
