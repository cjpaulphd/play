import { SOURCE_BY_ID } from '../data/sources';
import type { Assignment, PunResult } from '../types';
import { formatBurden } from './assignment';

export function modeLabel(a: Assignment): string {
  if (a.mode === 'real') return 'SURPRISINGLY REAL — based on actual APHIS activities';
  if (a.mode === 'ppd') return 'PPD ECONOMIC ANALYSIS — Hypothetical Assignment, Fictional Figures, Not Actual Federal Policy';
  if (a.mode === 'extended') return `USDA EXTENDED UNIVERSE — not an APHIS responsibility (${a.curated?.agency ?? 'USDA'})`;
  return 'MAXIMUM BUREAUCRACY — Hypothetical Assignment, Not Actual Federal Policy';
}

/** Plain-text case file for copying and sharing. */
export function caseFileText(a: Assignment, pun: PunResult): string {
  const lines = [
    `CASE FILE NO. ${a.caseNumber}`,
    modeLabel(a),
    '',
    `Subject: ${a.subject.name}`,
    `Regulatory Concern: ${a.problem.text}`,
    `Assigned Mission: ${a.objective.text}`,
    '',
    `Official Finding: “${a.finding}”`,
    '',
    `Official Federal Pun Determination: “${pun.text}”`,
    '',
    `Administrative Status: ${a.status}`,
    `Estimated Paperwork Burden: ${formatBurden(a.burdenMinutes)} (fictional)`,
  ];
  if (a.curated) {
    lines.push('', `Actual Federal Concern: ${a.curated.fact}`);
    const srcs = a.curated.sourceIds.map((id) => SOURCE_BY_ID[id]).filter(Boolean);
    if (srcs.length) lines.push(`Source: ${srcs.map((s) => s.url).join(' · ')}`);
  }
  lines.push('', '— Issued by The APHIS Assignment Machine. A parody; not an official USDA or APHIS application.');
  return lines.join('\n');
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** Native share when available; otherwise copy. Returns what happened. */
export async function shareText(title: string, text: string): Promise<'shared' | 'copied' | 'cancelled' | 'failed'> {
  const nav = navigator as Navigator & { share?: (d: ShareData) => Promise<void>; canShare?: (d: ShareData) => boolean };
  const data: ShareData = { title, text, url: location.href.split('?')[0] };
  if (typeof nav.share === 'function' && (!nav.canShare || nav.canShare(data))) {
    try {
      await nav.share(data);
      return 'shared';
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return 'cancelled';
    }
  }
  return (await copyText(text)) ? 'copied' : 'failed';
}
