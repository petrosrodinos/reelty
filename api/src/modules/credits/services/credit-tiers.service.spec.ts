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
  it('accepts tiers that exactly cover the range with one default', () => {
    expect(
      tierCoverageProblems(
        [
          tier('Short', 3, 6),
          tier('Standard', 7, 9, true),
          tier('Long', 10, 12),
        ],
        3,
        12,
      ),
    ).toEqual([]);
  });

  it('flags gaps, overlaps, wrong ends and default count', () => {
    expect(
      tierCoverageProblems([tier('A', 3, 5), tier('B', 7, 12)], 3, 12),
    ).toEqual([
      'No tier covers 6-6 clips.',
      'Exactly one tier must be the default.',
    ]);
    expect(
      tierCoverageProblems([tier('A', 3, 7, true), tier('B', 7, 12)], 3, 12),
    ).toEqual(['"A" and "B" overlap.']);
    expect(tierCoverageProblems([tier('A', 4, 11, true)], 3, 12)).toEqual([
      'The first tier must start at 3 clips.',
      'The last tier must end at 12 clips.',
    ]);
    expect(
      tierCoverageProblems(
        [tier('A', 3, 12, true), tier('B', 12, 12, true)],
        3,
        12,
      ),
    ).toContain('Exactly one tier must be the default.');
  });

  it('requires at least one tier', () => {
    expect(tierCoverageProblems([], 3, 12)).toHaveLength(1);
  });
});
