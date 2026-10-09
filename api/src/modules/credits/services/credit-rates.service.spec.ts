import { rateFor, rateTierProblems } from './credit-rates.service';

const tiers = [
  { min_eur: 20, credits_per_eur: 4 },
  { min_eur: 50, credits_per_eur: 5 },
];

describe('rateFor', () => {
  it('uses the base rate below the first tier', () => {
    expect(rateFor(30, 3, tiers)).toBe(3);
    expect(rateFor(79, 3, tiers)).toBe(3);
    expect(rateFor(500, 3, [])).toBe(3);
  });

  it('applies a tier once the purchase costs its amount at that rate', () => {
    expect(rateFor(80, 3, tiers)).toBe(4); // €20 at 4 per €1
    expect(rateFor(249, 3, tiers)).toBe(4);
    expect(rateFor(250, 3, tiers)).toBe(5); // €50 at 5 per €1
  });
});

describe('rateTierProblems', () => {
  it('accepts rising rates above the base, and no tiers', () => {
    expect(rateTierProblems(tiers, 3)).toEqual([]);
    expect(rateTierProblems([], 3)).toEqual([]);
  });

  it('rejects a rate that does not beat the base', () => {
    expect(
      rateTierProblems([{ min_eur: 20, credits_per_eur: 3 }], 3),
    ).toHaveLength(1);
  });

  it('rejects duplicate amounts and rates that do not rise', () => {
    expect(
      rateTierProblems(
        [
          { min_eur: 20, credits_per_eur: 4 },
          { min_eur: 20, credits_per_eur: 5 },
        ],
        3,
      ),
    ).toHaveLength(1);
    expect(
      rateTierProblems(
        [
          { min_eur: 50, credits_per_eur: 4 },
          { min_eur: 20, credits_per_eur: 5 },
        ],
        3,
      ),
    ).toHaveLength(1);
  });
});
