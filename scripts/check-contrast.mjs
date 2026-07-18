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
  primary: '#023246',
  primarySoft: '#0A4A66',
  accent: '#1D5A79',
  accentBright: '#287094',
  panel: '#021D29',
  heading: '#023246',
  text: '#1C1C1C',
  muted: '#575757',
  subtle: '#616161',
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
    // The teal used for links must clear AA everywhere it can appear.
    [`accent on ${g}`, T.accent, bg, 4.5],
  ]),

  ['primary on white (buttons/links)', T.primary, T.bg, 4.5],
  ['white on primary (button label)', T.white, T.primary, 4.5],
  ['white on primary-soft (button hover)', T.white, T.primarySoft, 4.5],
  ['white on accent', T.white, T.accent, 4.5],

  // Dark panel: hero and photographic scrims
  ['white on ink-panel (hero headline)', T.white, T.panel, 4.5],
  ['white/70 on ink-panel', overWhite(T.panel, 0.7), T.panel, 4.5],
  ['white/60 on ink-panel (labels)', overWhite(T.panel, 0.6), T.panel, 4.5],
  ['white/55 on ink-panel (hero stat detail)', overWhite(T.panel, 0.55), T.panel, 4.5],
  ['white/50 on ink-panel (small print)', overWhite(T.panel, 0.5), T.panel, 4.5],

  ['text-subtle on trust-band wash', T.subtle, '#F6F6F7', 4.5],
  ['text-muted on trust-band wash', T.muted, '#F6F6F7', 4.5],

  /**
   * accent-bright is decorative only (fills, marks). Checked at the 3:1 bar
   * for non-text UI components rather than the 4.5:1 text bar — if you ever
   * use it AS text, switch to --accent instead.
   */
  ['accent-bright on white (non-text UI)', T.accentBright, T.bg, 3.0],
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
