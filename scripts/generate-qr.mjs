/**
 * Generates the footer QR code as a static SVG.
 *
 * Run:  npm run qr
 * Output: public/qr-site.svg
 *
 * Generated at build time rather than in the browser so the footer ships no
 * QR library to the client and the mark renders identically everywhere.
 *
 * The encoded URL follows NEXT_PUBLIC_SITE_URL so the QR always points at the
 * real domain. TODO(client): confirm the production domain, then re-run.
 */
import QRCode from 'qrcode';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'public');

const url = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onturningpoint.com').replace(/\/$/, '');

const PRIMARY = '#002C83'; // must stay in step with --primary

const svg = await QRCode.toString(url, {
  type: 'svg',
  // 'M' corrects ~15% damage — ample for a screen-displayed code, and keeps the
  // module count low so the mark stays crisp at the ~110px it renders at.
  errorCorrectionLevel: 'M',
  margin: 0,
  color: { dark: PRIMARY, light: '#0000' },
});

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'qr-site.svg'), svg, 'utf8');

console.log(`[qr] wrote public/qr-site.svg -> ${url}`);
