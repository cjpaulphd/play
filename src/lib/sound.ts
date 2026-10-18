/**
 * Tiny synthesized sound kit (Web Audio). No audio files, no licensing.
 * Everything is a no-op until enabled; the app starts muted.
 */

let ctx: AudioContext | null = null;
let enabled = false;
let lastTick = 0;

function ac(): AudioContext | null {
  if (!enabled) return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

export function setSoundEnabled(on: boolean): void {
  enabled = on;
  if (on) ac(); // unlock on the user gesture that toggled it
}

function tone(freq: number, dur: number, opts: { type?: OscillatorType; gain?: number; delay?: number; slideTo?: number } = {}) {
  const a = ac();
  if (!a) return;
  const t0 = a.currentTime + (opts.delay ?? 0);
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = opts.type ?? 'sine';
  osc.frequency.setValueAtTime(freq, t0);
  if (opts.slideTo) osc.frequency.exponentialRampToValueAtTime(opts.slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(opts.gain ?? 0.2, t0 + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(a.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function noise(dur: number, opts: { gain?: number; delay?: number; lowpass?: number } = {}) {
  const a = ac();
  if (!a) return;
  const t0 = a.currentTime + (opts.delay ?? 0);
  const len = Math.max(1, Math.floor(a.sampleRate * dur));
  const buf = a.createBuffer(1, len, a.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2;
  const src = a.createBufferSource();
  src.buffer = buf;
  const filter = a.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = opts.lowpass ?? 2400;
  const g = a.createGain();
  g.gain.value = opts.gain ?? 0.3;
  src.connect(filter).connect(g).connect(a.destination);
  src.start(t0);
}

export const sfx = {
  /** One reel symbol passing the window. */
  tick() {
    const now = performance.now();
    if (now - lastTick < 45) return; // three reels ticking at once would be a wall of noise
    lastTick = now;
    tone(1800 + Math.random() * 300, 0.025, { type: 'square', gain: 0.025 });
  },
  /** Lever ratchet. */
  lever() {
    for (let i = 0; i < 5; i++) tone(320 - i * 30, 0.03, { type: 'square', gain: 0.05, delay: i * 0.035 });
    noise(0.12, { gain: 0.08, lowpass: 900, delay: 0.17 });
  },
  /** A reel clunking to a stop. */
  reelStop(index: number) {
    noise(0.08, { gain: 0.25, lowpass: 600 });
    tone(140 - index * 12, 0.12, { type: 'triangle', gain: 0.25, slideTo: 70 });
  },
  /** Rubber stamp slam. */
  stamp() {
    noise(0.18, { gain: 0.5, lowpass: 450 });
    tone(90, 0.2, { type: 'sine', gain: 0.4, slideTo: 45 });
  },
  /** Official-sounding chime (three-note civic bell). */
  chime() {
    [784, 988, 1175].forEach((f, i) => {
      tone(f, 0.9, { type: 'sine', gain: 0.12, delay: i * 0.16 });
      tone(f * 2.01, 0.5, { type: 'sine', gain: 0.03, delay: i * 0.16 });
    });
  },
  /** Jackpot fanfare. */
  fanfare() {
    [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.22, { type: 'triangle', gain: 0.12, delay: i * 0.11 }));
  },
  /** Paper shuffle. */
  paper() {
    noise(0.25, { gain: 0.08, lowpass: 5000 });
  },
  click() {
    tone(900, 0.03, { type: 'square', gain: 0.04 });
  },
};
