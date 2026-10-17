import type { Assignment } from '../types';

/**
 * PPD Economic Analysis Addendum — a fictional regulatory impact analysis.
 *
 * Every input is invented (seeded from the case so it is stable), but the
 * arithmetic is real: present values, annualization with a capital recovery
 * factor, net benefits, benefit-cost ratios and a one-at-a-time sensitivity
 * ("tornado") analysis.
 */

export const DISCOUNT_RATES = [0.02, 0.03, 0.07] as const;
export type DiscountRate = (typeof DISCOUNT_RATES)[number];
export const HORIZON_YEARS = 10;
/** E.O. 12866 threshold for an "economically significant" action, in $ millions per year. */
export const SIGNIFICANCE_THRESHOLD = 100;

export interface EconInputs {
  /** One-time cost in Year 0, $ millions. */
  upfront: number;
  /** Recurring annual cost, Years 1..T, $ millions. */
  annualCost: number;
  /** Recurring annual quantified benefit, Years 1..T, $ millions. */
  annualBenefit: number;
  horizon: number;
  unquantifiedBenefits: string[];
  unquantifiedCosts: string[];
  smallEntities: number;
  rfaCertified: boolean;
  absurdParam: string;
  absurdSwing: number; // fraction of |NPV|
}

export interface EconResults {
  pvBenefits: number;
  pvCosts: number;
  npv: number;
  bcr: number;
  annualizedBenefits: number;
  annualizedCosts: number;
  annualizedNet: number;
}

// ---------------------------------------------------------------------------
// Seeded randomness so a case file's numbers never change on re-render.
// ---------------------------------------------------------------------------

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 */
export function seeded(seed: string): () => number {
  let a = hash(seed);
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickFrom<T>(rng: () => number, items: readonly T[], k: number): T[] {
  const copy = items.slice();
  const out: T[] = [];
  while (out.length < k && copy.length) out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0]);
  return out;
}

const UNQUANTIFIED_BENEFITS = [
  'Peace of mind for {s}’s neighbors',
  'Improved morale among detector beagles',
  'Fewer surprises in cargo holds',
  'A strong sense of jurisdictional clarity',
  'Fewer calls to the regional office',
  'Citrus, generally',
  'The quiet satisfaction of a well-formatted table',
  'Option value of not having to do this again',
];

const UNQUANTIFIED_COSTS = [
  'Two (2) additional meetings',
  'One strongly worded pamphlet',
  'Emotional cost of reading the preamble',
  'Inconvenience to {s} (not monetized; {s} declined to be surveyed)',
  'Toner',
  'The analyst’s weekend',
  'Opportunity cost of the good conference room',
];

const ABSURD_PARAMS = [
  'Velocity of {s}',
  'Value of a Statistical Beagle',
  'Number of offices consulted',
  'Elasticity of demand for paperwork',
  'Probability {s} reads the regulation',
  'Snack adequacy index',
];

function fill(text: string, a: Assignment): string {
  return text.replace(/\{s\}/g, a.subject.short);
}

export function econInputs(a: Assignment): EconInputs {
  const rng = seeded(`econ:${a.key}`);
  const logUniform = (lo: number, hi: number) => Math.exp(Math.log(lo) + rng() * (Math.log(hi) - Math.log(lo)));

  // Scale: most cases are modest; some cross the $100M significance line.
  const scale = logUniform(0.4, a.mode === 'ppd' ? 220 : 140);
  const upfront = scale * (0.8 + rng() * 2.5);
  const annualCost = scale * (0.15 + rng() * 0.5);
  // Benefits are set relative to annualized costs at ~5%, so NPV can land on either side
  // and occasionally flip between the 3% and 7% runs.
  const crf5 = capitalRecoveryFactor(0.05, HORIZON_YEARS);
  const ratio = 0.7 + rng() * 1.3 + (a.rareEvent === 'pareto' ? 2 : 0);
  const annualBenefit = (upfront * crf5 + annualCost) * ratio;

  return {
    upfront,
    annualCost,
    annualBenefit,
    horizon: HORIZON_YEARS,
    unquantifiedBenefits: pickFrom(rng, UNQUANTIFIED_BENEFITS, 2).map((t) => fill(t, a)),
    unquantifiedCosts: pickFrom(rng, UNQUANTIFIED_COSTS, 2).map((t) => fill(t, a)),
    smallEntities: Math.round(logUniform(3, 4800)),
    rfaCertified: rng() < 0.55,
    absurdParam: fill(pickFrom(rng, ABSURD_PARAMS, 1)[0], a),
    absurdSwing: 0.15 + rng() * 0.9,
  };
}

// ---------------------------------------------------------------------------
// The real arithmetic
// ---------------------------------------------------------------------------

/** Present value of $1 per year for years 1..T. */
export function annuityFactor(r: number, T: number): number {
  return r === 0 ? T : (1 - (1 + r) ** -T) / r;
}

/** Converts a present value into an equal annual amount over T years. */
export function capitalRecoveryFactor(r: number, T: number): number {
  return 1 / annuityFactor(r, T);
}

export function evaluate(x: Pick<EconInputs, 'upfront' | 'annualCost' | 'annualBenefit' | 'horizon'>, r: number): EconResults {
  const af = annuityFactor(r, x.horizon);
  const pvBenefits = x.annualBenefit * af;
  const pvCosts = x.upfront + x.annualCost * af;
  const crf = 1 / af;
  return {
    pvBenefits,
    pvCosts,
    npv: pvBenefits - pvCosts,
    bcr: pvBenefits / pvCosts,
    annualizedBenefits: pvBenefits * crf,
    annualizedCosts: pvCosts * crf,
    annualizedNet: (pvBenefits - pvCosts) * crf,
  };
}

export interface TornadoRow {
  label: string;
  low: number; // NPV with the parameter at its low value
  high: number; // NPV with the parameter at its high value
}

/** One-at-a-time sensitivity of NPV to ±30% changes in each input (plus one fictional parameter). */
export function tornado(x: EconInputs, r: number): TornadoRow[] {
  const base = evaluate(x, r).npv;
  const vary = (key: 'upfront' | 'annualCost' | 'annualBenefit', f: number) => evaluate({ ...x, [key]: x[key] * f }, r).npv;
  const swing = Math.max(Math.abs(base), 1) * x.absurdSwing;
  const rows: TornadoRow[] = [
    { label: 'Annual benefits (±30%)', low: vary('annualBenefit', 0.7), high: vary('annualBenefit', 1.3) },
    { label: 'Up-front costs (±30%)', low: vary('upfront', 1.3), high: vary('upfront', 0.7) },
    { label: 'Recurring costs (±30%)', low: vary('annualCost', 1.3), high: vary('annualCost', 0.7) },
    { label: `${x.absurdParam} (fictional)`, low: base - swing, high: base + swing },
  ];
  return rows.sort((a, b) => Math.abs(b.high - b.low) - Math.abs(a.high - a.low));
}

export function isEconomicallySignificant(x: EconInputs): boolean {
  // Annual effect on the economy: the larger of annual benefits or annualized costs (at 7%).
  const r = evaluate(x, 0.07);
  return Math.max(r.annualizedBenefits, r.annualizedCosts) >= SIGNIFICANCE_THRESHOLD;
}

export function verdict(x: EconInputs): string {
  const signs = DISCOUNT_RATES.map((r) => evaluate(x, r).npv >= 0);
  if (signs.every(Boolean)) return 'Net benefits are positive at every discount rate on offer. PPD recommends proceeding, with a footnote.';
  if (!signs.some(Boolean)) return 'Costs exceed benefits at every discount rate. PPD recommends considering less burdensome alternatives (see Reel 3).';
  return 'The sign of net benefits depends on the discount rate. PPD recommends a footnote, a second footnote, and a meeting.';
}

export function formatMoney(millions: number): string {
  const sign = millions < 0 ? '−' : '';
  const v = Math.abs(millions);
  if (v >= 1000) return `${sign}$${(v / 1000).toFixed(2)} billion`;
  if (v >= 1) return `${sign}$${v.toFixed(1)} million`;
  return `${sign}$${Math.round(v * 1000).toLocaleString('en-US')} thousand`;
}

export function formatPct(r: number): string {
  return `${(r * 100).toFixed(0)}%`;
}
