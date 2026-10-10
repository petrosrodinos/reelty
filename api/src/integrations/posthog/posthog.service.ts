import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostHog } from 'posthog-node';

export interface ServerEvent {
  /** The user id, so server events join the browser events identified with the same id. */
  distinctId: string;
  event: string;
  properties?: Record<string, unknown>;
}

/** Server-side PostHog capture for facts the browser cannot know (e.g. paid amounts). A no-op without a key. */
@Injectable()
export class PosthogService implements OnModuleDestroy {
  private readonly logger = new Logger(PosthogService.name);
  private client: PostHog | null = null;

  constructor(private readonly config: ConfigService) {}

  private getClient(): PostHog | null {
    if (this.client) return this.client;
    const key = this.config.get<string>('POSTHOG_KEY');
    if (!key) return null;
    this.client = new PostHog(key, {
      host: this.config.get<string>('POSTHOG_HOST') ?? 'https://eu.i.posthog.com',
    });
    return this.client;
  }

  /** Fire and forget: analytics must never break a payment flow. */
  capture({ distinctId, event, properties }: ServerEvent): void {
    try {
      this.getClient()?.capture({ distinctId, event, properties });
    } catch (error) {
      this.logger.warn(`PostHog capture "${event}" failed: ${(error as Error).message}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.client?.shutdown().catch(() => undefined);
  }
}
