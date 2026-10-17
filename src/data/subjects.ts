import type { Subject } from '../types';

const ALL: Subject['modes'] = ['real', 'chaos'];

/**
 * Reel 1: SPECIES / SUBJECT.
 * `traits` complete the sentence "the agency has determined that the subject ___."
 */
export const SUBJECTS: Subject[] = [
  {
    id: 'gas', name: 'Giant African Snail', short: 'the snail', icon: 'snail', category: 'mollusk',
    scientificName: 'Lissachatina fulica', modes: ALL, tags: ['slow', 'shell', 'invasive', 'plant-pest'],
    traits: [
      'is proceeding at a snail’s pace, which is technically within policy',
      'has retreated into its shell and is not taking questions at this time',
      'has left a clearly documented trail, which is more than most applicants provide',
    ],
  },
  {
    id: 'bts', name: 'Brown Treesnake', short: 'the treesnake', icon: 'treesnake', category: 'reptile',
    scientificName: 'Boiga irregularis', modes: ALL, tags: ['guam', 'cargo', 'stowaway', 'invasive'],
    traits: [
      'was not listed on the manifest and does not appear sorry about it',
      'has been coiled around the landing gear for an unauthorized duration',
      'answered every interview question with a single, sustained hiss',
    ],
  },
  {
    id: 'slf', name: 'Spotted Lanternfly', short: 'the lanternfly', icon: 'lanternfly', category: 'insect',
    scientificName: 'Lycorma delicatula', modes: ALL, tags: ['hitchhiker', 'eggs', 'vehicle', 'invasive'],
    traits: [
      'is extremely well dressed for a regulatory problem',
      'has been hitchhiking without a valid thumb',
      'laid eggs on a state vehicle, which is frankly a little personal',
    ],
  },
  {
    id: 'jb', name: 'Japanese Beetle', short: 'the beetle', icon: 'beetle', category: 'insect',
    scientificName: 'Popillia japonica', modes: ALL, tags: ['aircraft', 'quarantine', 'western-states'],
    traits: [
      'attempted to board in Group 1 without status',
      'has a metallic sheen that does not constitute official credentials',
      'is in the overhead bin and believes no one noticed',
    ],
  },
  {
    id: 'swine', name: 'Feral Swine', short: 'the hog', icon: 'swine', category: 'livestock',
    scientificName: 'Sus scrofa', modes: ALL, tags: ['damage', 'wildlife', 'rooting', 'pig'],
    traits: [
      'has rooted up the cornfield, the fence line and, somehow, the filing cabinet',
      'is hogging the agenda',
      'has declined all offers of a mediated settlement',
    ],
  },
  {
    id: 'queen', name: 'Honey Bee Queen', short: 'Her Majesty', icon: 'queenbee', category: 'pollinator',
    scientificName: 'Apis mellifera', modes: ALL, tags: ['royal', 'import', 'bee', 'buzz'],
    traits: [
      'travels with a full retinue of attendants, all of whom require documentation',
      'does not recognize the jurisdiction of this office',
      'has requested that all correspondence be addressed to “Your Majesty”',
    ],
  },
  {
    id: 'acp', name: 'Asian Citrus Psyllid', short: 'the psyllid', icon: 'psyllid', category: 'insect',
    scientificName: 'Diaphorina citri', modes: ALL, tags: ['citrus', 'greening', 'vector', 'tiny'],
    traits: [
      'is roughly the size of the font used in the regulations',
      'insists the “psy” is silent and the threat is not',
      'has been tilting at a 45-degree angle, which inspectors find suspicious',
    ],
  },
  {
    id: 'nws', name: 'New World Screwworm Fly', short: 'the screwworm', icon: 'screwworm', category: 'insect',
    scientificName: 'Cochliomyia hominivorax', modes: ALL, tags: ['livestock', 'sterile', 'border', 'fly'],
    traits: [
      'has a name that makes the entire hallway uncomfortable',
      'was last seen heading north with no evident respect for the border',
      'has been informed that a much larger number of sterile flies is on the way',
    ],
  },
  {
    id: 'parrot', name: 'Parrot', short: 'the parrot', icon: 'parrot', category: 'bird',
    modes: ALL, tags: ['bird', 'talks', 'transport', 'cracker'],
    traits: [
      'has repeated everything said during the inspection, including the off-the-record parts',
      'wants a cracker and has submitted no supporting documentation',
      'is fully cooperative but will not stop saying “Hello, Inspector”',
    ],
  },
  {
    id: 'horse', name: 'Imported Stallion', short: 'the stallion', icon: 'horse', category: 'livestock',
    modes: ALL, tags: ['horse', 'import', 'quarantine', 'equine'],
    traits: [
      'is not horsing around and would like that noted in the record',
      'has a stronger pedigree than anyone on the review panel',
      'considers the quarantine paddock beneath his station',
    ],
  },
  {
    id: 'cattle', name: 'Lactating Dairy Cow', short: 'the cow', icon: 'cow', category: 'livestock',
    modes: ALL, tags: ['cattle', 'dairy', 'interstate', 'milk'],
    traits: [
      'has mooed in a tone the agency characterizes as “passive-aggressive”',
      'has been standing in the same spot since the last fiscal year',
      'is udderly unconcerned with the timeline',
    ],
  },
  {
    id: 'alpaca', name: 'Alpaca', short: 'the alpaca', icon: 'alpaca', category: 'livestock',
    modes: ['chaos'], tags: ['fluffy', 'spit', 'llama-adjacent'],
    traits: [
      'is not a llama and has asked that this be corrected in all prior filings',
      'spat on the clipboard, which has been entered into evidence',
      'is significantly fluffier than the regulations anticipated',
    ],
  },
  {
    id: 'starling', name: 'European Starling', short: 'the starling', icon: 'starling', category: 'bird',
    modes: ALL, tags: ['bird', 'flock', 'feedlot', 'invasive'],
    traits: [
      'arrived with approximately four thousand colleagues and no meeting invite',
      'is mimicking the inspector’s ringtone',
      'has formed a murmuration, which is not a recognized administrative body',
    ],
  },
  {
    id: 'raccoon', name: 'Raccoon', short: 'the raccoon', icon: 'raccoon', category: 'mammal',
    modes: ALL, tags: ['rabies', 'bait', 'nocturnal', 'mask'],
    traits: [
      'is wearing a mask, which raises questions of identity verification',
      'washed the evidence before submitting it',
      'only responds to correspondence after 9 p.m.',
    ],
  },
  {
    id: 'medfly', name: 'Mediterranean Fruit Fly', short: 'the medfly', icon: 'fruitfly', category: 'insect',
    scientificName: 'Ceratitis capitata', modes: ALL, tags: ['fruit', 'sterile', 'california', 'fly'],
    traits: [
      'is hovering near the fruit bowl in a manner described as “premeditated”',
      'has expressed interest in more than 250 host fruits and vegetables, which seems greedy',
      'has been fruitlessly searching for a mate who isn’t sterile',
    ],
  },
  {
    id: 'petunia', name: 'Genetically Engineered Petunia', short: 'the petunia', icon: 'petunia', category: 'plant',
    modes: ALL, tags: ['ge', 'orange', 'flower', 'biotech'],
    traits: [
      'is suspiciously, unauthorizedly orange',
      'has been blooming without a permit for an extended period',
      'claims to be “just naturally like this”',
    ],
  },
  {
    id: 'orchid', name: 'Exotic Orchid', short: 'the orchid', icon: 'orchid', category: 'plant',
    modes: ALL, tags: ['cites', 'import', 'rare', 'flower'],
    traits: [
      'is far too beautiful to be this much paperwork',
      'requires a humidity level that the break room cannot provide',
      'has arrived in an approved growing medium and a disapproving mood',
    ],
  },
  {
    id: 'citrus', name: 'Citrus Tree', short: 'the citrus tree', icon: 'citrus', category: 'plant',
    modes: ALL, tags: ['citrus', 'greening', 'nursery', 'orange'],
    traits: [
      'has been feeling a little green, and not in the good way',
      'is putting down roots in a quarantined county',
      'has become the zest-ination for several unauthorized insects',
    ],
  },
  {
    id: 'borer', name: 'Wood-Boring Insect', short: 'the borer', icon: 'woodborer', category: 'insect',
    modes: ALL, tags: ['wood', 'pallet', 'ispm15', 'larva'],
    traits: [
      'has been described by colleagues as “boring,” a characterization it accepts with pride',
      'has tunneled into the pallet and the fiscal year',
      'is living rent-free in an unstamped crate',
    ],
  },
  {
    id: 'bumblebee', name: 'Bumblebee', short: 'the bumblebee', icon: 'bumblebee', category: 'pollinator',
    modes: ALL, tags: ['bee', 'greenhouse', 'pollination', 'buzz'],
    traits: [
      'is aerodynamically improbable and administratively more so',
      'has been bumbling around the greenhouse in an official capacity',
      'is not a honey bee and is tired of the comparisons',
    ],
  },
  {
    id: 'beagle', name: 'Agricultural Detector Beagle', short: 'the beagle', icon: 'beagle', category: 'canine',
    modes: ALL, tags: ['dog', 'detector', 'luggage', 'sniff'],
    traits: [
      'has located the sandwich and is awaiting a decision on its disposition',
      'is a very good dog and the record should reflect that',
      'has sniffed out three mangoes, two sausages and one unresolved policy question',
    ],
  },
  {
    id: 'papaya', name: 'Fresh Hawaiian Papaya', short: 'the papaya', icon: 'papaya', category: 'produce',
    modes: ALL, tags: ['hawaii', 'fruit', 'luggage', 'treatment'],
    traits: [
      'was packed between two aloha shirts in an apparent attempt at camouflage',
      'is ripe, fragrant and absolutely going through inspection first',
      'has expressed a strong preference for remaining in paradise',
    ],
  },
  {
    id: 'khapra', name: 'Khapra Beetle', short: 'the khapra beetle', icon: 'khapra', category: 'insect',
    scientificName: 'Trogoderma granarium', modes: ALL, tags: ['stored-product', 'grain', 'luggage', 'hardy'],
    traits: [
      'can reportedly go a very long time without eating, unlike the review committee',
      'is hiding in a bag of rice and believes it is winning',
      'has been described as “hardy,” “persistent” and “honestly kind of impressive”',
    ],
  },
  {
    id: 'pallet', name: 'Wooden Shipping Pallet', short: 'the pallet', icon: 'pallet', category: 'material',
    modes: ['chaos'], tags: ['wood', 'ispm15', 'stamp', 'cargo'],
    traits: [
      'is load-bearing but not, it turns out, burden-bearing',
      'is not technically an organism but has been very difficult anyway',
      'bears a stamp that nobody in the office can fully read',
    ],
  },
  {
    id: 'goldfish', name: 'Office Goldfish Named “Regulation”', short: 'the goldfish', icon: 'goldfish', category: 'icon',
    modes: ['chaos'], tags: ['office', 'pet', 'fish'],
    traits: [
      'has outlived three reorganizations and two supervisors',
      'has been the only consistent attendee at the Tuesday meeting',
      'is swimming in circles, which the committee recognizes as a best practice',
    ],
  },
  // ---------- Regulatory economics (PPD) ----------
  {
    id: 'proposed-rule', name: 'Proposed Rule', short: 'the proposed rule', icon: 'documents', category: 'material',
    modes: ['real', 'chaos', 'ppd'], tags: ['rulemaking', 'econ', 'federal-register'],
    traits: [
      'has a preamble longer than most novels and a better plot twist in Section IV',
      'is open for public comment, and the public has comments',
      'has been read in its entirety by exactly one economist, who would like a nap',
    ],
  },
  {
    id: 'small-entity', name: 'Representative Small Entity', short: 'the small entity', icon: 'storefront', category: 'icon',
    modes: ['real', 'chaos', 'ppd'], tags: ['rfa', 'econ', 'small-business'],
    traits: [
      'is small, entity-like and highly representative, which is all anyone can ask',
      'would like to know whether a snail counts as a small business',
      'has asked to be weighed, measured and size-standardized in private',
    ],
  },
  {
    id: 'discount-rate', name: 'The Social Discount Rate', short: 'the discount rate', icon: 'curve', category: 'icon',
    modes: ['chaos', 'ppd'], tags: ['econ', 'a-4', 'time'],
    traits: [
      'has been 3 and 7 percent, then 2 percent, then possibly 3 and 7 percent again, and would like some stability',
      'values the future less than the present, which is honestly relatable',
      'declined to state its preferred value pending further guidance',
    ],
  },
  {
    id: 'baseline', name: 'The Counterfactual Baseline', short: 'the baseline', icon: 'chart', category: 'icon',
    modes: ['chaos', 'ppd'], tags: ['econ', 'counterfactual'],
    traits: [
      'describes a world that never happened, in tremendous detail',
      'keeps moving every time someone looks at it',
      'insists that, absent the rule, everything would have been fine',
    ],
  },
  // ---------- USDA Extended Universe (not APHIS responsibilities) ----------
  {
    id: 'asparagus', name: 'Asparagus Spear', short: 'the spear', icon: 'asparagus', category: 'produce',
    modes: ['extended', 'chaos'], tags: ['ams', 'grade', 'diameter', 'vegetable'],
    traits: [
      'is standing at attention, as befits a candidate for U.S. No. 1',
      'measured slightly under one-half inch and has requested a recount',
      'is tall, green and absolutely certain of its own importance',
    ],
  },
  {
    id: 'egg', name: 'Shell Egg', short: 'the egg', icon: 'egg', category: 'produce',
    modes: ['extended', 'chaos'], tags: ['ams', 'grade', 'shield', 'breakfast'],
    traits: [
      'is under a great deal of pressure and has not cracked',
      'was candled and found to be hiding nothing, which is refreshing',
      'insists it came first and has asked for this to be entered into the record',
    ],
  },
  {
    id: 'bear', name: 'A Certain Fire-Prevention Bear', short: 'the bear', icon: 'rangerhat', category: 'icon',
    modes: ['extended', 'chaos'], tags: ['usfs', 'trademark', 'forest', 'hat'],
    traits: [
      'has a name and likeness protected by an act of Congress, which is more than most of us',
      'only you can prevent from being reproduced without a license',
      'wears the hat with an authority no form can confer',
    ],
  },
  {
    id: 'bonsai', name: 'Bicentennial Bonsai', short: 'the bonsai', icon: 'bonsai', category: 'plant',
    modes: ['extended', 'chaos'], tags: ['ars', 'arboretum', 'tiny-tree', 'museum'],
    traits: [
      'is small in stature but has seniority over the entire department',
      'has been trimmed more carefully than any federal budget',
      'is a tree, but in a very concentrated format',
    ],
  },
  {
    id: 'xmastree', name: 'Fresh-Cut Christmas Tree', short: 'the tree', icon: 'pinetree', category: 'plant',
    modes: ['extended', 'chaos'], tags: ['ams', 'promotion', 'board', 'holiday'],
    traits: [
      'has needles, and frankly so does this office',
      'is being promoted, which is more than can be said for some of us',
      'is evergreen, unlike the current budget',
    ],
  },
];

export const SUBJECT_BY_ID: Record<string, Subject> = Object.fromEntries(SUBJECTS.map((s) => [s.id, s]));
