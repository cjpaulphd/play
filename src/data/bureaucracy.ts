import type { TriviaItem } from '../types';

/** Fictional administrative statuses. All jokes. */
export const STATUSES: string[] = [
  'PENDING ADDITIONAL DOCUMENTATION',
  'AWAITING SUPERVISORY CONCURRENCE',
  'UNDER ADVISEMENT',
  'REFERRED TO A WORKING GROUP',
  'APPROVED IN PRINCIPLE',
  'TABLED UNTIL AFTER LUNCH',
  'ROUTED FOR SIGNATURE (3 OF 11)',
  'IN CLEARANCE',
  'CONDITIONALLY CONDITIONAL',
  'RETURNED FOR FORMATTING',
  'OPEN — INDEFINITELY',
  'ESCALATED TO REGIONAL',
  'DE-ESCALATED TO LOCAL',
  'ACKNOWLEDGED WITH CONCERN',
  'RECEIVED, STAMPED AND ADMIRED',
  'ON HOLD FOR FISCAL YEAR-END',
  'LOST IN INTEROFFICE MAIL (FOUND)',
  'UNDER REVIEW BY THE REVIEWERS’ REVIEWER',
  'MARKED “URGENT” BY SOMEONE',
  'AWAITING WET SIGNATURE',
  'PENDING STAKEHOLDER INPUT',
  'APPROVED, SUBJECT TO CONDITIONS',
  'UNDER OIRA REVIEW (DAY 89 OF 90)',
  'AWAITING SENSITIVITY ANALYSIS',
  'RETURNED: BASELINE UNCLEAR',
  'PENDING ELASTICITY ESTIMATE',
  'DISCOUNTED',
];

/** Rotating messages shown on the machine display while reels spin. */
export const LOADING_MESSAGES: string[] = [
  'Consulting the Federal Register…',
  'Awaiting supervisory concurrence…',
  'Determining jurisdiction…',
  'Locating the correct form…',
  'Locating the form for the correct form…',
  'Convening a quorum…',
  'Checking the regulatory definition of “thing”…',
  'Calibrating the inspection light…',
  'Refilling the stamp pad…',
  'Routing for signature…',
  'Requesting a cost center…',
  'Searching for the stapler…',
  'Scheduling a pre-meeting…',
  'Asking the beagle…',
  'Faxing the regional office…',
  'Reconciling conflicting highlighters…',
  'Applying Section 7(b)(iii)…',
  'Opening a ticket with IT…',
  'Measuring the asparagus…',
  'Interviewing the snail…',
  'Reviewing the review…',
  'Waiting for the elevator…',
  'Discounting future snails…',
  'Monetizing intangible benefits…',
  'Selecting a baseline…',
  'Re-selecting the baseline…',
  'Running Monte Carlo (iteration 9,412 of 10,000)…',
  'Checking the $100 million threshold…',
  'Consulting Circular A-4 (which one?)…',
  'Estimating willingness to pay…',
  'Converting to 2026 dollars…',
  'Annualizing…',
  'Computing the deadweight loss…',
  'Asking PPD…',
];

export const CLASSIFICATIONS: string[] = [
  'UNCLASSIFIED // FOR OFFICIAL SNACK ONLY',
  'SENSITIVE BUT UNSURPRISING',
  'CONTROLLED UNCLASSIFIED INFORMATION (MILDLY)',
  'FOR OFFICIAL USE AND MILD AMUSEMENT',
  'UNCLASSIFIED // EXTREMELY SPECIFIC',
  'NOT FOR DISTRIBUTION',
  'EYES ONLY (ALSO NOSES — SEE BEAGLE)',
];

/** Fictional offices. None of these are real organizational units. */
export const OFFICES: string[] = [
  'the Office of Ongoing Review',
  'the Division of Further Clarification',
  'the Bureau of Extremely Specific Affairs',
  'the Office of Interim Permanence',
  'Regional Office 7-B',
  'the Directorate of Forms and Formality',
  'the Office of Committees and Additional Committees',
  'the Subdivision of Supplemental Subdivisions',
  'the Office of the Deputy Assistant to the Assistant Deputy',
  'the Center for Advanced Stapling',
  'the Office of Counterfactual Baselines',
  'the Division of Sensitivity Analysis (very sensitive)',
];

export const ROUTING_INITIALS: string[] = [
  'OOR', 'DFC', 'BESA', 'OIP', 'RO-7B', 'DFF', 'OCAC', 'SSS', 'ODAAD', 'CAS', 'OGC-ish', 'FYI',
];

/** Completes "Nevertheless, ___." in the Official Finding. */
export const CONSOLATIONS: string[] = [
  'expedited review has been authorized',
  'the matter has been assigned a very official-looking folder',
  'the agency remains cautiously optimistic',
  'a strongly worded memo is in draft',
  'the case will proceed to the next phase, pending a determination of what the next phase is',
  'all parties have been thanked for their patience',
  'staff have been reminded that this is, in fact, the job',
  'a working lunch has been scheduled',
  'the agency will continue to monitor the situation closely, possibly with binoculars',
  'everyone involved is doing their best, and it shows',
];

/** Rare-event banner copy. */
export const RARE_EVENTS = {
  jackpot: {
    title: 'INTERAGENCY JACKPOT',
    subtitle: 'Seven offices agree on something. Historians have been notified.',
  },
  alignment: {
    title: 'EMERGENCY REGULATORY ALIGNMENT',
    subtitle: 'All three reels have achieved consensus. This has never happened before, and may be a clerical error.',
  },
  pareto: {
    title: 'PARETO IMPROVEMENT',
    subtitle: 'Everyone is better off and no one is worse off. The economists have requested a recount.',
  },
  reorg: {
    title: 'AGENCY REORGANIZATION IN PROGRESS',
    subtitle: 'Reel responsibilities are being realigned. Your assignment is unaffected. Probably.',
  },
} as const;

/** Office of Committees and Additional Committees — Easter egg generator parts. */
export const COMMITTEE_PARTS = {
  kinds: ['Standing Committee', 'Ad Hoc Working Group', 'Blue-Ribbon Panel', 'Subcommittee', 'Interagency Task Force', 'Steering Committee', 'Advisory Council', 'Tiger Team'],
  on: [
    'Committee Formation', 'the Review of Reviews', 'Meeting Cadence', 'Seating Arrangements', 'Snack Adequacy',
    'Acronym Harmonization', 'the Definition of “Reasonable”', 'Font Selection', 'Lanyard Colors',
    'Further Subcommittees', 'Ad Hoc Permanence', 'Agenda Pre-Planning', 'Minutes About Minutes',
    'Conference Room Allocation', 'Stapler Custody', 'Strategic Vision Statements',
  ],
  status: ['currently forming', 'in recess', 'on its 14th charter', 'awaiting a quorum', 'reviewing itself', 'about to be reorganized', 'meeting right now', 'technically dissolved, still meeting'],
};

export const COMMITTEE_ORG_CHART: string[] = [
  'Committee on Committees',
  'Working Group on the Social Discount Rate (2, 3 or 7 Percent, Pending)',
  'Subcommittee to Review the Committee on Committees',
  'Joint Working Group on Subcommittee Oversight',
  'Ad Hoc Panel on Whether This Needs a Panel',
  'Standing Committee on Seating (seated)',
];

/**
 * Official Regulatory Trivia. Factual, concise, sourced.
 * Shown every few spins. Keep jokes out.
 */
export const TRIVIA: TriviaItem[] = [
  { id: 't-mission', text: 'APHIS’s mission is to protect the health and value of American agriculture and natural resources.', sourceId: 'aphis-mission' },
  { id: 't-about', text: 'Beyond animal and plant health, APHIS programs address animal welfare, biotechnology, wildlife damage management and global trade.', sourceId: 'aphis-about' },
  { id: 't-dogs', text: 'The National Detector Dog Training Center in Newnan, Georgia, started in 1984 with one dog and one trainer.', sourceId: 'dogs' },
  { id: 't-jb', text: 'The Japanese beetle quarantine protects nine western states — Arizona, California, Colorado, Idaho, Montana, Nevada, Oregon, Utah and Washington — from beetles arriving by aircraft.', sourceId: 'jb' },
  { id: 't-medfly', text: 'Medfly infestations in California have dropped by more than 90% since sterile fly preventive releases began over the Los Angeles Basin.', sourceId: 'medfly' },
  { id: 't-ispm', text: 'Heat-treated wood packaging must reach a core temperature of at least 56 °C for at least 30 minutes to meet ISPM 15.', sourceId: 'wpm' },
  { id: 't-gas', text: 'Giant African snails have been eradicated from Miami twice: once in 1975 and again in 2021.', sourceId: 'gas' },
  { id: 't-bts', text: 'On parts of Guam, local estimates have put brown treesnake densities at 20 or more snakes per acre of jungle.', sourceId: 'bts' },
  { id: 't-pollen', text: 'Pollen collected by bees and intended as bee feed cannot be imported into the United States.', sourceId: 'bees' },
  { id: 't-swine', text: 'APHIS reports that feral swine have been eliminated from 11 states since its national program began in 2014.', sourceId: 'swine-history' },
  { id: 't-rabies', text: 'APHIS estimates that rabies detection, prevention and control may cost more than $500 million a year in the United States.', sourceId: 'orv' },
  { id: 't-khapra', text: 'Most khapra beetle interceptions at U.S. ports of entry are found in passenger baggage.', sourceId: 'khapra' },
  { id: 't-nws', text: 'The only operating New World screwworm sterile fly production plant in North America is in Panama, jointly run by USDA and Panama.', sourceId: 'nws-facilities' },
  { id: 't-birds', text: 'Pet birds of non-U.S. origin generally complete a 30-day quarantine at a USDA Animal Import Center in New York or Florida.', sourceId: 'pet-birds' },
  { id: 't-bird-label', text: 'Under 9 CFR § 3.164, in-transit food and water instructions must be attached to the outside of a bird’s shipping enclosure.', sourceId: 'cfr-3-164' },
  { id: 't-asparagus', text: 'Not APHIS: under the AMS standard for asparagus for processing, a U.S. No. 1 spear may be no more than 7½ inches long.', sourceId: 'ams-asparagus-proc' },
  { id: 't-smokey', text: 'Not APHIS: Smokey Bear’s name and image are protected by a 1952 act of Congress and administered by the U.S. Forest Service.', sourceId: 'usfs-smokey' },
  { id: 't-bonsai', text: 'Not APHIS: the National Bonsai & Penjing Museum began with 53 bonsai given to the United States for the 1976 Bicentennial.', sourceId: 'ars-bonsai' },
  { id: 't-cites', text: 'CITES-listed plants entering the United States must come through a designated port, and APHIS operates plant inspection stations to examine them.', sourceId: 'cites' },
  { id: 't-ppd', text: 'Within APHIS, Policy and Program Development provides policy analysis and budgetary and regulatory development for the agency.', sourceId: 'aphis-org' },
  { id: 't-rulemaking', text: 'APHIS rulemaking guidance calls for a proposed rule’s Federal Register summary to include an analysis of its expected economic effects.', sourceId: 'aphis-rulemaking' },
  { id: 't-12866', text: 'Executive Order 12866 treats a rule with an annual effect on the economy of $100 million or more as a significant regulatory action that warrants a fuller benefit-cost analysis.', sourceId: 'eo-12866' },
  { id: 't-a4', text: 'OMB’s 2003 Circular A-4 told agencies to report benefits and costs at both 3% and 7% discount rates. A 2023 revision moved to a 2% default; a 2025 directive called for returning to the 2003 version.', sourceId: 'a4-2003' },
  { id: 't-rfa', text: 'Under the Regulatory Flexibility Act, agencies must analyze a proposed rule’s effects on small entities, or certify that it will not have a significant impact on a substantial number of them.', sourceId: 'rfa' },
  { id: 't-swine-cost', text: 'Feral swine cause an estimated $2.5 billion in damages and control costs in the United States each year, according to APHIS’s National Wildlife Research Center.', sourceId: 'swine-nwrc' },
  { id: 't-hawaii', text: 'APHIS inspects passenger bags traveling from Hawaii to the U.S. mainland, Alaska and Guam before departure.', sourceId: 'hawaii' },
];
