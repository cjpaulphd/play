import { describe, expect, it } from 'vitest';
import { CURATED_CASES } from '../data/cases';
import { OBJECTIVES, OBJECTIVE_BY_ID } from '../data/objectives';
import { PROBLEMS, PROBLEM_BY_ID } from '../data/problems';
import { PUNS } from '../data/puns';
import { SOURCE_BY_ID, SOURCES } from '../data/sources';
import { SUBJECTS, SUBJECT_BY_ID } from '../data/subjects';
import { TRIVIA } from '../data/bureaucracy';
import { rollAssignment } from '../lib/assignment';
import { countMatches, generatePun } from '../lib/punEngine';
import { randomInt, shuffle, ShuffleBag } from '../lib/random';

describe('content minimums', () => {
  it('meets the requested sizes', () => {
    expect(SUBJECTS.length).toBeGreaterThanOrEqual(25);
    expect(PROBLEMS.length).toBeGreaterThanOrEqual(30);
    expect(OBJECTIVES.length).toBeGreaterThanOrEqual(30);
    expect(PUNS.length).toBeGreaterThanOrEqual(60);
  });

  it('has unique ids', () => {
    for (const list of [SUBJECTS, PROBLEMS, OBJECTIVES, PUNS, SOURCES, CURATED_CASES, TRIVIA]) {
      const ids = list.map((x) => x.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

describe('curated cases', () => {
  it('reference existing reels and sources', () => {
    for (const c of CURATED_CASES) {
      expect(SUBJECT_BY_ID[c.subjectId], c.id).toBeDefined();
      expect(PROBLEM_BY_ID[c.problemId], c.id).toBeDefined();
      expect(OBJECTIVE_BY_ID[c.objectiveId], c.id).toBeDefined();
      expect(c.sourceIds.length, c.id).toBeGreaterThan(0);
      for (const s of c.sourceIds) expect(SOURCE_BY_ID[s], `${c.id} → ${s}`).toBeDefined();
    }
  });

  it('never use absurd reel entries', () => {
    for (const c of CURATED_CASES) {
      expect(PROBLEM_BY_ID[c.problemId].realism).toBe('real');
      expect(OBJECTIVE_BY_ID[c.objectiveId].realism).toBe('real');
    }
  });

  it('each have at least two bespoke puns', () => {
    for (const c of CURATED_CASES) {
      const bespoke = PUNS.filter((p) => p.subjectId === c.subjectId && p.problemId === c.problemId && p.objectiveId === c.objectiveId);
      expect(bespoke.length, c.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('extended cases are attributed to a non-APHIS agency', () => {
    for (const c of CURATED_CASES.filter((x) => x.mode === 'extended')) expect(c.agency).not.toBe('APHIS');
  });

  it('trivia cites known sources and uses https', () => {
    for (const t of TRIVIA) expect(SOURCE_BY_ID[t.sourceId], t.id).toBeDefined();
    for (const s of SOURCES) expect(s.url.startsWith('https://')).toBe(true);
  });
});

describe('random', () => {
  it('randomInt stays in range and covers it', () => {
    const seen = new Set<number>();
    for (let i = 0; i < 2000; i++) {
      const n = randomInt(7);
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThan(7);
      seen.add(n);
    }
    expect(seen.size).toBe(7);
  });

  it('shuffle is a permutation', () => {
    const a = [1, 2, 3, 4, 5, 6];
    expect(shuffle(a).sort()).toEqual(a);
  });

  it('ShuffleBag yields every item once per cycle', () => {
    const bag = new ShuffleBag(['a', 'b', 'c', 'd']);
    const cycle = Array.from({ length: 4 }, () => bag.next());
    expect(new Set(cycle).size).toBe(4);
  });
});

describe('assignments', () => {
  it('real mode only returns complete curated cases', () => {
    for (let i = 0; i < 100; i++) {
      const a = rollAssignment('real');
      expect(a.curated).toBeDefined();
      expect(a.curated!.mode).toBe('real');
      expect(a.subject.id).toBe(a.curated!.subjectId);
      expect(a.problem.id).toBe(a.curated!.problemId);
      expect(a.objective.id).toBe(a.curated!.objectiveId);
    }
  });

  it('chaos mode is independent, uncurated and varied', () => {
    const subjects = new Set<string>();
    for (let i = 0; i < 200; i++) {
      const a = rollAssignment('chaos');
      expect(a.curated).toBeUndefined();
      expect(a.subject.modes).toContain('chaos');
      subjects.add(a.subject.id);
    }
    expect(subjects.size).toBeGreaterThan(20);
  });

  it('extended mode returns non-APHIS cases', () => {
    for (let i = 0; i < 20; i++) expect(rollAssignment('extended').curated!.agency).not.toBe('APHIS');
  });
});

describe('pun engine', () => {
  it('prefers bespoke puns for curated combinations', () => {
    for (const c of CURATED_CASES) {
      const ctx = { subject: SUBJECT_BY_ID[c.subjectId], problem: PROBLEM_BY_ID[c.problemId], objective: OBJECTIVE_BY_ID[c.objectiveId] };
      const results = Array.from({ length: 20 }, () => generatePun(ctx, { jargonRate: 0 }));
      expect(results.filter((r) => r.specificity === 'bespoke').length, c.id).toBeGreaterThan(10);
    }
  });

  it('never leaves unresolved tokens, for any combination', () => {
    for (const subject of SUBJECTS) {
      for (let i = 0; i < 12; i++) {
        const problem = PROBLEMS[(i * 7 + subject.id.length) % PROBLEMS.length];
        const objective = OBJECTIVES[(i * 11 + subject.id.length) % OBJECTIVES.length];
        const pun = generatePun({ subject, problem, objective });
        expect(pun.text).not.toMatch(/\{[A-Za-z]+\}/);
        expect(pun.text[0]).toMatch(/[A-Z“"0-9]/);
      }
    }
  });

  it('every subject has subject-specific material', () => {
    for (const subject of SUBJECTS) {
      const ctx = { subject, problem: PROBLEMS[0], objective: OBJECTIVES[0] };
      const specific = PUNS.filter((p) => p.subjectId === subject.id);
      expect(specific.length, subject.id).toBeGreaterThanOrEqual(3);
      expect(countMatches(ctx)).toBeGreaterThan(3);
    }
  });

  it('revised findings do not repeat for the same assignment', () => {
    const c = CURATED_CASES[0];
    const ctx = { subject: SUBJECT_BY_ID[c.subjectId], problem: PROBLEM_BY_ID[c.problemId], objective: OBJECTIVE_BY_ID[c.objectiveId] };
    const shown: string[] = [];
    for (let i = 0; i < 6; i++) {
      const p = generatePun(ctx, { exclude: shown });
      expect(shown).not.toContain(p.id);
      shown.push(p.id);
    }
  });

  it('avoids recently displayed puns when alternatives exist', () => {
    const c = CURATED_CASES[1];
    const ctx = { subject: SUBJECT_BY_ID[c.subjectId], problem: PROBLEM_BY_ID[c.problemId], objective: OBJECTIVE_BY_ID[c.objectiveId] };
    const recent = PUNS.filter((p) => p.subjectId === c.subjectId && p.problemId === c.problemId).map((p) => p.id).slice(0, 2);
    for (let i = 0; i < 30; i++) expect(recent).not.toContain(generatePun(ctx, { recent }).id);
  });
});

describe('PPD economic analysis', () => {
  it('ppd mode is uncurated, labeled, and leans on economics', async () => {
    let econObjectives = 0;
    for (let i = 0; i < 200; i++) {
      const a = rollAssignment('ppd');
      expect(a.curated).toBeUndefined();
      expect(a.caseNumber).toMatch(/-BCA$/);
      if (a.objective.category === 'economics') econObjectives++;
    }
    expect(econObjectives).toBeGreaterThan(120);
  });

  it('prefers econ-flavored puns in ppd mode', () => {
    const subject = SUBJECT_BY_ID.swine;
    const ctx = { subject, problem: PROBLEMS.find((p) => p.id === 'p-snacks')!, objective: OBJECTIVES.find((o) => o.id === 'o-lanyard')! };
    const econIds = new Set(PUNS.filter((p) => p.flavor === 'econ').map((p) => p.id));
    const ppd = Array.from({ length: 60 }, () => generatePun(ctx, { mode: 'ppd' })).filter((r) => econIds.has(r.id)).length;
    const chaos = Array.from({ length: 60 }, () => generatePun(ctx, { mode: 'chaos' })).filter((r) => econIds.has(r.id)).length;
    expect(ppd).toBeGreaterThan(chaos);
    expect(ppd).toBeGreaterThan(30);
  });
});
