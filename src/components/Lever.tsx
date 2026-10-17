import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface LeverProps {
  disabled: boolean;
  onPull: () => void;
  compact: boolean;
  reducedMotion: boolean;
}

/**
 * A tactile lever. Drag the knob down (mouse or touch) past the catch point,
 * or click / press Enter, to pull.
 */
export function Lever({ disabled, onPull, compact, reducedMotion }: LeverProps) {
  const travel = compact ? 120 : 190;
  const knob = compact ? 40 : 54;
  const y = useMotionValue(0);
  const rodHeight = useTransform(y, (v) => travel + knob / 2 + 24 - v);
  const tilt = useTransform(y, [0, travel], [0, 1]);
  const shadow = useTransform(tilt, (t) => `0 ${6 - t * 4}px ${10 - t * 6}px rgba(0,0,0,${0.45 - t * 0.2})`);
  const pulling = useRef(false);

  const release = () =>
    animate(y, 0, reducedMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 260, damping: 11, mass: 0.9 });

  const fire = () => {
    if (disabled || pulling.current) return;
    pulling.current = true;
    onPull();
    window.setTimeout(() => (pulling.current = false), 300);
  };

  const clickPull = async () => {
    if (disabled) return;
    await animate(y, travel, { duration: reducedMotion ? 0.08 : 0.22, ease: [0.5, 0, 0.9, 0.6] });
    fire();
    await release();
  };

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative" style={{ height: travel + knob + 30, width: knob + 10 }}>
        {/* slot */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-b from-black/70 to-black/40 shadow-inner"
          style={{ top: knob / 2, height: travel + 14, width: 12 }}
        />
        {/* rod: grows from the pivot up to the knob */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-zinc-400 via-zinc-100 to-zinc-500"
          style={{ bottom: 6, height: rodHeight, width: compact ? 9 : 11 }}
        />
        {/* pivot housing */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-md border-2 border-brass-700 bg-gradient-to-b from-brass-300 to-brass-600"
          style={{ width: knob, height: 18 }}
        />
        {/* knob */}
        <motion.button
          type="button"
          aria-label="Pull the lever to issue a new assignment"
          disabled={disabled}
          drag={disabled ? false : 'y'}
          dragConstraints={{ top: 0, bottom: travel }}
          dragElastic={0.04}
          dragMomentum={false}
          onDragEnd={() => {
            if (y.get() > travel * 0.62) fire();
            void release();
          }}
          onClick={() => {
            if (y.get() < 4) void clickPull();
          }}
          style={{ y, width: knob, height: knob, marginLeft: -knob / 2, boxShadow: shadow, touchAction: 'none' }}
          whileHover={disabled ? undefined : { scale: 1.06 }}
          whileTap={disabled ? undefined : { scale: 0.96 }}
          className="lever-knob absolute left-1/2 top-0 cursor-grab rounded-full border-2 border-stamp-700 bg-[radial-gradient(circle_at_35%_30%,#ff8a7a,#c0392b_45%,#7f1d15)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brass-300 active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-80"
        >
          <span className="pointer-events-none absolute left-[22%] top-[16%] h-[28%] w-[28%] rounded-full bg-white/50 blur-[1px]" />
        </motion.button>
      </div>
      <div className="mt-1 font-plaque text-[10px] uppercase tracking-[0.2em] text-brass-300/90">Pull</div>
    </div>
  );
}
