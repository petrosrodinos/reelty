import { tierCoverageProblems } from './credit-tiers.service';

const tier = (
  name: string,
  min_clips: number,
  max_clips: number,
  is_default = false,
) => ({
  name,
  min_clips,
  max_clips,
  credits: 1,
  is_default,
});

describe('tierCoverageProblems', () => {
  it('accepts contiguous tiers with one default', () => {
    expect(
      tierCoverageProblems(
        [
          tier('Short', 3, 6),
          tier('Standard', 7, 9, true),
          tier('Long', 10, 12),
        ],
        3,
        100,
      ),
    ).toEqual([]);
  });

  it('lets the tiers set the range (more photos, higher start)', () => {
    expect(
      tierCoverageProblems([tier('A', 5, 20, true), tier('B', 21, 40)], 3, 100),
    ).toEqual([]);
  });

  it('flags gaps, overlaps, floor, ceiling and default count', () => {
    expect(
      tierCoverageProblems([tier('A', 3, 5), tier('B', 7, 12)], 3, 100),
    ).toEqual([
      'No tier covers 6-6 clips.',
      'Exactly one tier must be the default.',
    ]);
    expect(
      tierCoverageProblems([tier('A', 3, 7, true), tier('B', 7, 12)], 3, 100),
    ).toEqual(['"A" and "B" overlap.']);
    expect(tierCoverageProblems([tier('A', 2, 101, true)], 3, 100)).toEqual([
      'The first tier must start at 3 photos or more.',
      'The last tier can go up to 100 photos at most.',
    ]);
  });

  it('requires at least one tier', () => {
    expect(tierCoverageProblems([], 3, 100)).toHaveLength(1);
  });
});
