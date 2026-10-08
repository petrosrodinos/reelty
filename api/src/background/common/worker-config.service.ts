import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { appConfig } from '@/shared/config/app';

export type VideoProviderName = 'local' | 'higgsfield';

/** Typed access to the env values the workers need (all optional provider keys degrade gracefully). */
@Injectable()
export class WorkerConfigService {
  constructor(private readonly config: ConfigService) {}

  private str(key: string): string | undefined {
    const v = this.config.get<string>(key);
    return v ? v : undefined;
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
    return appConfig.apify.websiteActorId;
  }
  get apifyAirbnbActorId(): string {
    return appConfig.apify.airbnbActorId;
  }

  get dewatermarkApiKey(): string | undefined {
    return this.str('DEWATERMARK_API_KEY');
  }
  get dewatermarkBaseUrl(): string {
    return appConfig.dewatermark.baseUrl;
  }

  get higgsfieldApiKey(): string | undefined {
    return this.str('HIGGSFIELD_API_KEY');
  }
  get higgsfieldBaseUrl(): string {
    return appConfig.higgsfield.baseUrl;
  }
  /** Per-clip credit ceiling for the cost preflight. */
  get higgsfieldMaxClipCredits(): number {
    return appConfig.higgsfield.maxClipCredits;
  }

  /** Explicit appConfig.videoProvider, else higgsfield when a key is configured, else local. */
  get videoProvider(): VideoProviderName {
    const explicit = appConfig.videoProvider;
    if (explicit === 'local' || explicit === 'higgsfield') return explicit;
    return this.higgsfieldApiKey ? 'higgsfield' : 'local';
  }

  get minImages(): number {
    return appConfig.limits.minImages;
  }

  get resendApiKey(): string | undefined {
    return this.str('RESEND_API_KEY');
  }
}
