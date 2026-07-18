/**
 * WCAG 2.1 contrast audit for the design tokens (BRIEF §7).
 * Run: node scripts/check-contrast.mjs
 * AA requires 4.5:1 for body text and 3:1 for large text (>=24px, or >=18.66px bold).
 */

const T = {
  bg: '#FFFFFF',
  surface: '#FAFAFA',
  blue: '#E7EFF6',
  lavender: '#E9E8FA',
  sand: '#F5EFE9',
  primary: '#2C1917',
  text: '#241514',
  muted: '#55504F',
  subtle: '#6B6564',
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

const checks = [
  ['text on white', T.text, T.bg, 4.5],
  ['text on surface', T.text, T.surface, 4.5],
  ['text-muted on white', T.muted, T.bg, 4.5],
  ['text-muted on surface', T.muted, T.surface, 4.5],
  ['text-muted on blue', T.muted, T.blue, 4.5],
  ['text-muted on lavender', T.muted, T.lavender, 4.5],
  ['text-muted on sand', T.muted, T.sand, 4.5],
  ['text-subtle on white', T.subtle, T.bg, 4.5],
  ['text-subtle on surface', T.subtle, T.surface, 4.5],
  ['text-subtle on blue', T.subtle, T.blue, 4.5],
  ['primary on white (buttons/links)', T.primary, T.bg, 4.5],
  ['primary on blue', T.primary, T.blue, 4.5],
  ['primary on lavender', T.primary, T.lavender, 4.5],
  ['primary on sand', T.primary, T.sand, 4.5],
  ['white on primary (button label)', T.white, T.primary, 4.5],
  ['white/70 on primary (CTA body)', overWhite(T.primary, 0.7), T.primary, 4.5],
  ['white/80 on primary (footer links)', overWhite(T.primary, 0.8), T.primary, 4.5],
  ['white/60 on primary (labels)', overWhite(T.primary, 0.6), T.primary, 4.5],
  ['white/50 on primary (small print)', overWhite(T.primary, 0.5), T.primary, 4.5],
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
