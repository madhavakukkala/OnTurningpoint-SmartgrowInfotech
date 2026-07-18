# OnTurningPoint — marketing website

Marketing site for **OnTurningPoint**, an overseas-education consultancy in Nellore, Andhra Pradesh
that helps students study MBBS and other courses abroad.

Built with Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.
The full design system, sitemap and source copy live in [`BRIEF.md`](./BRIEF.md).

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (type-checks and lints — must pass before deploying) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint only |
| `npm run logo` | Regenerate all logo variants, the favicon and the OG source from `/logo/logo.svg` |
| `npm run check:contrast` | Audit every colour token pair against WCAG 2.1 AA |
| `npm run audit` | Structural + SEO + accessibility smoke test across all 26 routes (needs a running server) |

### Running the full audit

```bash
npm run build
npm run start                 # in one terminal
npm run audit                 # in another
```

`npm run audit` checks every route for: exactly one `<h1>`, `alt` on every image, `lang` on `<html>`,
`<main>` / `<footer>` landmarks, the skip-link target, title and meta-description length, canonical
and Open Graph tags, heading-level skips, and leaked placeholder text.

### Before deploying

Set the production domain — it drives canonical URLs, Open Graph tags and `sitemap.xml`:

```bash
# .env.local  (or your host's environment variables)
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

Without it the site falls back to `https://onturningpoint.com`.

---

## Where to edit content

**All page copy lives in `src/content/`. Pages import it — never hardcode long copy in a page file.**

| File | Contains |
| --- | --- |
| `company.ts` | Address, phone numbers, email, hours, mission/aim/vision, team, values |
| `home.ts` | Homepage hero, stats, section headings and blurbs |
| `mbbs.ts` | MBBS pillar page — why, trending destinations, 6-step process, FAQs |
| `services.ts` | Benefits, what we offer, why OnTurningPoint |
| `loan.ts` | Education loan — benefits, eligibility, documents, lenders |
| `valueAdded.ts` | Grouped value-added service lists |
| `certification.ts` | Certification programmes, courses, features |
| `medicalPG.ts` | Medical PG in Germany — eligibility, process, specializations |
| `internship.ts` | Internship offerings, features, benefits |
| `placements.ts` | Network, support, example outcomes, post-placement |
| **`countries.ts`** | **All 11 destinations** — see below |
| `legal.ts` | Privacy Policy, Terms & Conditions, Cookie Policy |
| `nav.ts` | Header navigation, the Services/Countries menus, footer columns |

### Adding or editing a destination

All eleven country pages render from **one template** (`src/app/countries/[slug]/page.tsx`) driven by
`src/content/countries.ts`. To add a destination:

1. Append an object to the `countries` array. Set `kind: 'mbbs'` (fees + eligibility variant) or
   `kind: 'study'` (courses, costs, visa, scholarships, post-study work variant) — TypeScript will
   tell you exactly which fields each variant needs.
2. Drop a photo at `public/images/country-<slug>.jpg` and point `image` at it.

The new page, its nav entry, its footer link and its `sitemap.xml` entry all appear automatically.

### Contact form → Google Sheets

Enquiries are written as rows into a Google Sheet via a Google Apps Script web app.

**Setup (once, ~5 minutes):** follow the numbered instructions at the top of
[`scripts/google-apps-script.gs`](./scripts/google-apps-script.gs). In short — create a Sheet, paste
that script into Extensions → Apps Script, deploy it as a Web app with access set to *Anyone*, then
put the deployment URL and your shared secret into `.env.local`:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfy..../exec
GOOGLE_SHEETS_SHARED_SECRET=your-long-random-string
```

The same script has an optional trigger that emails you on every new enquiry, so nobody has to watch
the spreadsheet.

**Two behaviours worth knowing:**

- **While those variables are unset, the form reports an error to the visitor** instead of pretending
  to succeed. That is deliberate: an enquiry that silently goes nowhere is worse than one that
  visibly fails, because the student believes someone is going to call them back. Set the variables
  before pointing any advertising at the site.
- The form carries a **honeypot** field (`company`) that is hidden from real users. Submissions with
  it filled are discarded, and deliberately answered with `200 OK` — telling a spammer they were
  caught just invites a retry with the field left blank.

**If a submission ever fails**, the full enquiry is written to the server log, so it can be recovered
from your host's logs rather than lost outright.

**To switch to email or a CRM instead**, replace the `fetch` block in
`src/app/api/contact/route.ts`. Keep returning `{ ok: true }` on success and the front end needs no
changes.

---

## Swapping the logo

The client provides **one** file. Everything else is generated from it.

1. Replace `logo/logo.svg` (project root — this is the untouched client source).
2. Run `npm run logo`.

That regenerates, from the single source:

| Output | Used by |
| --- | --- |
| `public/logo/logo.svg` | Full lockup, espresso brown on white |
| `public/logo/logo-white.svg` | Full lockup, white — for dark sections |
| `public/logo/logo-mark.svg` | Compact mark — the header |
| `public/logo/logo-mark-white.svg` | Compact mark, white — the footer |
| `src/app/icon.svg` | Favicon |
| `public/og.svg` | Open Graph source artwork |

The script recolours the artwork (the source is white, which is invisible on this white site) to the
primary brand colour and derives the light/dark variants automatically. If you change the brand
colour, update `PRIMARY` in `scripts/process-logo.mjs` and re-run it.

The social share image itself is generated as a real PNG at `src/app/opengraph-image.tsx` — edit that
file to change what appears when the site is shared.

---

## Changing colours

**Edit `src/app/globals.css` — the `:root` block at the top.** Every Tailwind colour token reads from
those CSS variables via `tailwind.config.ts`, so changing them there rebrands the whole site.

```css
:root {
  --bg: #ffffff;              /* page background — the site is WHITE-FORWARD */
  --surface: #fafafa;         /* almost-white cards and alternating sections */
  --primary: #2c1917;         /* THE single brand colour: logo, buttons, links */
  --primary-soft: #4a332f;    /* hover state only */
  --text: #241514;            /* body text — very dark brown, not black */
  --text-muted: #55504f;      /* secondary text */
  --text-subtle: #6b6564;     /* tertiary text, captions */
  --section-blue: #e7eff6;    /* quiet accent tint — sections/cards ONLY */
  --section-lavender: #e9e8fa;/* quiet accent tint */
  --section-sand: #f5efe9;    /* quiet accent tint */
  --border: rgba(40,40,40,.15);
}
```

Two rules the design depends on:

- **One primary colour.** There is exactly one filled CTA colour. Secondary buttons use the ghost
  style — never introduce a second bright colour.
- **The tints are accents, not backgrounds.** White and `--surface` should dominate every page; reach
  for blue/lavender/sand at most once or twice per page, and never on two adjacent sections.

After changing any colour, run `npm run check:contrast` to confirm the palette still meets WCAG AA.

### Section tones

Sections take a `tone` prop that maps to those tints:

```tsx
<Section tone="surface">   {/* 'default' | 'surface' | 'blue' | 'lavender' | 'sand' | 'dark' */}
```

---

## Project structure

```
logo/logo.svg              Client-provided source logo (do not edit output from it)
public/images/             All photography (Unsplash, free for commercial use)
public/logo/               Generated logo variants — regenerate, don't hand-edit
scripts/
  process-logo.mjs         Logo pipeline
  check-contrast.mjs       WCAG contrast audit
  audit-pages.mjs          Structural / SEO / a11y route audit
src/
  app/                     Routes (App Router) + sitemap.ts, robots.ts, opengraph-image.tsx
  components/              Reusable sections (Nav, Footer, FeatureGrid, FAQ, FeesTable…)
    ui/                    Primitives (Container, Section, Heading, Button, Card, Reveal)
  content/                 ALL page copy — edit here
  lib/                     Motion variants, SEO helpers, focus trap, utilities
```

---

## Outstanding TODOs before launch

Search the codebase for `TODO(` to find these in context.

- **`TODO(client)`** — Homepage stat figures in `src/content/home.ts` are placeholders; confirm the
  real numbers.
- **`TODO(client)`** — The four team headshots in `public/images/team-*.jpg` are stock placeholders.
  Replace with real photos of the team.
- **`TODO(client)`** — The contact page has a Google Maps embed placeholder; instructions for adding
  the real embed are in `src/app/contact/page.tsx`.
- **`TODO(legal review)`** — `BRIEF.md` §6 refers to policy text that was not supplied. The three
  legal pages contain a complete, standard policy set covering GDPR/CCPA/PIPEDA/CalOPPA, written to
  be accurate for the site as built, **but it has not been reviewed by a lawyer.** Governing law is
  set to India with courts in Andhra Pradesh per the brief. Have counsel review before launch.
- **`TODO(integration)`** — Wire `src/app/api/contact/route.ts` to email or a CRM.
- Set `NEXT_PUBLIC_SITE_URL` to the production domain.
