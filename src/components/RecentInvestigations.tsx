import { Icon } from '../illustrations/Icons';
import { SUBJECT_BY_ID } from '../data/subjects';
import { PROBLEM_BY_ID } from '../data/problems';
import { OBJECTIVE_BY_ID } from '../data/objectives';
import type { StoredAssignment } from '../types';

const MODE_TAG: Record<StoredAssignment['mode'], string> = { real: 'REAL', ppd: 'PPD', chaos: 'HYPO', extended: 'EXT' };

export function RecentInvestigations({ items, onOpen, currentKey }: { items: StoredAssignment[]; onOpen: (s: StoredAssignment) => void; currentKey?: string }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="recent-heading" className="mx-auto w-full max-w-4xl">
      <h2 id="recent-heading" className="section-heading">Recent Investigations</h2>
      <ol className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-2">
        {items.map((s) => {
          const subj = SUBJECT_BY_ID[s.subjectId];
          const prob = PROBLEM_BY_ID[s.problemId];
          const obj = OBJECTIVE_BY_ID[s.objectiveId];
          if (!subj || !prob || !obj) return null;
          const current = s.key === currentKey;
          return (
            <li key={s.key} className="min-w-0">
              <button
                type="button"
                onClick={() => onOpen(s)}
                aria-current={current ? 'true' : undefined}
                className={`recent-row group w-full ${current ? 'recent-row--current' : ''}`}
              >
                <Icon id={subj.icon} className="h-9 w-9 shrink-0" />
                <span className="min-w-0 flex-1 text-left">
                  <span className="block truncate font-type text-[12px] text-navy-800/70">
                    {s.caseNumber} · <span className="font-bold">{MODE_TAG[s.mode]}</span>
                  </span>
                  <span className="block truncate font-body text-[14px] font-semibold text-navy-950">
                    {subj.name} — {prob.text}
                  </span>
                  <span className="block truncate font-body text-[13px] italic text-navy-800/80">“{s.pun.text}”</span>
                </span>
                <span className="hidden shrink-0 font-plaque text-[10px] uppercase tracking-[0.16em] text-forest-700 group-hover:underline sm:block">Reopen</span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
