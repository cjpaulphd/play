import { CURATED_CASES } from '../data/cases';
import { OBJECTIVES, OBJECTIVE_BY_ID } from '../data/objectives';
import { PROBLEMS, PROBLEM_BY_ID } from '../data/problems';
import { SUBJECTS, SUBJECT_BY_ID } from '../data/subjects';
import { CLASSIFICATIONS, CONSOLATIONS, ROUTING_INITIALS, STATUSES } from '../data/bureaucracy';
import type { Assignment, CuratedCase, GameMode, Objective, Problem, RareEvent, StoredAssignment, Subject, PunResult } from '../types';
import { chance, pick, randomInt, sample, ShuffleBag } from './random';
import { fictionalFormNumber } from './punEngine';

const REAL_CASES = CURATED_CASES.filter((c) => c.mode === 'real');
const EXTENDED_CASES = CURATED_CASES.filter((c) => c.mode === 'extended');
const CHAOS_SUBJECTS = SUBJECTS.filter((s) => s.modes.includes('chaos'));
const ABSURD_PROBLEMS = PROBLEMS.filter((p) => p.realism === 'absurd');
const REALISH_PROBLEMS = PROBLEMS.filter((p) => p.realism === 'real');
const ABSURD_OBJECTIVES = OBJECTIVES.filter((o) => o.realism === 'absurd');
const REALISH_OBJECTIVES = OBJECTIVES.filter((o) => o.realism === 'real');

/** Shuffle bags keep consecutive spins from repeating. */
const bags = {
  real: new ShuffleBag(REAL_CASES),
  extended: new ShuffleBag(EXTENDED_CASES),
  chaosSubject: new ShuffleBag(CHAOS_SUBJECTS),
  absurdProblem: new ShuffleBag(ABSURD_PROBLEMS),
  absurdObjective: new ShuffleBag(ABSURD_OBJECTIVES),
};

const FINDING_OPENERS = [
  'After an exhaustive review',
  'Following a thorough site visit',
  'Upon consultation with three separate offices',
  'Having reviewed all available documentation (two pages)',
  'After careful deliberation and one long lunch',
  'Pursuant to a preliminary determination',
  'Based on the totality of the circumstances',
];

/** Rare-event odds per spin. Kept low so they stay delightful. */
export const RARE_ODDS = { jackpot: 1 / 28, alignment: 1 / 24, reorg: 1 / 12 };

export function forcedEvent(): string | null {
  try {
    return new URLSearchParams(globalThis.location?.search ?? '').get('event');
  } catch {
    return null;
  }
}

function rollRareEvent(mode: GameMode): RareEvent {
  const forced = forcedEvent();
  if (forced === 'jackpot' || forced === 'alignment') return forced;
  if (mode === 'real') return chance(RARE_ODDS.alignment) ? 'alignment' : null;
  return chance(RARE_ODDS.jackpot) ? 'jackpot' : null;
}

function caseNumber(mode: GameMode, curated?: CuratedCase): string {
  const year = new Date().getFullYear();
  const serial = String(1 + randomInt(9999)).padStart(4, '0');
  const agency = curated?.agency ?? 'APHIS';
  const suffix = mode === 'chaos' ? '-HX' : '';
  return `${agency}-${year}-${serial}${suffix}`;
}

function burdenMinutes(mode: GameMode, objective: Objective, rare: RareEvent): number {
  const ranges: Partial<Record<Objective['category'], [number, number]>> = {
    committee: [240, 960],
    paperwork: [180, 720],
    assessment: [120, 480],
    coordination: [150, 540],
  };
  const [lo, hi] = ranges[objective.category] ?? [45, 300];
  let minutes = lo + randomInt(hi - lo + 1);
  if (mode === 'chaos') minutes = Math.round(minutes * 1.6);
  if (rare) minutes = minutes * 7 + 47;
  return minutes;
}

function finding(subject: Subject): string {
  return `${pick(FINDING_OPENERS)}, the agency has determined that the subject ${pick(subject.traits)}. Nevertheless, ${pick(CONSOLATIONS)}.`;
}

function newKey(): string {
  return `${Date.now().toString(36)}-${randomInt(1_000_000).toString(36)}`;
}

function assemble(mode: GameMode, subject: Subject, problem: Problem, objective: Objective, curated?: CuratedCase): Assignment {
  const rareEvent = rollRareEvent(mode);
  return {
    key: newKey(),
    mode,
    subject,
    problem,
    objective,
    curated,
    caseNumber: caseNumber(mode, curated),
    status: rareEvent ? 'APPROVED, SUBJECT TO CONDITIONS' : pick(STATUSES),
    burdenMinutes: burdenMinutes(mode, objective, rareEvent),
    formNumber: fictionalFormNumber(),
    classification: pick(CLASSIFICATIONS),
    routing: sample(ROUTING_INITIALS, 3 + randomInt(3)),
    finding: finding(subject),
    issuedAt: Date.now(),
    rareEvent,
  };
}

function fromCase(mode: GameMode, c: CuratedCase): Assignment {
  return assemble(mode, SUBJECT_BY_ID[c.subjectId], PROBLEM_BY_ID[c.problemId], OBJECTIVE_BY_ID[c.objectiveId], c);
}

/**
 * Roll a new assignment.
 * - real / extended: select one complete curated case (never recombined).
 * - chaos: select each reel independently, weighted toward the absurd.
 */
export function rollAssignment(mode: GameMode): Assignment {
  if (mode === 'real') return fromCase(mode, bags.real.next());
  if (mode === 'extended') return fromCase(mode, bags.extended.next());
  const subject = bags.chaosSubject.next();
  const problem = chance(0.72) ? bags.absurdProblem.next() : pick(REALISH_PROBLEMS);
  const objective = chance(0.68) ? bags.absurdObjective.next() : pick(REALISH_OBJECTIVES);
  return assemble(mode, subject, problem, objective);
}

/** Random reel filler for the spinning strip. */
export function fillerFor(reel: 0 | 1 | 2, mode: GameMode): Subject | Problem | Objective {
  if (reel === 0) {
    const pool = mode === 'extended' ? SUBJECTS : SUBJECTS.filter((s) => !s.modes.every((m) => m === 'extended'));
    return pick(pool);
  }
  if (reel === 1) return pick(mode === 'chaos' ? PROBLEMS : REALISH_PROBLEMS);
  return pick(mode === 'chaos' ? OBJECTIVES : REALISH_OBJECTIVES);
}

export function toStored(a: Assignment, pun: PunResult): StoredAssignment {
  return {
    key: a.key, mode: a.mode, subjectId: a.subject.id, problemId: a.problem.id, objectiveId: a.objective.id,
    curatedId: a.curated?.id, caseNumber: a.caseNumber, status: a.status, burdenMinutes: a.burdenMinutes,
    formNumber: a.formNumber, classification: a.classification, routing: a.routing, finding: a.finding,
    issuedAt: a.issuedAt, pun,
  };
}

export function fromStored(s: StoredAssignment): { assignment: Assignment; pun: PunResult } | null {
  const subject = SUBJECT_BY_ID[s.subjectId];
  const problem = PROBLEM_BY_ID[s.problemId];
  const objective = OBJECTIVE_BY_ID[s.objectiveId];
  if (!subject || !problem || !objective) return null;
  const curated = s.curatedId ? CURATED_CASES.find((c) => c.id === s.curatedId) : undefined;
  return {
    assignment: {
      key: s.key, mode: s.mode, subject, problem, objective, curated, caseNumber: s.caseNumber, status: s.status,
      burdenMinutes: s.burdenMinutes, formNumber: s.formNumber, classification: s.classification, routing: s.routing,
      finding: s.finding, issuedAt: s.issuedAt, rareEvent: null,
    },
    pun: s.pun,
  };
}

export function formatBurden(minutes: number): string {
  if (minutes < 120) return `${minutes} minutes`;
  const hours = minutes / 60;
  return `${minutes.toLocaleString('en-US')} minutes (≈ ${hours.toFixed(1)} hours)`;
}
