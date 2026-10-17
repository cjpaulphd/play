import { useMemo, useState } from 'react';
import { SOURCE_BY_ID } from '../data/sources';
import {
  DISCOUNT_RATES,
  type DiscountRate,
  econInputs,
  evaluate,
  formatMoney,
  formatPct,
  isEconomicallySignificant,
  SIGNIFICANCE_THRESHOLD,
  tornado,
  verdict,
} from '../lib/econ';
import type { Assignment } from '../types';

const RATE_NOTES: Record<DiscountRate, string> = {
  0.02: '2023 Circular A-4',
  0.03: '2003 Circular A-4',
  0.07: '2003 Circular A-4',
};

function Tornado({ rows, base }: { rows: ReturnType<typeof tornado>; base: number }) {
  const W = 320;
  const rowH = 34;
  const top = 8;
  const H = top + rows.length * rowH + 22;
  const maxDev = Math.max(1e-9, ...rows.flatMap((r) => [Math.abs(r.low - base), Math.abs(r.high - base)]));
  const cx = W / 2;
  const scale = (W / 2 - 12) / maxDev;
  const x = (v: number) => cx + (v - base) * scale;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Tornado chart: sensitivity of net present value to each input">
      {rows.map((r, i) => {
        const y = top + i * rowH;
        const lo = Math.min(r.low, r.high);
        const hi = Math.max(r.low, r.high);
        return (
          <g key={r.label}>
            <text x={4} y={y + 9} fontSize="9.5" fontFamily="Courier Prime, monospace" fill="#1d2b24">
              {r.label}
            </text>
            <rect x={x(lo)} y={y + 13} width={Math.max(1, cx - x(lo))} height={12} fill="#a52a1f" opacity={0.8} />
            <rect x={cx} y={y + 13} width={Math.max(1, x(hi) - cx)} height={12} fill="#2e6b50" opacity={0.85} />
          </g>
        );
      })}
      <line x1={cx} x2={cx} y1={top} y2={H - 18} stroke="#1d2b24" strokeWidth={1.2} strokeDasharray="3 2" />
      <text x={cx} y={H - 5} textAnchor="middle" fontSize="9" fontFamily="Courier Prime, monospace" fill="#1d2b24">
        Base-case NPV: {formatMoney(base)}
      </text>
    </svg>
  );
}

export function EconAddendum({ assignment: a }: { assignment: Assignment }) {
  const inputs = useMemo(() => econInputs(a), [a]);
  const [rate, setRate] = useState<DiscountRate>(0.07);
  const res = evaluate(inputs, rate);
  const res7 = evaluate(inputs, 0.07);
  const rows = tornado(inputs, rate);
  const significant = isEconomicallySignificant(inputs);
  const praHours = Math.round(a.burdenMinutes / 60) || 1;
  const frameworks = ['eo-12866', 'a4-2003', 'rfa'].map((id) => SOURCE_BY_ID[id]).filter(Boolean);

  return (
    <details className="econ-panel mt-5 rounded-md border border-navy-700/40 bg-navy-700/[0.04]" open={a.mode === 'ppd' || a.curated?.program === 'Policy and Program Development'}>
      <summary className="cursor-pointer select-none px-4 py-2.5">
        <span className="font-plaque text-[12px] font-semibold uppercase tracking-[0.16em] text-navy-800">PPD Economic Analysis Addendum</span>
        <span className="ml-2 font-type text-[11.5px] text-navy-800/75">
          NPV @7%: <strong className={res7.npv >= 0 ? 'text-forest-700' : 'text-stamp-700'}>{formatMoney(res7.npv)}</strong> · B/C {res7.bcr.toFixed(2)}
        </span>
      </summary>

      <div className="border-t border-navy-700/20 px-4 pb-4 pt-3">
        <p className="font-type text-[12px] italic text-navy-800/75">
          Preliminary Regulatory Impact Analysis. Every figure below is invented for comedic purposes. The arithmetic, however, is real.
        </p>

        {/* Discount rate selector */}
        <fieldset className="mt-3">
          <legend className="font-plaque text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-700">Discount rate</legend>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {DISCOUNT_RATES.map((r) => (
              <label key={r} className={`rate-chip ${rate === r ? 'rate-chip--on' : ''}`}>
                <input type="radio" name={`rate-${a.key}`} className="sr-only" checked={rate === r} onChange={() => setRate(r)} />
                <span className="font-bold">{formatPct(r)}</span>
                <span className="text-[10.5px] opacity-75">{RATE_NOTES[r]}</span>
              </label>
            ))}
          </div>
          <p className="mt-1 font-type text-[11px] text-navy-800/65">Circular A-4 has had an eventful few years. All three rates are provided as a courtesy.</p>
        </fieldset>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* Ledger */}
          <table className="w-full font-type text-[12px] text-navy-950 sm:text-[13px] [&_td.text-right]:whitespace-nowrap [&_td.text-right]:pl-2">
            <caption className="mb-1 text-left font-plaque text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-700">
              {inputs.horizon}-year ledger, {formatPct(rate)} discount rate
            </caption>
            <tbody className="[&_td]:border-b [&_td]:border-dotted [&_td]:border-navy-900/20 [&_td]:py-1">
              <tr><td>One-time costs (Year 0)</td><td className="text-right">{formatMoney(inputs.upfront)}</td></tr>
              <tr><td>Recurring costs / yr</td><td className="text-right">{formatMoney(inputs.annualCost)}</td></tr>
              <tr><td>Quantified benefits / yr</td><td className="text-right">{formatMoney(inputs.annualBenefit)}</td></tr>
              <tr><td>PV of benefits</td><td className="text-right">{formatMoney(res.pvBenefits)}</td></tr>
              <tr><td>PV of costs</td><td className="text-right">{formatMoney(res.pvCosts)}</td></tr>
              <tr className="font-bold">
                <td>Net present value</td>
                <td className={`text-right ${res.npv >= 0 ? 'text-forest-700' : 'text-stamp-700'}`}>{formatMoney(res.npv)}</td>
              </tr>
              <tr><td>Annualized net benefits</td><td className="text-right">{formatMoney(res.annualizedNet)}</td></tr>
              <tr><td>Benefit-cost ratio</td><td className="text-right">{res.bcr.toFixed(2)}</td></tr>
            </tbody>
          </table>

          {/* Tornado */}
          <div>
            <p className="mb-1 font-plaque text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-700">Sensitivity analysis (NPV)</p>
            <Tornado rows={rows} base={res.npv} />
          </div>
        </div>

        <dl className="mt-4 grid gap-x-6 gap-y-2 font-type text-[13px] text-navy-950 md:grid-cols-2">
          <div>
            <dt className="font-plaque text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-700">E.O. 12866 determination</dt>
            <dd>
              {significant
                ? `Economically significant: annual effect of $${SIGNIFICANCE_THRESHOLD} million or more. OIRA would like a word.`
                : 'Not economically significant. Emotionally significant: yes.'}
            </dd>
          </div>
          <div>
            <dt className="font-plaque text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-700">Regulatory Flexibility Act</dt>
            <dd>
              {inputs.rfaCertified
                ? `Certified: no significant impact on a substantial number of small entities (${inputs.smallEntities.toLocaleString('en-US')} considered, including one very small ${a.subject.short.replace(/^the /, '')}).`
                : `Initial regulatory flexibility analysis required. ${inputs.smallEntities.toLocaleString('en-US')} small entities affected. Less burdensome alternatives: under consideration.`}
            </dd>
          </div>
          <div>
            <dt className="font-plaque text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-700">Unquantified benefits</dt>
            <dd>
              <ul className="list-inside list-disc">
                {inputs.unquantifiedBenefits.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-plaque text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-700">Unquantified costs</dt>
            <dd>
              <ul className="list-inside list-disc">
                {inputs.unquantifiedCosts.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="font-plaque text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-700">Paperwork Reduction Act</dt>
            <dd>Estimated burden: {praHours.toLocaleString('en-US')} hour{praHours === 1 ? '' : 's'} (see above). Reducing paperwork has been added to the paperwork.</dd>
          </div>
        </dl>

        <p className="mt-4 rounded border-l-4 border-navy-700 bg-navy-700/[0.06] px-3 py-2 font-type text-[13px] font-bold text-navy-950">
          Finding: {verdict(inputs)}
        </p>

        <p className="mt-3 font-type text-[11.5px] text-navy-800/70">
          Real-world framework (no jokes here):{' '}
          {frameworks.map((s, i) => (
            <span key={s.id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-forest-700">
                {s.title}
              </a>
              {i < frameworks.length - 1 ? ' · ' : ''}
            </span>
          ))}
          . Actual analyses use actual data, peer review and considerably fewer snails.
        </p>
      </div>
    </details>
  );
}
