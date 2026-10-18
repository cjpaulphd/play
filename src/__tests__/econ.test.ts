import { describe, expect, it } from 'vitest';
import { annuityFactor, capitalRecoveryFactor, econInputs, evaluate, formatMoney, tornado } from '../lib/econ';
import { rollAssignment } from '../lib/assignment';

describe('discounting arithmetic', () => {
  it('annuity factor matches closed form and limits', () => {
    expect(annuityFactor(0.07, 10)).toBeCloseTo(7.0236, 4);
    expect(annuityFactor(0.03, 10)).toBeCloseTo(8.5302, 4);
    expect(annuityFactor(0, 10)).toBe(10);
    expect(capitalRecoveryFactor(0.07, 10) * annuityFactor(0.07, 10)).toBeCloseTo(1, 10);
  });

  it('evaluates a simple project correctly', () => {
    // $100M up front, $0 recurring, $20M/yr benefits for 10 years at 7%
    const r = evaluate({ upfront: 100, annualCost: 0, annualBenefit: 20, horizon: 10 }, 0.07);
    expect(r.pvBenefits).toBeCloseTo(140.4716, 3);
    expect(r.npv).toBeCloseTo(40.4716, 3);
    expect(r.bcr).toBeCloseTo(1.4047, 3);
    expect(r.annualizedCosts).toBeCloseTo(100 * capitalRecoveryFactor(0.07, 10), 8);
  });

  it('higher discount rates lower NPV when costs come first', () => {
    const x = { upfront: 100, annualCost: 2, annualBenefit: 18, horizon: 10 };
    expect(evaluate(x, 0.02).npv).toBeGreaterThan(evaluate(x, 0.03).npv);
    expect(evaluate(x, 0.03).npv).toBeGreaterThan(evaluate(x, 0.07).npv);
  });
});

describe('fictional inputs', () => {
  it('are deterministic per case and well-formed', () => {
    const a = rollAssignment('ppd');
    expect(econInputs(a)).toEqual(econInputs(a));
    const x = econInputs(a);
    expect(x.upfront).toBeGreaterThan(0);
    expect(x.annualBenefit).toBeGreaterThan(0);
    expect(x.absurdParam).not.toMatch(/\{/);
  });

  it('tornado rows bracket the base case for real parameters', () => {
    const x = econInputs(rollAssignment('chaos'));
    const base = evaluate(x, 0.07).npv;
    for (const row of tornado(x, 0.07)) {
      expect(Math.min(row.low, row.high)).toBeLessThanOrEqual(base + 1e-9);
      expect(Math.max(row.low, row.high)).toBeGreaterThanOrEqual(base - 1e-9);
    }
  });

  it('formats money', () => {
    expect(formatMoney(1234)).toBe('$1.23 billion');
    expect(formatMoney(-2.5)).toBe('−$2.5 million');
    expect(formatMoney(0.25)).toBe('$250 thousand');
  });
});
