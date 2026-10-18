import { motion } from 'framer-motion';

/**
 * A clearly fictional parody emblem: beetle, magnifying glass, wheat stalks.
 * Deliberately unlike any real federal seal.
 */
export function Emblem({ size = 112, onClick, spinning = true, reducedMotion = false }: { size?: number; onClick?: () => void; spinning?: boolean; reducedMotion?: boolean }) {
  const ring = 'DEPT. OF EXTREMELY SPECIFIC AFFAIRS ✶ FICTIONAL SEAL ✶ NOT FOR OFFICIAL USE ✶ ';
  const animateRing = spinning && !reducedMotion;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Fictional parody emblem of the Department of Extremely Specific Affairs"
      className="group relative shrink-0 rounded-full focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-brass-300"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
        <defs>
          <path id="emblem-ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          <radialGradient id="emblem-face" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#2e6b50" />
            <stop offset="100%" stopColor="#0b1f17" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="#d4b467" />
        <circle cx="60" cy="60" r="55" fill="#123026" stroke="#957637" strokeWidth="1.5" />
        <motion.g
          style={{ originX: '60px', originY: '60px' }}
          animate={animateRing ? { rotate: 360 } : undefined}
          transition={animateRing ? { duration: 90, repeat: Infinity, ease: 'linear' } : undefined}
        >
          <text fontFamily="Oswald, sans-serif" fontSize="8.2" letterSpacing="1.3" fill="#e6cf8f" fontWeight="600">
            <textPath href="#emblem-ring">{ring}</textPath>
          </text>
        </motion.g>
        <circle cx="60" cy="60" r="36" fill="url(#emblem-face)" stroke="#d4b467" strokeWidth="2" />
        {/* wheat stalks */}
        {[-1, 1].map((side) => (
          <g key={side} transform={`translate(60 60) scale(${side} 1) translate(-60 -60)`}>
            <path d="M40 88 C34 74 34 58 42 44" fill="none" stroke="#e6cf8f" strokeWidth="1.6" />
            {[0, 1, 2, 3, 4].map((i) => (
              <ellipse key={i} cx={36 + i * 0.6} cy={80 - i * 8} rx="2.4" ry="4.6" fill="#d4b467" transform={`rotate(${-30 + i * 6} ${36 + i * 0.6} ${80 - i * 8})`} />
            ))}
          </g>
        ))}
        {/* beetle */}
        <g transform="translate(60 58)">
          <path d="M-9 -4l-6 -4M-9 4h-7M-8 10l-6 5M9 -4l6 -4M9 4h7M8 10l6 5" stroke="#e6cf8f" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="0" cy="4" rx="10" ry="12" fill="#b0703a" stroke="#0b1f17" strokeWidth="1.4" />
          <path d="M0 -7v23" stroke="#0b1f17" strokeWidth="1.2" />
          <ellipse cx="0" cy="-9" rx="6" ry="4.5" fill="#2e6b50" stroke="#0b1f17" strokeWidth="1.4" />
          <path d="M-3 -13l-3 -5M3 -13l3 -5" stroke="#e6cf8f" strokeWidth="1.3" strokeLinecap="round" />
        </g>
        {/* magnifying glass */}
        <g transform="translate(70 66) rotate(-35)">
          <circle cx="0" cy="0" r="9" fill="rgba(156,199,217,0.35)" stroke="#e6cf8f" strokeWidth="2.6" />
          <path d="M0 9v12" stroke="#8a5a35" strokeWidth="4" strokeLinecap="round" />
        </g>
        <text x="60" y="98" textAnchor="middle" fontFamily="Oswald, sans-serif" fontSize="6" letterSpacing="1.5" fill="#e6cf8f">EST. WHENEVER</text>
      </svg>
      <span className="pointer-events-none absolute inset-0 rounded-full ring-0 ring-brass-300/0 transition group-hover:ring-4 group-hover:ring-brass-300/30" />
    </button>
  );
}
