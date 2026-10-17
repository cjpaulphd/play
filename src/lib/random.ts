/**
 * Unbiased randomness helpers. Uses crypto.getRandomValues with rejection
 * sampling when available, falling back to Math.random.
 */

const MAX_UINT32 = 0x1_0000_0000;

function randomUint32(): number {
  const c = globalThis.crypto;
  if (c && typeof c.getRandomValues === 'function') {
    return c.getRandomValues(new Uint32Array(1))[0];
  }
  return Math.floor(Math.random() * MAX_UINT32);
}

/** Uniform integer in [0, n). Rejection sampling avoids modulo bias. */
export function randomInt(n: number): number {
  if (!Number.isInteger(n) || n <= 0) throw new RangeError(`randomInt: n must be a positive integer, got ${n}`);
  const limit = MAX_UINT32 - (MAX_UINT32 % n);
  let x: number;
  do {
    x = randomUint32();
  } while (x >= limit);
  return x % n;
}

/** Uniform float in [0, 1). */
export function random(): number {
  return randomUint32() / MAX_UINT32;
}

export function chance(p: number): boolean {
  return random() < p;
}

export function pick<T>(items: readonly T[]): T {
  if (items.length === 0) throw new RangeError('pick: empty array');
  return items[randomInt(items.length)];
}

/** Fisher–Yates shuffle. Returns a new array. */
export function shuffle<T>(items: readonly T[]): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick `k` distinct items. */
export function sample<T>(items: readonly T[], k: number): T[] {
  return shuffle(items).slice(0, Math.min(k, items.length));
}

/**
 * A shuffle bag: draws every item once (in random order) before repeating,
 * and never repeats the last item across a refill boundary.
 */
export class ShuffleBag<T> {
  private queue: T[] = [];
  private last: T | undefined;

  constructor(private readonly items: readonly T[]) {
    if (items.length === 0) throw new RangeError('ShuffleBag: empty');
  }

  next(): T {
    if (this.queue.length === 0) {
      this.queue = shuffle(this.items);
      if (this.items.length > 1 && this.queue[this.queue.length - 1] === this.last) {
        // queue is consumed from the end; avoid an immediate repeat
        [this.queue[0], this.queue[this.queue.length - 1]] = [this.queue[this.queue.length - 1], this.queue[0]];
      }
    }
    this.last = this.queue.pop() as T;
    return this.last;
  }
}
