import { motion } from 'framer-motion';
import { SOURCE_BY_ID } from '../data/sources';
import type { TriviaItem } from '../types';

export function TriviaCard({ item, onDismiss }: { item: TriviaItem; onDismiss: () => void }) {
  const src = SOURCE_BY_ID[item.sourceId];
  return (
    <motion.aside
      key={item.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      aria-labelledby="trivia-heading"
      className="mx-auto w-full max-w-4xl rounded-xl border-2 border-brass-500 bg-forest-800/90 p-4 shadow-lg sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brass-400 bg-navy-900 font-display text-lg font-black text-brass-300" aria-hidden>
          i
        </div>
        <div className="min-w-0 flex-1">
          <h2 id="trivia-heading" className="font-plaque text-[12px] font-bold uppercase tracking-[0.18em] text-brass-300">
            Official Regulatory Trivia
          </h2>
          <p className="mt-1 font-body text-[15.5px] leading-relaxed text-ivory-50">{item.text}</p>
          {src && (
            <p className="mt-2 font-type text-[12px] text-ivory-200/80">
              Source:{' '}
              <a className="underline underline-offset-2 hover:text-brass-300" href={src.url} target="_blank" rel="noopener noreferrer">
                {src.title}
              </a>{' '}
              ({src.publisher})
            </p>
          )}
        </div>
        <button type="button" onClick={onDismiss} className="btn-ghost shrink-0" aria-label="Dismiss trivia">
          ✕
        </button>
      </div>
    </motion.aside>
  );
}
