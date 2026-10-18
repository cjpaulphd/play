import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { PunResult } from '../types';

const SPECIFICITY_COPY: Record<PunResult['specificity'], { label: string; note: string }> = {
  bespoke: { label: 'BESPOKE', note: 'hand-crafted for this exact combination' },
  tailored: { label: 'TAILORED', note: 'fitted to this subject' },
  templated: { label: 'STANDARD ISSUE', note: 'from the approved template library' },
};

function useTypewriter(text: string, enabled: boolean): string {
  const [shown, setShown] = useState(enabled ? '' : text);
  useEffect(() => {
    if (!enabled) {
      setShown(text);
      return;
    }
    setShown('');
    let i = 0;
    const step = Math.max(1, Math.round(text.length / 70));
    const t = window.setInterval(() => {
      i = Math.min(text.length, i + step);
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(t);
    }, 18);
    return () => window.clearInterval(t);
  }, [text, enabled]);
  return shown;
}

interface PunPanelProps {
  pun: PunResult | null;
  revision: number;
  spinning: boolean;
  reducedMotion: boolean;
  onRevise: () => void;
}

export function PunPanel({ pun, revision, spinning, reducedMotion, onRevise }: PunPanelProps) {
  const typed = useTypewriter(pun?.text ?? '', !reducedMotion && !!pun);
  const spec = pun ? SPECIFICITY_COPY[pun.specificity] : null;

  return (
    <section aria-labelledby="pun-heading" className="pun-panel relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border-4 border-brass-500 p-1">
      <div className="rounded-xl border-2 border-dashed border-brass-400/60 bg-navy-900/95 px-4 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
          <span className="bonus-chip">BONUS</span>
          <h2 id="pun-heading" className="font-plaque text-[clamp(0.95rem,2.6vw,1.35rem)] font-bold uppercase tracking-[0.16em] text-brass-300">
            Official Federal Pun Determination
          </h2>
        </div>

        <div className="mt-4 min-h-[5.5rem] sm:min-h-[4.5rem]">
          <AnimatePresence mode="wait">
            {spinning ? (
              <motion.p key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center font-type text-sm text-ivory-200/70">
                The Pun Review Board is in session. Please hold your groans.
              </motion.p>
            ) : pun ? (
              <motion.blockquote
                key={`${pun.id}-${revision}`}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
                className="text-center"
              >
                <p className="font-display text-[clamp(1.15rem,3.4vw,1.75rem)] font-bold italic leading-snug text-ivory-50 [text-wrap:balance]">
                  <span aria-hidden className="text-brass-400">“</span>
                  <span className="sr-only">{pun.text}</span>
                  <span aria-hidden>{typed}</span>
                  <span aria-hidden className="text-brass-400">”</span>
                </p>
              </motion.blockquote>
            ) : (
              <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-type text-sm text-ivory-200/70">
                Awaiting assignment. Puns are issued only upon completion of all three reels, per policy.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-type text-[11px] uppercase tracking-wider text-ivory-200/60">
            {spec ? (
              <>
                Finding specificity: <span className="font-bold text-brass-300">{spec.label}</span> — {spec.note}
                {revision > 0 && <> · Revision {revision}</>}
              </>
            ) : (
              'Finding specificity: pending'
            )}
          </p>
          <button type="button" onClick={onRevise} disabled={!pun || spinning} className="btn-secondary">
            Request Revised Finding
          </button>
        </div>
      </div>
    </section>
  );
}
