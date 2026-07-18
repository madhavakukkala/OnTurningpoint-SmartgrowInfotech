/**
 * WCAG 2.1 contrast audit for the design tokens (BRIEF §7).
 * Run: node scripts/check-contrast.mjs
 * AA requires 4.5:1 for body text and 3:1 for large text (>=24px, or >=18.66px bold).
 */

/** Keep in step with the :root block in src/app/globals.css. */
const T = {
  bg: '#FFFFFF',
  surface: '#F6F6F6',
  cool: '#E9F1F6',
  stone: '#EEEEEA',
  warm: '#E3E3DC',
  primary: '#002C83',
  primarySoft: '#0A3FA0',
  accent: '#108A9E',
  accentBright: '#05DBF7',
  panel: '#001A3D',
  heading: '#002C83',
  text: '#000000',
  muted: '#4A4A4A',
  subtle: '#5E5E5E',
  white: '#FFFFFF',
};

const hex = (h) => {
  const v = h.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255);
};

const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (h) => {
  const [r, g, b] = hex(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/** Flattens a white overlay at `alpha` over `base` — mirrors `text-white/70`. */
const overWhite = (base, alpha) => {
  const b = hex(base);
  const out = b.map((c) => c * (1 - alpha) + 1 * alpha);
  return (
    '#' +
    out
      .map((c) =>
        Math.round(c * 255)
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
};

/** Every light ground a body-text colour is allowed to sit on. */
const grounds = [
  ['white', T.bg],
  ['surface', T.surface],
  ['cool', T.cool],
  ['stone', T.stone],
  ['warm', T.warm],
];

const checks = [
  // Body text across every ground
  ...grounds.flatMap(([g, bg]) => [
    [`heading on ${g}`, T.heading, bg, 4.5],
    [`text on ${g}`, T.text, bg, 4.5],
    [`text-muted on ${g}`, T.muted, bg, 4.5],
    [`text-subtle on ${g}`, T.subtle, bg, 4.5],
    /**
     * The cyan accent appears ONLY inside display headings — large text, so
     * the applicable AA threshold is 3:1, not 4.5:1. If it is ever used at
     * body size, it must be darkened first.
     */
    [`accent on ${g} (large text)`, T.accent, bg, 3.0],
  ]),

  ['primary on white (buttons/links)', T.primary, T.bg, 4.5],
  ['white on primary (button label)', T.white, T.primary, 4.5],
  ['white on primary-soft (button hover)', T.white, T.primarySoft, 4.5],

  // Dark panel: hero and photographic scrims
  ['white on ink-panel (hero headline)', T.white, T.panel, 4.5],
  ['white/70 on ink-panel', overWhite(T.panel, 0.7), T.panel, 4.5],
  ['white/60 on ink-panel (labels)', overWhite(T.panel, 0.6), T.panel, 4.5],
  ['white/55 on ink-panel (hero stat detail)', overWhite(T.panel, 0.55), T.panel, 4.5],
  ['white/50 on ink-panel (small print)', overWhite(T.panel, 0.5), T.panel, 4.5],

  ['text-subtle on trust-band wash', T.subtle, '#F6F6F7', 4.5],
  ['text-muted on trust-band wash', T.muted, '#F6F6F7', 4.5],

  /**
   * accent-bright (#05DBF7) is DARK-GROUND ONLY. It measures 1.68:1 on white,
   * so it is checked against the panel it actually sits on. Using it anywhere
   * on a light background — text or otherwise — will fail; reach for --accent.
   */
  ['accent-bright on ink-panel (hero accent)', T.accentBright, T.panel, 4.5],
  ['accent-bright on white — MUST NOT BE USED', T.accentBright, T.bg, 0],
];

let failures = 0;
console.log('\nWCAG 2.1 AA contrast audit\n' + '='.repeat(52));
for (const [label, fg, bg, min] of checks) {
  const r = ratio(fg, bg);
  const pass = r >= min;
  if (!pass) failures++;
  console.log(
    `${pass ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${label}`
  );
}
console.log('='.repeat(52));
console.log(failures === 0 ? 'All combinations pass.\n' : `${failures} combination(s) below AA.\n`);
process.exit(failures === 0 ? 0 : 1);
