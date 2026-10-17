import { formatMoney } from '../lib/econ';
import type { GameMode } from '../types';

interface GameControlsProps {
  mode: GameMode;
  onMode: (m: GameMode) => void;
  extendedUnlocked: boolean;
  soundOn: boolean;
  onSound: () => void;
  disabled: boolean;
  issued: number;
  staffHours: number;
  netBenefits: number;
}

const MODES: { id: GameMode; label: string; sub: string }[] = [
  { id: 'real', label: 'Surprisingly Real', sub: 'Curated, sourced, actual' },
  { id: 'ppd', label: 'PPD Economic Analysis', sub: 'Benefit-cost analysis of the absurd' },
  { id: 'chaos', label: 'Maximum Bureaucracy', sub: 'Hypothetical. Gloriously so.' },
  { id: 'extended', label: 'USDA Extended Universe', sub: 'Other agencies. Still real.' },
];

export function GameControls({ mode, onMode, extendedUnlocked, soundOn, onSound, disabled, issued, staffHours, netBenefits }: GameControlsProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-3">
      <div role="radiogroup" aria-label="Game mode" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {MODES.map((m) => {
          const locked = m.id === 'extended' && !extendedUnlocked;
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={active}
              disabled={disabled || locked}
              onClick={() => onMode(m.id)}
              className={`mode-tab ${active ? 'mode-tab--active' : ''} ${locked ? 'mode-tab--locked' : ''}`}
              title={locked ? 'Unlocks after 5 assignments. Jurisdiction pending.' : undefined}
            >
              <span className="font-plaque text-[13px] font-bold uppercase tracking-[0.14em]">
                {locked && <span aria-hidden>🔒 </span>}
                {m.label}
              </span>
              <span className="font-type text-[11px] opacity-80">{locked ? 'Unlocks after 5 assignments' : m.sub}</span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 font-type text-[12px] text-ivory-200/80">
        <div className="flex flex-wrap gap-x-4 gap-y-1" aria-live="off">
          <span>
            Assignments Issued: <strong className="text-brass-300">{issued.toLocaleString('en-US')}</strong>
          </span>
          <span>
            Staff Hours Theoretically Expended: <strong className="text-brass-300">{staffHours.toLocaleString('en-US', { maximumFractionDigits: 1 })}</strong>
          </span>
          <span>
            Fictional Net Benefits Identified (7%): <strong className="text-brass-300">{formatMoney(netBenefits)}</strong>
          </span>
        </div>
        <button type="button" onClick={onSound} aria-pressed={soundOn} className="btn-ghost">
          <span aria-hidden>{soundOn ? '🔊' : '🔇'}</span> Sound {soundOn ? 'On' : 'Off'}
        </button>
      </div>
    </div>
  );
}
