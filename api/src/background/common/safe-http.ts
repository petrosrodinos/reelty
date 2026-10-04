import * as dns from 'dns';
import * as http from 'http';
import * as https from 'https';
import { createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { isBlockedIp, validateRemoteUrl } from './ssrf.utils';

export type SafeDownloadErrorCode =
  | 'blocked'
  | 'invalid_url'
  | 'too_many_redirects'
  | 'http_error'
  | 'bad_content_type'
  | 'too_large'
  | 'timeout'
  | 'network';

export class SafeDownloadError extends Error {
  constructor(
    readonly code: SafeDownloadErrorCode,
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'SafeDownloadError';
  }
}

export interface SafeDownloadOptions {
  maxBytes: number;
  /** Default 3 (spec §10.1). */
  maxRedirects?: number;
  /** Idle socket timeout, default 20 s. */
  idleTimeoutMs?: number;
  /** Whole-download deadline, default 60 s. */
  totalTimeoutMs?: number;
  /** Every Content-Type must start with one of these (e.g. ['image/']). Omit to accept anything. */
  contentTypePrefixes?: string[];
  headers?: Record<string, string>;
}

export interface SafeDownloadResult {
  contentType: string;
  /** URL after redirects. Do not log (may carry credentials in the query string). */
  finalUrl: string;
  bytes: number;
}

/**
 * `lookup` hook used for the actual connection: resolves the host ourselves and refuses to connect when
 * ANY resolved address is private/loopback/link-local. Because the connection uses the very addresses we
 * validated, DNS rebinding between "check" and "connect" is not possible.
 */
export function safeLookup(
  hostname: string,
  options: dns.LookupOptions,
  callback: (err: NodeJS.ErrnoException | null, address?: string | dns.LookupAddress[], family?: number) => void,
): void {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err);
    const list = addresses as dns.LookupAddress[];
    if (!list.length || list.some((a) => isBlockedIp(a.address))) {
      const blocked = new Error('Blocked address') as NodeJS.ErrnoException;
      blocked.code = 'ESSRF_BLOCKED';
      return callback(blocked);
    }
    if (options.all) return callback(null, list);
    return callback(null, list[0].address, list[0].family);
  });
}

type Sink = { kind: 'buffer' } | { kind: 'file'; path: string };

interface HopResult {
  contentType: string;
  bytes: number;
  buffer?: Buffer;
}

interface HopOutcome {
  redirectTo?: string;
  result?: HopResult;
}

async function download(
  rawUrl: string,
  opts: SafeDownloadOptions,
  sink: Sink,
): Promise<SafeDownloadResult & { buffer?: Buffer }> {
  const maxRedirects = opts.maxRedirects ?? 3;
  const deadline = Date.now() + (opts.totalTimeoutMs ?? 60_000);
  let current = rawUrl;

  // Every hop (the initial URL and each redirect target) is validated again.
  for (let hop = 0; hop <= maxRedirects; hop++) {
    const check = validateRemoteUrl(current);
    if (!check.ok) {
      // strictNullChecks is off, so the discriminated union is not narrowed automatically
      const reason = (check as { ok: false; reason: string }).reason;
      throw new SafeDownloadError(reason === 'invalid_url' ? 'invalid_url' : 'blocked', reason);
    }

    const remaining = deadline - Date.now();
    if (remaining <= 0) throw new SafeDownloadError('timeout', 'Download deadline exceeded');

    const outcome = await requestOnce(check.url, opts, sink, remaining);
    if (outcome.redirectTo) {
      current = new URL(outcome.redirectTo, check.url).toString();
      continue;
    }
    const r = outcome.result as HopResult;
    return { contentType: r.contentType, bytes: r.bytes, buffer: r.buffer, finalUrl: current };
  }
  throw new SafeDownloadError('too_many_redirects', `More than ${maxRedirects} redirects`);
}

function requestOnce(url: URL, opts: SafeDownloadOptions, sink: Sink, remainingMs: number): Promise<HopOutcome> {
  return new Promise<HopOutcome>((resolve, reject) => {
    const mod = url.protocol === 'https:' ? https : http;
    let settled = false;
    let deadlineTimer: NodeJS.Timeout | undefined;
    const done = (fn: () => void) => {
      if (settled) return;
      settled = true;
      if (deadlineTimer) clearTimeout(deadlineTimer);
      fn();
    };

    const req = mod.request(
      url,
      {
        method: 'GET',
        lookup: safeLookup as never,
        timeout: opts.idleTimeoutMs ?? 20_000,
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; ReeltyBot/1.0)',
          accept: 'image/avif,image/webp,image/*;q=0.8,*/*;q=0.5',
          'accept-encoding': 'identity',
          ...opts.headers,
        },
      },
      (res) => {
        const status = res.statusCode ?? 0;

        if (status >= 300 && status < 400 && res.headers.location) {
          res.resume();
          return done(() => resolve({ redirectTo: res.headers.location }));
        }
        if (status !== 200) {
          res.resume();
          return done(() => reject(new SafeDownloadError('http_error', `HTTP ${status}`, status)));
        }

        const contentType = String(res.headers['content-type'] ?? '').toLowerCase();
        const prefixes = opts.contentTypePrefixes;
        if (prefixes && !prefixes.some((p) => contentType.startsWith(p))) {
          res.resume();
          return done(() => reject(new SafeDownloadError('bad_content_type', 'Unexpected content type')));
        }
        const declared = Number(res.headers['content-length']);
        if (Number.isFinite(declared) && declared > opts.maxBytes) {
          res.resume();
          return done(() => reject(new SafeDownloadError('too_large', 'Declared size exceeds the limit')));
        }

        let received = 0;
        const chunks: Buffer[] = [];
        const file = sink.kind === 'file' ? createWriteStream(sink.path) : null;
        let aborted = false;

        const abort = (err: SafeDownloadError) => {
          if (aborted) return;
          aborted = true;
          res.destroy();
          if (file && sink.kind === 'file') {
            file.destroy();
            unlink(sink.path).catch(() => undefined);
          }
          done(() => reject(err));
        };

        res.on('data', (chunk: Buffer) => {
          received += chunk.length;
          if (received > opts.maxBytes) return abort(new SafeDownloadError('too_large', 'Size exceeds the limit'));
          if (file) file.write(chunk);
          else chunks.push(chunk);
        });
        res.on('error', (e) => abort(new SafeDownloadError('network', e.message)));
        res.on('aborted', () => abort(new SafeDownloadError('network', 'Connection aborted')));
        res.on('end', () => {
          if (aborted) return;
          if (file) {
            file.end(() => done(() => resolve({ result: { contentType, bytes: received } })));
          } else {
            done(() => resolve({ result: { contentType, bytes: received, buffer: Buffer.concat(chunks) } }));
          }
        });
      },
    );

    deadlineTimer = setTimeout(() => {
      req.destroy();
      done(() => reject(new SafeDownloadError('timeout', 'Download deadline exceeded')));
    }, remainingMs);

    req.on('timeout', () => {
      req.destroy();
      done(() => reject(new SafeDownloadError('timeout', 'Connection timed out')));
    });
    req.on('error', (e: NodeJS.ErrnoException) => {
      if (e.code === 'ESSRF_BLOCKED') return done(() => reject(new SafeDownloadError('blocked', 'blocked_address')));
      done(() => reject(new SafeDownloadError('network', e.code ?? e.message)));
    });
    req.end();
  });
}

/** SSRF-safe download into memory. */
export async function safeDownloadBuffer(
  url: string,
  opts: SafeDownloadOptions,
): Promise<SafeDownloadResult & { buffer: Buffer }> {
  const r = await download(url, opts, { kind: 'buffer' });
  return { ...r, buffer: r.buffer as Buffer };
}

/** SSRF-safe download into a file (deleted again when the download fails). */
export async function safeDownloadToFile(
  url: string,
  destFile: string,
  opts: SafeDownloadOptions,
): Promise<SafeDownloadResult> {
  const r = await download(url, opts, { kind: 'file', path: destFile });
  return { contentType: r.contentType, bytes: r.bytes, finalUrl: r.finalUrl };
}
