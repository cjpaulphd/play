import { Emblem } from './Emblem';

export function Header({ onEmblemClick, reducedMotion }: { onEmblemClick: () => void; reducedMotion: boolean }) {
  return (
    <header className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-2 pt-6 text-center sm:flex-row sm:gap-6 sm:pt-10 sm:text-left">
      <Emblem size={104} onClick={onEmblemClick} reducedMotion={reducedMotion} />
      <div className="min-w-0">
        <p className="font-plaque text-[11px] uppercase tracking-[0.28em] text-brass-300/90 sm:text-[12px]">
          United States Department of Extremely Specific Affairs
        </p>
        <h1 className="mt-1 font-display text-[clamp(2rem,7vw,3.6rem)] font-black leading-[0.95] text-ivory-50 [text-shadow:0_3px_0_rgba(0,0,0,0.35)]">
          APHIS Assignment Machine
        </h1>
        <p className="mt-2 font-body text-[clamp(0.95rem,2.4vw,1.15rem)] italic text-ivory-200">
          An Extremely Important Government Randomization Initiative
        </p>
        <p className="mt-2 font-type text-[12px] text-brass-300/80 sm:text-[13px]">
          “Protecting American Agriculture, One Very Specific Assignment at a Time.”
        </p>
      </div>
    </header>
  );
}
