/** Defensive localStorage wrapper: private mode, quota and disabled storage all fail quietly. */

const PREFIX = 'aphis-machine:';

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = globalThis.localStorage?.getItem(PREFIX + key);
    return raw == null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function save<T>(key: string, value: T): void {
  try {
    globalThis.localStorage?.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage unavailable — preferences simply won't persist */
  }
}
