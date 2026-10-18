import { animate, motion, useMotionValue, useTransform, useVelocity } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '../illustrations/Icons';
import { sfx } from '../lib/sound';
import type { IconId } from '../types';

export interface ReelItem {
  key: string;
  icon: IconId;
  text: string;
  sub?: string;
}

interface ReelProps {
  index: 0 | 1 | 2;
  item: ReelItem;
  /** Increments to start a spin from the current symbol to `item`. */
  spinId: number;
  makeFiller: () => ReelItem;
  compact: boolean;
  reducedMotion: boolean;
  onStop: (index: number) => void;
  highlight?: boolean;
}

/** Item and window heights per layout. */
const SIZES = {
  compact: { item: 84, window: 120 },
  wide: { item: 188, window: 252 },
};

function textSize(text: string, compact: boolean): string {
  const n = text.length;
  if (compact) return n > 52 ? 'text-[12.5px] leading-tight' : n > 34 ? 'text-[13.5px] leading-snug' : 'text-[15px] leading-snug';
  return n > 52 ? 'text-[13px] leading-snug' : n > 34 ? 'text-[15px] leading-snug' : 'text-[17px] leading-snug';
}

function ReelCell({ item, compact, height }: { item: ReelItem; compact: boolean; height: number }) {
  return (
    <div
      className={`flex shrink-0 items-center ${compact ? 'flex-row gap-3 px-3 text-left' : 'flex-col justify-center gap-2 px-3 text-center'}`}
      style={{ height }}
    >
      <div className={`${compact ? 'h-14 w-14' : 'h-[88px] w-[88px]'} shrink-0 drop-shadow-[0_2px_0_rgba(0,0,0,0.12)]`}>
        <Icon id={item.icon} className="h-full w-full" />
      </div>
      <div className="min-w-0">
        <div className={`font-body font-semibold text-navy-950 ${textSize(item.text, compact)} line-clamp-3 text-balance`}>{item.text}</div>
        {item.sub && <div className="mt-0.5 font-type text-[11px] italic text-forest-700/80 line-clamp-1">{item.sub}</div>}
      </div>
    </div>
  );
}

export function Reel({ index, item, spinId, makeFiller, compact, reducedMotion, onStop, highlight }: ReelProps) {
  const size = compact ? SIZES.compact : SIZES.wide;
  const offset = (size.window - size.item) / 2;

  const [strip, setStrip] = useState<ReelItem[]>([item]);
  const y = useMotionValue(offset);
  const velocity = useVelocity(y);
  const blur = useTransform(velocity, (v) => (reducedMotion ? 'none' : `blur(${Math.min(Math.abs(v) / 900, 3.2).toFixed(2)}px)`));
  const lastSpin = useRef(spinId);
  const shownKey = useRef(item.key);
  const lastIdx = useRef(0);

  // Keep the final symbol aligned when the layout changes size.
  useLayoutEffect(() => {
    y.set(offset - (strip.length - 1) * size.item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, size.item]);

  useEffect(() => {
    if (spinId === lastSpin.current) {
      // Not a spin: snap to the new item (e.g. restoring a past case).
      if (item.key !== shownKey.current) {
        shownKey.current = item.key;
        setStrip([item]);
        y.set(offset);
      }
      return;
    }
    lastSpin.current = spinId;

    const current = strip[strip.length - 1];
    const fillerCount = reducedMotion ? 2 : 16 + index * 6;
    const fillers = Array.from({ length: fillerCount }, () => makeFiller());
    const next = [current, ...fillers, item];
    shownKey.current = item.key;
    setStrip(next);

    const start = offset;
    const end = offset - (next.length - 1) * size.item;
    y.set(start);
    lastIdx.current = 0;

    let cancelled = false;
    const run = async () => {
      if (reducedMotion) {
        await animate(y, end, { duration: 0.35 + index * 0.12, ease: 'easeOut' });
      } else {
        // Wind-up: a short tug backward, as if the lever caught the mechanism.
        await animate(y, start + size.item * 0.28, { duration: 0.16, ease: 'easeOut' });
        if (cancelled) return;
        // Main travel: accelerate hard, coast, decelerate into a slight overshoot.
        await animate(y, end - size.item * 0.14, {
          duration: 1.55 + index * 0.62,
          ease: [0.32, 0.02, 0.12, 1],
        });
        if (cancelled) return;
        // Settle with a mechanical bounce.
        await animate(y, end, { type: 'spring', stiffness: 520, damping: 16, mass: 0.7 });
      }
      if (!cancelled) onStop(index);
    };
    void run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinId, item.key]);

  // Tick as each symbol passes the window.
  useEffect(
    () =>
      y.on('change', (v) => {
        const idx = Math.floor((offset - v) / size.item + 0.5);
        if (idx !== lastIdx.current) {
          lastIdx.current = idx;
          sfx.tick();
        }
      }),
    [y, offset, size.item],
  );

  return (
    <div
      className={`reel-window relative overflow-hidden rounded-md border-[3px] border-brass-600 bg-ivory-50 ${highlight ? 'reel-highlight' : ''}`}
      style={{ height: size.window }}
    >
      <motion.div style={{ y, filter: blur }} className="will-change-transform">
        {strip.map((it, i) => (
          <ReelCell key={`${it.key}-${i}`} item={it} compact={compact} height={size.item} />
        ))}
      </motion.div>
      {/* glass, shading and payline */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/45 via-transparent to-navy-950/45" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-ivory-50/0 to-transparent" />
      <div
        className="pointer-events-none absolute inset-x-0 border-y border-stamp-600/40"
        style={{ top: offset, height: size.item }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.18)_45%,transparent_55%)] mix-blend-soft-light" />
    </div>
  );
}
