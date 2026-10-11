import { Injectable } from '@nestjs/common';
import { ApifyService } from '@/integrations/apify/apify.service';
import { DewatermarkService } from '@/integrations/dewatermark/dewatermark.service';
import { HiggsfieldProvider } from '@/integrations/video-generation/higgsfield/higgsfield.provider';

export type ProviderStatus = 'ok' | 'not_configured' | 'unavailable';
export type ProviderMetricUnit = 'usd' | 'credits' | 'count';

export interface ProviderMetric {
  label: string;
  value: number;
  unit: ProviderMetricUnit;
  /** Cap for the value (e.g. monthly spend limit); null when there is none. */
  limit: number | null;
  /** Whether a high value is good (remaining balance) or bad (usage against a cap). */
  kind: 'remaining' | 'used';
}

export interface ProviderBalance {
  key: 'higgsfield' | 'apify' | 'dewatermark';
  name: string;
  status: ProviderStatus;
  metrics: ProviderMetric[];
  note: string | null;
  /** Billing cycle end for usage-capped providers. */
  resets_at: string | null;
}

/** Live balances / usage caps straight from each provider's own API. Each lookup fails independently. */
@Injectable()
export class ProviderBalancesService {
  constructor(
    private readonly higgsfield: HiggsfieldProvider,
    private readonly apify: ApifyService,
    private readonly dewatermark: DewatermarkService,
  ) {}

  async getAll(): Promise<ProviderBalance[]> {
    return Promise.all([this.getHiggsfield(), this.getApify(), this.getDewatermark()]);
  }

  private async getHiggsfield(): Promise<ProviderBalance> {
    const base = { key: 'higgsfield' as const, name: 'Higgsfield', metrics: [], resets_at: null };
    if (!this.higgsfield.isConfigured()) return { ...base, status: 'not_configured', note: 'HIGGSFIELD_API_KEY is not set.' };
    const balance = await this.higgsfield.getBalance().catch(() => null);
    if (balance === null) {
      return {
        ...base,
        status: 'unavailable',
        note: 'Higgsfield has no balance API. Check the remaining credits in the Higgsfield dashboard; renders fail fast when it runs out.',
      };
    }
    return { ...base, status: 'ok', note: null, metrics: [{ label: 'Credits left', value: balance, unit: 'credits', limit: null, kind: 'remaining' }] };
  }

  private async getApify(): Promise<ProviderBalance> {
    const base = { key: 'apify' as const, name: 'Apify', metrics: [], resets_at: null };
    if (!this.apify.isConfigured()) return { ...base, status: 'not_configured', note: 'APIFY_TOKEN is not set.' };
    const account = await this.apify.getAccountLimits();
    if (!account) return { ...base, status: 'unavailable', note: 'Could not read the Apify account limits.' };
    const { limits, current } = account;
    return {
      ...base,
      status: 'ok',
      note: null,
      resets_at: account.monthlyUsageCycle.endAt,
      metrics: [
        { label: 'Monthly usage', value: current.monthlyUsageUsd, unit: 'usd', limit: limits.maxMonthlyUsageUsd, kind: 'used' },
        { label: 'Running jobs', value: current.activeActorJobCount, unit: 'count', limit: limits.maxConcurrentActorJobs, kind: 'used' },
      ],
    };
  }

  private async getDewatermark(): Promise<ProviderBalance> {
    const base = { key: 'dewatermark' as const, name: 'Dewatermark', metrics: [], resets_at: null };
    if (!this.dewatermark.isConfigured()) return { ...base, status: 'not_configured', note: 'DEWATERMARK_API_KEY is not set.' };
    const credits = await this.dewatermark.getCredits();
    if (credits === null) return { ...base, status: 'unavailable', note: 'Could not read the Dewatermark credits.' };
    return { ...base, status: 'ok', note: null, metrics: [{ label: 'Credits left', value: credits, unit: 'credits', limit: null, kind: 'remaining' }] };
  }
}
