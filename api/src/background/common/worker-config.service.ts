import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Limits } from '@/core/queues/queues.constants';

export type VideoProviderName = 'local' | 'higgsfield';

/** Typed access to the env values the workers need (all optional provider keys degrade gracefully). */
@Injectable()
export class WorkerConfigService {
  constructor(private readonly config: ConfigService) {}

  private str(key: string): string | undefined {
    const v = this.config.get<string>(key);
    return v ? v : undefined;
  }

  private num(key: string, fallback: number): number {
    const raw = this.config.get<string | number>(key);
    const n = raw === undefined || raw === '' ? NaN : Number(raw);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  }

  get nodeEnv(): string {
    return this.str('NODE_ENV') ?? 'local';
  }
  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }
  get appUrl(): string {
    return (this.str('APP_URL') ?? 'http://localhost:3001').replace(/\/+$/, '');
  }

  get apifyToken(): string | undefined {
    return this.str('APIFY_TOKEN');
  }
  get apifyWebsiteActorId(): string {
    return this.str('APIFY_WEBSITE_ACTOR_ID') ?? 'apify/web-scraper';
  }
  get apifyAirbnbActorId(): string {
    return this.str('APIFY_AIRBNB_ACTOR_ID') ?? 'tri_angle/airbnb-rooms-urls-scraper';
  }

  get dewatermarkApiKey(): string | undefined {
    return this.str('DEWATERMARK_API_KEY');
  }
  get dewatermarkBaseUrl(): string {
    return (this.str('DEWATERMARK_API_BASE_URL') ?? 'https://platform.dewatermark.ai').replace(/\/+$/, '');
  }

  get higgsfieldApiKey(): string | undefined {
    return this.str('HIGGSFIELD_API_KEY');
  }
  get higgsfieldBaseUrl(): string | undefined {
    return this.str('HIGGSFIELD_API_BASE_URL');
  }
  /** Per-clip credit ceiling for the cost preflight. */
  get higgsfieldMaxClipCredits(): number {
    return this.num('HIGGSFIELD_MAX_CLIP_CREDITS', 15);
  }

  /** Explicit VIDEO_PROVIDER, else higgsfield when a key is configured, else local. */
  get videoProvider(): VideoProviderName {
    const explicit = this.str('VIDEO_PROVIDER');
    if (explicit === 'local' || explicit === 'higgsfield') return explicit;
    return this.higgsfieldApiKey ? 'higgsfield' : 'local';
  }

  get minImages(): number {
    return this.num('MIN_IMAGES', Limits.MIN_IMAGES);
  }
  get maxImages(): number {
    return this.num('MAX_IMAGES', Limits.MAX_IMAGES);
  }

  get resendApiKey(): string | undefined {
    return this.str('RESEND_API_KEY');
  }
  get resendFrom(): string {
    return this.str('RESEND_FROM') ?? 'Reelty <onboarding@resend.dev>';
  }
}
