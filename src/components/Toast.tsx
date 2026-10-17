import { AnimatePresence, motion } from 'framer-motion';

export function Toast({ message }: { message: string | null }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4" aria-live="polite">
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="rounded-lg border-2 border-brass-500 bg-navy-900 px-4 py-2.5 font-type text-sm text-ivory-50 shadow-xl"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
