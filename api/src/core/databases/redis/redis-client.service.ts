import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import Redis, { type RedisOptions } from 'ioredis';
import { REDIS_OPTIONS } from './redis.constants';

/**
 * Short-timeout ioredis client for lightweight counters (rate limiting).
 * `client` is null when REDIS_URL is not configured; callers must fall back to memory.
 * It never blocks requests for long: commands time out quickly and fail fast.
 */
@Injectable()
export class RedisClientService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisClientService.name);
  readonly client: Redis | null;
  private lastErrorLog = 0;

  constructor(@Inject(REDIS_OPTIONS) options: RedisOptions | null) {
    if (!options) {
      this.client = null;
      return;
    }

    this.client = new Redis({
      ...options,
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      commandTimeout: 1500,
      connectTimeout: 3000,
    });
    this.client.on('error', (error: Error) => {
      const now = Date.now();
      if (now - this.lastErrorLog > 60_000) {
        this.lastErrorLog = now;
        this.logger.warn(`Redis client error: ${error.message}`);
      }
    });
  }

  async onModuleDestroy() {
    if (this.client) {
      try {
        await this.client.quit();
      } catch {
        this.client.disconnect();
      }
    }
  }
}
