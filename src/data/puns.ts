import type { PunEntry } from '../types';

/**
 * The Official Federal Pun Library.
 *
 * Matching (see src/lib/punEngine.ts) prefers, in order:
 *   1. bespoke   — exact subject + problem + objective (curated cases)
 *   2. tailored  — subject + problem category / objective category
 *   3. subject   — subject-specific, referencing {P} or {O}
 *   4. templated — category templates using {S}/{s}
 *
 * Tokens: {S} subject name · {s} short subject · {P} problem · {O} objective
 *         {office} a fictional office · {form} a fictional form number
 */

type Bespoke = [subjectId: string, problemId: string, objectiveId: string, lines: string[]];

const BESPOKE: Bespoke[] = [
  ['bts', 'p-bts-cargo', 'o-bts-guam', [
    'APHIS is hiss-terically committed to keeping this passenger off the manifest.',
    'No reservation, no ticket, no legs. The treesnake’s travel request has been denied on all three counts.',
    'Guam’s outbound cargo now operates under a strict no-slither policy. Departures remain scale-dependent.',
  ]],
  ['gas', 'p-gas-move', 'o-gas-permit', [
    'Federal agents have brought the interstate snail conspiracy to a shell-still.',
    'Permit determination: escar-NO.',
    'The snail has requested expedited review. The agency appreciates the irony.',
  ]],
  ['queen', 'p-queen-import', 'o-queen-docs', [
    'Bee advised: Her Majesty’s travel authorization remains under royal review.',
    'The queen has arrived from New Zealand with her attendants. Customs has asked her to declare anything other than her sovereignty.',
    'Long may she reign — provided the export certificate is in order. To bee or not to bee admitted is, as ever, a question of paperwork.',
  ]],
  ['parrot', 'p-bird-snacks', 'o-bird-feeding', [
    'Polly wants a cracker. Federal regulations would also like documentation.',
    'Feeding instructions must be affixed to the outside of the enclosure. The parrot has already read them aloud to the entire terminal.',
    'Under 9 CFR § 3.164, snack time is not a suggestion. It is a beak performance indicator.',
  ]],
  ['parrot', 'p-bird-import', 'o-bird-quarantine', [
    'Thirty days in quarantine. The parrot has already learned to say “negative for Newcastle.”',
    'Welcome to America. Please enjoy your complimentary 30-day stay. Checkout is contingent on lab results.',
    'The parrot calls it “federal detention.” The agency calls it “a very nice room with excellent avian influenza testing.”',
  ]],
  ['jb', 'p-jb-air', 'o-jb-aircraft', [
    'Ladies and gentlemen, we now invite all passengers who are not Japanese beetles to begin boarding.',
    'The beetle’s plans to fly west have been grounded. It may reapply outside of flight season.',
    'Night-only loading has been authorized. The beetle calls it a red-eye. The agency calls it 7 CFR 301.48.',
  ]],
  ['slf', 'p-slf-eggs', 'o-slf-spread', [
    'This regulatory situation has become eggs-acerbated by unauthorized travel.',
    'Before departure, please check your bumpers, wheel wells, grille and moral compass for egg masses.',
    'Egg masses were found on the bumper. Officials expect the investigation to scrape by.',
  ]],
  ['swine', 'p-swine-damage', 'o-swine-plan', [
    'We’ve reached the pork of no return. A mitigation plan is now officially hog priority.',
    'The damage assessment is in: the swine went hog wild, and the corn went.',
    'Snout of options, the agency has drafted a strategy. The hogs have been asked to stop rooting against it.',
  ]],
  ['citrus', 'p-citrus-acp', 'o-citrus-greening', [
    'The tree is feeling green, and not in the good way. Quarantine is the zest course of action.',
    'Every federal effort is being made to keep this story from turning into pulp fiction.',
    'Citrus growers can rest easy. The agency’s got their peel.',
  ]],
  ['acp', 'p-acp-leaves', 'o-acp-protocol', [
    'There is a federal protocol for curry leaves. The psyllid did not expect such a well-seasoned response.',
    'This shipment has been flagged for excessive flavor and a possible stowaway. Curry on — under conditions.',
    'The psyllid hoped to leave the quarantine area un-leaf-ed. The protocol says otherwise.',
  ]],
  ['nws', 'p-nws-north', 'o-nws-sterile', [
    'The plan: send in millions of flies with no future plans. Disappointing romance will do the rest.',
    'Officials have screwed up their courage. The flies are sterile; the resolve is not.',
    'This is not a drill. It is a precision aerial dispersal of romantically disappointing flies.',
  ]],
  ['horse', 'p-cem', 'o-cem-test', [
    'Import clearance depends on two qualified test mares and a great deal of professional discretion. Everyone involved would like to stop describing it.',
    'The stallion has passed the culture portion of his review. Next: a stable relationship with two test mares, under federal supervision.',
    'Neigh-sayers said this protocol was too specific. Neigh-sayers had not read the protocol.',
  ]],
  ['horse', 'p-soring', 'o-hpa', [
    'Inspectors have reined in the situation. The show may go on — but only soundly.',
    'No shortcuts, no soring, no horseplay. The Horse Protection Act is in full stride.',
    'This one is taken seriously, because it is serious. Even the pun is wearing a tie.',
  ]],
  ['raccoon', 'p-rabies', 'o-orv', [
    'Vaccine baits have been dropped from an airplane. The raccoon describes it as “honestly the best thing to happen to me all year.”',
    'Raccoon rabies has been asked to halt its westward expansion. The agency is, quite literally, vaccinating the woods by air.',
    'Mask on, vaccine in. The raccoon is finally compliant, if purely for snack-related reasons.',
  ]],
  ['starling', 'p-starling-feed', 'o-starling', [
    'Feedlot losses have murmured to a crescendo. The agency is starling to take action.',
    'The starlings have been eating the cattle’s lunch. Literally. The cattle are not amused, and neither is Wildlife Services.',
    'Four thousand uninvited diners, zero reservations. The feedlot has requested that the flock be seated elsewhere.',
  ]],
  ['medfly', 'p-medfly-intro', 'o-medfly-release', [
    'The plan: release sterile males, wait for a series of disappointing first dates, protect California’s fruit. Romance is dead; agriculture lives.',
    'Los Angeles is a tough dating scene. For wild medflies, it has been made federally tougher.',
    'This program is fruitful precisely because the flies are not.',
  ]],
  ['petunia', 'p-petunia', 'o-petunia', [
    'The petunias were orange. Too orange. Suspiciously, unauthorizedly orange.',
    'A recall of flowers that were safe all along: a perfect bloom-reaucratic moment.',
    'Stop and smell the petunias. Then stop and check their regulatory status.',
  ]],
  ['orchid', 'p-orchid', 'o-cites', [
    'This orchid’s paperwork is even more delicate than the orchid.',
    'CITES-listed and absolutely stunning. The permit, alas, is only the former.',
    'Requirements: humidity, indirect light and a Protected Plant Permit. The orchid has strong feelings about the order of importance.',
  ]],
  ['borer', 'p-borer-pallet', 'o-ispm15', [
    'The stamp checks out and the borer’s day is ruined. Heat treatment: 56 degrees Celsius of pure justice.',
    'Inspectors have concluded the crate is not boring. Unfortunately, something inside it is.',
    'No mark, no entry. The borer has been officially floored.',
  ]],
  ['beagle', 'p-beagle-bag', 'o-beagle', [
    'Nose knows: the beagle has located one contraband sausage and a profound sense of purpose.',
    'The Beagle Brigade has issued its finding: good dog. The sausage has been denied entry.',
    'Your bag has been flagged by a very good boy acting under federal authority.',
  ]],
  ['papaya', 'p-papaya-bag', 'o-hawaii', [
    'Aloha means hello and goodbye. For untreated papaya, it means only hello.',
    'Pineapple may proceed. Papaya must be processed. The mango has asked us not to mention its seed.',
    'The papaya has been asked to declare itself. It declared itself delicious, which is not the same thing.',
  ]],
  ['khapra', 'p-khapra-bag', 'o-khapra', [
    'The khapra beetle hoped to slip through in a bag of rice. It was grain-ted no such leniency.',
    'A pest this notorious requires a response this thorough. Rice-k assessment complete.',
    'Contraband grain: stopped. Beetle: stopped. Traveler: kindly asked to read the sign next time.',
  ]],
  ['cattle', 'p-dairy-h5n1', 'o-dairy-test', [
    'No negative test, no interstate move. The cow considers this udderly reasonable.',
    'Pre-movement testing is now required. This is not a moo-t point.',
    'The agency has milked every available data source and is sticking to the science.',
  ]],
  ['bumblebee', 'p-bumble-import', 'o-bumble', [
    'The bumblebee is not a honey bee and has its own regulatory pathway, which it found deeply validating.',
    'Bumble along — but with paperwork.',
    'Import status: buzz-ness as usual, under the subpart for bees other than honey bees.',
  ]],
  // ---------- USDA Extended Universe ----------
  ['asparagus', 'p-asp-diameter', 'o-asp-grade', [
    'An exceptionally spears-ific federal concern. We’re determined to get to the stalk of the matter.',
    'One-half inch. Not a sixteenth less. The spear has been asked to stand up straight for its measurement.',
    'The asparagus graded U.S. No. 1 and has been insufferable about it ever since.',
  ]],
  ['egg', 'p-egg-shield', 'o-egg-grade', [
    'Grade AA. The egg has finally achieved shell-f-actualization.',
    'No yolk: only eggs graded under USDA supervision may wear the shield.',
    'Candled, scrutinized and graded. It held up under pressure. Over easy? Never.',
  ]],
  ['bear', 'p-bear-license', 'o-bear-license', [
    'Only you can prevent forest fires. Only the Forest Service can license the bear.',
    'Unauthorized bear merchandise has been met with a firm, federally protected paw.',
    'It’s Smokey Bear. No “the.” The agency asks that you bear that in mind.',
  ]],
  ['bonsai', 'p-bonsai-care', 'o-bonsai', [
    'A small tree with big seniority. Its federal service record is longer than its branches.',
    'National bonsai curation: proof that the government can, in fact, cut things back carefully.',
    'Tiny tree, enormous responsibility. Pruning decisions are made at the highest levels.',
  ]],
  ['xmastree', 'p-xmas-promo', 'o-xmas', [
    'The board is now the Real Christmas Tree Board, settling once and fir all which kind it means.',
    'Promotional strategy: spruce up awareness. Needle-ss to say, the paperwork is evergreen.',
    'A federally overseen program to make you love real trees. The agency is pining for your support.',
  ]],
];

/** Subject-specific lines that work with any problem/objective. */
const BY_SUBJECT: Record<string, string[]> = {
  gas: [
    'Bureaucracy moves slowly. The snail moves slower. The plan to {O} has been scheduled accordingly.',
    'The snail was informed of {P}. It retreated into its shell for an indefinite comment period.',
    'Officials estimate the snail will reach full compliance shortly after the heat death of the universe. Escar-go-ahead has nonetheless been granted.',
  ],
  bts: [
    'The treesnake was asked about {P}. It provided only a hissed statement and a forked tongue.',
    'The agency is shedding no tears. It is, however, shedding light on {P}.',
    'Snakes on a plane? Not on our watch. Snakes on a form? Regrettably, yes.',
  ],
  slf: [
    'The lanternfly appears at first to be beautiful. Then it appears to be a great deal of paperwork.',
    'In response to {P}, field staff recommend the traditional remedy: stomp first, document later.',
    'The lanternfly is lit. The agency is not.',
  ],
  jb: [
    'The beetle was asked to {O}. It instead ate the memo, the envelope and three rose bushes.',
    'Beetlemania has broken out over {P}. The agency would like everyone to let it be documented.',
    'This beetle is not John, Paul, George or Ringo, but it has caused a sizable invasion of paperwork.',
  ],
  swine: [
    'Regarding {P}: the hog has gone whole hog, and the agency must now go whole hog in response.',
    'Bringing home the bacon is no longer an option. Bringing home a mitigation plan is.',
    'The swine declined to comment, citing hogwash.',
  ],
  queen: [
    'Her Majesty is not amused by {P}. Her attendants have been instructed to hum disapprovingly.',
    'Long live the queen — pending the agency’s ability to {O}.',
    'This matter has been elevated to the very top of the hive-rarchy.',
  ],
  acp: [
    'Small insect, large problem: the psyllid has turned {P} into a sour situation.',
    'The psyllid insists the threat is psyllid-ly overstated. The citrus industry disagrees.',
    'The agency will {O}, because this matter is no longer a-peeling.',
  ],
  nws: [
    'The screwworm has screwed up royally with {P}. Sterile reinforcements are inbound.',
    'Asked to {O}, officials said they would not take this lying down, because lying down near screwworms is strongly discouraged.',
    'The fly’s northbound ambitions have been met by a southbound wall of sterile suitors.',
  ],
  parrot: [
    'Polly has disclosed {P} to everyone within earshot. The agency is now obligated to {O}.',
    'The parrot repeated the finding four times, which technically counts as public comment.',
    '“Squawk first, ask questions later” is not a recognized enforcement policy.',
  ],
  horse: [
    'Neigh-sayers call this excessive. The stallion simply wants to {O} and move on with his career.',
    'In the matter of {P}, the agency has elected to hold its horses.',
    'The case has been put out to pasture pending further review.',
  ],
  cattle: [
    'The cow was asked to comment on {P}. Its response, “moo,” is being translated by three separate offices.',
    'Officials have milked the issue for all it is worth and will now {O}.',
    'The cow is not going anywhere until the paperwork is in. To be fair, the cow was not going anywhere anyway.',
  ],
  alpaca: [
    'The alpaca has packed her bags for {P}. Officials say she must alpaca-ompany them with paperwork.',
    'This is not llama drama. It is a full alpaca-lypse of documentation.',
    'The alpaca spat on the clipboard. The clipboard, a career civil servant, has filed a grievance.',
  ],
  starling: [
    'In response to {P}, approximately four thousand starlings have arrived to observe the meeting.',
    'Officials are starling to lose their patience.',
    'The flock has formed a murmuration, which the agency must now recognize as a stakeholder group.',
  ],
  raccoon: [
    'The raccoon, wearing its customary mask, has been asked to verify its identity in connection with {P}.',
    'The raccoon has washed its paws of the entire matter.',
    'Allegations of “trash panda” behavior are not, at this time, official findings.',
  ],
  medfly: [
    'The medfly has been placed on the no-fly list, which is awkward for a fly.',
    'In light of {P}, the medfly’s romantic prospects will be federally managed.',
    'The fly will be shooed in accordance with all applicable regulations.',
  ],
  petunia: [
    'The petunia insists {P} is a misunderstanding. It is, however, very orange about it.',
    'Officials will {O}. The petunia has wilted under questioning.',
    'Flower power has met federal power, and federal power brought a form.',
  ],
  orchid: [
    'The orchid has demanded a private room, filtered light, and that this office {O}.',
    'Orchid etiquette is complicated. Orchid paperwork is more so.',
    'The orchid is a rare beauty. The forms are a rare beast.',
  ],
  citrus: [
    'When life gives you {P}, the agency makes a lemonade-adjacent action plan.',
    'The citrus tree is under a great deal of pressure. The agency has asked everyone not to squeeze.',
    'The agency has decided to {O}. It is the zest it can do.',
  ],
  borer: [
    'This insect lives up to its name: the agency has found {P} profoundly boring.',
    'Inspectors bored into the case and found more borer.',
    'The borer wood-n’t cooperate.',
  ],
  bumblebee: [
    'The bumblebee has bumbled into {P}. The agency must now {O}, which the bumblebee calls “un-bee-lievable.”',
    'Technically, the bumblebee should not be able to fly. Technically, this assignment should not exist. Yet here we all are.',
    'The bumblebee has been buzzing the regional office all day for an update.',
  ],
  beagle: [
    'The beagle detected {P} with its nose and requires only a treat to {O}.',
    'Officially, the beagle is a detection asset. Unofficially, it is everyone’s favorite colleague.',
    'The beagle’s report has been filed. It consists of one long sniff and an enthusiastic sit.',
  ],
  papaya: [
    'The papaya has been ripe for review ever since {P} came to light.',
    'It is a papaya. It is from Hawaii. The agency would like to know why it is in your sock.',
    'Aloha to the papaya, a fruit that tried — and failed — to {O}.',
  ],
  khapra: [
    'The khapra beetle has survived worse than {P}. It has never, however, survived this office.',
    'Officials are no longer khapra-mising.',
    'This beetle is notoriously tough. The agency is tougher, and it has more forms.',
  ],
  pallet: [
    'The pallet is being held in connection with {P}. It is load-bearing, but it cannot bear this.',
    'Inspectors have taken a dim view of the pallet’s stamp and a dimmer view of its attitude.',
    'Pallet cleanser: officials will {O} before anything else is served.',
  ],
  goldfish: [
    'Regulation the goldfish has been notified of {P}. It has already forgotten, which the office envies.',
    'A fishy situation. The agency will {O}, and Regulation will swim one thoughtful circle about it.',
    'Regulation has lived in the break room for eleven years and has never once missed a meeting.',
  ],
  asparagus: [
    'An exceptionally spears-ific concern: {P}. Officials will get to the stalk of the matter.',
    'The asparagus is standing tall, but {P} has left it feeling a bit limp.',
    'This is a spear-headed effort to {O}.',
  ],
  egg: [
    'This egg is under a great deal of pressure regarding {P}. It has not cracked.',
    'Officials have handled {P} with eggs-treme care.',
    'The egg was asked to {O}. It is scrambling.',
  ],
  bear: [
    'Only you can prevent {P}. Only an act of Congress can protect the bear.',
    'The bear has been briefed on {P}. He wears the hat, so he wins the argument.',
    'Grin and bear it: the agency must {O}.',
  ],
  bonsai: [
    'The bonsai has been in federal care since 1976 and has seen {P} before.',
    'The tiny tree was asked to {O}. It will get there, in tiny increments.',
    'Officials have decided to trim the scope of this review. The bonsai approves.',
  ],
  xmastree: [
    'The tree has been informed of {P}. It is pining for a resolution.',
    'The agency will {O}. Needle-ss to say, this is evergreen work.',
    'Officials would like to spruce up the response.',
  ],
};

type Tailored = [subjectId: string, kind: 'p' | 'o', category: string, text: string];

/** Subject × category lines — specific without needing an exact combination. */
const TAILORED: Tailored[] = [
  ['gas', 'p', 'movement', 'Federal agents have brought the interstate snail operation to a shell-still.'],
  ['gas', 'p', 'documentation', 'The snail’s documentation arrived at a pace consistent with the applicant.'],
  ['gas', 'p', 'behavior', 'The snail’s conduct has been deemed sluggish, but slime-ingly sincere.'],
  ['gas', 'o', 'assessment', 'A speed assessment has been commissioned. Preliminary results: no.'],
  ['gas', 'o', 'committee', 'The snail has joined the committee and immediately became its most efficient member.'],
  ['bts', 'p', 'movement', 'No reservation, no ticket, no legs: the treesnake’s travel request has been denied on all counts.'],
  ['bts', 'o', 'committee', 'The treesnake has joined the working group and is coiled around the conference table, “just listening.”'],
  ['queen', 'p', 'documentation', 'Bee advised: Her Majesty’s paperwork remains under royal review.'],
  ['queen', 'p', 'movement', 'Her Majesty travels only with her attendants and only first class. The gate agent has been briefed.'],
  ['queen', 'o', 'committee', 'Her Majesty does not sit on committees. Committees sit for Her Majesty.'],
  ['parrot', 'p', 'welfare', 'Polly wants a cracker. Federal regulations would also like documentation.'],
  ['parrot', 'p', 'documentation', 'The parrot read the documentation aloud, repeatedly, which unfortunately is not the same as filing it.'],
  ['parrot', 'o', 'committee', 'The parrot has joined the working group. It repeats everything everyone says, making it ideally suited to take the minutes.'],
  ['swine', 'p', 'behavior', 'We’ve reached the pork of no return.'],
  ['swine', 'o', 'paperwork', 'The hog ate the paperwork. The agency must now determine whether that counts as filing.'],
  ['slf', 'p', 'movement', 'This regulatory situation has become eggs-acerbated by unauthorized travel.'],
  ['jb', 'p', 'movement', 'The beetle is flying standby. The agency has decided it will be standing by indefinitely.'],
  ['cattle', 'p', 'movement', 'The cow asked to move interstate. The agency asked the cow to hold its horses, which caused some confusion in the barn.'],
  ['alpaca', 'p', 'documentation', 'The alpaca’s passport photo is mostly fluff. Officials cannot confirm a face is present.'],
  ['alpaca', 'o', 'coordination', 'Negotiations stalled when the alpaca spat on the treaty.'],
  ['raccoon', 'p', 'jurisdiction', 'The raccoon has claimed jurisdiction over the dumpster. Officials are reviewing precedent.'],
  ['raccoon', 'o', 'paperwork', 'The raccoon was found rifling through the recycling bin for the original form.'],
  ['beagle', 'p', 'welfare', 'The beagle has volunteered to personally evaluate the snacks. All of them. Right now.'],
  ['beagle', 'o', 'paperwork', 'The beagle ate the memorandum — all 47 pages. A very good dog with a regrettable appetite for guidance.'],
  ['horse', 'p', 'semantics', 'In the dispute over definitions, the stallion has taken a firm position: neigh.'],
  ['horse', 'o', 'paperwork', 'The stallion signed with a hoof print, which the office has accepted as a wet signature.'],
  ['medfly', 'p', 'movement', 'The medfly attempted to travel and has been grounded, which is complicated for a fly.'],
  ['starling', 'p', 'jurisdiction', 'Four thousand starlings have entered the meeting, achieving quorum.'],
  ['starling', 'o', 'outreach', 'The starlings have offered to help with outreach and are already mimicking the hold music.'],
  ['egg', 'p', 'standards', 'The egg has been graded AA, on a curve.'],
  ['asparagus', 'p', 'standards', 'An exceptionally spears-ific federal concern. We’re determined to get to the stalk of the matter.'],
  ['petunia', 'p', 'documentation', 'The petunia’s paperwork has been found to be orange. Too orange.'],
  ['citrus', 'p', 'biosecurity', 'The tree is feeling green, and not in the good way.'],
  ['borer', 'p', 'biosecurity', 'The pallet was not boring. Something inside it was.'],
  ['nws', 'p', 'biosecurity', 'The screwworm has screwed up royally, and the response will be sterile in every sense.'],
  ['goldfish', 'p', 'jurisdiction', 'Regulation the goldfish claims sovereignty over the tank. Officials have deferred to the bowl.'],
  ['goldfish', 'o', 'committee', 'Regulation the goldfish has been named subcommittee chair. Its institutional memory lasts about three seconds, which is an improvement.'],
  ['khapra', 'p', 'movement', 'The khapra beetle has a long record of travel and a short record of permission.'],
  ['bumblebee', 'o', 'committee', 'The bumblebee has been elected chair of the working group, mainly because it would not stop buzzing.'],
  ['orchid', 'p', 'welfare', 'The orchid has rejected the transport snacks and requested only mist.'],
];

/** Category templates. Problem-category lines first, then objective-category lines. */
const BY_PROBLEM_CATEGORY: Record<string, string[]> = {
  movement: [
    '{S}: movement denied. The paperwork is also moving, but slowly.',
    'The agency has determined that {s} should stay put. {s} has determined otherwise. Negotiations continue.',
    'It was supposed to be a quiet road trip. Then {s} crossed a state line.',
  ],
  documentation: [
    'The paperwork is incomplete, the applicant is {s}, and the office is out of staples. Business as usual.',
    'In the matter of {P}, the agency has requested documentation, supporting documentation and documentation of the supporting documentation.',
    '{S} has submitted Form {form}. The agency has responded with Form {form}-A.',
  ],
  biosecurity: [
    'A possible threat has been detected. The agency’s official position: not on our watch. Also, wash your hands.',
    '{S} has been placed under observation. {s} is also observing the agency, which is unsettling.',
  ],
  welfare: [
    'Snack levels have been deemed federally inadequate. The agency remains, as always, deeply concerned about snacks.',
    'Hydration is a right. Snacks are a responsibility. {S} is entitled to both, pending review.',
  ],
  jurisdiction: [
    'Seven offices have claimed jurisdiction. An eighth office has been created to adjudicate.',
    'The question of who is in charge has been referred to {office}, which has referred it back.',
  ],
  semantics: [
    'The agency spent nine weeks defining a word. The word was “adequate.” The definition was “adequate.”',
    'A definitional crisis has emerged. The dictionary has been subpoenaed.',
    'Official determination: {s} is “probably fine,” as defined in the forthcoming glossary.',
  ],
  behavior: [
    '{S} has declined to cooperate. The agency has declined to be surprised.',
    'Attitude assessment complete. {S} has been rated “spirited.”',
  ],
  standards: [
    '{S} has been measured, weighed and found eligible for further measuring.',
    'Federal standards exist for a reason. The reason is pending.',
  ],
};

const BY_OBJECTIVE_CATEGORY: Record<string, string[]> = {
  committee: [
    'A committee has been formed. Its first act was to form a subcommittee. Its second act was lunch.',
    'The working group met, agreed to meet again, and adjourned with a strong sense of accomplishment.',
    'In the matter of {s}, a subcommittee will review the committee, which will review the subcommittee. This is called oversight.',
  ],
  paperwork: [
    'The memorandum is 47 pages long. Page 47 says, “See page 1.”',
    'Additional paperwork is required to determine whether additional paperwork is required.',
    'The finding will be issued in triplicate: one copy for the file, one for {office} and one for {s}.',
  ],
  assessment: [
    'A feasibility study has determined that a feasibility study is feasible.',
    'The risk assessment is complete. The primary risk identified is another assessment.',
  ],
  coordination: [
    'The agency has coordinated with the states, which coordinated with the counties, which would like to know who {s} is.',
    'A liaison has been assigned. The liaison has a liaison. Coordination is at an all-time high.',
  ],
  permitting: [
    'A permit may be required. A permit to determine whether a permit is required is definitely required.',
    'Conditional approval granted. The conditions are listed on the back of a much longer form.',
  ],
  containment: [
    'Containment strategy: keep {s} here, keep the problem there, keep the coffee on.',
    'The agency will {O}. {S} has been asked to remain calm and not go anywhere, which frankly applies to all of us.',
  ],
  outreach: [
    'A pamphlet has been drafted. It is strongly worded, double-sided and tri-folded.',
    'The agency will {O}. Attendance is mandatory; snacks are adequate.',
  ],
  compliance: [
    'Compliance has been verified, re-verified and laminated.',
    'A thorough review has found {s} compliant with the concept of compliance.',
  ],
};

const GENERIC: string[] = [
  'After careful review, the agency finds {s} to be extremely specific. It will regulate accordingly.',
  '{S}. {P}. The agency will {O}. Somewhere, a federal employee nods and says, “Yep, that tracks.”',
  'This is the most specific assignment the agency has ever issued — until the next one.',
  '{S} has been issued a case number, which is the first step toward being taken seriously.',
];

/** Optional closers that add administrative jargon to a finding. */
export const JARGON_CLOSERS: string[] = [
  'This finding is non-binding, non-precedential and extremely sincere.',
  'Comments may be submitted in triplicate.',
  'See Attachment C (forthcoming).',
  'Pursuant to the memorandum of understanding nobody can find.',
  'Effective immediately, or at the start of the next fiscal year, whichever is later.',
  'Reviewed for clarity, concision and vibes.',
  'Supervisory concurrence is anticipated.',
];

// ---------------------------------------------------------------------------
// Flatten everything into PunEntry records with stable ids.
// ---------------------------------------------------------------------------

function build(): PunEntry[] {
  const out: PunEntry[] = [];
  for (const [subjectId, problemId, objectiveId, lines] of BESPOKE) {
    lines.forEach((text, i) => out.push({ id: `b:${subjectId}:${problemId}:${i}`, text, subjectId, problemId, objectiveId }));
  }
  for (const [subjectId, lines] of Object.entries(BY_SUBJECT)) {
    lines.forEach((text, i) => out.push({ id: `s:${subjectId}:${i}`, text, subjectId }));
  }
  TAILORED.forEach(([subjectId, kind, category, text], i) => {
    out.push(kind === 'p'
      ? { id: `t:${i}`, text, subjectId, problemCategory: category as PunEntry['problemCategory'] }
      : { id: `t:${i}`, text, subjectId, objectiveCategory: category as PunEntry['objectiveCategory'] });
  });
  for (const [category, lines] of Object.entries(BY_PROBLEM_CATEGORY)) {
    lines.forEach((text, i) => out.push({ id: `pc:${category}:${i}`, text, problemCategory: category as PunEntry['problemCategory'] }));
  }
  for (const [category, lines] of Object.entries(BY_OBJECTIVE_CATEGORY)) {
    lines.forEach((text, i) => out.push({ id: `oc:${category}:${i}`, text, objectiveCategory: category as PunEntry['objectiveCategory'] }));
  }
  GENERIC.forEach((text, i) => out.push({ id: `g:${i}`, text }));
  return out;
}

export const PUNS: PunEntry[] = build();
