import { JARGON_CLOSERS, PUNS } from '../data/puns';
import { OFFICES } from '../data/bureaucracy';
import type { Objective, Problem, PunEntry, PunResult, Subject } from '../types';
import { chance, pick, random, randomInt } from './random';

/**
 * The Official Federal Pun Determination engine.
 *
 * 1. Score every pun against the rolled subject / problem / objective.
 * 2. Prefer bespoke (exact combination) jokes, then tailored, then templates.
 * 3. Skip anything shown recently, or already shown for this assignment.
 * 4. Fill tokens so the line references at least two parts of the assignment.
 */

export interface PunContext {
  subject: Subject;
  problem: Problem;
  objective: Objective;
}

type Tier = { score: number; specificity: PunResult['specificity'] };

function tierOf(p: PunEntry, ctx: PunContext): Tier | null {
  if (p.subjectId && p.subjectId !== ctx.subject.id) return null;
  if (p.problemId && p.problemId !== ctx.problem.id) return null;
  if (p.objectiveId && p.objectiveId !== ctx.objective.id) return null;
  if (p.problemCategory && p.problemCategory !== ctx.problem.category) return null;
  if (p.objectiveCategory && p.objectiveCategory !== ctx.objective.category) return null;

  if (p.subjectId && p.problemId && p.objectiveId) return { score: 100, specificity: 'bespoke' };
  if (p.subjectId && (p.problemCategory || p.objectiveCategory)) return { score: 60, specificity: 'tailored' };
  if (p.subjectId) return { score: 40, specificity: 'tailored' };
  if (p.problemCategory || p.objectiveCategory) return { score: 15, specificity: 'templated' };
  return { score: 5, specificity: 'templated' };
}

/** Lowercase the first letter unless the phrase starts with an acronym or proper noun-ish token. */
function sentenceCase(text: string): string {
  const firstWord = text.split(/\s/)[0];
  if (/^[A-Z0-9]{2,}/.test(firstWord) || /^U\.S\./.test(firstWord)) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function fictionalFormNumber(): string {
  const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  return `DESA-${100 + randomInt(900)}(${letters[randomInt(letters.length)].toLowerCase()})`;
}

export function fillTokens(template: string, ctx: PunContext): string {
  const filled = template
    .replace(/\{S\}/g, ctx.subject.name)
    .replace(/\{s\}/g, ctx.subject.short)
    .replace(/\{P\}/g, sentenceCase(ctx.problem.text))
    .replace(/\{O\}/g, sentenceCase(ctx.objective.text))
    .replace(/\{office\}/g, pick(OFFICES))
    .replace(/\{form\}/g, fictionalFormNumber());
  // Capitalize sentence starts that a token may have lowercased ("the snail has…").
  return capitalize(filled).replace(/([a-z)”’"][.!?]\s+)([a-z])/g, (_, p1: string, p2: string) => p1 + p2.toUpperCase());
}

export interface PunEngineOptions {
  /** Ids shown recently across all assignments; avoided when possible. */
  recent?: readonly string[];
  /** Ids already shown for this exact assignment (for REQUEST REVISED FINDING). */
  exclude?: readonly string[];
  /** Probability of appending an administrative jargon closer. */
  jargonRate?: number;
  pool?: readonly PunEntry[];
}

export function generatePun(ctx: PunContext, opts: PunEngineOptions = {}): PunResult {
  const pool = opts.pool ?? PUNS;
  const exclude = new Set(opts.exclude ?? []);
  const recent = new Set(opts.recent ?? []);

  const scored = pool
    .map((p) => ({ p, tier: tierOf(p, ctx) }))
    .filter((x): x is { p: PunEntry; tier: Tier } => x.tier !== null && !exclude.has(x.p.id));

  // Prefer fresh lines; fall back to recently used ones; finally allow anything for this context.
  let candidates = scored.filter((x) => !recent.has(x.p.id));
  if (candidates.length === 0) candidates = scored;
  if (candidates.length === 0) {
    candidates = pool
      .map((p) => ({ p, tier: tierOf(p, ctx) }))
      .filter((x): x is { p: PunEntry; tier: Tier } => x.tier !== null);
  }

  // Group by score, highest first. Usually take the top tier; sometimes dip one
  // tier lower so revised findings and repeat combos stay varied.
  const scores = [...new Set(candidates.map((c) => c.tier.score))].sort((a, b) => b - a);
  let chosenScore = scores[0];
  if (scores.length > 1) {
    const dip = scores[0] >= 100 ? 0.15 : 0.3;
    if (random() < dip) chosenScore = scores[1];
  }
  const tier = candidates.filter((c) => c.tier.score === chosenScore);
  const { p, tier: t } = pick(tier);

  let text = fillTokens(p.text, ctx);
  const jargonRate = opts.jargonRate ?? (t.specificity === 'bespoke' ? 0.12 : 0.28);
  if (chance(jargonRate)) text = `${text} ${pick(JARGON_CLOSERS)}`;

  return { id: p.id, text, specificity: t.specificity };
}

/** Count how many lines could possibly match a context. Useful for tests and UI hints. */
export function countMatches(ctx: PunContext, pool: readonly PunEntry[] = PUNS): number {
  return pool.filter((p) => tierOf(p, ctx) !== null).length;
}
