import { motion } from 'framer-motion';
import { useMemo } from 'react';

const COLORS = ['#fbf6e6', '#efe5c8', '#d4b467', '#c0392b', '#2e6b50', '#9cc7d9'];
const SHAPES = ['form', 'strip', 'square'] as const;

/** Paper confetti: tiny forms, ticker tape and sticky notes. */
export function Confetti({ burstKey, count = 70 }: { burstKey: string; count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: `${burstKey}-${i}`,
        x: Math.random() * 100,
        drift: (Math.random() - 0.5) * 220,
        delay: Math.random() * 0.5,
        duration: 2.6 + Math.random() * 2,
        rotate: (Math.random() - 0.5) * 900,
        color: COLORS[i % COLORS.length],
        shape: SHAPES[i % SHAPES.length],
        size: 8 + Math.random() * 10,
      })),
    [burstKey, count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', x: p.drift, rotate: p.rotate, opacity: [1, 1, 0.9, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: [0.25, 0.4, 0.6, 1] }}
          style={{ left: `${p.x}%`, position: 'absolute', top: 0 }}
        >
          {p.shape === 'form' ? (
            <div style={{ width: p.size, height: p.size * 1.3, background: p.color }} className="border border-black/10 shadow-sm">
              <div className="mx-[15%] mt-[20%] h-px bg-black/25" />
              <div className="mx-[15%] mt-[18%] h-px bg-black/25" />
              <div className="mx-[15%] mt-[18%] h-px w-1/2 bg-black/25" />
            </div>
          ) : p.shape === 'strip' ? (
            <div style={{ width: p.size * 0.35, height: p.size * 1.8, background: p.color }} />
          ) : (
            <div style={{ width: p.size * 0.8, height: p.size * 0.8, background: p.color }} className="rounded-[1px]" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
