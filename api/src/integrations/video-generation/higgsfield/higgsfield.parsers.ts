// Pure, tolerant parsers for Higgsfield responses (shapes are an assumption, see higgsfield.config.ts).
import type { ClipJobState, ClipJobStatus } from '../video-generation.provider';

const asRecord = (v: unknown): Record<string, unknown> =>
  v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {};

const firstString = (o: Record<string, unknown>, keys: string[]): string | undefined => {
  for (const k of keys) {
    const v = o[k];
    if (typeof v === 'string' && v) return v;
    if (typeof v === 'number') return String(v);
  }
  return undefined;
};

const firstNumber = (o: Record<string, unknown>, keys: string[]): number | undefined => {
  for (const k of keys) {
    const v = o[k];
    if (typeof v === 'number' && Number.isFinite(v)) return v;
    if (typeof v === 'string' && v.trim() !== '' && Number.isFinite(Number(v))) return Number(v);
  }
  return undefined;
};

/** Unwraps `{ data: {...} }` envelopes. */
const unwrap = (json: unknown): Record<string, unknown> => {
  const o = asRecord(json);
  return o.data && typeof o.data === 'object' && !Array.isArray(o.data) ? asRecord(o.data) : o;
};

export function parseMediaId(json: unknown): string | undefined {
  const o = unwrap(json);
  return firstString(o, ['media_id', 'mediaId', 'id']);
}

export function parseCredits(json: unknown): number | undefined {
  const o = unwrap(json);
  return firstNumber(o, ['credits', 'cost', 'credit_cost', 'price', 'balance', 'available_credits']);
}

export function parseBalance(json: unknown): number | null {
  const o = unwrap(json);
  return firstNumber(o, ['balance', 'credits', 'available_credits', 'remaining']) ?? null;
}

export const OUT_OF_CREDITS = /out of credits|insufficient credits|not enough credits|no credits|credit.*(exhaust|insufficient)/i;

export function looksLikeOutOfCredits(text: string | undefined): boolean {
  return !!text && OUT_OF_CREDITS.test(text);
}

export interface ParsedBatchItem {
  index?: number;
  jobId?: string;
  error?: string;
}

export function parseBatchResults(json: unknown): ParsedBatchItem[] {
  const o = asRecord(json);
  const root = unwrap(json);
  const list = [root.results, root.jobs, root.requests, o.results, o.jobs, Array.isArray(json) ? json : undefined].find(
    (v) => Array.isArray(v),
  ) as unknown[] | undefined;
  return (list ?? []).map((raw) => {
    const item = asRecord(raw);
    const err = item.error;
    return {
      index: firstNumber(item, ['index']),
      jobId: firstString(item, ['job_id', 'jobId', 'id']),
      error:
        typeof err === 'string'
          ? err
          : err && typeof err === 'object'
            ? firstString(asRecord(err), ['message', 'code'])
            : firstString(item, ['message']),
    };
  });
}

export function mapJobStatus(raw: string | undefined): ClipJobStatus {
  const s = (raw ?? '').toLowerCase();
  if (['completed', 'complete', 'succeeded', 'success', 'done', 'finished'].includes(s)) return 'completed';
  if (['nsfw', 'moderation_failed', 'content_policy', 'blocked'].includes(s)) return 'nsfw';
  if (['failed', 'error', 'canceled', 'cancelled', 'expired', 'rejected'].includes(s)) return 'failed';
  return 'processing';
}

export function parseJobStates(json: unknown): ClipJobState[] {
  const root = unwrap(json);
  const list = [root.jobs, root.results, Array.isArray(json) ? json : undefined].find((v) => Array.isArray(v)) as
    | unknown[]
    | undefined;
  const out: ClipJobState[] = [];
  for (const raw of list ?? []) {
    const item = asRecord(raw);
    const jobId = firstString(item, ['job_id', 'jobId', 'id']);
    if (!jobId) continue;
    const result = asRecord(item.result);
    const err = item.error;
    out.push({
      jobId,
      status: mapJobStatus(firstString(item, ['status', 'state'])),
      resultUrl: firstString(item, ['result_url', 'resultUrl', 'url']) ?? firstString(result, ['url', 'result_url']),
      errorMessage:
        typeof err === 'string' ? err : err && typeof err === 'object' ? firstString(asRecord(err), ['message']) : undefined,
    });
  }
  return out;
}
