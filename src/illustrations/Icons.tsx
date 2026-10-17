import type { ReactElement } from 'react';
import type { IconId } from '../types';

/**
 * Original vector illustrations, drawn for this app. 64×64 viewBox,
 * ink outlines over a muted federal palette.
 */

const INK = '#1d2b24';
const BRASS = '#d4b467';
const GREEN = '#2e6b50';
const LEAF = '#6aa35f';
const RED = '#c0392b';
const IVORY = '#fbf6e6';
const BROWN = '#8a5a35';
const TAN = '#d2a46c';
const GREY = '#9aa3ab';
const NAVY = '#22365f';
const ORANGE = '#e8833a';
const YELLOW = '#f2c94c';
const PINK = '#e58fb0';
const PURPLE = '#8e5ba8';
const SKY = '#9cc7d9';

const s = { stroke: INK, strokeWidth: 2.2, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

const ICONS: Record<IconId, ReactElement> = {
  // ---------------- organisms ----------------
  snail: (
    <g {...s}>
      <path d="M6 50c4-1 6-6 8-10 1-3 4-5 7-4l3 2v12H6z" fill={TAN} />
      <path d="M12 38l-3-10M16 37l1-10" fill="none" />
      <circle cx="9" cy="27" r="2" fill={INK} /><circle cx="17" cy="26" r="2" fill={INK} />
      <path d="M14 50h44c0-4-3-6-6-6H20z" fill={TAN} />
      <circle cx="38" cy="32" r="16" fill={BROWN} />
      <path d="M38 32c0-3 4-3 4 0 0 5-8 5-8 0 0-7 12-7 12 0 0 9-16 9-16 0" fill="none" stroke={IVORY} strokeWidth={2} />
    </g>
  ),
  treesnake: (
    <g {...s}>
      <path d="M10 16c0-6 10-6 12 0" fill="none" stroke={BROWN} strokeWidth={0} />
      <path d="M8 54c10 0 12-8 22-8s12 8 22 8M30 46c-10 0-12-10-2-14s14-4 14-12-10-8-16-4" fill="none" stroke={BROWN} strokeWidth={7} />
      <path d="M8 54c10 0 12-8 22-8s12 8 22 8M30 46c-10 0-12-10-2-14s14-4 14-12-10-8-16-4" fill="none" stroke={TAN} strokeWidth={3} strokeDasharray="3 4" />
      <ellipse cx="24" cy="16" rx="7" ry="5" fill={BROWN} />
      <circle cx="22" cy="14" r="1.6" fill={YELLOW} stroke="none" />
      <path d="M17 17l-5 1m0 0l-2-2m2 2l-2 2" stroke={RED} strokeWidth={1.6} fill="none" />
    </g>
  ),
  lanternfly: (
    <g {...s}>
      <path d="M32 18L10 40c4 6 14 6 22-2z" fill={GREY} />
      <path d="M32 18l22 22c-4 6-14 6-22-2z" fill={GREY} />
      <path d="M32 26L16 50c6 4 14 0 16-8zM32 26l16 24c-6 4-14 0-16-8z" fill={RED} />
      <path d="M20 46l4-2m14 2l-4-2M26 48h2m8 0h2" stroke={INK} />
      <circle cx="18" cy="34" r="1.6" fill={INK} stroke="none" /><circle cx="24" cy="30" r="1.6" fill={INK} stroke="none" />
      <circle cx="46" cy="34" r="1.6" fill={INK} stroke="none" /><circle cx="40" cy="30" r="1.6" fill={INK} stroke="none" />
      <ellipse cx="32" cy="22" rx="3.5" ry="8" fill={INK} />
    </g>
  ),
  beetle: (
    <g {...s}>
      <path d="M14 26l-6-4m6 14H6m8 10l-6 4M50 26l6-4m-6 14h8m-8 10l6 4" fill="none" />
      <ellipse cx="32" cy="38" rx="17" ry="20" fill={'#b0703a'} />
      <path d="M32 20v38" />
      <path d="M17 30c6-6 24-6 30 0" fill="none" />
      <ellipse cx="32" cy="18" rx="10" ry="7" fill={GREEN} />
      <path d="M27 12l-4-6m14 6l4-6" fill="none" />
      <circle cx="22" cy="50" r="2" fill={IVORY} /><circle cx="42" cy="50" r="2" fill={IVORY} />
    </g>
  ),
  swine: (
    <g {...s}>
      <path d="M12 30c0-10 10-16 22-16s20 8 20 18-8 18-22 18S12 42 12 30z" fill={'#6b4a3a'} />
      <path d="M20 14l-2-6 8 4m18 2l4-6-8 3" fill={'#6b4a3a'} />
      <ellipse cx="14" cy="34" rx="7" ry="6" fill={'#c58f7f'} />
      <circle cx="12" cy="34" r="1.3" fill={INK} stroke="none" /><circle cx="16" cy="34" r="1.3" fill={INK} stroke="none" />
      <path d="M10 40l-3 4M18 40l2 4" stroke={IVORY} strokeWidth={2.4} />
      <circle cx="24" cy="26" r="2" fill={INK} stroke="none" />
      <path d="M22 50v6m10-6v6m10-6v6m8-10v8" />
      <path d="M30 18c4-2 10-2 14 0" fill="none" stroke={INK} strokeDasharray="2 3" />
    </g>
  ),
  queenbee: (
    <g {...s}>
      <path d="M22 26c-8-10-14-4-10 2s10 4 10-2zM42 26c8-10 14-4 10 2s-10 4-10-2z" fill={SKY} />
      <ellipse cx="32" cy="40" rx="11" ry="16" fill={YELLOW} />
      <path d="M22 36h20M21 44h22M24 51h16" stroke={INK} strokeWidth={3.5} />
      <circle cx="32" cy="22" r="7" fill={INK} />
      <path d="M24 12l3 6 5-7 5 7 3-6v8H24z" fill={BRASS} />
      <circle cx="32" cy="12" r="1.6" fill={RED} stroke="none" />
      <path d="M32 56v4" />
    </g>
  ),
  psyllid: (
    <g {...s}>
      <path d="M18 44L44 16" stroke={LEAF} strokeWidth={5} />
      <g transform="rotate(-45 34 32)">
        <ellipse cx="34" cy="32" rx="16" ry="6" fill={'#9a7b56'} />
        <path d="M22 30c6-8 18-8 26 0" fill={'#d8cdb4'} opacity={0.9} />
        <circle cx="18" cy="32" r="3.5" fill={'#6e5236'} />
        <circle cx="17" cy="31" r="1.2" fill={RED} stroke="none" />
        <path d="M24 38l-4 6m10-6l-2 7m8-7l2 7" fill="none" />
      </g>
    </g>
  ),
  screwworm: (
    <g {...s}>
      <path d="M30 28C18 14 6 20 10 28s16 6 20 0zM34 28c12-14 24-8 20 0s-16 6-20 0z" fill={SKY} opacity={0.9} />
      <ellipse cx="32" cy="38" rx="9" ry="13" fill={'#2f6f7a'} />
      <path d="M26 34h12M25 40h14M27 46h10" stroke={'#89c3c0'} strokeWidth={1.6} />
      <circle cx="32" cy="22" r="7" fill={'#2f6f7a'} />
      <circle cx="28.5" cy="21" r="3" fill={ORANGE} /><circle cx="35.5" cy="21" r="3" fill={ORANGE} />
      <path d="M24 46l-6 6m22-6l6 6M32 51v6" fill="none" />
    </g>
  ),
  parrot: (
    <g {...s}>
      <path d="M26 58c-4-10-2-20 4-26" fill="none" stroke={BLUEISH()} strokeWidth={6} />
      <path d="M22 30c0-12 8-20 18-20 6 0 10 4 10 10 0 10-8 14-8 24 0 6-4 10-10 10s-10-10-10-24z" fill={RED} />
      <path d="M28 34c4 4 10 6 14 4-2 8-8 12-14 8z" fill={YELLOW} />
      <path d="M30 40c4 2 8 2 10 0" fill="none" stroke={BLUEISH()} strokeWidth={3} />
      <path d="M46 16c6 0 8 6 6 10-2-2-4-3-6-2z" fill={IVORY} />
      <circle cx="40" cy="18" r="3.4" fill={IVORY} /><circle cx="40.5" cy="18" r="1.5" fill={INK} stroke="none" />
      <path d="M18 52h28" stroke={BROWN} strokeWidth={4} />
    </g>
  ),
  horse: (
    <g {...s}>
      <path d="M20 58c0-10 2-18 6-24l-6-8c-4-6 0-14 6-16l6-4 2 6c8 2 14 10 14 20v26z" fill={'#7a4b2a'} />
      <path d="M26 10l-2-6 6 4" fill={'#7a4b2a'} />
      <path d="M32 6c-6 6-8 14-6 22 2 6 6 10 6 18" fill="none" stroke={INK} strokeWidth={4} />
      <circle cx="24" cy="20" r="1.8" fill={INK} stroke="none" />
      <ellipse cx="18" cy="28" rx="5" ry="4" fill={'#5a361e'} />
      <circle cx="16.5" cy="28" r="1" fill={INK} stroke="none" />
      <path d="M38 40c4 0 8 2 10 6" fill="none" stroke={BRASS} strokeWidth={2} />
    </g>
  ),
  cow: (
    <g {...s}>
      <path d="M14 18l-8-4 4 8m40-4l8-4-4 8" fill={IVORY} />
      <path d="M14 20c0-6 8-10 18-10s18 4 18 10v14c0 6-6 10-18 10S14 40 14 34z" fill={IVORY} />
      <path d="M36 12c6 0 10 4 8 10-4-2-8-2-10-6zM18 26c4-2 8 0 8 4s-6 4-8 0z" fill={INK} />
      <ellipse cx="32" cy="44" rx="13" ry="9" fill={PINK} />
      <circle cx="27" cy="44" r="2" fill={INK} stroke="none" /><circle cx="37" cy="44" r="2" fill={INK} stroke="none" />
      <circle cx="24" cy="26" r="2" fill={INK} stroke="none" /><circle cx="40" cy="26" r="2" fill={INK} stroke="none" />
      <path d="M18 8l2 4m26-4l-2 4" stroke={TAN} strokeWidth={3} />
      <rect x="38" y="52" width="10" height="8" rx="1" fill={YELLOW} />
    </g>
  ),
  alpaca: (
    <g {...s}>
      <path d="M24 60V34c0-8 2-16 2-22 0-4 2-6 6-6s8 2 8 8v46" fill={IVORY} />
      <path d="M22 14c0-6 4-10 10-10s10 4 10 8c0 4-2 6-4 6H26c-2 0-4-2-4-4z" fill={'#f3e7cf'} />
      <path d="M24 6l-2-4 4 2m12 0l4-2-2 4" fill={IVORY} />
      <path d="M26 20c0-4 2-6 6-6s8 2 8 6-4 8-8 8-6-4-6-8z" fill={'#f6ead2'} />
      <circle cx="29" cy="20" r="1.6" fill={INK} stroke="none" /><circle cx="36" cy="20" r="1.6" fill={INK} stroke="none" />
      <path d="M31 25c1 1 2 1 3 0" fill="none" />
      <path d="M22 30c2 2 2 6 0 8m20-8c-2 2-2 6 0 8M22 44c2 2 2 6 0 8m20-8c-2 2-2 6 0 8" fill="none" stroke={TAN} />
      <path d="M44 22l6-2 6 2" fill="none" stroke={SKY} strokeWidth={2} strokeDasharray="2 2" />
    </g>
  ),
  starling: (
    <g {...s}>
      <path d="M10 36c4-12 16-18 28-16l10-6 2 6c6 4 6 14-2 20l6 14-12-8c-12 2-28 0-32-10z" fill={'#2a2a3a'} />
      <circle cx="40" cy="24" r="2" fill={IVORY} /><circle cx="40.5" cy="24" r="1" fill={INK} stroke="none" />
      <path d="M50 22l8 2-8 2" fill={YELLOW} />
      {[[18, 32], [24, 38], [30, 30], [34, 40], [22, 44]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" fill={IVORY} stroke="none" />)}
      <path d="M24 30c4 6 12 8 18 6" fill="none" stroke={'#5b6a8a'} strokeWidth={2} />
    </g>
  ),
  raccoon: (
    <g {...s}>
      <path d="M12 20l-2-12 10 6m34 6l2-12-10 6" fill={GREY} />
      <path d="M10 30c0-12 10-18 22-18s22 6 22 18-10 22-22 22-22-10-22-22z" fill={GREY} />
      <path d="M12 30c4-6 12-6 16 0 2 2 6 2 8 0 4-6 12-6 16 0-4 6-12 6-16 2-2-2-6-2-8 0-4 4-12 4-16-2z" fill={INK} />
      <circle cx="22" cy="30" r="2.2" fill={IVORY} stroke="none" /><circle cx="42" cy="30" r="2.2" fill={IVORY} stroke="none" />
      <path d="M24 42c4 6 12 6 16 0" fill={IVORY} />
      <ellipse cx="32" cy="40" rx="3" ry="2" fill={INK} />
    </g>
  ),
  fruitfly: (
    <g {...s}>
      <circle cx="18" cy="48" r="10" fill={ORANGE} />
      <path d="M18 38c0-4 2-6 4-6" fill="none" stroke={GREEN} />
      <path d="M32 30C24 14 12 20 16 28s12 4 16 2zM36 30c8-16 20-10 16-2s-12 4-16 2z" fill={'#e6eef2'} />
      <path d="M20 22l6 2m-4 4l6-1M48 22l-6 2m4 4l-6-1" stroke={'#c9a23c'} strokeWidth={2} />
      <ellipse cx="34" cy="36" rx="6" ry="9" fill={'#c9a23c'} />
      <circle cx="34" cy="26" r="5" fill={'#6b4f2a'} />
      <circle cx="31" cy="25" r="2" fill={RED} /><circle cx="37" cy="25" r="2" fill={RED} />
    </g>
  ),
  petunia: (
    <g {...s}>
      <path d="M32 40v20M32 52c-6 0-10-4-10-8 6 0 10 4 10 8zM32 50c6 0 10-4 10-8-6 0-10 4-10 8z" fill={LEAF} />
      {[0, 72, 144, 216, 288].map((r) => <path key={r} transform={`rotate(${r} 32 26)`} d="M32 26c-8-4-10-16-2-20 4 0 6 2 4 0 6 2 6 14-2 20z" fill={ORANGE} />)}
      <circle cx="32" cy="26" r="5" fill={YELLOW} />
      <path d="M48 8l2 4 4 1-4 2-1 4-2-4-4-1 4-2z" fill={BRASS} strokeWidth={1.4} />
    </g>
  ),
  orchid: (
    <g {...s}>
      <path d="M40 60V30c0-8-4-14-10-18" fill="none" stroke={GREEN} />
      <path d="M40 58c-10 0-16-4-18-8 8-2 14 2 18 8z" fill={LEAF} />
      <path d="M28 26c-10-2-14-10-10-14 6 0 10 6 10 14zM28 26c10-2 14-10 10-14-6 0-10 6-10 14z" fill={'#e9c4e6'} />
      <path d="M28 26c-8 4-14 2-16-2 6-4 12-2 16 2zM28 26c8 4 14 2 16-2-6-4-12-2-16 2z" fill={'#d8a4d4'} />
      <path d="M24 28c0 6 8 6 8 0-2-2-6-2-8 0z" fill={PURPLE} />
      <circle cx="28" cy="26" r="2" fill={YELLOW} />
    </g>
  ),
  citrus: (
    <g {...s}>
      <path d="M28 60V40m8 20V40" stroke={BROWN} strokeWidth={4} />
      <path d="M32 40c-14 0-22-8-22-18S20 4 32 4s22 8 22 18-8 18-22 18z" fill={GREEN} />
      <path d="M18 18c4-4 10-6 14-6" fill="none" stroke={LEAF} />
      {[[22, 24], [38, 16], [42, 30], [28, 32], [32, 22]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4.5" fill={ORANGE} />)}
      <circle cx="44" cy="20" r="4" fill={'#c8d36a'} />
    </g>
  ),
  woodborer: (
    <g {...s}>
      <rect x="6" y="22" width="52" height="24" rx="4" fill={TAN} />
      <ellipse cx="52" cy="34" rx="6" ry="12" fill={'#e4c08e'} />
      <ellipse cx="52" cy="34" rx="3" ry="6" fill="none" stroke={BROWN} />
      <path d="M10 30h20m-14 8h22" stroke={BROWN} strokeWidth={1.6} />
      <circle cx="20" cy="34" r="2.6" fill={INK} /><circle cx="34" cy="28" r="2" fill={INK} /><circle cx="38" cy="40" r="2.4" fill={INK} />
      <path d="M22 16c0-6 10-6 10 0v6H22z" fill={'#e9e1c9'} />
      <path d="M24 16h6m-6 3h6" stroke={TAN} strokeWidth={1.4} />
      <circle cx="27" cy="12" r="2.2" fill={BROWN} />
    </g>
  ),
  bumblebee: (
    <g {...s}>
      <path d="M24 22c-10-14-20-4-12 2s12 2 12-2zM40 22c10-14 20-4 12 2s-12 2-12-2z" fill={SKY} />
      <ellipse cx="32" cy="38" rx="18" ry="15" fill={YELLOW} />
      <path d="M22 26c-2 8-2 16 0 24M32 23v30M42 26c2 8 2 16 0 24" stroke={INK} strokeWidth={5} />
      <circle cx="14" cy="36" r="6" fill={INK} />
      <circle cx="12" cy="34" r="1.6" fill={IVORY} stroke="none" />
      <path d="M50 38l6 2-6 2" fill={INK} />
    </g>
  ),
  beagle: (
    <g {...s}>
      <path d="M18 30c0-12 6-20 14-20s14 8 14 20v10c0 8-6 14-14 14s-14-6-14-14z" fill={IVORY} />
      <path d="M22 14c4-4 16-4 20 0v12c-4 2-16 2-20 0z" fill={'#a8662f'} />
      <path d="M18 18c-6 4-8 16-4 24 4-2 6-10 6-18zM46 18c6 4 8 16 4 24-4-2-6-10-6-18z" fill={'#6f3f1c'} />
      <circle cx="26" cy="30" r="2.2" fill={INK} stroke="none" /><circle cx="38" cy="30" r="2.2" fill={INK} stroke="none" />
      <ellipse cx="32" cy="40" rx="4" ry="3" fill={INK} />
      <path d="M28 46c2 2 6 2 8 0" fill="none" />
      <path d="M20 52c4 4 20 4 24 0l2 6H18z" fill={NAVY} />
      <rect x="29" y="52" width="6" height="6" rx="1" fill={BRASS} />
    </g>
  ),
  papaya: (
    <g {...s}>
      <path d="M32 6c12 0 20 14 20 28S44 58 32 58 12 48 12 34 20 6 32 6z" fill={ORANGE} />
      <path d="M32 14c8 0 12 10 12 20s-4 16-12 16-12-6-12-16 4-20 12-20z" fill={'#f7b267'} />
      {[[30, 28], [34, 32], [30, 36], [34, 40], [32, 24], [29, 42]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.8" fill={INK} stroke="none" />)}
      <path d="M32 6c0-2 2-4 4-4" fill="none" stroke={GREEN} strokeWidth={3} />
      <path d="M46 52l8-6m-6 10l10-4" stroke={LEAF} strokeWidth={2.5} />
    </g>
  ),
  khapra: (
    <g {...s}>
      <path d="M8 52c4-8 12-12 24-12s20 4 24 12z" fill={IVORY} />
      {[[16, 48], [24, 46], [32, 48], [40, 46], [48, 49], [28, 50], [36, 51]].map(([x, y]) => <ellipse key={`${x}${y}`} cx={x} cy={y} rx="2.4" ry="1.3" fill={'#efe2bf'} />)}
      <ellipse cx="32" cy="26" rx="10" ry="13" fill={'#7a4a2b'} />
      <path d="M26 20c2 4 2 8 0 12m12-12c-2 4-2 8 0 12" stroke={TAN} strokeWidth={1.8} fill="none" />
      <circle cx="32" cy="12" r="4" fill={'#5b3720'} />
      <path d="M22 22l-6-2m6 8h-7m27-6l6-2m-6 8h7" fill="none" />
    </g>
  ),
  asparagus: (
    <g {...s}>
      {[22, 32, 42].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 60V${16 + i * 2}`} stroke={LEAF} strokeWidth={6} />
          <path d={`M${x - 3} ${18 + i * 2}c0-6 3-10 3-10s3 4 3 10z`} fill={GREEN} />
          <path d={`M${x - 3} ${30 + i * 2}l3-3 3 3m-6 10l3-3 3 3`} fill="none" stroke={GREEN} strokeWidth={1.6} />
        </g>
      ))}
      <rect x="16" y="44" width="32" height="7" rx="2" fill={PURPLE} />
      <path d="M50 10v40" stroke={BRASS} strokeWidth={2} />
      <path d="M48 14h4m-4 8h4m-4 8h4m-4 8h4m-4 8h4" stroke={BRASS} strokeWidth={1.4} />
    </g>
  ),
  egg: (
    <g {...s}>
      <path d="M32 6c10 0 18 16 18 28s-8 22-18 22-18-10-18-22S22 6 32 6z" fill={IVORY} />
      <path d="M24 22c2-6 4-8 6-9" fill="none" stroke={'#e6dcc3'} strokeWidth={3} />
      <path d="M22 34h20v8c0 6-4 9-10 11-6-2-10-5-10-11z" fill={NAVY} />
      <text x="32" y="46" textAnchor="middle" fontFamily="Oswald, sans-serif" fontSize="9" fill={BRASS} stroke="none" fontWeight="700">AA</text>
    </g>
  ),
  rangerhat: (
    <g {...s}>
      <path d="M4 42c8 6 48 6 56 0-4-4-12-4-12-4H16s-8 0-12 4z" fill={'#b8864b'} />
      <path d="M18 38c0-14 4-26 14-26s14 12 14 26z" fill={'#c99a5a'} />
      <path d="M24 16l8 8 8-8" fill="none" stroke={'#8a5d2c'} strokeWidth={2.6} />
      <path d="M18 34h28" stroke={'#5a3d1c'} strokeWidth={4} />
      <path d="M10 56c6-6 12-6 18 0s12 6 18 0 10-4 12-2" fill="none" stroke={GREEN} strokeWidth={2.4} />
    </g>
  ),
  bonsai: (
    <g {...s}>
      <path d="M14 50h36l-4 10H18z" fill={NAVY} />
      <path d="M30 50c0-8-6-10-6-16s6-6 8-10M32 50c2-6 8-8 10-14" fill="none" stroke={BROWN} strokeWidth={4} />
      <ellipse cx="22" cy="26" rx="12" ry="6" fill={GREEN} />
      <ellipse cx="42" cy="32" rx="11" ry="5" fill={LEAF} />
      <ellipse cx="34" cy="16" rx="10" ry="5" fill={LEAF} />
      <path d="M50 8l-6 6" stroke={GREY} strokeWidth={2} />
      <path d="M50 8l4-2-2 4z" fill={GREY} />
    </g>
  ),
  pinetree: (
    <g {...s}>
      <path d="M32 4L18 22h8L14 38h10L10 52h44L40 38h10L38 22h8z" fill={GREEN} />
      <path d="M28 52h8v8h-8z" fill={BROWN} />
      <path d="M32 0l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" fill={YELLOW} strokeWidth={1.4} />
      {[[24, 30], [40, 34], [30, 44], [42, 48], [22, 46]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.4" fill={x > 32 ? RED : BRASS} />)}
    </g>
  ),
  goldfish: (
    <g {...s}>
      <path d="M10 16h44v6c0 22-8 36-22 36S10 44 10 22z" fill={SKY} opacity={0.7} />
      <path d="M8 16h48" stroke={INK} />
      <path d="M20 38c4-8 16-8 20 0-4 8-16 8-20 0z" fill={ORANGE} />
      <path d="M40 38l8-6v12z" fill={ORANGE} />
      <circle cx="25" cy="37" r="1.6" fill={INK} stroke="none" />
      <circle cx="18" cy="28" r="2" fill="none" stroke={IVORY} /><circle cx="22" cy="22" r="1.4" fill="none" stroke={IVORY} />
      <path d="M14 52h36" stroke={TAN} strokeWidth={3} />
    </g>
  ),
  // ---------------- problems & objectives ----------------
  truck: (
    <g {...s}>
      <rect x="4" y="18" width="34" height="24" rx="2" fill={IVORY} />
      <path d="M38 26h12l8 8v8H38z" fill={GREEN} />
      <path d="M42 28h7l5 6H42z" fill={SKY} />
      <circle cx="16" cy="46" r="5" fill={INK} /><circle cx="48" cy="46" r="5" fill={INK} />
      <circle cx="16" cy="46" r="2" fill={GREY} stroke="none" /><circle cx="48" cy="46" r="2" fill={GREY} stroke="none" />
      <path d="M10 26h20m-20 6h14" stroke={RED} strokeWidth={2} />
    </g>
  ),
  documents: (
    <g {...s}>
      <rect x="18" y="6" width="32" height="42" rx="2" fill={'#efe5c8'} transform="rotate(6 34 27)" />
      <rect x="12" y="12" width="32" height="44" rx="2" fill={IVORY} />
      <path d="M18 22h20M18 28h20M18 34h14M18 40h18" stroke={GREY} />
      <circle cx="36" cy="48" r="5" fill="none" stroke={RED} />
    </g>
  ),
  plane: (
    <g {...s}>
      <path d="M6 36l22-4 14-20c2-3 6-3 6 1l-4 17 12-2c3 0 4 4 1 5l-13 4 4 14c1 3-3 4-5 2l-9-12-22 4c-4 1-6-4-6-9z" fill={IVORY} />
      <path d="M28 32l10-1" stroke={NAVY} />
      <circle cx="18" cy="35" r="1.5" fill={NAVY} stroke="none" /><circle cx="23" cy="34" r="1.5" fill={NAVY} stroke="none" />
    </g>
  ),
  pallet: (
    <g {...s}>
      <path d="M6 24h52v8H6zM6 42h52v8H6z" fill={TAN} />
      <path d="M10 32h8v10h-8zM28 32h8v10h-8zM46 32h8v10h-8z" fill={'#b88a52'} />
      <rect x="22" y="12" width="20" height="12" rx="1" fill="none" stroke={RED} strokeWidth={1.8} />
      <text x="32" y="21" textAnchor="middle" fontFamily="Courier Prime, monospace" fontSize="7" fill={RED} stroke="none" fontWeight="700">HT</text>
    </g>
  ),
  map: (
    <g {...s}>
      <path d="M6 14l16-6 20 6 16-6v42l-16 6-20-6-16 6z" fill={'#e7dcb8'} />
      <path d="M22 8v42M42 14v42" stroke={TAN} />
      <path d="M10 30c8-6 12 6 20 0s14 6 22-2" fill="none" stroke={RED} strokeDasharray="3 3" />
      <path d="M44 24l6 6m0-6l-6 6" stroke={RED} strokeWidth={2.6} />
    </g>
  ),
  magnifier: (
    <g {...s}>
      <circle cx="26" cy="26" r="16" fill={SKY} opacity={0.75} />
      <circle cx="26" cy="26" r="16" fill="none" stroke={BRASS} strokeWidth={5} />
      <path d="M38 38l16 16" stroke={BROWN} strokeWidth={7} />
      <path d="M18 20c2-4 6-6 10-6" fill="none" stroke={IVORY} strokeWidth={2.4} />
    </g>
  ),
  biohazard: (
    <g {...s}>
      <path d="M32 6l26 46H6z" fill={YELLOW} />
      <circle cx="32" cy="36" r="4" fill={INK} />
      <path d="M32 18c-6 0-8 8-4 12M42 46c3-5-2-11-7-10M22 46c-3-5 2-11 7-10" fill="none" strokeWidth={3} />
    </g>
  ),
  dictionary: (
    <g {...s}>
      <path d="M12 10h34c4 0 6 2 6 6v38H18c-4 0-6-2-6-6z" fill={RED} />
      <path d="M12 48c0-4 2-6 6-6h34" fill="none" />
      <path d="M18 46h34v8H18" fill={IVORY} />
      <rect x="20" y="18" width="24" height="12" rx="1" fill="none" stroke={BRASS} />
      <text x="32" y="27.5" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="8" fill={BRASS} stroke="none" fontWeight="700">DEF.</text>
    </g>
  ),
  gavel: (
    <g {...s}>
      <rect x="24" y="8" width="26" height="14" rx="3" fill={BROWN} transform="rotate(35 37 15)" />
      <path d="M32 26L14 50" stroke={BROWN} strokeWidth={6} />
      <rect x="30" y="48" width="28" height="8" rx="2" fill={TAN} />
      <path d="M36 12l10 7" stroke={BRASS} strokeWidth={3} />
    </g>
  ),
  clipboard: (
    <g {...s}>
      <rect x="12" y="10" width="40" height="50" rx="3" fill={TAN} />
      <rect x="16" y="16" width="32" height="40" rx="1" fill={IVORY} />
      <rect x="24" y="6" width="16" height="8" rx="2" fill={GREY} />
      <path d="M20 26l3 3 5-6M20 38l3 3 5-6M32 26h12M32 38h12M20 50h24" stroke={INK} fill="none" />
    </g>
  ),
  phone: (
    <g {...s}>
      <rect x="8" y="30" width="48" height="26" rx="5" fill={'#3b3b3b'} />
      <path d="M8 22c0-6 10-10 24-10s24 4 24 10v6H44v-4H20v4H8z" fill={'#3b3b3b'} />
      <circle cx="32" cy="43" r="9" fill={IVORY} />
      {[0, 45, 90, 135, 180, 225, 270].map((r) => <circle key={r} cx={32 + 6 * Math.cos((r * Math.PI) / 180)} cy={43 + 6 * Math.sin((r * Math.PI) / 180)} r="1.4" fill={INK} stroke="none" />)}
      <path d="M50 8l4-4m-8 2l2-4m6 10l4-2" stroke={RED} />
    </g>
  ),
  stamp: (
    <g {...s}>
      <path d="M26 6h12v16c0 4 4 6 8 8v6H18v-6c4-2 8-4 8-8z" fill={BROWN} />
      <rect x="14" y="36" width="36" height="8" rx="2" fill={INK} />
      <rect x="10" y="48" width="44" height="12" rx="1" fill="none" stroke={RED} strokeWidth={2.4} />
      <text x="32" y="57" textAnchor="middle" fontFamily="Oswald, sans-serif" fontSize="8" fill={RED} stroke="none" fontWeight="700">OK’D</text>
    </g>
  ),
  ship: (
    <g {...s}>
      <path d="M6 40h52l-8 14H14z" fill={NAVY} />
      <rect x="14" y="28" width="12" height="12" fill={RED} />
      <rect x="26" y="28" width="12" height="12" fill={GREEN} />
      <rect x="38" y="28" width="12" height="12" fill={BRASS} />
      <rect x="20" y="16" width="12" height="12" fill={ORANGE} />
      <path d="M4 58c6-4 10 4 16 0s10 4 16 0 10 4 16 0 8 2 8 2" fill="none" stroke={SKY} />
      <text x="44" y="37" textAnchor="middle" fontFamily="Courier Prime, monospace" fontSize="5" fill={INK} stroke="none">MISC</text>
    </g>
  ),
  eggmass: (
    <g {...s}>
      <rect x="6" y="14" width="52" height="36" rx="8" fill={'#7d8b99'} />
      <path d="M6 40h52" stroke={INK} />
      <path d="M18 22h28c2 0 4 2 4 4v6c0 2-2 4-4 4H18c-2 0-4-2-4-4v-6c0-2 2-4 4-4z" fill={'#9a8b6a'} />
      <path d="M18 26h28M18 30h28M18 34h28" stroke={'#c9b98f'} strokeWidth={1.6} />
      <circle cx="14" cy="50" r="5" fill={INK} /><circle cx="50" cy="50" r="5" fill={INK} />
    </g>
  ),
  snack: (
    <g {...s}>
      <path d="M10 28h44l-4 28H14z" fill={'#e8d2a0'} />
      <path d="M10 28c2-8 8-12 22-12s20 4 22 12" fill={TAN} />
      <circle cx="22" cy="40" r="3" fill={BROWN} /><circle cx="34" cy="46" r="3" fill={BROWN} /><circle cx="42" cy="38" r="3" fill={BROWN} />
      <path d="M44 10l4 6m-14-8v6m-12-4l2 6" stroke={GREY} />
    </g>
  ),
  passport: (
    <g {...s}>
      <rect x="14" y="6" width="36" height="52" rx="3" fill={NAVY} />
      <circle cx="32" cy="26" r="9" fill="none" stroke={BRASS} strokeWidth={2} />
      <path d="M23 26h18M32 17c-4 4-4 14 0 18m0-18c4 4 4 14 0 18" fill="none" stroke={BRASS} strokeWidth={1.4} />
      <rect x="22" y="40" width="20" height="10" rx="1" fill={IVORY} />
      <circle cx="27" cy="45" r="2.6" fill={TAN} />
      <path d="M32 43h7m-7 4h5" stroke={GREY} strokeWidth={1.4} />
    </g>
  ),
  meeting: (
    <g {...s}>
      <ellipse cx="32" cy="42" rx="26" ry="10" fill={BROWN} />
      {[[12, 26], [24, 20], [40, 20], [52, 26]].map(([x, y]) => (
        <g key={`${x}${y}`}><circle cx={x} cy={y} r="5" fill={TAN} /><path d={`M${x - 6} ${y + 14}c0-6 3-8 6-8s6 2 6 8`} fill={NAVY} /></g>
      ))}
      <rect x="26" y="36" width="12" height="6" rx="1" fill={IVORY} />
    </g>
  ),
  binder: (
    <g {...s}>
      <rect x="14" y="6" width="38" height="52" rx="3" fill={GREEN} />
      <rect x="10" y="6" width="10" height="52" rx="2" fill={'#1f4d39'} />
      <rect x="26" y="16" width="20" height="12" rx="1" fill={IVORY} />
      <path d="M29 20h14m-14 4h10" stroke={GREY} strokeWidth={1.4} />
      <path d="M50 30h6v6h-6zM50 40h6v6h-6z" fill={YELLOW} />
      <text x="36" y="48" textAnchor="middle" fontFamily="Oswald, sans-serif" fontSize="8" fill={BRASS} stroke="none" fontWeight="700">VOL. 47</text>
    </g>
  ),
  committee: (
    <g {...s}>
      {[[16, 18], [32, 14], [48, 18], [24, 34], [40, 34]].map(([x, y], i) => (
        <g key={i}><circle cx={x} cy={y} r="6" fill={[TAN, '#b5835a', TAN, '#e2b98a', '#b5835a'][i]} /><path d={`M${x - 8} ${y + 16}c0-6 4-9 8-9s8 3 8 9`} fill={[NAVY, GREEN, RED, NAVY, GREEN][i]} /></g>
      ))}
      <rect x="10" y="50" width="44" height="8" rx="1" fill={BROWN} />
    </g>
  ),
  calendar: (
    <g {...s}>
      <rect x="8" y="12" width="48" height="44" rx="3" fill={IVORY} />
      <rect x="8" y="12" width="48" height="12" rx="3" fill={RED} />
      <path d="M18 6v10M46 6v10" strokeWidth={3} />
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => <rect key={`${r}${c}`} x={13 + c * 8.5} y={28 + r * 6.5} width="6" height="4" fill={r === 2 && c === 3 ? RED : '#e2d3a8'} stroke="none" />))}
    </g>
  ),
  chart: (
    <g {...s}>
      <rect x="6" y="8" width="52" height="48" rx="2" fill={IVORY} />
      <path d="M14 46h38M14 46V16" />
      <rect x="18" y="34" width="6" height="12" fill={GREEN} /><rect x="28" y="26" width="6" height="20" fill={BRASS} /><rect x="38" y="18" width="6" height="28" fill={RED} />
      <path d="M16 40l12-10 10 4 12-16" fill="none" stroke={NAVY} strokeDasharray="2 2" />
    </g>
  ),
  shield: (
    <g {...s}>
      <path d="M32 4l22 8v16c0 14-10 24-22 30C20 52 10 42 10 28V12z" fill={NAVY} />
      <path d="M32 10l16 6v12c0 10-7 18-16 22-9-4-16-12-16-22V16z" fill="none" stroke={BRASS} strokeWidth={2} />
      <path d="M24 30l6 6 12-12" fill="none" stroke={BRASS} strokeWidth={3.5} />
    </g>
  ),
  permit: (
    <g {...s}>
      <rect x="6" y="12" width="52" height="40" rx="2" fill={IVORY} />
      <rect x="10" y="16" width="44" height="32" fill="none" stroke={BRASS} strokeDasharray="3 2" />
      <text x="32" y="28" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="9" fill={NAVY} stroke="none" fontWeight="900">PERMIT</text>
      <path d="M16 36h20m-20 5h14" stroke={GREY} strokeWidth={1.4} />
      <circle cx="46" cy="40" r="6" fill={RED} />
      <path d="M43 46l-2 8 5-3 5 3-2-8" fill={RED} />
    </g>
  ),
  microscope: (
    <g {...s}>
      <path d="M14 58h36" strokeWidth={4} />
      <path d="M22 58c0-10 6-16 16-18" fill="none" strokeWidth={4} />
      <rect x="30" y="8" width="10" height="26" rx="2" fill={GREY} transform="rotate(-20 35 21)" />
      <rect x="28" y="40" width="20" height="5" rx="1" fill={NAVY} />
      <circle cx="38" cy="34" r="3" fill={BRASS} />
    </g>
  ),
  fence: (
    <g {...s}>
      {[8, 22, 36, 50].map((x) => <path key={x} d={`M${x} 56V16l3-6 3 6v40z`} fill={IVORY} />)}
      <path d="M4 26h56M4 44h56" stroke={BROWN} strokeWidth={4} />
      <path d="M40 8l6-4 6 4" fill="none" stroke={RED} />
    </g>
  ),
  megaphone: (
    <g {...s}>
      <path d="M8 26h10l26-14v40L18 38H8z" fill={RED} />
      <path d="M18 38l4 16h8l-4-14" fill={GREY} />
      <path d="M50 22c4 4 4 16 0 20M54 16c8 8 8 24 0 32" fill="none" stroke={BRASS} />
    </g>
  ),
  stopwatch: (
    <g {...s}>
      <circle cx="32" cy="36" r="22" fill={IVORY} />
      <circle cx="32" cy="36" r="22" fill="none" stroke={BRASS} strokeWidth={4} />
      <rect x="28" y="4" width="8" height="8" rx="1" fill={BRASS} />
      <path d="M32 36V22M32 36l8 6" strokeWidth={3} />
      <path d="M48 16l4-4" strokeWidth={3} />
    </g>
  ),
  luggage: (
    <g {...s}>
      <rect x="10" y="18" width="44" height="36" rx="5" fill={'#2d5b7a'} />
      <path d="M24 18v-6c0-2 2-4 4-4h8c2 0 4 2 4 4v6" fill="none" strokeWidth={3} />
      <path d="M22 18v36M42 18v36" stroke={BRASS} strokeWidth={3} />
      <rect x="26" y="28" width="12" height="8" rx="1" fill={IVORY} />
      <path d="M46 50l6 6" stroke={ORANGE} strokeWidth={3} />
      <circle cx="54" cy="58" r="3" fill={ORANGE} />
    </g>
  ),
  vaccine: (
    <g {...s}>
      <path d="M6 44c0-8 12-12 26-12s26 4 26 12-12 10-26 10S6 52 6 44z" fill={'#8a6b4a'} />
      <rect x="22" y="38" width="20" height="10" rx="3" fill={'#c7e3f0'} />
      <path d="M44 6l-8 14m-6-4l12 6" stroke={NAVY} strokeWidth={3} />
      <path d="M50 10l-4 8" stroke={GREY} strokeWidth={3} />
    </g>
  ),
  sterile: (
    <g {...s}>
      <circle cx="32" cy="32" r="22" fill={IVORY} />
      <path d="M26 30c-8-12-16-6-12 0s10 2 12 0zM38 30c8-12 16-6 12 0s-10 2-12 0z" fill={SKY} />
      <ellipse cx="32" cy="36" rx="5" ry="9" fill={GREY} />
      <circle cx="32" cy="26" r="4" fill={GREY} />
      <circle cx="32" cy="32" r="22" fill="none" stroke={RED} strokeWidth={4} />
      <path d="M16 48L48 16" stroke={RED} strokeWidth={4} />
    </g>
  ),
  scale: (
    <g {...s}>
      <path d="M32 8v44M20 56h24" strokeWidth={3} />
      <path d="M12 16h40" strokeWidth={3} />
      <path d="M12 16L4 34h16zM52 16l-8 18h16z" fill="none" />
      <path d="M4 34c0 4 4 6 8 6s8-2 8-6zM44 34c0 4 4 6 8 6s8-2 8-6z" fill={BRASS} />
      <circle cx="32" cy="8" r="3" fill={BRASS} />
    </g>
  ),
  ruler: (
    <g {...s}>
      <rect x="4" y="22" width="56" height="20" rx="2" fill={YELLOW} transform="rotate(-12 32 32)" />
      <g transform="rotate(-12 32 32)">
        {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M${8 + i * 5} 22v${i % 2 ? 5 : 9}`} />)}
        <text x="32" y="39" textAnchor="middle" fontFamily="Courier Prime, monospace" fontSize="7" fill={INK} stroke="none">½ in.</text>
      </g>
    </g>
  ),
  question: (
    <g {...s}>
      <circle cx="32" cy="32" r="24" fill={BRASS} />
      <path d="M24 24c0-6 4-10 8-10s8 4 8 8c0 6-8 8-8 14" fill="none" strokeWidth={4} />
      <circle cx="32" cy="46" r="2.5" fill={INK} />
    </g>
  ),
};

/** Stable helper so the parrot's tail color reads well on any background. */
function BLUEISH() {
  return '#2c6aa0';
}

export function Icon({ id, className, title }: { id: IconId; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {ICONS[id] ?? ICONS.question}
    </svg>
  );
}
