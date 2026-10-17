/** Subtle ambient set dressing: drifting paperwork and a hovering stamp. Hidden from assistive tech. */
export function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-office" />
      {[
        { left: '6%', top: '18%', delay: '0s', dur: '38s', rot: '-8deg' },
        { left: '82%', top: '30%', delay: '-12s', dur: '46s', rot: '6deg' },
        { left: '70%', top: '74%', delay: '-25s', dur: '52s', rot: '-4deg' },
        { left: '14%', top: '68%', delay: '-6s', dur: '44s', rot: '10deg' },
      ].map((p, i) => (
        <div key={i} className="drift-paper" style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.dur, ['--rot' as string]: p.rot }}>
          <div className="h-px w-3/4 bg-black/20" />
          <div className="mt-2 h-px w-2/3 bg-black/20" />
          <div className="mt-2 h-px w-3/4 bg-black/20" />
          <div className="mt-2 h-px w-1/2 bg-black/20" />
        </div>
      ))}
      <div className="hover-stamp">PENDING REVIEW</div>
    </div>
  );
}
