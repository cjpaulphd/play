import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { COMMITTEE_ORG_CHART, COMMITTEE_PARTS } from '../data/bureaucracy';
import { pick } from '../lib/random';
import { Emblem } from './Emblem';

function newCommittee(): string {
  return `${pick(COMMITTEE_PARTS.kinds)} on ${pick(COMMITTEE_PARTS.on)} — ${pick(COMMITTEE_PARTS.status)}`;
}

export function EasterEggModal({ onClose, reducedMotion }: { onClose: () => void; reducedMotion: boolean }) {
  const [formed, setFormed] = useState<string[]>(() => [newCommittee()]);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ocac-title"
        initial={reducedMotion ? { opacity: 0 } : { scale: 0.85, rotate: -3, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
        className="paper max-h-[88vh] outline-none w-full max-w-lg overflow-y-auto rounded-lg border border-[#c9b98f] p-5 shadow-paper sm:p-7"
      >
        <div className="flex items-center gap-4">
          <Emblem size={64} reducedMotion={reducedMotion} />
          <div>
            <p className="font-plaque text-[10px] uppercase tracking-[0.24em] text-forest-700">Restricted Access · Clearance Level: Curious</p>
            <h2 id="ocac-title" className="font-display text-2xl font-black leading-tight text-navy-950">Office of Committees and Additional Committees</h2>
          </div>
        </div>
        <p className="mt-3 font-type text-[13px] text-navy-900">
          Congratulations. By clicking the emblem five times you have been appointed, without your consent, to the following organizational chart.
        </p>
        <ol className="mt-3 space-y-1.5">
          {COMMITTEE_ORG_CHART.map((c, i) => (
            <li key={c} className="font-type text-[13px] text-navy-950" style={{ paddingLeft: `${i * 0.9}rem` }}>
              <span className="text-stamp-600">└</span> {c}
            </li>
          ))}
        </ol>
        <h3 className="mt-5 font-plaque text-[11px] font-bold uppercase tracking-[0.18em] text-forest-700">Newly chartered this session</h3>
        <ul className="mt-2 space-y-1" aria-live="polite">
          {formed.map((c, i) => (
            <li key={`${c}-${i}`} className="rounded bg-brass-300/25 px-2 py-1 font-type text-[12.5px] text-navy-950">
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" className="btn-paper" onClick={() => setFormed((f) => [newCommittee(), ...f].slice(0, 8))}>
            Form Another Committee
          </button>
          <button type="button" className="btn-paper btn-paper--red ml-auto" onClick={onClose}>
            Adjourn
          </button>
        </div>
        <p className="mt-4 font-type text-[11px] italic text-navy-800/60">This office does not exist. Its meetings, however, run long.</p>
      </motion.div>
    </motion.div>
  );
}
