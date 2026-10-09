import {
  analyticsWindow,
  bucketKey,
  bucketKeys,
  percent,
  ratio,
} from './analytics.utils';

describe('analytics utils', () => {
  const now = new Date('2026-10-09T15:30:00Z'); // a Friday

  it('keys buckets by their UTC start, weeks starting Monday', () => {
    expect(bucketKey(now, 'day')).toBe('2026-10-09');
    expect(bucketKey(now, 'week')).toBe('2026-10-05');
    expect(bucketKey(now, 'month')).toBe('2026-10-01');
    // Sunday belongs to the week that started the Monday before.
    expect(bucketKey(new Date('2026-10-11T23:59:00Z'), 'week')).toBe(
      '2026-10-05',
    );
  });

  it('lists every bucket in the window, including empty ones', () => {
    const { from, to, bucket } = analyticsWindow('7d', now, null);
    const keys = bucketKeys(from, to, bucket);
    expect(keys).toHaveLength(7);
    expect(keys[0]).toBe('2026-10-03');
    expect(keys[6]).toBe('2026-10-09');
  });

  it('uses whole months for 12m and starts "all" at the first signup month', () => {
    const year = analyticsWindow('12m', now, null);
    expect(bucketKeys(year.from, year.to, year.bucket)).toHaveLength(12);
    expect(year.from.toISOString().slice(0, 10)).toBe('2025-11-01');

    const all = analyticsWindow('all', now, new Date('2026-06-17T08:00:00Z'));
    expect(bucketKeys(all.from, all.to, all.bucket)).toEqual([
      '2026-06-01',
      '2026-07-01',
      '2026-08-01',
      '2026-09-01',
      '2026-10-01',
    ]);
  });

  it('aligns 90d to whole weeks', () => {
    const { from, bucket } = analyticsWindow('90d', now, null);
    expect(bucket).toBe('week');
    expect(from.getUTCDay()).toBe(1);
  });

  it('returns null ratios when the denominator is 0', () => {
    expect(ratio(10, 4)).toBe(2.5);
    expect(ratio(1, 0)).toBeNull();
    expect(percent(1, 3)).toBe(33.33);
    expect(percent(1, 0)).toBeNull();
  });
});
