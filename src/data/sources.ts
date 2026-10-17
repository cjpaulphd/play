import type { SourceRecord } from '../types';

/**
 * Public sources backing every factual claim in the app.
 * Add a record here before citing it from a case or trivia item.
 */
export const SOURCES: SourceRecord[] = [
  { id: 'aphis-mission', title: 'APHIS Mission', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/mission' },
  { id: 'aphis-about', title: 'About the Animal and Plant Health Inspection Service', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/about' },
  { id: 'bts', title: 'Operational Activities: Brown Treesnake', publisher: 'USDA APHIS Wildlife Services', url: 'https://www.aphis.usda.gov/operational-wildlife-activities/brown-treesnake' },
  { id: 'bts-nwrc', title: 'NWRC Research Areas: Brown Treesnake', publisher: 'USDA APHIS National Wildlife Research Center', url: 'https://www.aphis.usda.gov/national-wildlife-programs/nwrc/research-areas/brown-treesnake' },
  { id: 'gas', title: 'Giant African Snail (Mollusks)', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/plant-pests-diseases/mollusks' },
  { id: 'bees', title: 'Honey Bees and Other Bees', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/organism-soil-imports/honey-bees-other-bees' },
  { id: 'bees-nz', title: 'Import Adult Honey Bees from New Zealand: Shipping Requirements', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/organism-soil-imports/honey-bees-other-bees/shipping-requirements-import-adult-honey-bees' },
  { id: 'cfr-322', title: '7 CFR Part 322 — Bees, Beekeeping Byproducts, and Beekeeping Equipment', publisher: 'eCFR', url: 'https://www.ecfr.gov/current/title-7/subtitle-B/chapter-III/part-322' },
  { id: 'cfr-3-164', title: '9 CFR § 3.164 — Food and water requirements (birds)', publisher: 'eCFR', url: 'https://www.ecfr.gov/current/title-9/chapter-I/subchapter-A/part-3/subpart-G/section-3.164' },
  { id: 'cfr-3-164-lii', title: '9 CFR § 3.164 — Food and water requirements', publisher: 'Cornell Legal Information Institute', url: 'https://www.law.cornell.edu/cfr/text/9/3.164' },
  { id: 'pet-birds', title: 'Importing Pet Birds into the United States: Federal Quarantine', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/pet-travel/another-country-to-us-import/birds/federal-quarantine' },
  { id: 'jb', title: 'Japanese Beetle', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/plant-pests-diseases/japanese-beetle' },
  { id: 'cfr-301-f', title: '7 CFR Part 301 Subpart F — Japanese Beetle', publisher: 'eCFR', url: 'https://www.ecfr.gov/current/title-7/subtitle-B/chapter-III/part-301/subpart-F' },
  { id: 'slf', title: 'Spotted Lanternfly', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/plant-pests-diseases/slf' },
  { id: 'clean-items', title: 'Clean Outdoor Items Before Moving Them', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/plant-pests-diseases/hungry-pests/how-stop-them/clean-outdoor-items-you-move' },
  { id: 'swine', title: 'National Feral Swine Damage Management Program', publisher: 'USDA APHIS Wildlife Services', url: 'https://www.aphis.usda.gov/operational-wildlife-activities/feral-swine/program' },
  { id: 'swine-history', title: 'History Highlight: APHIS Establishes National Program to Combat Destructive Feral Swine', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/news/program-updates/aphis50-feral-swine' },
  { id: 'citrus', title: 'Citrus Diseases', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/plant-pests-diseases/citrus-diseases' },
  { id: 'citrus-areas', title: 'Citrus Greening and Asian Citrus Psyllid Quarantined Areas', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/sites/default/files/citrus-greening-asian-citrus-psyllid-regulated-areas.pdf' },
  { id: 'citrus-leaves', title: 'DA-2022-07: Interstate movement of fresh rutaceous leaves', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/sites/default/files/da-2022-07.pdf' },
  { id: 'nws', title: 'New World Screwworm', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/livestock-poultry-disease/cattle/ticks/screwworm' },
  { id: 'nws-sit', title: 'Eradicating New World Screwworm With Sterile Insect Technique', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/sites/default/files/factsheet-eradicating-nws-sit.pdf' },
  { id: 'nws-facilities', title: 'Sterile Fly Production and Dispersal Facilities', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/livestock-poultry-disease/stop-screwworm/sterile-fly-production-dispersal-facilities' },
  { id: 'cem', title: 'Contagious Equine Metritis (CEM) Testing for Imported Horses', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/live-animal-import/equine/cem' },
  { id: 'hpa', title: 'Horse Protection Act', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/hpa' },
  { id: 'orv', title: 'USDA Conducts 2026 Oral Rabies Vaccination Efforts Targeting Wildlife in Eastern United States', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/news/agency-announcements/usda-conducts-2026-oral-rabies-vaccination-efforts-targeting-wildlife' },
  { id: 'starlings', title: 'Operational Activities: Starlings and Blackbirds', publisher: 'USDA APHIS Wildlife Services', url: 'https://www.aphis.usda.gov/operational-wildlife-activities/starlings-blackbirds' },
  { id: 'medfly', title: 'Mediterranean Fruit Fly', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/plant-pests-diseases/medfly' },
  { id: 'medfly-cdfa', title: 'How 30 Years of Prevention Cut California Medfly Infestations by Over 90%', publisher: 'California Department of Food and Agriculture', url: 'https://plantingseedsblog.cdfa.ca.gov/index.php/2026/08/05/how-30-years-of-prevention-cut-california-medfly-infestations-by-over-90/' },
  { id: 'petunia', title: 'USDA-APHIS Bulletin on Unauthorized Distribution of Genetically Engineered Petunias (reprinted)', publisher: 'Greenhouse Grower', url: 'https://www.greenhousegrower.com/varieties/usda-aphis-bulletin-on-unauthorized-distribution-of-genetically-engineered-petunias/' },
  { id: 'cites', title: 'CITES (Endangered Plant Species)', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/plant-imports/cites' },
  { id: 'special-plants', title: 'Plants with Special Requirements and Prohibited Plants', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/plant-imports/buy-plants-seeds-online/plants-special-requirements' },
  { id: 'wpm', title: 'Import ISPM 15-Compliant Wood Packaging Material into the U.S.', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/plant-imports/wood-packaging-material/import' },
  { id: 'wpm-look', title: 'What Compliant Wood Packaging Material Looks Like', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/plant-imports/wood-packaging-material/inspection' },
  { id: 'dogs', title: 'Detector Dogs', publisher: 'USDA APHIS Plant Protection and Quarantine', url: 'https://www.aphis.usda.gov/plant-protection-quarantine/detector-dogs' },
  { id: 'hawaii', title: 'Information for Travelers From Hawaii to the U.S. Mainland, Alaska, or Guam', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/traveling-with-ag-products/hawaii' },
  { id: 'khapra', title: 'Khapra Beetle Program Manual', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/sites/default/files/khapra-beetle.pdf' },
  { id: 'khapra-card', title: 'Khapra Beetle Pest Card', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/sites/default/files/HP-PestCards-KB.pdf' },
  { id: 'hpai-dairy', title: 'USDA Actions to Protect Livestock Health From Highly Pathogenic H5N1 Avian Influenza', publisher: 'USDA', url: 'https://www.usda.gov/about-usda/news/press-releases/2024/04/24/usda-actions-protect-livestock-health-highly-pathogenic-h5n1-avian-influenza' },
  { id: 'hpai-dairy-update', title: 'APHIS Updates Guidance on the Interstate Movement of Lactating Dairy Cattle', publisher: 'USDA APHIS', url: 'https://www.aphis.usda.gov/news/program-update/aphis-updates-guidance-interstate-movement-lactating-dairy-cattle' },
  // Extended universe (not APHIS)
  { id: 'ams-asparagus', title: 'Asparagus Grades and Standards', publisher: 'USDA Agricultural Marketing Service', url: 'https://www.ams.usda.gov/grades-standards/asparagus-grades-and-standards' },
  { id: 'ams-asparagus-proc', title: 'Asparagus for Processing Grades and Standards', publisher: 'USDA Agricultural Marketing Service', url: 'https://www.ams.usda.gov/grades-standards/asparagus-processing-grades-and-standards' },
  { id: 'ams-eggs', title: 'Egg Grading Shields', publisher: 'USDA Agricultural Marketing Service', url: 'https://www.ams.usda.gov/grades-standards/egg/grade-shields' },
  { id: 'ams-eggs-qa', title: 'Shell Eggs: Questions and Answers', publisher: 'USDA Agricultural Marketing Service', url: 'https://www.ams.usda.gov/publications/qa-shell-eggs' },
  { id: 'usfs-smokey', title: 'Licensing of Smokey Bear', publisher: 'USDA Forest Service', url: 'https://www.fs.usda.gov/working-with-us/contracts-commercial-permits/licensing-of-smokey-bear' },
  { id: 'usna-about', title: 'About the U.S. National Arboretum', publisher: 'USDA Agricultural Research Service', url: 'https://www.usna.usda.gov/about/who-we-are-about-the-arboretum/' },
  { id: 'ars-bonsai', title: 'National Bonsai & Penjing Museum’s Anniversary', publisher: 'AgResearch Magazine (USDA ARS)', url: 'https://agresearchmag.ars.usda.gov/2016/oct/bonsai/' },
  { id: 'ams-xmas', title: 'Real Christmas Tree Board: Federal Register History', publisher: 'USDA Agricultural Marketing Service', url: 'https://www.ams.usda.gov/rules-regulations/research-promotion/christmas-trees/federal-register-history' },
];

export const SOURCE_BY_ID: Record<string, SourceRecord> = Object.fromEntries(
  SOURCES.map((s) => [s.id, s]),
);
