import type { AnalyticsRange } from '../dto/analytics-query.schema';
import type { AnalyticsBucket } from '../interfaces/analytics.interface';

const DAY_MS = 24 * 60 * 60 * 1000;

const startOfUtcDay = (d: Date) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

/** Start of the bucket `d` falls in (UTC; weeks start on Monday). */
export function bucketStart(d: Date, bucket: AnalyticsBucket): Date {
  if (bucket === 'month')
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
  const day = startOfUtcDay(d);
  if (bucket === 'week') {
    const sinceMonday = (day.getUTCDay() + 6) % 7;
    return new Date(day.getTime() - sinceMonday * DAY_MS);
  }
  return day;
}

/** YYYY-MM-DD of the bucket start. */
export function bucketKey(d: Date, bucket: AnalyticsBucket): string {
  return bucketStart(d, bucket).toISOString().slice(0, 10);
}

function nextBucket(d: Date, bucket: AnalyticsBucket): Date {
  if (bucket === 'month')
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
  return new Date(d.getTime() + (bucket === 'week' ? 7 : 1) * DAY_MS);
}

/** Every bucket key from `from` up to (not including) `to`, so empty periods still show as zero. */
export function bucketKeys(
  from: Date,
  to: Date,
  bucket: AnalyticsBucket,
): string[] {
  const keys: string[] = [];
  for (
    let d = bucketStart(from, bucket);
    d.getTime() < to.getTime();
    d = nextBucket(d, bucket)
  ) {
    keys.push(d.toISOString().slice(0, 10));
  }
  return keys;
}

export interface AnalyticsWindow {
  from: Date;
  to: Date;
  bucket: AnalyticsBucket;
}

/**
 * The window a range covers, ending now. The start is aligned to its bucket so the first bar is a
 * whole period. `earliest` (first signup) bounds "all"; without it "all" falls back to 12 months.
 */
export function analyticsWindow(
  range: AnalyticsRange,
  now: Date,
  earliest: Date | null,
): AnalyticsWindow {
  const daysBack = (days: number) =>
    new Date(startOfUtcDay(now).getTime() - (days - 1) * DAY_MS);
  const monthsBack = (months: number) =>
    new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - months + 1, 1));

  switch (range) {
    case '7d':
      return { from: daysBack(7), to: now, bucket: 'day' };
    case '30d':
      return { from: daysBack(30), to: now, bucket: 'day' };
    case '90d':
      return {
        from: bucketStart(daysBack(90), 'week'),
        to: now,
        bucket: 'week',
      };
    case '12m':
      return { from: monthsBack(12), to: now, bucket: 'month' };
    case 'all': {
      const from = earliest ? bucketStart(earliest, 'month') : monthsBack(12);
      return { from, to: now, bucket: 'month' };
    }
  }
}

/** a / b rounded to 2 decimals, or null when b is 0. */
export function ratio(a: number, b: number): number | null {
  return b > 0 ? Math.round((a / b) * 100) / 100 : null;
}

/** a / b as a percentage with 2 decimals, or null when b is 0. */
export function percent(a: number, b: number): number | null {
  return b > 0 ? Math.round((a / b) * 10000) / 100 : null;
}
