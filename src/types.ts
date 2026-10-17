/**
 * Core domain types for the APHIS Assignment Machine.
 * Content lives in src/data; logic lives in src/lib. Keep them apart.
 */

export type GameMode = 'real' | 'ppd' | 'chaos' | 'extended';

/** Every illustration the reels and case file can draw. See src/illustrations. */
export type IconId =
  // organisms & things
  | 'snail' | 'treesnake' | 'lanternfly' | 'beetle' | 'swine' | 'queenbee' | 'psyllid'
  | 'screwworm' | 'parrot' | 'horse' | 'cow' | 'alpaca' | 'starling' | 'raccoon'
  | 'fruitfly' | 'petunia' | 'orchid' | 'citrus' | 'woodborer' | 'bumblebee' | 'beagle'
  | 'papaya' | 'khapra' | 'asparagus' | 'egg' | 'rangerhat' | 'bonsai' | 'pinetree'
  // problems & objectives
  | 'truck' | 'documents' | 'plane' | 'pallet' | 'map' | 'magnifier' | 'biohazard'
  | 'dictionary' | 'gavel' | 'clipboard' | 'phone' | 'stamp' | 'ship' | 'eggmass'
  | 'snack' | 'passport' | 'meeting' | 'binder' | 'committee' | 'calendar' | 'chart'
  | 'shield' | 'permit' | 'microscope' | 'fence' | 'megaphone' | 'stopwatch' | 'luggage'
  | 'vaccine' | 'sterile' | 'scale' | 'ruler' | 'question' | 'goldfish'
  | 'calculator' | 'curve' | 'storefront';

export type SubjectCategory =
  | 'insect' | 'mollusk' | 'reptile' | 'bird' | 'mammal' | 'livestock'
  | 'plant' | 'pollinator' | 'produce' | 'material' | 'canine' | 'icon';

export type ProblemCategory =
  | 'movement'       // things going places they should not
  | 'documentation'  // paperwork, permits, certificates
  | 'biosecurity'    // disease, pests, contamination
  | 'welfare'        // feeding, transport conditions
  | 'jurisdiction'   // who is in charge here, exactly
  | 'semantics'      // definitional crises
  | 'behavior'       // the subject is being difficult
  | 'standards'      // grades, sizes, appearance
  | 'economics';     // benefit-cost analysis and its discontents

export type ObjectiveCategory =
  | 'assessment'
  | 'containment'
  | 'permitting'
  | 'coordination'
  | 'paperwork'
  | 'committee'
  | 'compliance'
  | 'outreach'
  | 'economics';

/** How grounded a reel entry is. Absurd entries never appear in Surprisingly Real mode. */
export type Realism = 'real' | 'absurd';

/** USDA mission areas/agencies referenced by the app. */
export type AgencyCode = 'APHIS' | 'AMS' | 'ARS' | 'USFS';

export interface Subject {
  id: string;
  name: string;
  /** Short, lowercase form used inside sentences ("the snail"). */
  short: string;
  icon: IconId;
  category: SubjectCategory;
  scientificName?: string;
  /** Which modes may roll this subject. */
  modes: GameMode[];
  tags: string[];
  /**
   * Clauses that complete "the agency has determined that the subject ___."
   * Used for the Official Finding. Written as jokes.
   */
  traits: string[];
}

export interface Problem {
  id: string;
  text: string;
  icon: IconId;
  category: ProblemCategory;
  realism: Realism;
  tags: string[];
}

export interface Objective {
  id: string;
  text: string;
  icon: IconId;
  category: ObjectiveCategory;
  realism: Realism;
  tags: string[];
}

export interface SourceRecord {
  id: string;
  title: string;
  publisher: string;
  url: string;
}

/**
 * A complete, verified combination. In Surprisingly Real and Extended modes the
 * machine selects whole cases; it never recombines their parts.
 */
export interface CuratedCase {
  id: string;
  mode: 'real' | 'extended';
  agency: AgencyCode;
  /** Program or office, e.g. "Plant Protection and Quarantine". */
  program: string;
  subjectId: string;
  problemId: string;
  objectiveId: string;
  /** Short factual explanation. Facts only — no jokes in this field. */
  fact: string;
  /** An especially obscure-but-true regulatory detail, for "Did you really just regulate that?" */
  obscureDetail?: string;
  sourceIds: string[];
  /** A real, sourced economic figure or requirement — the PPD footnote. */
  econNote?: { text: string; sourceIds: string[] };
}

export interface TriviaItem {
  id: string;
  text: string;
  sourceId: string;
}

export interface PunEntry {
  id: string;
  /**
   * Template text. Tokens: {S} subject name, {s} subject short form,
   * {P} problem (lowercase), {O} objective (lowercase), {office}, {form}.
   */
  text: string;
  subjectId?: string;
  problemId?: string;
  objectiveId?: string;
  problemCategory?: ProblemCategory;
  objectiveCategory?: ObjectiveCategory;
  /** Restrict to a mode family. Omitted = any. */
  modes?: GameMode[];
  /** Economics-flavored lines get a boost in PPD Economic Analysis mode. */
  flavor?: 'econ';
}

export type RareEvent = 'jackpot' | 'alignment' | 'pareto' | null;

/** A fully rolled assignment, ready for the case file. */
export interface Assignment {
  key: string; // unique per spin
  mode: GameMode;
  subject: Subject;
  problem: Problem;
  objective: Objective;
  curated?: CuratedCase;
  caseNumber: string;
  status: string;
  burdenMinutes: number;
  formNumber: string;
  classification: string;
  routing: string[];
  finding: string;
  issuedAt: number;
  rareEvent: RareEvent;
}

export interface PunResult {
  id: string;
  text: string;
  /** How specifically the pun matched; shown as a tiny "confidence" joke. */
  specificity: 'bespoke' | 'tailored' | 'templated';
}

/** Compact form for localStorage. */
export interface StoredAssignment {
  key: string;
  mode: GameMode;
  subjectId: string;
  problemId: string;
  objectiveId: string;
  curatedId?: string;
  caseNumber: string;
  status: string;
  burdenMinutes: number;
  formNumber: string;
  classification: string;
  routing: string[];
  finding: string;
  issuedAt: number;
  pun: PunResult;
}
