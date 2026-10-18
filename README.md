# The APHIS Assignment Machine

*“Protecting American Agriculture, One Very Specific Assignment at a Time.”*

A satirical three-reel slot machine that hands out urgent, oddly specific federal assignments. It's a tribute to the people at USDA APHIS. It is a parody and is **not** an official USDA or APHIS application.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build in dist/ (static; host anywhere)
npm test           # content-integrity and pun-engine tests
```

No backend, login, API keys or paid services.

**Deployment:** `.github/workflows/deploy.yml` runs the tests, builds the site and publishes it to the `gh-pages` branch on every push to `main` or `aphis-assignment-machine`. To serve it, go to *Settings → Pages* and set *Source: Deploy from a branch → `gh-pages` / root*. The site then appears at `https://cjpaulphd.github.io/play/`. The build uses relative asset paths, so it works under any subpath. Preferences, counters and recent cases are kept in `localStorage`.

## Modes

| Mode | How it rolls | Label |
|---|---|---|
| **Surprisingly Real** | Picks one complete, sourced case from `src/data/cases.ts`. Never recombines parts. | Includes an “Actual Federal Concern” panel with sources |
| **Maximum Bureaucracy** | Picks each reel independently, weighted toward absurd entries | “Hypothetical Assignment — Not Actual Federal Policy” |
| **PPD Economic Analysis** | Independent reels tilted toward applied economics (discount-rate disputes, moving baselines, monetizing vibes); econ-flavored puns preferred | Hypothetical; every figure fictional |
| **USDA Extended Universe** | Unlocks after 5 assignments. Real cases from AMS, ARS and the Forest Service | Names the responsible agency |

## PPD Economic Analysis Addendum

Every case file includes a fictional preliminary regulatory impact analysis, made in honor of APHIS Policy and Program Development. The inputs are invented, seeded per case so they stay stable, but the arithmetic is real:

- 10-year ledger with present values, annualized net benefits (capital recovery factor), NPV and a benefit-cost ratio
- Discount-rate toggle: 2% (2023 Circular A-4), or 3% and 7% (2003 Circular A-4)
- One-at-a-time ±30% sensitivity analysis drawn as a tornado chart, plus one clearly fictional parameter
- E.O. 12866 significance check against the $100 million threshold, a Regulatory Flexibility Act determination, the Paperwork Reduction Act burden and unquantified benefits and costs

Two real PPD-themed cases (E.O. 12866 regulatory impact analysis and the Regulatory Flexibility Act) appear in Surprisingly Real mode. Several real cases carry a sourced **PPD Economic Footnote**, such as APHIS's estimate of about $2.5B a year in feral swine damage and control costs. The math lives in `src/lib/econ.ts` and is tested in `src/__tests__/econ.test.ts`.

## Project layout

```
src/
  types.ts                 domain types (Subject, Problem, Objective, CuratedCase, PunEntry…)
  data/                    content only, kept separate from logic
    subjects.ts problems.ts objectives.ts   reel content with categories and tags
    cases.ts               curated real cases → sourceIds
    sources.ts             every citation
    puns.ts                the pun library (bespoke, tailored, templates)
    bureaucracy.ts         statuses, loading messages, trivia, committee generator
  lib/
    random.ts              crypto-backed randomInt, Fisher–Yates shuffle, ShuffleBag
    assignment.ts          rolls assignments, case numbers, fictional burden
    punEngine.ts           context-sensitive pun selection
    sound.ts               Web Audio synthesized SFX (muted by default)
    share.ts storage.ts hooks.ts
  components/              SlotMachine, Reel, Lever, PunPanel, CaseFile, GameControls, …
  illustrations/Icons.tsx  original SVG illustrations
```

## The pun engine

`generatePun()` scores every line in `src/data/puns.ts` against the rolled subject, problem and objective:

1. **Bespoke**: exact subject + problem + objective (every curated case has three).
2. **Tailored**: the subject plus the problem or objective *category*, or subject-specific lines that use `{P}` / `{O}`.
3. **Templated**: category templates that use `{S}`.

It takes the top tier, and sometimes the next one down so lines vary. It skips the last 30 puns shown, and **Request Revised Finding** never repeats a line for the same case. Some lines get an administrative-jargon closer. Tokens: `{S}`, `{s}`, `{P}`, `{O}`, `{office}`, `{form}`.

## Adding content

- **A real case**: add any new reel entries (realism `'real'`) and the sources, then add a `CuratedCase` with factual `fact` / `obscureDetail` text only. Add bespoke lines to `BESPOKE` in `puns.ts`. The tests require at least two lines per case, and that every id and source resolves.
- **A chaos entry**: add it to `problems.ts` / `objectives.ts` with realism `'absurd'`.
- **A subject**: add it to `subjects.ts` with `traits`, an `icon` (add an SVG to `Icons.tsx` if needed) and three `BY_SUBJECT` lines.

## Accuracy policy

Factual text appears only in the “Actual Federal Concern”, “Did you really just regulate that?” and trivia panels. Each of those cites a public source (APHIS, eCFR, AMS, ARS, USFS and similar). Everything else is labeled as a joke, including statuses, case numbers, paperwork burdens, offices and form numbers. The emblem is an original parody and not a federal seal.

## Fun extras

- **Space** pulls the lever and **R** asks for a revised finding. The lever can also be dragged or clicked.
- Rare events: *Interagency Jackpot*, *Emergency Regulatory Alignment*, *Pareto Improvement* (PPD mode) and *Agency Reorganization*. To preview one, add `?event=jackpot|alignment|pareto|reorg` to the URL.
- Click the emblem five times.
- Respects `prefers-reduced-motion`.

---

This is a parody. Not an official USDA or APHIS application. No actual permits were issued in the making of this assignment.
