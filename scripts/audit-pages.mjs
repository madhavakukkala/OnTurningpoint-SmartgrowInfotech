/**
 * Structural + accessibility smoke audit across every route.
 * Start the server first (`npx next start -p 3123`), then:
 *   node scripts/audit-pages.mjs
 *
 * This is a fast regression net, not a replacement for axe/manual testing.
 */

const BASE = process.env.AUDIT_BASE ?? 'http://localhost:3000';

const ROUTES = [
  '/', '/mbbs-abroad', '/services', '/education-loan', '/value-added-services',
  '/certification-training', '/medical-pg-germany', '/internship', '/placements',
  '/about', '/contact', '/countries',
  '/countries/russia', '/countries/georgia', '/countries/kazakhstan',
  '/countries/philippines', '/countries/uzbekistan', '/countries/kyrgyzstan',
  '/countries/netherlands', '/countries/sweden', '/countries/spain',
  '/countries/germany', '/countries/uk',
  '/privacy-policy', '/terms', '/cookie-policy',
];

const problems = [];
const note = (route, msg) => problems.push(`${route}: ${msg}`);

/** Entities inflate raw-HTML length; measure what a human/crawler actually sees. */
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(d))
    .replace(/&#x27;|&apos;/g, "'");

for (const route of ROUTES) {
  let res, html;
  try {
    res = await fetch(BASE + route);
    html = await res.text();
  } catch (e) {
    note(route, `request failed — ${e.message}`);
    continue;
  }

  if (res.status !== 200) {
    note(route, `HTTP ${res.status}`);
    continue;
  }

  /* --- exactly one <h1> (WCAG 1.3.1 / 2.4.6) --- */
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) note(route, `expected 1 <h1>, found ${h1s.length}`);

  /* --- every <img> has an alt attribute --- */
  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\balt=/.test(img)) note(route, `<img> without alt: ${img.slice(0, 90)}`);
  }

  /* --- document language --- */
  if (!/<html[^>]+lang="/.test(html)) note(route, 'missing lang on <html>');

  /* --- landmarks --- */
  if (!/<main\b/.test(html)) note(route, 'missing <main> landmark');
  if (!/id="main"/.test(html)) note(route, 'missing #main skip-link target');
  if (!/<footer\b/.test(html)) note(route, 'missing <footer> landmark');

  /* --- SEO essentials --- */
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  if (!title) note(route, 'missing <title>');
  else if (title.length > 62) note(route, `<title> is ${title.length} chars (>62): "${title}"`);

  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  if (!desc) note(route, 'missing meta description');
  else if (desc.length > 160) note(route, `meta description is ${desc.length} chars (>160): "${desc}"`);

  if (!/rel="canonical"/.test(html)) note(route, 'missing canonical link');
  if (!/property="og:title"/.test(html)) note(route, 'missing og:title');

  /* --- unresolved placeholder text leaking to production --- */
  if (/\bTODO\b|\bLorem ipsum\b|undefined<|\[object Object\]/.test(html)) {
    note(route, 'placeholder or undefined value rendered in output');
  }

  /* --- headings should not skip levels (h1 -> h3) --- */
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      note(route, `heading level jumps h${levels[i - 1]} -> h${levels[i]}`);
      break;
    }
  }
}

console.log(`\nAudited ${ROUTES.length} routes against ${BASE}\n` + '='.repeat(60));
if (problems.length === 0) {
  console.log('No issues found.\n');
} else {
  for (const p of problems) console.log('  • ' + p);
  console.log('='.repeat(60));
  console.log(`${problems.length} issue(s).\n`);
}
process.exit(problems.length === 0 ? 0 : 1);
