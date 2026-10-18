import { motion } from 'framer-motion';

export function RareEventBanner({ title, subtitle, onClose }: { title: string; subtitle: string; onClose: () => void }) {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
      animate={{ opacity: 1, scale: 1, rotate: -2 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 14 }}
      className="fixed inset-x-4 top-1/3 z-[60] mx-auto max-w-xl rounded-2xl border-4 border-brass-400 bg-stamp-600 p-1 shadow-2xl"
      onClick={onClose}
    >
      <div className="rounded-xl border-2 border-dashed border-ivory-100/60 px-5 py-6 text-center">
        <p className="font-plaque text-[11px] uppercase tracking-[0.3em] text-ivory-100/90">Special Bulletin</p>
        <p className="mt-1 font-display text-[clamp(1.5rem,6vw,2.6rem)] font-black leading-tight text-ivory-50 [text-shadow:0_3px_0_#7f1d15]">{title}</p>
        <p className="mt-2 font-type text-sm text-ivory-100">{subtitle}</p>
        <p className="mt-3 font-type text-[11px] text-ivory-100/70">No money, prizes or permits are awarded. Tap to dismiss.</p>
      </div>
    </motion.div>
  );
}
