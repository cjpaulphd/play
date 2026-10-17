import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SOURCE_BY_ID } from '../data/sources';
import { Icon } from '../illustrations/Icons';
import { formatBurden } from '../lib/assignment';
import type { Assignment, PunResult } from '../types';

interface CaseFileProps {
  assignment: Assignment;
  pun: PunResult;
  reducedMotion: boolean;
  onStamp: () => void;
  onCopy: () => void;
  onShare: () => void;
  onReconsider: () => void;
  busy: boolean;
}

const AGENCY_NAMES: Record<string, string> = {
  APHIS: 'Animal and Plant Health Inspection Service',
  AMS: 'Agricultural Marketing Service',
  ARS: 'Agricultural Research Service',
  USFS: 'U.S. Forest Service',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-0.5 border-b border-dotted border-navy-900/25 py-2 sm:grid-cols-[11rem_1fr] sm:gap-3">
      <dt className="font-plaque text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-700">{label}</dt>
      <dd className="font-type text-[15px] text-navy-950">{children}</dd>
    </div>
  );
}

export function CaseFile({ assignment: a, pun, reducedMotion, onStamp, onCopy, onShare, onReconsider, busy }: CaseFileProps) {
  const [stamped, setStamped] = useState(reducedMotion);
  useEffect(() => {
    if (reducedMotion) {
      setStamped(true);
      return;
    }
    setStamped(false);
    const t = window.setTimeout(() => {
      setStamped(true);
      onStamp();
    }, 750);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a.key, reducedMotion]);

  const real = a.mode === 'real';
  const extended = a.mode === 'extended';
  const sources = a.curated?.sourceIds.map((id) => SOURCE_BY_ID[id]).filter(Boolean) ?? [];
  const issued = new Date(a.issuedAt);

  return (
    <motion.article
      key={a.key}
      aria-labelledby="case-heading"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -70, rotateX: -18, scaleY: 0.9 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scaleY: 1 }}
      transition={reducedMotion ? { duration: 0.2 } : { type: 'spring', stiffness: 120, damping: 17 }}
      style={{ transformOrigin: 'top center', transformPerspective: 900 }}
      className="relative mx-auto w-full max-w-4xl"
    >
      {/* folder tab */}
      <div className="ml-6 inline-flex items-center gap-2 rounded-t-lg border border-b-0 border-[#b89a5c] bg-[#e9d39c] px-4 py-1.5 font-plaque text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-900">
        <Icon id="binder" className="h-4 w-4" /> Case File
      </div>

      <div className="paper relative overflow-hidden rounded-b-lg rounded-tr-lg border border-[#c9b98f] px-4 pb-6 pt-3 shadow-paper sm:px-10 sm:pb-8">
        {/* classification banner */}
        <div className="-mx-4 mb-4 bg-forest-800 py-1 text-center font-plaque text-[10px] font-semibold uppercase tracking-[0.22em] text-ivory-100 sm:-mx-10 sm:text-[11px]">
          {a.classification}
        </div>

        <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-plaque text-[11px] uppercase tracking-[0.2em] text-forest-700">United States Department of Extremely Specific Affairs</p>
            <h3 id="case-heading" className="mt-1 font-type text-xl font-bold text-navy-950 sm:text-2xl">
              CASE FILE NO. {a.caseNumber}
            </h3>
            <p className="mt-1 font-type text-xs text-navy-800/70">
              {a.formNumber} (Rev. 1987) · Issued {issued.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {issued.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-end">
            {real && <span className="tag tag-real">Surprisingly Real</span>}
            {extended && <span className="tag tag-ext">USDA Extended Universe</span>}
            {a.mode === 'chaos' && <span className="tag tag-hypo">Hypothetical Assignment — Not Actual Federal Policy</span>}
            {a.rareEvent && <span className="tag tag-rare">{a.rareEvent === 'jackpot' ? 'Interagency Jackpot' : 'Regulatory Alignment'}</span>}
          </div>
        </header>

        {extended && a.curated && (
          <p className="mt-3 rounded border border-navy-700/30 bg-navy-700/5 px-3 py-2 font-type text-[13px] text-navy-900">
            <strong>Jurisdictional notice:</strong> This is not an APHIS responsibility. Responsible agency: <strong>{AGENCY_NAMES[a.curated.agency]}</strong> ({a.curated.program}).
          </p>
        )}

        <dl className="mt-4">
          <Field label="Subject">
            <span className="inline-flex items-center gap-2">
              <Icon id={a.subject.icon} className="h-7 w-7 shrink-0" />
              <span>
                {a.subject.name}
                {a.subject.scientificName && <em className="ml-1 text-navy-800/70">({a.subject.scientificName})</em>}
              </span>
            </span>
          </Field>
          <Field label="Regulatory Concern">{a.problem.text}</Field>
          <Field label="Assigned Mission">{a.objective.text}</Field>
          {a.curated && <Field label="Responsible Program">{a.curated.agency} — {a.curated.program}</Field>}
        </dl>

        <section className="mt-5">
          <h4 className="font-plaque text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-700">Official Finding</h4>
          <p className="mt-1 font-type text-[15px] leading-relaxed text-navy-950">“{a.finding}”</p>
        </section>

        <section className="mt-4 rounded-md border-2 border-dashed border-stamp-600/50 bg-stamp-500/[0.04] px-4 py-3">
          <h4 className="font-plaque text-[11px] font-semibold uppercase tracking-[0.18em] text-stamp-700">Bonus: Official Federal Pun Determination</h4>
          <p className="mt-1 font-display text-lg font-bold italic leading-snug text-navy-950">“{pun.text}”</p>
        </section>

        <div className="mt-5 flex flex-col gap-x-6 sm:flex-row sm:items-center">
          <dl className="min-w-0 flex-1">
            <Field label="Administrative Status">
              <span className="font-bold text-stamp-700">{a.status}</span>
            </Field>
            <Field label="Paperwork Burden">
              {formatBurden(a.burdenMinutes)}
              <span className="block text-[11px] italic text-navy-800/60">Fictional estimate. Not an actual regulatory burden figure.</span>
            </Field>
          </dl>
          <div className="flex shrink-0 items-center justify-center py-4 sm:w-60 sm:py-0">
            <motion.div
              aria-hidden
              initial={false}
              animate={stamped ? { opacity: 0.9, scale: 1, rotate: -11 } : { opacity: 0, scale: 2.6, rotate: -4 }}
              transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 700, damping: 22, mass: 0.6 }}
              className="stamp pointer-events-none"
            >
              <div className="text-[clamp(1.3rem,4.4vw,1.9rem)] leading-none">APPROVED</div>
              <div className="mt-1 text-[clamp(0.6rem,1.8vw,0.8rem)] tracking-[0.2em]">SUBJECT TO CONDITIONS</div>
            </motion.div>
          </div>
        </div>

        {/* Surprisingly real panel */}
        {a.curated && (
          <details className="fact-panel mt-5 rounded-md border border-forest-700/40 bg-forest-700/[0.06]" open>
            <summary className="cursor-pointer select-none px-4 py-2.5 font-plaque text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-800">
              {extended ? 'Actual Federal Concern (Other USDA Agency)' : 'Actual Federal Concern'}
              <span className="ml-2 font-type text-[11px] normal-case tracking-normal text-forest-700/80">— the factual part, no jokes</span>
            </summary>
            <div className="border-t border-forest-700/25 px-4 pb-4 pt-3">
              <p className="font-body text-[15px] leading-relaxed text-navy-950">{a.curated.fact}</p>
              {a.curated.obscureDetail && (
                <div className="mt-3 rounded border-l-4 border-brass-500 bg-brass-300/25 px-3 py-2">
                  <p className="font-plaque text-[11px] font-bold uppercase tracking-[0.16em] text-brass-700">Did you really just regulate that?</p>
                  <p className="mt-0.5 font-body text-[14.5px] text-navy-950">{a.curated.obscureDetail}</p>
                </div>
              )}
              {sources.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {sources.map((s) => (
                    <li key={s.id} className="font-type text-[12.5px] text-navy-900">
                      Source:{' '}
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-forest-600 underline-offset-2 hover:text-forest-700">
                        {s.title}
                      </a>{' '}
                      <span className="text-navy-800/60">({s.publisher})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        )}

        {/* Routing slip */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-type text-[12px] text-navy-800/80">
          <span className="font-plaque text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-700">Routing:</span>
          {a.routing.map((r, i) => (
            <span key={r} className="inline-flex items-center gap-1">
              <span className={`inline-block h-3 w-3 border border-navy-800/60 ${i < a.routing.length - 1 ? 'bg-[linear-gradient(45deg,transparent_45%,#1d2b24_45%,#1d2b24_55%,transparent_55%)]' : ''}`} />
              {r}
            </span>
          ))}
          <span className="italic">({a.routing.length - 1} of {a.routing.length} concurred)</span>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-navy-900/15 pt-4">
          <button type="button" className="btn-paper" onClick={onCopy}>
            Copy Official Finding
          </button>
          <button type="button" className="btn-paper" onClick={onShare}>
            Share Case File
          </button>
          <button type="button" className="btn-paper btn-paper--red ml-auto" onClick={onReconsider} disabled={busy}>
            Submit for Reconsideration
          </button>
        </div>

        <div className="-mx-4 -mb-6 mt-6 bg-forest-800 py-1 text-center font-plaque text-[10px] font-semibold uppercase tracking-[0.22em] text-ivory-100 sm:-mx-10 sm:-mb-8 sm:text-[11px]">
          {a.classification}
        </div>
      </div>
    </motion.article>
  );
}
