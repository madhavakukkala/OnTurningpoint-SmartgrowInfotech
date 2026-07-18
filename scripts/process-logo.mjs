/**
 * Logo pipeline — derives every web-ready logo variant from the SINGLE client source.
 *
 * SOURCE (client-provided, do not edit):  /logo/logo.svg   — white artwork
 * OUTPUT (generated, do not hand-edit):   /public/logo/*.svg + favicon + OG image
 *
 * Run:  npm run logo
 *
 * The source artwork is white (fill:#fff) so it is invisible on the white site
 * background. This script recolors it to the primary espresso brown for light
 * backgrounds, and keeps a white variant for dark sections (the footer).
 *
 * TODO(client): if a NEW raw logo is supplied, drop it at /logo/logo.svg and
 * re-run `npm run logo`. Nothing else needs to change.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'logo', 'logo.svg');
const OUT = join(root, 'public', 'logo');

const PRIMARY = '#2C1917'; // BRIEF §2.1 --primary (espresso brown)
const WHITE = '#FFFFFF';

mkdirSync(OUT, { recursive: true });

/** Fallback wordmark used only if the client source is missing. */
const FALLBACK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.99 164.6"><path fill="#fff" d="M20 20h90v20H20zM20 60h90v20H20zM20 100h90v20H20z"/></svg>`;

if (!existsSync(SRC)) {
  console.warn('[logo] /logo/logo.svg not found — emitting temporary placeholder mark.');
}
const source = existsSync(SRC) ? readFileSync(SRC, 'utf8') : FALLBACK;

/**
 * Recolor every fill in the artwork to a single flat color.
 * Handles both `fill="..."` attributes and the `<style>`-driven `fill:#fff`
 * class rules that Illustrator exports (which is what the source uses).
 */
function recolor(svg, color) {
  return svg
    .replace(/<\?xml[^>]*\?>\s*/g, '')
    .replace(/fill\s*:\s*#[0-9a-fA-F]{3,8}/g, `fill:${color}`)
    .replace(/fill\s*=\s*"(?!none)[^"]*"/g, `fill="${color}"`)
    .replace(/\s(id|data-name)="[^"]*"/g, '')
    .trim();
}

/** Extract the inner drawing + viewBox so we can re-wrap the mark in new canvases. */
function parts(svg) {
  const viewBox = (svg.match(/viewBox="([^"]+)"/) || [, '0 0 130.99 164.6'])[1];
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return { viewBox, inner };
}

const { viewBox, inner } = parts(source);
const [, , vbW, vbH] = viewBox.split(/\s+/).map(Number);

const markSvg = (color) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="OnTurningPoint">${recolor(
    inner,
    color
  )}</svg>\n`;

/** Full lockup: the mark + the "OnTurningPoint" wordmark set in the brand grotesk. */
const lockupSvg = (color) => {
  const scale = 44 / vbH;
  const w = vbW * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 56" role="img" aria-label="OnTurningPoint">
  <g transform="translate(0 6) scale(${scale.toFixed(5)})">${recolor(inner, color)}</g>
  <text x="${(w + 14).toFixed(1)}" y="36" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="25" font-weight="700" letter-spacing="-0.9" fill="${color}">OnTurningPoint</text>
</svg>\n`;
};

const files = {
  // Primary-on-white — the default everywhere on the light site.
  'logo.svg': lockupSvg(PRIMARY),
  'logo-white.svg': lockupSvg(WHITE),
  'logo-mark.svg': markSvg(PRIMARY),
  'logo-mark-white.svg': markSvg(WHITE),
};

for (const [name, contents] of Object.entries(files)) {
  writeFileSync(join(OUT, name), contents, 'utf8');
  console.log('[logo] wrote public/logo/' + name);
}

/* ---- favicon: the mark, padded, on a white square ---- */
const pad = 0.18;
const size = Math.max(vbW, vbH);
const off = { x: (size - vbW) / 2, y: (size - vbH) / 2 };
const box = size * (1 + pad * 2);
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${box.toFixed(2)} ${box.toFixed(2)}">
  <rect width="${box.toFixed(2)}" height="${box.toFixed(2)}" rx="${(box * 0.2).toFixed(2)}" fill="${WHITE}"/>
  <g transform="translate(${(size * pad + off.x).toFixed(2)} ${(size * pad + off.y).toFixed(2)})">${recolor(inner, PRIMARY)}</g>
</svg>\n`;
writeFileSync(join(root, 'src', 'app', 'icon.svg'), favicon, 'utf8');
console.log('[logo] wrote src/app/icon.svg (favicon)');

/* ---- Open Graph image (1200x630), generated from the same mark ---- */
const ogScale = 150 / vbH;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFFFFF"/>
  <rect x="0" y="0" width="1200" height="8" fill="${PRIMARY}"/>
  <g transform="translate(96 150) scale(${ogScale.toFixed(5)})">${recolor(inner, PRIMARY)}</g>
  <text x="96" y="380" font-family="Inter, Arial, sans-serif" font-size="76" font-weight="800" letter-spacing="-2.5" fill="${PRIMARY}">ONTURNINGPOINT</text>
  <text x="96" y="446" font-family="Georgia, serif" font-style="italic" font-size="40" font-weight="300" fill="#555555">Study MBBS &amp; more, abroad.</text>
  <text x="96" y="540" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="500" letter-spacing="3" fill="#555555">OVERSEAS EDUCATION CONSULTANCY · NELLORE, INDIA</text>
</svg>\n`;
writeFileSync(join(root, 'public', 'og.svg'), og, 'utf8');
console.log('[logo] wrote public/og.svg');
