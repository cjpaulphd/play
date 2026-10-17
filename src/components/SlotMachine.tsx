import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { LOADING_MESSAGES } from '../data/bureaucracy';
import { fillerFor } from '../lib/assignment';
import { pick } from '../lib/random';
import type { Assignment, GameMode, Objective, Problem, Subject } from '../types';
import { Lever } from './Lever';
import { Reel, type ReelItem } from './Reel';

const LABELS = ['SPECIES / SUBJECT', 'PROBLEM', 'OBJECTIVE'] as const;

const IDLE_ITEMS: ReelItem[] = [
  { key: 'idle-0', icon: 'beetle', text: 'Awaiting Subject' },
  { key: 'idle-1', icon: 'documents', text: 'Awaiting Problem' },
  { key: 'idle-2', icon: 'stamp', text: 'Awaiting Objective' },
];

function toItem(x: Subject | Problem | Objective, key: string): ReelItem {
  if ('name' in x) return { key, icon: x.icon, text: x.name, sub: x.scientificName };
  return { key, icon: x.icon, text: x.text };
}

interface SlotMachineProps {
  assignment: Assignment | null;
  mode: GameMode;
  spinId: number;
  spinning: boolean;
  compact: boolean;
  reducedMotion: boolean;
  reorg: boolean;
  celebrating: boolean;
  onPull: () => void;
  onReelStop: (index: number) => void;
}

export function SlotMachine({ assignment, mode, spinId, spinning, compact, reducedMotion, reorg, celebrating, onPull, onReelStop }: SlotMachineProps) {
  const items = useMemo<ReelItem[]>(() => {
    if (!assignment) return IDLE_ITEMS;
    return [
      toItem(assignment.subject, `${assignment.key}-0`),
      toItem(assignment.problem, `${assignment.key}-1`),
      toItem(assignment.objective, `${assignment.key}-2`),
    ];
  }, [assignment]);

  // Rotating absurd loading message while spinning.
  const [message, setMessage] = useState(LOADING_MESSAGES[0]);
  useEffect(() => {
    if (!spinning) return;
    setMessage(pick(LOADING_MESSAGES));
    const t = window.setInterval(() => setMessage(pick(LOADING_MESSAGES)), 650);
    return () => window.clearInterval(t);
  }, [spinning]);

  // Agency Reorganization: labels swap among reels, then return.
  const [labelOrder, setLabelOrder] = useState<number[]>([0, 1, 2]);
  useEffect(() => {
    if (!reorg) return;
    const steps = [[2, 0, 1], [1, 2, 0], [2, 1, 0], [0, 1, 2]];
    const timers = steps.map((order, i) => window.setTimeout(() => setLabelOrder(order), 450 + i * 650));
    return () => timers.forEach(window.clearTimeout);
  }, [reorg]);

  const display = spinning
    ? message
    : reorg
      ? 'AGENCY REORGANIZATION IN PROGRESS'
      : assignment
        ? 'ASSIGNMENT ISSUED — SEE CASE FILE BELOW'
        : mode === 'real'
          ? 'SURPRISINGLY REAL MODE — PULL LEVER'
          : mode === 'ppd'
            ? 'PPD ECONOMIC ANALYSIS MODE — PULL LEVER'
            : mode === 'chaos'
            ? 'MAXIMUM BUREAUCRACY MODE — PULL LEVER'
            : 'USDA EXTENDED UNIVERSE — PULL LEVER';

  return (
    <section aria-label="The APHIS Assignment Machine" className="relative mx-auto w-full max-w-5xl">
      {/* Marquee */}
      <div className="relative mx-auto -mb-1 w-[94%] rounded-t-[2rem] border-4 border-b-0 border-brass-500 bg-gradient-to-b from-stamp-700 to-stamp-600 px-4 pb-3 pt-4 shadow-[inset_0_2px_0_rgba(255,255,255,0.25)]">
        <div className={`marquee-bulbs ${spinning || celebrating ? 'marquee-bulbs--fast' : ''}`} aria-hidden />
        <div className="relative flex items-center justify-center gap-3">
          <span className="inspection-lamp" aria-hidden />
          <h2 className="text-center font-plaque text-[clamp(1rem,3.4vw,1.9rem)] font-bold uppercase tracking-[0.18em] text-ivory-50 [text-shadow:0_2px_0_#7f1d15,0_0_18px_rgba(255,220,150,0.45)]">
            Assignment Machine
          </h2>
          <span className="inspection-lamp inspection-lamp--late" aria-hidden />
        </div>
      </div>

      {/* Cabinet */}
      <div className="cabinet relative rounded-[1.6rem] border-4 border-brass-500 p-3 sm:p-5">
        <div className="flex items-stretch gap-2 sm:gap-4">
          <div className="min-w-0 flex-1">
            {/* VFD display */}
            <div className="mb-3 flex min-h-[2.5rem] items-center justify-center overflow-hidden rounded-md border-2 border-black/60 bg-[#06120c] px-3 py-2 shadow-[inset_0_0_18px_rgba(0,0,0,0.9)]" aria-hidden>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={display}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="vfd text-center font-type text-[12px] uppercase tracking-[0.14em] sm:text-sm"
                >
                  {display}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Reels */}
            <LayoutGroup>
              <div className={`grid gap-2 sm:gap-3 ${compact ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {[0, 1, 2].map((i) => {
                  const labelIdx = labelOrder[i];
                  return (
                    <div key={i} className="min-w-0">
                      <div className="mb-1 flex h-6 items-center justify-center">
                        <motion.div
                          layoutId={`reel-label-${labelIdx}`}
                          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                          className={`rounded-sm border border-brass-600 bg-gradient-to-b from-brass-300 to-brass-500 px-2 py-0.5 font-plaque text-[10.5px] font-semibold uppercase tracking-[0.16em] text-navy-950 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset] sm:text-[11px] ${reorg ? 'ring-2 ring-stamp-500' : ''}`}
                        >
                          Reel {labelIdx + 1}: {LABELS[labelIdx]}
                        </motion.div>
                      </div>
                      <Reel
                        index={i as 0 | 1 | 2}
                        item={items[i]}
                        spinId={spinId}
                        makeFiller={() => toItem(fillerFor(i as 0 | 1 | 2, mode), `f-${Math.random()}`)}
                        compact={compact}
                        reducedMotion={reducedMotion}
                        onStop={onReelStop}
                        highlight={celebrating}
                      />
                    </div>
                  );
                })}
              </div>
            </LayoutGroup>

            {/* Main button */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <motion.button
                type="button"
                onClick={onPull}
                disabled={spinning}
                whileTap={spinning ? undefined : { y: 3 }}
                className="issue-button w-full max-w-md rounded-xl px-6 py-3.5 font-plaque text-lg font-bold uppercase tracking-[0.16em] sm:text-xl"
                aria-describedby="spin-hint"
              >
                {spinning ? 'Processing…' : 'Issue New Assignment'}
              </motion.button>
              <p id="spin-hint" className="hidden font-type text-[11px] text-ivory-200/70 sm:block">
                Press <kbd className="kbd">Space</kbd> to pull the lever · <kbd className="kbd">R</kbd> for a revised finding
              </p>
            </div>
          </div>

          {/* Lever */}
          <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border-2 border-brass-700/70 bg-black/20 px-1 py-3 sm:px-2">
            <Lever disabled={spinning} onPull={onPull} compact={compact} reducedMotion={reducedMotion} />
          </div>
        </div>

        {/* Dispenser slot */}
        <div className="mx-auto mt-4 h-3 w-2/3 rounded-full bg-black/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.15)]" aria-hidden />
      </div>
    </section>
  );
}
