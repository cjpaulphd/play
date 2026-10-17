import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Ambient } from './components/Ambient';
import { CaseFile } from './components/CaseFile';
import { Confetti } from './components/Confetti';
import { EasterEggModal } from './components/EasterEggModal';
import { GameControls } from './components/GameControls';
import { Header } from './components/Header';
import { PunPanel } from './components/PunPanel';
import { RareEventBanner } from './components/RareEventBanner';
import { RecentInvestigations } from './components/RecentInvestigations';
import { SlotMachine } from './components/SlotMachine';
import { Toast } from './components/Toast';
import { TriviaCard } from './components/TriviaCard';
import { RARE_EVENTS, TRIVIA } from './data/bureaucracy';
import { forcedEvent, fromStored, RARE_ODDS, rollAssignment, toStored } from './lib/assignment';
import { useMediaQuery } from './lib/hooks';
import { generatePun } from './lib/punEngine';
import { chance, randomInt, ShuffleBag } from './lib/random';
import { caseFileText, copyText, shareText } from './lib/share';
import { setSoundEnabled, sfx } from './lib/sound';
import { load, save } from './lib/storage';
import type { Assignment, GameMode, PunResult, StoredAssignment, TriviaItem } from './types';

interface Counters {
  issued: number;
  hours: number;
}

const TRIVIA_EVERY = 4;
const UNLOCK_AFTER = 5;

export default function App() {
  const reducedMotion = useReducedMotion() ?? false;
  const compact = !useMediaQuery('(min-width: 640px)');

  // Persisted preferences and history
  const [mode, setMode] = useState<GameMode>(() => {
    const m = load<GameMode>('mode', 'real');
    return m === 'extended' && !load('extUnlocked', false) ? 'real' : m;
  });
  const [soundOn, setSoundOn] = useState<boolean>(() => load('sound', false));
  const [unlocked, setUnlocked] = useState<boolean>(() => load('extUnlocked', false));
  const [counters, setCounters] = useState<Counters>(() => load('counters', { issued: 0, hours: 0 }));
  const [recents, setRecents] = useState<StoredAssignment[]>(() => load('recents', []));
  const [recentPunIds, setRecentPunIds] = useState<string[]>(() => load('recentPuns', []));

  useEffect(() => save('mode', mode), [mode]);
  useEffect(() => save('sound', soundOn), [soundOn]);
  useEffect(() => save('extUnlocked', unlocked), [unlocked]);
  useEffect(() => save('counters', counters), [counters]);
  useEffect(() => save('recents', recents), [recents]);
  useEffect(() => save('recentPuns', recentPunIds), [recentPunIds]);
  useEffect(() => setSoundEnabled(soundOn), [soundOn]);

  // Machine state
  const [machine, setMachine] = useState<Assignment | null>(null);
  const [result, setResult] = useState<{ assignment: Assignment; pun: PunResult } | null>(null);
  const [shownPunIds, setShownPunIds] = useState<string[]>([]);
  const [revision, setRevision] = useState(0);
  const [spinId, setSpinId] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const pending = useRef<Assignment | null>(null);
  const stopped = useRef(0);

  // Surprises
  const [reorg, setReorg] = useState(false);
  const [rare, setRare] = useState<{ kind: 'jackpot' | 'alignment'; key: string } | null>(null);
  const [trivia, setTrivia] = useState<TriviaItem | null>(null);
  const triviaBag = useRef(new ShuffleBag(TRIVIA));
  const [easter, setEaster] = useState(false);
  const emblemClicks = useRef<{ n: number; t: number }>({ n: 0, t: 0 });

  // Feedback
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number>();
  const [announcement, setAnnouncement] = useState('');
  const machineRef = useRef<HTMLDivElement>(null);
  const punRef = useRef<HTMLDivElement>(null);
  const caseRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  const spin = useCallback(() => {
    if (spinning) return;
    sfx.lever();
    const a = rollAssignment(mode);
    pending.current = a;
    stopped.current = 0;
    setMachine(a);
    setResult(null);
    setRare(null);
    setSpinning(true);
    setAnnouncement('Processing assignment. Consulting the Federal Register.');
    setSpinId((n) => n + 1);
  }, [spinning, mode]);

  const finish = useCallback(() => {
    const a = pending.current;
    if (!a) return;
    pending.current = null;

    const pun = generatePun({ subject: a.subject, problem: a.problem, objective: a.objective }, { recent: recentPunIds });
    setResult({ assignment: a, pun });
    setShownPunIds([pun.id]);
    setRevision(0);
    setSpinning(false);
    setRecents((r) => [toStored(a, pun), ...r.filter((x) => x.key !== a.key)].slice(0, 5));
    setRecentPunIds((r) => [pun.id, ...r].slice(0, 30));

    const issued = counters.issued + 1;
    const staff = 2 + randomInt(6);
    setCounters((c) => ({ issued: c.issued + 1, hours: Math.round((c.hours + (a.burdenMinutes / 60) * staff) * 10) / 10 }));

    setAnnouncement(
      `New assignment issued. Case file ${a.caseNumber}. Subject: ${a.subject.name}. Regulatory concern: ${a.problem.text}. Assigned mission: ${a.objective.text}. Official pun determination: ${pun.text}`,
    );

    if (a.rareEvent) {
      setRare({ kind: a.rareEvent, key: a.key });
      sfx.fanfare();
      window.setTimeout(() => setRare((r) => (r?.key === a.key ? null : r)), 5200);
    } else {
      if (chance(0.35)) window.setTimeout(() => sfx.chime(), 1100);
      if (forcedEvent() === 'reorg' || chance(RARE_ODDS.reorg)) {
        setReorg(true);
        window.setTimeout(() => setReorg(false), 3400);
      }
    }

    if (issued % TRIVIA_EVERY === 0) setTrivia(triviaBag.current.next());
    if (!unlocked && issued >= UNLOCK_AFTER) {
      setUnlocked(true);
      window.setTimeout(() => showToast('New jurisdiction unlocked: THE USDA EXTENDED UNIVERSE.'), 1600);
    }

    // On small screens, bring the pun into view once the case file starts emerging.
    window.setTimeout(() => {
      const el = punRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight - 120) el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }, 450);
  }, [counters.issued, recentPunIds, unlocked, showToast, reducedMotion]);

  // Reels call back from inside long-running animations; keep the handler fresh.
  const finishRef = useRef(finish);
  finishRef.current = finish;
  const onReelStop = useCallback((i: number) => {
    sfx.reelStop(i);
    stopped.current += 1;
    if (stopped.current === 3) finishRef.current();
  }, []);

  const revise = useCallback(() => {
    if (!result || spinning) return;
    const { assignment: a } = result;
    const pun = generatePun({ subject: a.subject, problem: a.problem, objective: a.objective }, { recent: recentPunIds, exclude: shownPunIds });
    sfx.paper();
    setResult({ assignment: a, pun });
    setShownPunIds((s) => [...s, pun.id]);
    setRevision((r) => r + 1);
    setRecentPunIds((r) => [pun.id, ...r].slice(0, 30));
    setRecents((r) => r.map((x) => (x.key === a.key ? { ...x, pun } : x)));
    setAnnouncement(`Revised finding: ${pun.text}`);
  }, [result, spinning, recentPunIds, shownPunIds]);

  const reconsider = useCallback(() => {
    machineRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(spin, reducedMotion ? 0 : 350);
  }, [spin, reducedMotion]);

  const openRecent = useCallback(
    (s: StoredAssignment) => {
      if (spinning) return;
      const restored = fromStored(s);
      if (!restored) return;
      setMachine(restored.assignment);
      setResult(restored);
      setShownPunIds([restored.pun.id]);
      setRevision(0);
      sfx.paper();
      window.setTimeout(() => caseRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' }), 60);
    },
    [spinning, reducedMotion],
  );

  const onCopy = useCallback(async () => {
    if (!result) return;
    const ok = await copyText(caseFileText(result.assignment, result.pun));
    showToast(ok ? 'Official finding copied. Please distribute responsibly.' : 'Copy failed. Please photocopy manually.');
  }, [result, showToast]);

  const onShare = useCallback(async () => {
    if (!result) return;
    const outcome = await shareText(`Case File ${result.assignment.caseNumber}`, caseFileText(result.assignment, result.pun));
    if (outcome === 'copied') showToast('Sharing unavailable — case file summary copied instead.');
    if (outcome === 'failed') showToast('Sharing failed. Interoffice mail remains an option.');
  }, [result, showToast]);

  const onEmblem = useCallback(() => {
    const now = Date.now();
    const c = emblemClicks.current;
    c.n = now - c.t < 1500 ? c.n + 1 : 1;
    c.t = now;
    sfx.click();
    if (c.n >= 5) {
      c.n = 0;
      setEaster(true);
      sfx.chime();
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      const next = !on;
      setSoundEnabled(next);
      if (next) sfx.chime();
      return next;
    });
  }, []);

  // Keyboard: Space pulls the lever (when nothing interactive is focused); R revises.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || easter) return;
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      const interactive = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON' || tag === 'A' || tag === 'SUMMARY' || el?.isContentEditable;
      if (e.code === 'Space' && !interactive) {
        e.preventDefault();
        spin();
      } else if ((e.key === 'r' || e.key === 'R') && !interactive && tag !== 'INPUT') {
        revise();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [spin, revise, easter]);

  return (
    <MotionConfig reducedMotion="user">
      <Ambient />
      <a href="#machine" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[90] focus:rounded focus:bg-ivory-50 focus:px-3 focus:py-2 focus:text-navy-950">
        Skip to the machine
      </a>
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 pb-10 sm:gap-8 sm:px-6">
        <Header onEmblemClick={onEmblem} reducedMotion={reducedMotion} />

        <main className="flex flex-col gap-6 sm:gap-8">
          <GameControls
            mode={mode}
            onMode={(m) => {
              sfx.click();
              setMode(m);
            }}
            extendedUnlocked={unlocked}
            soundOn={soundOn}
            onSound={toggleSound}
            disabled={spinning}
            issued={counters.issued}
            staffHours={counters.hours}
          />

          <div id="machine" ref={machineRef} className="scroll-mt-4">
            <SlotMachine
              assignment={machine}
              mode={mode}
              spinId={spinId}
              spinning={spinning}
              compact={compact}
              reducedMotion={reducedMotion}
              reorg={reorg}
              celebrating={!!rare}
              onPull={spin}
              onReelStop={onReelStop}
            />
          </div>

          <div ref={punRef} className="scroll-mt-4">
            <PunPanel pun={result?.pun ?? null} revision={revision} spinning={spinning} reducedMotion={reducedMotion} onRevise={revise} />
          </div>

          <div ref={caseRef} className="scroll-mt-4">
            <AnimatePresence mode="wait">
              {result && (
                <CaseFile
                  key={result.assignment.key}
                  assignment={result.assignment}
                  pun={result.pun}
                  reducedMotion={reducedMotion}
                  onStamp={() => sfx.stamp()}
                  onCopy={onCopy}
                  onShare={onShare}
                  onReconsider={reconsider}
                  busy={spinning}
                />
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>{trivia && !spinning && <TriviaCard key={trivia.id} item={trivia} onDismiss={() => setTrivia(null)} />}</AnimatePresence>

          <RecentInvestigations items={recents} onOpen={openRecent} currentKey={result?.assignment.key} />
        </main>

        <footer className="mx-auto mt-4 w-full max-w-4xl border-t border-brass-600/30 pt-6 text-center">
          <p className="font-type text-[12.5px] text-ivory-200/80">
            This is a parody. Not an official USDA or APHIS application. No actual permits were issued in the making of this assignment.
          </p>
          <p className="mt-2 font-type text-[11.5px] text-ivory-200/55">
            Made with affection for the public servants who protect American agriculture and natural resources — including the ones who really do write protocols for curry leaves. Factual panels cite public sources; everything else is a joke.
          </p>
        </footer>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <AnimatePresence>
        {rare && (
          <RareEventBanner
            key={rare.key}
            title={RARE_EVENTS[rare.kind].title}
            subtitle={RARE_EVENTS[rare.kind].subtitle}
            onClose={() => setRare(null)}
          />
        )}
      </AnimatePresence>
      {rare && !reducedMotion && <Confetti burstKey={rare.key} />}
      <AnimatePresence>{easter && <EasterEggModal onClose={() => setEaster(false)} reducedMotion={reducedMotion} />}</AnimatePresence>
      <Toast message={toast} />
    </MotionConfig>
  );
}
