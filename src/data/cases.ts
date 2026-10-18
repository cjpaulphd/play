import type { CuratedCase } from '../types';

/**
 * Curated, verified combinations. Surprisingly Real and Extended Universe modes
 * select one whole case at random — they never recombine parts across cases.
 *
 * `fact` and `obscureDetail` must be factual and supported by `sourceIds`.
 * Keep jokes out of these fields; jokes live in puns.ts.
 */
export const CURATED_CASES: CuratedCase[] = [
  {
    id: 'c-bts', mode: 'real', agency: 'APHIS', program: 'Wildlife Services',
    subjectId: 'bts', problemId: 'p-bts-cargo', objectiveId: 'o-bts-guam',
    fact: 'The brown treesnake was accidentally introduced to Guam around the late 1940s or early 1950s and is blamed for the loss of most of the island’s native forest birds. APHIS Wildlife Services works to keep snakes from leaving Guam in cargo, using traps, nighttime searches and trained snake-detector dogs.',
    obscureDetail: 'Researchers at USDA’s National Wildlife Research Center developed a method of dropping dead-mouse baits containing 80 mg of acetaminophen from aircraft to control the snakes.',
    sourceIds: ['bts', 'bts-nwrc'],
  },
  {
    id: 'c-gas', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine',
    subjectId: 'gas', problemId: 'p-gas-move', objectiveId: 'o-gas-permit',
    fact: 'The giant African snail is a destructive plant pest and can carry the rat lungworm parasite, which can cause meningitis in people. It was eradicated from Miami in 1975 and again in 2021. APHIS says not to keep, buy or release these snails; research and government institutions need an APHIS permit to import and keep them under strict conditions.',
    obscureDetail: 'To lift a Florida quarantine zone, APHIS and Florida’s agriculture department look for 17 months of surveillance and treatment with no live snails, plus negative detector-dog and night surveys.',
    sourceIds: ['gas'],
  },
  {
    id: 'c-queen', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine',
    subjectId: 'queen', problemId: 'p-queen-import', objectiveId: 'o-queen-docs',
    fact: 'Under 7 CFR part 322, adult honey bee queens and package bees may be imported into the continental United States from Canada and New Zealand. Shipments need an export certificate from the exporting country, and APHIS must be notified before the bees arrive.',
    obscureDetail: 'Whole colonies in hive bodies cannot be imported from any country, and used beekeeping equipment cannot be imported for use in beekeeping.',
    sourceIds: ['bees', 'bees-nz', 'cfr-322'],
  },
  {
    id: 'c-bird-food', mode: 'real', agency: 'APHIS', program: 'Animal Care',
    subjectId: 'parrot', problemId: 'p-bird-snacks', objectiveId: 'o-bird-feeding',
    fact: 'Animal Welfare Act standards for birds include 9 CFR § 3.164, which says weaned birds must be offered food and potable water within 4 hours before being transported in commerce, given water at least every 12 hours and fed at least once every 24 hours, with adjustments for species that need otherwise.',
    obscureDetail: 'Written instructions for in-transit food and water must be attached to the outside of the bird’s primary enclosure.',
    sourceIds: ['cfr-3-164', 'cfr-3-164-lii'],
  },
  {
    id: 'c-bird-import', mode: 'real', agency: 'APHIS', program: 'Veterinary Services',
    subjectId: 'parrot', problemId: 'p-bird-import', objectiveId: 'o-bird-quarantine',
    fact: 'Pet birds of non-U.S. origin generally must complete a 30-day federal quarantine at a USDA Animal Import Center, where they are tested for highly pathogenic avian influenza and Newcastle disease. The owner pays for the quarantine stay and testing.',
    sourceIds: ['pet-birds'],
  },
  {
    id: 'c-jb', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine',
    subjectId: 'jb', problemId: 'p-jb-air', objectiveId: 'o-jb-aircraft',
    fact: 'The Japanese beetle quarantine in 7 CFR 301.48 aims to keep beetles from hitchhiking on aircraft to protected western states, including Arizona, California, Colorado, Idaho, Montana, Nevada, Oregon, Utah and Washington. Aircraft from regulated airports may need inspection, treatment or safeguarded loading.',
    obscureDetail: 'Among the regulatory options: loading aircraft only at night, or inside a beetle-free hangar.',
    sourceIds: ['jb', 'cfr-301-f'],
    econNote: { text: 'USDA’s Agricultural Research Service has reported that more than $450 million a year is spent controlling Japanese beetles and replacing the plants they damage.', sourceIds: ['jb-ars'] },
  },
  {
    id: 'c-slf', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine',
    subjectId: 'slf', problemId: 'p-slf-eggs', objectiveId: 'o-slf-spread',
    fact: 'Spotted lanternflies lay roughly inch-long egg masses on smooth surfaces, including vehicles. The insect does not fly long distances, so its long-distance spread depends largely on people unknowingly moving egg masses. APHIS advises checking vehicles — bumpers, wheel wells, grills and roofs — before leaving infested areas.',
    obscureDetail: 'APHIS suggests that, where possible, people park about 15 feet away from trees in a quarantine zone and keep the windows closed.',
    sourceIds: ['slf', 'clean-items'],
  },
  {
    id: 'c-swine', mode: 'real', agency: 'APHIS', program: 'Wildlife Services',
    subjectId: 'swine', problemId: 'p-swine-damage', objectiveId: 'o-swine-plan',
    fact: 'Congress funded APHIS in 2014 to create the National Feral Swine Damage Management Program, which protects agriculture, natural resources, property and animal and human health. APHIS reports that feral swine have been eliminated from several states since the program began.',
    obscureDetail: 'Feral swine are also sampled for early detection of foreign animal diseases such as African swine fever and classical swine fever.',
    sourceIds: ['swine', 'swine-history'],
    econNote: { text: 'APHIS’s National Wildlife Research Center estimates that feral swine cause about $2.5 billion in damages and control costs in the United States each year, with at least $800 million of that directly in agriculture.', sourceIds: ['swine-nwrc'] },
  },
  {
    id: 'c-citrus', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine',
    subjectId: 'citrus', problemId: 'p-citrus-acp', objectiveId: 'o-citrus-greening',
    fact: 'Citrus greening (huanglongbing) is a bacterial disease spread by the Asian citrus psyllid. Federal quarantines under 7 CFR 301.76 restrict the interstate movement of citrus nursery stock from quarantined areas, which include entire states such as Florida and Texas.',
    sourceIds: ['citrus', 'citrus-areas'],
  },
  {
    id: 'c-acp-leaves', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine',
    subjectId: 'acp', problemId: 'p-acp-leaves', objectiveId: 'o-acp-protocol',
    fact: 'Because the Asian citrus psyllid can travel on leaves of citrus relatives, APHIS has a specific protocol for moving fresh rutaceous leaves — such as curry leaves and kaffir lime leaves — out of quarantined areas under defined conditions.',
    obscureDetail: 'There is a federal protocol specifically for curry leaves. It exists because a very small insect could be riding on them.',
    sourceIds: ['citrus-leaves', 'citrus'],
  },
  {
    id: 'c-nws', mode: 'real', agency: 'APHIS', program: 'Veterinary Services',
    subjectId: 'nws', problemId: 'p-nws-north', objectiveId: 'o-nws-sterile',
    fact: 'New World screwworm larvae feed on the living flesh of warm-blooded animals. USDA fights it with the sterile insect technique: releasing huge numbers of sterile flies so wild females mate without producing offspring. With NWS moving north through Mexico, APHIS has shifted sterile fly dispersal toward the border and confirmed detections in Texas in 2026.',
    obscureDetail: 'The only operating NWS sterile fly production plant in North America is in Panama, run jointly by USDA and Panama; a new production facility is being built in Edinburg, Texas.',
    sourceIds: ['nws', 'nws-sit', 'nws-facilities'],
  },
  {
    id: 'c-cem', mode: 'real', agency: 'APHIS', program: 'Veterinary Services',
    subjectId: 'horse', problemId: 'p-cem', objectiveId: 'o-cem-test',
    fact: 'Stallions imported from countries affected by contagious equine metritis must pass bacterial culture testing and test breeding in an approved state quarantine facility before release.',
    obscureDetail: 'Test breeding means each stallion is bred to two qualified test mares, which are then cultured and blood-tested to confirm he is not carrying the bacterium.',
    sourceIds: ['cem'],
  },
  {
    id: 'c-hpa', mode: 'real', agency: 'APHIS', program: 'Animal Care',
    subjectId: 'horse', problemId: 'p-soring', objectiveId: 'o-hpa',
    fact: 'The Horse Protection Act prohibits sored horses — horses deliberately made to hurt in their legs or hooves to exaggerate their gait — from being shown, exhibited, sold or auctioned, and prohibits transporting sored horses to those events. APHIS enforces the Act.',
    sourceIds: ['hpa'],
  },
  {
    id: 'c-orv', mode: 'real', agency: 'APHIS', program: 'Wildlife Services — National Rabies Management Program',
    subjectId: 'raccoon', problemId: 'p-rabies', objectiveId: 'o-orv',
    fact: 'Each year APHIS distributes oral rabies vaccine baits in parts of the eastern United States to stop raccoon rabies from spreading into the central U.S. Baits are dropped by airplane over rural areas and placed by helicopter, vehicle or bait station in suburban and urban areas.',
    obscureDetail: 'APHIS asks people who find a bait to leave it alone; pets and people cannot get rabies from contact with the bait.',
    sourceIds: ['orv'],
    econNote: { text: 'APHIS estimates that rabies detection, prevention and control may cost more than $500 million a year in the United States — the kind of avoided cost that shows up on the benefits side of the ledger.', sourceIds: ['orv'] },
  },
  {
    id: 'c-starling', mode: 'real', agency: 'APHIS', program: 'Wildlife Services',
    subjectId: 'starling', problemId: 'p-starling-feed', objectiveId: 'o-starling',
    fact: 'European starlings are an invasive species. At dairies and livestock operations, large flocks eat and contaminate feed, and APHIS Wildlife Services helps producers reduce the damage.',
    sourceIds: ['starlings'],
  },
  {
    id: 'c-medfly', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine (with CDFA)',
    subjectId: 'medfly', problemId: 'p-medfly-intro', objectiveId: 'o-medfly-release',
    fact: 'Since 1996, USDA and the California Department of Food and Agriculture have run a Preventive Release Program that releases sterile male Mediterranean fruit flies over the Los Angeles Basin year-round, so that any wild females that arrive mate with sterile males.',
    obscureDetail: 'APHIS reports that Medfly infestations in California have fallen by more than 90% since preventive releases began.',
    sourceIds: ['medfly', 'medfly-cdfa'],
  },
  {
    id: 'c-petunia', mode: 'real', agency: 'APHIS', program: 'Biotechnology Regulatory Services',
    subjectId: 'petunia', problemId: 'p-petunia', objectiveId: 'o-petunia',
    fact: 'In 2017 APHIS learned that orange petunias — and later several other varieties with orange, red and purple flowers — had been genetically engineered and imported and sold without the authorization required under 7 CFR part 340. USDA asked breeders, growers and retailers to voluntarily withdraw them, and several distributors destroyed their stock following APHIS guidance.',
    obscureDetail: 'APHIS told consumers who had bought the petunias that no action was needed: the flowers were not considered a risk to human health or the environment. It was a compliance matter.',
    sourceIds: ['petunia'],
  },
  {
    id: 'c-orchid', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine',
    subjectId: 'orchid', problemId: 'p-orchid', objectiveId: 'o-cites',
    fact: 'APHIS enforces CITES for plants entering the United States. CITES-listed plants must enter through a designated port, and importers need a USDA Protected Plant Permit under 7 CFR part 355, along with a CITES document from the exporting country.',
    obscureDetail: 'Orchids and other epiphytic plants may be imported in a short list of approved growing media, including coconut husks, coconut fiber, new clay pots and new wooden baskets.',
    sourceIds: ['cites', 'special-plants'],
  },
  {
    id: 'c-ispm15', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine',
    subjectId: 'borer', problemId: 'p-borer-pallet', objectiveId: 'o-ispm15',
    fact: 'Wood-boring insects can travel in pallets and crates. Under the international standard ISPM 15, wood packaging material entering the U.S. must be heat treated or fumigated and carry an official mark showing the IPPC logo, a country code, a facility number and the treatment type.',
    obscureDetail: 'Heat treatment means bringing the wood’s core to at least 56 °C (about 133 °F) for at least 30 minutes.',
    sourceIds: ['wpm', 'wpm-look'],
  },
  {
    id: 'c-beagle', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine — National Detector Dog Training Center',
    subjectId: 'beagle', problemId: 'p-beagle-bag', objectiveId: 'o-beagle',
    fact: 'APHIS trains detector dogs — the “Beagle Brigade” — to find fruits, vegetables and meats in baggage, mail and vehicles entering the United States. Most graduates work for U.S. Customs and Border Protection.',
    obscureDetail: 'The National Detector Dog Training Center in Newnan, Georgia, began in 1984 with one dog and one trainer. Many of its dogs come from shelters and rescue groups.',
    sourceIds: ['dogs'],
  },
  {
    id: 'c-papaya', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine',
    subjectId: 'papaya', problemId: 'p-papaya-bag', objectiveId: 'o-hawaii',
    fact: 'APHIS inspects passenger bags traveling from Hawaii to the U.S. mainland, Alaska and Guam before departure, because Hawaii has plant pests not found elsewhere in the U.S. Some fruits, such as papaya, may go to the mainland only after approved treatment and in properly marked boxes.',
    obscureDetail: 'Fresh pineapple and coconut may go to the mainland after inspection. Frozen mango is allowed only if it is seedless.',
    sourceIds: ['hawaii'],
  },
  {
    id: 'c-khapra', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine',
    subjectId: 'khapra', problemId: 'p-khapra-bag', objectiveId: 'o-khapra',
    fact: 'The khapra beetle is among the most damaging pests of stored grain and seeds. It is intercepted at U.S. ports in cargo and mail, but most interceptions come from passenger baggage, and APHIS advises travelers not to bring rice, chickpeas and similar items from affected countries.',
    obscureDetail: 'Larvae in diapause are less susceptible to fumigation because their metabolism slows down.',
    sourceIds: ['khapra', 'khapra-card'],
  },
  {
    id: 'c-dairy', mode: 'real', agency: 'APHIS', program: 'Veterinary Services',
    subjectId: 'cattle', problemId: 'p-dairy-h5n1', objectiveId: 'o-dairy-test',
    fact: 'After H5N1 avian influenza was found in dairy cattle, USDA issued a federal order effective April 29, 2024 requiring lactating dairy cattle to test negative for influenza A before interstate movement. APHIS has since exempted cattle from states recognized as unaffected under the National Milk Testing Strategy.',
    sourceIds: ['hpai-dairy', 'hpai-dairy-update'],
  },
  {
    id: 'c-bumble', mode: 'real', agency: 'APHIS', program: 'Plant Protection and Quarantine',
    subjectId: 'bumblebee', problemId: 'p-bumble-import', objectiveId: 'o-bumble',
    fact: 'The federal bee import regulations in 7 CFR part 322 cover more than honey bees: one subpart addresses the importation of “bees other than honeybees” from approved regions, alongside adult honey bees and honey bee germplasm.',
    obscureDetail: 'Bee germplasm (semen) has its own import pathway, and it may come from a longer list of countries than live adult bees.',
    sourceIds: ['cfr-322', 'bees'],
  },
  // ================= REGULATORY ECONOMICS (PPD) =================
  {
    id: 'c-ria', mode: 'real', agency: 'APHIS', program: 'Policy and Program Development',
    subjectId: 'proposed-rule', problemId: 'p-ria-threshold', objectiveId: 'o-ria',
    fact: 'Executive Order 12866 directs agencies to assess the costs and benefits of significant regulatory actions. A rule with an annual effect on the economy of $100 million or more gets a fuller analysis, including an assessment of reasonably feasible alternatives. At APHIS, Policy and Program Development provides policy analysis and regulatory development, and APHIS rulemaking guidance calls for an analysis of a proposed rule’s expected economic effects.',
    obscureDetail: 'The discount rate has had a busy few years. OMB’s 2003 Circular A-4 told agencies to report results at both 3% and 7%. A 2023 revision set a 2% default, and in 2025 the White House directed OMB to return to the 2003 version. Separately, a 2023 order that raised the $100 million threshold to $200 million was revoked in 2025.',
    sourceIds: ['eo-12866', 'aphis-org', 'aphis-rulemaking', 'a4-2003', 'a4-2023', 'a4-2025', 'eo-14148'],
  },
  {
    id: 'c-rfa', mode: 'real', agency: 'APHIS', program: 'Policy and Program Development',
    subjectId: 'small-entity', problemId: 'p-small-impact', objectiveId: 'o-irfa',
    fact: 'Under the Regulatory Flexibility Act, when a proposed rule would affect small entities — small businesses, small nonprofits and small governments — an agency must prepare an initial regulatory flexibility analysis, consider less burdensome alternatives and make the analysis available for public comment. An agency can instead certify that a rule will not have a significant impact on a substantial number of small entities.',
    obscureDetail: 'An agency that wants to use its own definition of “small business” instead of the SBA’s size standards must consult with the SBA’s Office of Advocacy.',
    sourceIds: ['rfa', 'rfa-faq'],
  },
  // ================= USDA EXTENDED UNIVERSE (not APHIS) =================
  {
    id: 'x-asparagus', mode: 'extended', agency: 'AMS', program: 'Agricultural Marketing Service — Specialty Crops Program',
    subjectId: 'asparagus', problemId: 'p-asp-diameter', objectiveId: 'o-asp-grade',
    fact: 'The U.S. Standards for Grades of Fresh Asparagus say that, unless otherwise specified, each stalk of U.S. No. 1 asparagus must be at least one-half inch in diameter (U.S. No. 2: five-sixteenths of an inch). Grading is voluntary and handled by the Agricultural Marketing Service, not APHIS.',
    obscureDetail: 'The separate standard for asparagus for processing says a U.S. No. 1 spear may be no more than 7½ inches long.',
    sourceIds: ['ams-asparagus', 'ams-asparagus-proc'],
  },
  {
    id: 'x-egg', mode: 'extended', agency: 'AMS', program: 'Agricultural Marketing Service — Quality Assessment Division',
    subjectId: 'egg', problemId: 'p-egg-shield', objectiveId: 'o-egg-grade',
    fact: 'USDA egg grading is a voluntary service paid for by producers. Packers that skip it can still print “Grade A” on cartons, but only eggs processed under the supervision of a USDA grader may carry the USDA grade shield.',
    obscureDetail: 'A Grade AA lot must be at least 87 percent AA quality at origin.',
    sourceIds: ['ams-eggs', 'ams-eggs-qa'],
  },
  {
    id: 'x-bear', mode: 'extended', agency: 'USFS', program: 'U.S. Forest Service — Smokey Bear Program',
    subjectId: 'bear', problemId: 'p-bear-license', objectiveId: 'o-bear-license',
    fact: 'A 1952 act of Congress removed Smokey Bear from the public domain and placed him under the control of the Secretary of Agriculture. Any commercial use of his name or image requires a license from the U.S. Forest Service.',
    obscureDetail: 'His name is officially Smokey Bear. “Smokey the Bear” is a popular error.',
    sourceIds: ['usfs-smokey'],
  },
  {
    id: 'x-bonsai', mode: 'extended', agency: 'ARS', program: 'Agricultural Research Service — U.S. National Arboretum',
    subjectId: 'bonsai', problemId: 'p-bonsai-care', objectiveId: 'o-bonsai',
    fact: 'The National Bonsai & Penjing Museum at the U.S. National Arboretum — run by USDA’s Agricultural Research Service — began in 1976, when the Nippon Bonsai Association gave 53 bonsai to the United States for the Bicentennial.',
    sourceIds: ['usna-about', 'ars-bonsai'],
  },
  {
    id: 'x-xmas', mode: 'extended', agency: 'AMS', program: 'Agricultural Marketing Service — Research and Promotion Programs',
    subjectId: 'xmastree', problemId: 'p-xmas-promo', objectiveId: 'o-xmas',
    fact: 'A federal research and promotion program for fresh-cut Christmas trees, overseen by the Agricultural Marketing Service, is funded by assessments on producers and importers. In 2026 its board was renamed the Real Christmas Tree Board.',
    sourceIds: ['ams-xmas'],
  },
];

export const CASE_BY_ID: Record<string, CuratedCase> = Object.fromEntries(CURATED_CASES.map((c) => [c.id, c]));
