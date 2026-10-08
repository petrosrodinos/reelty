import { priceCents, purchaseFigures } from './billing.service';

describe('priceCents', () => {
  it('prices credits from credits_per_eur, rounded to the cent', () => {
    expect(priceCents(15, 1)).toBe(1500);
    expect(priceCents(15, 2)).toBe(750);
    expect(priceCents(10, 3)).toBe(333);
  });
});

describe('purchaseFigures', () => {
  it('computes net, fee % and USD columns', () => {
    expect(purchaseFigures(1500, 48, 1.08)).toEqual({
      stripe_fee_eur_cents: 48,
      net_eur_cents: 1452,
      stripe_fee_pct: 3.2,
      usd_per_eur: 1.08,
      amount_usd_cents: 1620,
      stripe_fee_usd_cents: 52,
      net_usd_cents: 1568,
    });
  });

  it('leaves fee-derived fields empty until the fee is known', () => {
    const f = purchaseFigures(1500, null, 1.1);
    expect(f.stripe_fee_eur_cents).toBeNull();
    expect(f.net_eur_cents).toBeNull();
    expect(f.amount_usd_cents).toBe(1650);
  });
});
