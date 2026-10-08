import { Injectable, Logger } from '@nestjs/common';
import { ApifyClient } from 'apify-client';
import { WorkerConfigService } from '@/background/common/worker-config.service';

export type ApifyFailureKind = 'not_configured' | 'run_failed' | 'timeout';

export class ApifyError extends Error {
  constructor(
    readonly kind: ApifyFailureKind,
    message: string,
  ) {
    super(message);
    this.name = 'ApifyError';
  }
}

export interface ApifyRunOptions {
  /** Hard timeout for the whole run (spec §10.1: 10 minutes). */
  timeoutMs?: number;
  pollIntervalMs?: number;
  maxItems?: number;
}

export interface ApifyRunResult<T> {
  runId: string;
  items: T[];
  /** Platform usage in USD as reported by Apify (null when unknown). */
  usageUsd: number | null;
}

const TERMINAL_OK = 'SUCCEEDED';
const TERMINAL_BAD = new Set(['FAILED', 'ABORTED', 'TIMED-OUT']);
const USAGE_SETTLE_INTERVAL_MS = 3_000;
const USAGE_SETTLE_MAX_READS = 5;

/** Thin wrapper around apify-client: `start` + poll (no blocking `call`) with a hard timeout. */
@Injectable()
export class ApifyService {
  private readonly logger = new Logger(ApifyService.name);
  private client: ApifyClient | null = null;

  constructor(private readonly config: WorkerConfigService) {}

  isConfigured(): boolean {
    return !!this.config.apifyToken;
  }

  private getClient(): ApifyClient {
    const token = this.config.apifyToken;
    if (!token) throw new ApifyError('not_configured', 'APIFY_TOKEN is not configured');
    if (!this.client) this.client = new ApifyClient({ token });
    return this.client;
  }

  async runActor<T = Record<string, unknown>>(
    actorId: string,
    input: Record<string, unknown>,
    opts: ApifyRunOptions = {},
  ): Promise<ApifyRunResult<T>> {
    const client = this.getClient();
    const timeoutMs = opts.timeoutMs ?? 10 * 60 * 1000;
    const pollMs = opts.pollIntervalMs ?? 5_000;
    const deadline = Date.now() + timeoutMs;

    let run = await client.actor(actorId).start(input, { timeout: Math.ceil(timeoutMs / 1000) });
    const runId = run.id;
    this.logger.log(`Apify run ${runId} started (${actorId})`);

    while (run.status !== TERMINAL_OK) {
      if (TERMINAL_BAD.has(run.status)) {
        throw new ApifyError('run_failed', `Apify run ${runId} ended with status ${run.status}`);
      }
      if (Date.now() >= deadline) {
        await client.run(runId).abort().catch(() => undefined);
        throw new ApifyError('timeout', `Apify run ${runId} exceeded ${Math.round(timeoutMs / 1000)} s`);
      }
      await new Promise((r) => setTimeout(r, pollMs));
      const latest = await client.run(runId).get();
      if (!latest) throw new ApifyError('run_failed', `Apify run ${runId} disappeared`);
      run = latest;
    }

    const { items } = await client.dataset(run.defaultDatasetId).listItems({ limit: opts.maxItems ?? 50 });
    const usageUsd = await this.settledUsage(client, runId, run.usageTotalUsd);
    return { runId, items: items as T[], usageUsd };
  }

  /**
   * Apify finalizes `usageTotalUsd` (and pay-per-event charges) a little after the run reports SUCCEEDED,
   * so the first read undercounts. Re-read until two consecutive values match; best effort, never throws.
   */
  private async settledUsage(client: ApifyClient, runId: string, initial: unknown): Promise<number | null> {
    let last = typeof initial === 'number' ? initial : null;
    for (let i = 0; i < USAGE_SETTLE_MAX_READS; i++) {
      await new Promise((r) => setTimeout(r, USAGE_SETTLE_INTERVAL_MS));
      try {
        const latest = await client.run(runId).get();
        const next = typeof latest?.usageTotalUsd === 'number' ? latest.usageTotalUsd : null;
        if (next !== null && next === last) return next;
        if (next !== null) last = next;
      } catch (error) {
        this.logger.warn(`Could not re-read usage for Apify run ${runId}: ${(error as Error).message}`);
        break;
      }
    }
    return last;
  }
}
