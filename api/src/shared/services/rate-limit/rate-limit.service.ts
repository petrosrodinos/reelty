import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { RedisClientService } from '@/core/databases/redis/redis-client.service';

interface MemoryEntry {
  count: number;
  expiresAt: number;
}

/**
 * Fixed-window counters. Redis-backed when REDIS_URL is set (shared across instances),
 * with an in-memory fallback when Redis is not configured or temporarily unreachable.
 */
@Injectable()
export class RateLimitService implements OnModuleDestroy {
  private readonly logger = new Logger(RateLimitService.name);
  private readonly memory = new Map<string, MemoryEntry>();
  private readonly sweeper: NodeJS.Timeout;

  constructor(private readonly redis: RedisClientService) {
    this.sweeper = setInterval(() => this.sweep(), 60_000);
    this.sweeper.unref();
  }

  onModuleDestroy() {
    clearInterval(this.sweeper);
  }

  /** Increments the counter and returns the new value. The window starts at the first hit. */
  async hit(key: string, windowSeconds: number): Promise<number> {
    const client = this.redis.client;
    if (client) {
      try {
        await client.set(key, 0, 'EX', windowSeconds, 'NX');
        return await client.incr(key);
      } catch (error) {
        this.logger.warn(`Redis rate limit unavailable, using memory (${(error as Error).message})`);
      }
    }
    return this.memoryHit(key, windowSeconds);
  }

  /** Current counter value without incrementing. */
  async get(key: string): Promise<number> {
    const client = this.redis.client;
    if (client) {
      try {
        const value = await client.get(key);
        return value ? Number(value) : 0;
      } catch {
        // fall through to memory
      }
    }
    const entry = this.memory.get(key);
    return entry && entry.expiresAt > Date.now() ? entry.count : 0;
  }

  async reset(key: string): Promise<void> {
    this.memory.delete(key);
    const client = this.redis.client;
    if (client) {
      try {
        await client.del(key);
      } catch {
        // ignore
      }
    }
  }

  private memoryHit(key: string, windowSeconds: number): number {
    const now = Date.now();
    const entry = this.memory.get(key);
    if (!entry || entry.expiresAt <= now) {
      this.memory.set(key, { count: 1, expiresAt: now + windowSeconds * 1000 });
      return 1;
    }
    entry.count += 1;
    return entry.count;
  }

  private sweep() {
    const now = Date.now();
    for (const [key, entry] of this.memory) {
      if (entry.expiresAt <= now) this.memory.delete(key);
    }
  }
}
