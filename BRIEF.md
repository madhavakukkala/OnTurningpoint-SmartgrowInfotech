# OnTurningPoint — Website Build Brief & Final Prompt (for Claude Code)

> **How to use this file:** Drop this file into an empty project folder, open Claude Code in that folder, and paste the **"FINAL PROMPT"** block (Section 0) as your first message. Everything below the prompt (Sections 1–9) is the reference spec the prompt points Claude Code to. Keep this whole file in the repo as `BRIEF.md` so Claude Code can re-read it any time.

---

## 0. FINAL PROMPT — paste this into Claude Code

```
You are building the official marketing website for OnTurningPoint (brand name written as
"OnTurningPoint"), an overseas-education consultancy based in Nellore, Andhra Pradesh, India that
helps students study MBBS and other courses abroad.

Read BRIEF.md in this repo in full before writing any code. It contains the complete design system,
sitemap, and the finished copy for every page. Do not invent facts, universities, fees, or
contact details — use only what BRIEF.md provides. Where BRIEF.md marks something as a placeholder,
keep it clearly editable.

## Tech stack (required)
- Next.js (App Router, latest) + TypeScript
- Tailwind CSS for styling, with design tokens defined in tailwind.config + CSS variables
- Framer Motion for all animation
- next/font for self-hosted fonts, next/image for images
- Fully responsive (mobile-first), accessible (WCAG 2.1 AA), SEO-ready (per-page metadata,
  sitemap.xml, robots.txt, Open Graph tags, JSON-LD LocalBusiness schema)
- No backend required; the contact form should validate on the client and POST to a stubbed
  /api/contact route (log + return success) so it's ready to wire to email/CRM later.

## Use these skills and tools for the best possible UI/UX (install/enable all of them)
- Enable and USE every available design skill throughout: design-critique, design-system,
  design-handoff, accessibility-review, ux-copy, user-research/research-synthesis where useful,
  and the dataviz skill if any stat/among-us visual is built. Run a design-critique pass and an
  accessibility-review pass on the built pages before you consider the site done.
- Use 21st.dev (Magic) components for polished, animated building blocks (nav, hero, marquee,
  cards, testimonial/stat sections, footer). Adapt them to the tokens in BRIEF.md — do not ship
  their default colors. If a 21st.dev component conflicts with the Swiss/editorial look, prefer
  the look in BRIEF.md.
- The site is WHITE-FORWARD: the dominant background is white / almost-white. The muted blue and
  soft lavender from the original palette are demoted to occasional soft section accents only — not
  the page background. You choose the exact final values, but derive them from the palette in
  BRIEF.md §2: white/almost-white base, very-dark espresso brown (#241514 / #2C1917) as the single
  primary (logo, text, buttons), muted blue + lavender as quiet supporting tints. Keep it minimal,
  airy, premium, and appropriate to an education/medical-abroad niche — trust-building and calm.
  No bright colors, no heavy gradients, one primary CTA color only.

## Brand assets — logo handling (READ CAREFULLY)
- The client provides ONE raw logo as a white SVG at `/logo/logo.svg` (a top-level `logo` folder in
  the project root). The logo artwork must sit on a WHITE background.
- Process it: recolor the white artwork to the PRIMARY brand color (the espresso brown #2C1917 /
  #241514) so it reads as a dark mark on white. Keep the recolor minimal and clean — the primary
  color only, no extra hues. Output the web-ready version(s) into `/public/logo/` (e.g.
  `logo.svg` primary-on-white, plus a compact `logo-mark.svg`) so Next.js serves them; reference
  those `/public/logo/...` paths in the nav, footer, and metadata.
- AUTO-DERIVE variants from the single source: a dark/primary version for light backgrounds (default
  everywhere) and a white version for any dark section/footer. Do this programmatically from the one
  SVG — do not ask the client for more files.
- Until the real `/logo/logo.svg` is dropped in, generate a clean temporary SVG wordmark
  "OnTurningPoint" in the brand type (espresso brown on white) so the layout is complete, and leave
  a clear TODO comment pointing to `/logo/logo.svg`.
- Generate a favicon and an OG image from the processed logo.

## Design direction (see BRIEF.md §2 in full)
Modern Editorial Minimalism + Swiss Typography + premium SaaS. Huge uppercase display headings
mixed with light italic serif accents ("editorial" feel), enormous whitespace, a 12-column grid,
1400px max container, 80px outer margins, 120px section spacing, 32px card radius, pill buttons,
very subtle shadows, thin monochrome outline icons, and only subtle motion (fade-up / slide /
scale, ~300ms, staggered on scroll-in). This site DOES use photography (see BRIEF.md §2.7): source
tasteful, royalty-free images from Unsplash/Pexels (free for commercial use, no attribution needed),
download the chosen ones into a flat `/public/images/` folder, and reference them locally via
next/image. Keep imagery curated and on-brand for the white/editorial look — bright, airy, real
students/campus/travel, muted natural tones; avoid cheesy or heavily-saturated stock. Whitespace
still leads; images support, they don't crowd.

## Scope — full multi-page site (sitemap in BRIEF.md §3)
Build every page listed: Home, MBBS Abroad, Services, Education Loan, Value Added Services,
Professional Certification Training, Medical PG (Germany), Internship, Placements, About Us, the 10
Country pages (Russia, Georgia, Kazakhstan, Philippines, Uzbekistan, Kyrgyzstan, Netherlands,
Sweden, Spain, Germany, UK — note: build a shared Country template driven by a data file), Contact,
and the legal pages (Privacy, Terms, Cookies). Use a single reusable Country page template + a
countries data file so all destinations render from structured data.

## Deliverables & working method
1. Scaffold the Next.js app, wire Tailwind tokens + fonts, build the shared layout (nav + footer).
2. Build reusable components (Section, Container, Heading, Button, Card, FeatureGrid, Stat,
   FAQ accordion, CountryHero, FeesTable, Marquee, ContactForm) before pages.
3. Put ALL page copy in typed content files under /content (mbbs.ts, services.ts, countries.ts,
   etc.) sourced from BRIEF.md §4 — pages import content, never hardcode long copy.
4. Build pages, then run design-critique + accessibility-review, fix findings, and give me a short
   report of what you changed.
5. Ensure `npm run build` passes with no type/lint errors. Add a README with run instructions and a
   "where to edit content / swap the logo / change colors" guide.

Work in small commits. Ask me only if something is genuinely ambiguous; otherwise make the tasteful
choice consistent with BRIEF.md and note it.
```

---

## 1. Brand snapshot

| Field | Value |
|---|---|
| Brand name (display) | **OnTurningPoint** |
| Also written | On Turning Point / OTP |
| What it is | Overseas-education consultancy — MBBS abroad + study-abroad + certification/training |
| Location | Nellore Branch, near Ramalingapuram, under Railway bridge, behind Punjabi Family Dhaba, SPSR Nellore (Dist), Andhra Pradesh — Pin 524003 |
| Phone | 8500470231, 8500471231, 8500450231 |
| Email | onturningpoint@gmail.com |
| Hours | Monday–Saturday, 10:00 AM – 7:00 PM · Sunday closed |
| Primary CTA | "Book a free consultation" |
| Tone | Trustworthy, warm, aspirational, transparent, student-first |

**Team:** Prem Kumar J (Founder / Director), P. Enoch (CEO), Rahelamma J (Career Counselor & Application Executive), Chaitanya Royal (Digital Marketing Executive).

---

## 2. Design system (build-ready)

**Style:** Modern Editorial Minimalism + Swiss Typography + premium SaaS UI.
**Keywords:** minimal · editorial · clean · airy · premium · swiss typography · soft pastel · rounded · high whitespace · apple-inspired · startup landing.

### 2.1 Color palette — WHITE-FORWARD (derive final values from these; Claude Code may refine tints)

The site background is **white / almost-white**. The muted blue and lavender are **soft accents for
occasional sections and cards only** — never the page background. The espresso brown is the single
primary (logo, headings, buttons). This keeps it minimal, premium, and trust-building for the
education/medical-abroad niche.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background (white) |
| `--surface` | `#FAFAFA` | Almost-white surface / cards on white |
| `--section-blue` | `#E7EFF6` | Soft muted-blue accent section (use sparingly) |
| `--section-lavender` | `#E9E8FA` | Soft lavender accent section (use sparingly) |
| `--primary` | `#2C1917` | Primary brand color — **logo**, buttons, key accents (espresso brown) |
| `--text` | `#241514` | Primary text (very dark brown, not black) |
| `--text-muted` | `#555555` | Secondary text |
| `--btn-bg` | `#2C1917` | Button background |
| `--btn-text` | `#FFFFFF` | Button text |
| `--border` | `rgba(40,40,40,.15)` | Hairline borders |

Rules: white base, one primary (espresso brown), muted-blue + lavender only as gentle section/card
tints. No bright/saturated colors, no heavy gradients, one primary CTA color only. Optionally one
more pale tint (e.g. soft peach or mint) for feature-card variety if it sits quietly beside the blue
and lavender. Light theme is the default; dark mode optional.

### 2.2 Typography

- **Display / headings:** a clean Swiss grotesk — General Sans, Satoshi, Neue Haas Grotesk, Inter, or SF Pro Display. Pair with an **italic serif accent** (Instrument Serif or Canela) for editorial mixed headings.
- **Body:** same grotesk, 18px, line-height 1.7, weight 400.
- **Nav:** 15px, weight 500.

Display heading spec:
```
font-weight: 800;
font-size: clamp(44px, 8vw, 92px);
line-height: 0.95;
letter-spacing: -3px;
text-transform: uppercase;
```
Accent heading (mix into displays for editorial feel):
```
font-style: italic;
font-weight: 300;
text-transform: none;   /* e.g. "STUDY MBBS" + italic "abroad" */
```

### 2.3 Layout & spacing

- 12-column grid · container max-width **1400px** · outer margin **80px** (responsive down).
- Section vertical spacing **120px** (down to ~64–72px on mobile).
- Spacing scale: `8 · 16 · 24 · 32 · 48 · 64 · 96 · 120`. Never pack elements.

### 2.4 Components

- **Buttons:** pill, `border-radius:999px; padding:16px 36px; font-weight:600;` Hover: slightly lighter bg + `translateY(-2px)`, `transition:.3s`.
- **Cards:** large, rounded **32px**, almost no border, soft shadow `0 10px 30px rgba(0,0,0,.06)`.
- **Shadows:** very subtle only — `0 8px 25px rgba(0,0,0,.05)`. No neumorphism.
- **Shapes:** everything rounded (16 / 24 / 32 / 999). No sharp corners.
- **Icons:** thin outline, monochrome, simple, Apple-like (e.g. Lucide with reduced stroke).
- **Images:** curated photography sourced from free stock (see §2.7). Consistent treatment: rounded 32px corners, subtle shadow, consistent aspect ratios, next/image optimization, meaningful alt text. Whitespace still leads.

### 2.5 Animation

Subtle only: fade-up, slide, scale, opacity, ~300ms, eased. Stagger children on scroll-into-view. Respect `prefers-reduced-motion`. Avoid flashy/parallax-heavy effects.

### 2.6 Do / Don't

Use: whitespace, big type, few colors, strong hierarchy, rounded containers, minimal decoration, one primary CTA, large margins.
Avoid: bright colors, heavy gradients, too many icons, dense layouts, long paragraphs, multiple CTA colors, busy backgrounds.

### 2.7 Imagery & photos (stock-sourced — no client uploads needed)

Claude Code sources all photos itself from **Unsplash / Pexels** (both free for commercial use, no
attribution required). **Download** the specific chosen images into a **flat `/public/images/`
folder** (renamed by slot, e.g. `hero.jpg`, `country-russia.jpg`, `team-1.jpg`) and reference them
locally via `next/image` — do NOT hotlink random stock URLs (they break and hurt performance). If
any remote host is needed at build time, add it to `next.config` `images.remotePatterns`.

Choose images that fit the white/editorial/minimal look: bright, airy, natural light, muted tones,
real students / campuses / cityscapes / travel / study moments. Avoid cheesy corporate handshakes,
neon saturation, or busy compositions. Apply consistent treatment (32px rounded corners, subtle
shadow, uniform aspect ratios). Always include meaningful `alt` text.

**Image slots to fill:**
- **Hero (home):** one strong lifestyle/study-abroad image (student, graduation, travel, or a clean device/illustration mock if a photo feels too heavy).
- **Country pages:** one representative cityscape/landmark photo per destination — Russia, Georgia, Kazakhstan, Philippines, Uzbekistan, Kyrgyzstan, Netherlands, Sweden, Spain, Germany, UK.
- **Section supporting images:** MBBS/medical (lab, students, campus), services, loans, Medical PG (Germany hospital/city), internship/certification (tech/learning), placements (professional/office).
- **About & team:** office/branch ambiance photos + tasteful placeholder headshots for the 4 team members (leave clearly swappable with a TODO so real photos can replace them).
- **Optional gallery / success band:** a small student/campus gallery or testimonial strip if it strengthens trust.

Keep total count reasonable — quality over quantity; the layout must still breathe.

---

## 3. Sitemap

```
/                              Home / landing
/mbbs-abroad                   MBBS Abroad 2025–2026 (pillar page)
/services                      Services — Benefits & What We Offer
/education-loan                Education Loan Assistance
/value-added-services          Value Added Services
/certification-training        Professional Certification Training
/medical-pg-germany            Medical PG in Germany
/internship                    Internship Training
/placements                    Placements
/about                         About Us + Team
/contact                       Contact + inquiry form

/countries                     Countries index (grid of all destinations)
/countries/[slug]              Shared template, one per destination:
    russia, georgia, kazakhstan, philippines, uzbekistan, kyrgyzstan,
    netherlands, sweden, spain, germany, uk

/privacy-policy                Privacy Policy
/terms                         Terms & Conditions
/cookie-policy                 Cookie Policy
```

**Global nav (per style guide):** Logo · About · Services · Countries (dropdown) · MBBS Abroad · Contact · **CTA button ("Book a free consultation")**. Keep nav to ~5 items + CTA; group Loans/Value-Added/Certification/PG/Internship/Placements under a "Services" or "More" mega-menu so the bar stays minimal.

**Footer:** logo + one-line mission, quick links (columns: Study Abroad / Services / Company / Legal), the countries list, address block, phone/email/hours, small print + legal links. Simple, no heavy gradient.

---

## 4. Page content (verbatim source copy, cleaned & structured)

> This is the substantive copy. Put it in typed content files under `/content`. Keep headings/lists as-is; light formatting cleanup is fine, but **do not change facts, university names, fees, phone, email, or address.**

### 4.1 Company foundation (reused site-wide)

**Mission:** Empower students with the right guidance and resources to achieve their dream of quality education abroad. Committed to making global education accessible, transparent, and hassle-free — the bridge that connects ambition with opportunity, through personalized counseling, honest advice, and end-to-end support.

**Aim:** Simplify studying abroad with expert guidance, transparent processes, and trustworthy support at every step — a stress-free journey from choosing the right university to securing admissions and settling abroad.

**Vision:** A future where every student, regardless of background, has access to world-class education without barriers. Aspire to be a globally trusted name guiding thousands of students toward successful international careers through ethical practices, expert advice, and heartfelt support.

**About Us:** OnTurningPoint is more than an overseas-education consultancy — a trusted partner in building a brighter future. With experienced counselors and a strong network of reputed universities worldwide, it specializes in helping students pursue MBBS and other professional courses abroad. Studying overseas is a major turning point in life; every student's dream is handled with care, precision, and a personalized approach — from career counseling and university selection to admission assistance, visa support, and beyond.

### 4.2 Home (assemble from the strongest blocks)

- **Hero:** display heading e.g. **"STUDY MBBS"** + italic *"abroad"* / supporting line: "Expert, transparent, end-to-end guidance for MBBS and study-abroad — from choosing the right university to settling in." CTA: Book a free consultation. One device/illustration mock.
- **Trust strip / stats:** years of experience, students guided, partner universities, countries (use qualitative claims from copy; keep numbers as editable placeholders if not given).
- **Why MBBS abroad:** affordable & competitive fees · globally recognized (WHO/NMC/USMLE) · high-quality education · PG opportunities.
- **Destinations preview:** cards linking to the 10+ country pages.
- **Services preview:** Admissions · Loans · Value-Added · Certification · Medical PG · Internship · Placements.
- **Step-by-step process** (6 steps, see MBBS page).
- **Why choose OnTurningPoint** (expert guidance, seamless process, affordability, post-admission support, 24/7).
- **CTA band + contact block.**

### 4.3 MBBS Abroad 2025–2026 (pillar)

Intro: "Embark on Your Medical Journey with MBBS Abroad — expert guidance and support to study MBBS in Russia, China, Ukraine, the Philippines, or Europe for 2025–2026."

**Why choose MBBS abroad:** Affordable & competitive fees; recognized global qualifications (WHO, MCI, USMLE); high-quality medical education & research; postgraduate (MD/MS) opportunities.

**Trending destinations 2025–2026:**
1. **Russia** — Kazan State Medical University, Saint Petersburg State Medical University, Crimea Federal University. Affordable fees, high quality, MCI recognition, English-medium.
2. **China** — Zhejiang University, Shandong University, Beijing University of Chinese Medicine. Affordable, top-tier, globally recognized, strong clinical experience.
3. **Ukraine** — Kyiv Medical University, Odessa National Medical University, Kharkiv National Medical University. Affordable, 100% English-medium, mostly MCI-recognized.
4. **Philippines** — University of the Philippines, University of Santo Tomas, University of Cebu. Western-standard system, eligible for screening exams.
5. **Europe (Germany, Poland, etc.)** — Heidelberg University (Germany), Medical University of Gdańsk (Poland). English programs; Germany offers free/low-cost options.

**Benefits:** higher acceptance rate; global exposure; advanced learning methods.

**Step-by-step admission process (6):** 1) Initial consultation → 2) University selection → 3) Application submission → 4) Visa processing → 5) Pre-departure support → 6) Post-arrival assistance.

**Why OnTurningPoint:** expert guidance · seamless process · affordability · post-admission support (accommodation, cultural adjustment, 24/7 support).

**FAQs:**
- Duration of MBBS abroad? Typically 5–6 years depending on university/country.
- Entrance exams required? Some countries require them, some don't — guidance provided per university/country.
- Practice in India after? Yes — appear for the MCI Screening Test (FMGE/NEXT).
- Scholarships? Many universities offer them for international students; OTP helps explore/apply.

### 4.4 Services — Benefits & What We Offer

**Benefits of studying MBBS abroad with OTP (9):** Affordable education · globally recognized degrees (MCI, WHO, USMLE) · no entrance exams for most universities · English-medium instruction · world-class infrastructure & research · multicultural environment · post-graduation opportunities · high acceptance rate · affordable living.

**What we offer (10):** Expert consultation & guidance · university & program selection · application & documentation assistance · visa assistance · pre-departure support · accommodation & travel assistance · post-arrival services · continuous support · internship & clinical support · post-graduation career counseling.

**Why choose OTP:** proven track record · trusted network of universities · customized approach · 24/7 support.

### 4.5 Education Loan Assistance

Intro: End-to-end education-loan assistance to fund overseas medical education smoothly. Collaborates with leading nationalized & private banks, NBFCs, and financial institutions.

**Why loans through OTP:** 100% funding (tuition + living) · secured & unsecured options (unsecured up to ₹75 lakhs in select cases) · fast approval · lower interest rates (from as low as ~9.5% p.a., lender-dependent) · moratorium period (repay after course + internship) · loans for all countries & universities (Russia, Georgia, Philippines, Uzbekistan, Europe, etc.).

**Assistance includes:** 1) Loan eligibility assessment · 2) Documentation support (admission letter, fee structure, income & ID proofs, collateral if applicable) · 3) Bank tie-ups (SBI, Bank of Baroda, HDFC Credila, ICICI Bank, Avanse, Auxilo, and more) · 4) Application follow-up · 5) Disbursement assistance.

**Eligibility:** Indian citizen · confirmed admission to a recognized foreign MBBS program · co-applicant (parent/guardian) with steady income · collateral for secured loans if applicable.

**Documents required:** university admission letter · academic certificates (10th, 12th, NEET) · passport & visa copy · co-applicant income proof (ITR/salary slips) · 6-month bank statements · collateral papers (if secured) · passport-sized photos.

**Countries assisted:** Russia, Georgia, Kazakhstan, Kyrgyzstan, Philippines, Uzbekistan, Armenia, and more.

Hours note on this page: Monday–Saturday, 10 AM to 7 PM.

### 4.6 Value Added Services

Intro: End-to-end support beyond admission. Commitment: credentialed admissions · ZERO college fees options (e.g. Germany) · best-fit college & course.

**Academic & admission support:** personalized college assessment · super-selective college admission · expertly curated college list · academic selection guidance · monthly intensive support.
**Documentation:** SOP writing & review · LOR writing & review · CV writing & review.
**Language & test coaching:** German language coaching · IELTS, TOEFL, PTE, GRE, GMAT coaching.
**Visa & financial:** visa assistance · scholarship assistance & follow-up · FOREX card services.
**Pre-departure & post-arrival:** accommodation arrangement · flight bookings · airport pickup & drop · travel & health insurance · Indian food assistance.
**Why OTP:** holistic approach · expert team · proven track record · personalized attention.

### 4.7 Professional Certification Training

Intro: Industry-recognized certification training to stay ahead in the job market.

**Programs:** Microsoft · Oracle · AWS · IABAC (data science & business analytics) · Cloudera (big data — Hadoop/Spark).
**Top trending courses:** AZ-900 (Azure Fundamentals) · AZ-104 (Azure Administrator) · AWS Solution Architect · AWS Cloud Data Engineer · Oracle SQL/PLSQL · Selenium · Salesforce Admin.
**Key features:** expert instructors · flexible online learning · hands-on projects · certification guidance · career support/placement assistance.
**Why OTP:** personalized learning paths · comprehensive resources · community engagement · continuous updates.

### 4.8 Medical PG in Germany

Intro: Germany for postgraduate medical education — world-class healthcare, structured residency ("Facharztweiterbildung"), research emphasis.

**Why PG in Germany:** no tuition fees (most public universities) · structured residency (4–6 yrs) · stipends €2,300–€4,500/month · global recognition · pathway to permanent residency.
**Eligibility:** MBBS from recognized institution · valid MCI/NMC registration · German B2/C1 (Fachsprachprüfung in some states) · Kenntnisprüfung (clinical knowledge test) for non-EU doctors.
**Application process:** 1) Language prep (A1/A2 at home → B1/B2 in Germany → medical German) · 2) Document verification · 3) Observership · 4) Licensing exams (Fachsprachprüfung + Kenntnisprüfung) · 5) Residency application.
**Top specializations:** Internal Medicine · Surgery · Pediatrics · Radiology · Anesthesiology · Neurology · Psychiatry · Orthopedics.
**Post-residency (after Approbation):** practice independently · subspecialize · EU-wide opportunities.
**Why OTP:** comprehensive guidance · experienced counselors · personalized assistance · post-arrival support.

### 4.9 Internship Training

Intro: Bridging academia and industry with real-world experience.

**Why intern:** practical exposure · skill enhancement · professional networking · career clarity · resume building.
**Offerings (online & offline):** Big Data (HDFS, Hive, Sqoop, Spark, Python, Scala, NoSQL) · Software Development · Data Science & Analytics · Cloud Computing (AWS, Azure) · Cybersecurity.
**Program features:** internship certificate · project completion certificate · inplant training (IPT) certificate · training library access · resume building · placement guidance · mock interviews · personalized career counseling · technical support.
**Benefits:** real-world experience · skill development · networking · career advancement · academic credit.

### 4.10 Placements

Intro: Bridging academic learning and professional employment worldwide.

**Global network:** MNCs · startups & SMEs · research institutions · healthcare facilities · educational institutions.
**Support:** personalized career counseling · resume & cover letter · interview prep (mock interviews) · job-search strategies · networking.
**Success stories (examples):** Germany (engineering — automotive/manufacturing) · UK (finance & IT, London) · Canada (healthcare) · Australia (teaching) · USA (research assistantships).
**Post-placement:** workplace integration · career-progression guidance · alumni network access.

### 4.11 About Us

Use the About Us copy in §4.1 + the team list in §1. Layout: mission/aim/vision trio, story paragraph, team cards (name, credentials, role), values (ethical, transparent, personalized), CTA.

### 4.12 Contact

Address, phone (3 numbers), email, hours (Mon–Sat 10–7, Sun closed) from §1. Inquiry form fields: **Name, Email, Phone, Message** — "our team will get back to you within 24 hours." Tagline: "Let's create your success story together!" Include an embedded map placeholder for the Nellore address.

---

## 5. Country pages — structured data (build one `[slug]` template)

Each destination renders from this data. Fields per country: `hero` (overview), `highlights[]`, `universities[]`, `fees[]` (rows), `eligibility[]`, `whyStudy[]`, `whyOTP[]`, `admissionsNote`. MBBS countries share a medical template; study-abroad countries (Netherlands/Sweden/Spain/Germany/UK) use a study-abroad variant with `courses[]`, `tuition[]`, `visa`, `scholarships[]`, `postStudyWork`.

### 5.1 MBBS destinations

**Russia** — 30+ NMC-approved universities; strong academics, modern clinical practice, research-oriented.
- Highlights: 6 yrs (incl. internship) · English/bilingual · NEET mandatory · NMC & WHO approved · globally accepted · Indian mess & hostel · clinical training in govt hospitals.
- Universities: Crimea Federal University; Kazan State Medical University; First Moscow State Medical University; Bashkir State Medical University; Volgograd State Medical University; Orenburg State Medical University; RUDN (People's Friendship University of Russia).
- Fees (INR/yr): Tuition ₹2.5–5L · Hostel & food ₹1–1.5L · **Total ₹3.5–6.5L** (English-medium may cost slightly more).
- Eligibility: 50% in 10+2 PCB (40% reserved) · NEET mandatory · passport & photos · admission letter · health certificate.
- Why: globally recognized (NEXT/FMGE/USMLE) · affordable · advanced infra & simulation labs · high global rankings · English-medium · Indian food/culture support · climate adaptability · strong Indian community.
- Why OTP: direct university partnerships · transparent admission & visa · English-medium selection help · Indian mentors in Russia · pre-departure & post-arrival · accommodation/food/academic support · NEXT/FMGE-focused guidance.

**Georgia** — NMC/WHO-recognized; English-medium; globally accepted.
- Highlights: 6 yrs · English · NMC & WHO approved · NEET required (qualifying) · no entrance test · FMGE/USMLE/PLAB recognition · affordable.
- Universities: Tbilisi State Medical University; Batumi Shota Rustaveli State University; Ivane Javakhishvili Tbilisi State University; University of Georgia; Georgian American University; European University, Tbilisi.
- Fees (INR/yr): Tuition ₹3–5L · Hostel & food ₹70K–1.2L · **Total ₹3.7–6.2L**.
- Eligibility: 50% in 10+2 PCB · NEET mandatory · passport & photos · health certificate · admission letter.
- Why: FMGE/NEXT/USMLE/PLAB eligible · affordable · well-equipped facilities · English-medium · safe & friendly · climate/cultural fit · direct admission, no capitation · Indian food/community.
- Why OTP: expert university selection · 100% transparent · full visa assistance · pre/post support · Indian mentors in Georgia · FMGE/NEXT prep support.

**Kazakhstan** — govt medical universities; English-medium; high FMGE pass rate; cost of living near India.
- Highlights: 5 yrs · English · NMC & WHO approved · NEET required · no donation/capitation · affordable · FMGE/NEXT coaching available.
- Universities: Kazakh National Medical University (Almaty); Astana Medical University; Karaganda State Medical University; South Kazakhstan Medical Academy; Semey State Medical University; West Kazakhstan Marat Ospanov State Medical University.
- Fees (INR/yr): Tuition ₹2.5–4L · Hostel & food ₹80K–1.2L · **Total ₹3.5–5.2L**.
- Eligibility: 50% in 10+2 PCB · NEET qualified · passport · medical fitness certificate · photos · admission/invitation letter.
- Why: shorter 5-yr course · low cost, high ROI · English-medium · govt universities, modern infra · good FMGE performance · Indian mess/hostel · globally recognized (USMLE/PLAB/NEXT).
- Why OTP: trusted partner · budget/goal-based selection · 100% transparent · full documentation & visa · travel/forex/insurance · post-arrival support · academic guidance to completion.

**Philippines** — US-pattern (BS + MD); high FMGE pass rate; 100% English; large Indian community.
- Highlights: 6 yrs (1 yr BS + 5 yrs MD) · English 100% · NMC approved · NEET required · USMLE/PLAB/NEXT prep support · high FMGE pass rate (>50%).
- Universities: AMA School of Medicine; Davao Medical School Foundation (DMSF); University of Perpetual Help System Dalta; Bicol Christian College of Medicine; UV Gullas College of Medicine; Our Lady of Fatima University.
- Fees (INR/yr): Tuition (BS+MD) ₹3.5–6.5L · Hostel & food ₹1–1.5L · **Total ₹4.5–8L**.
- Eligibility: 50% PCB in 12th (40% SC/ST/OBC) · NEET qualified · passport · medical fitness · photos · admission letter.
- Why: English-speaking · US MD curriculum · strong clinical rotations · USMLE/FMGE prep · similar climate/food · deep training · Indian community.
- Why OTP: expert counselling & comparisons · transparent fees · visa & docs · pre-departure & travel · accommodation/food setup · academic mentorship · FMGE/NEXT/USMLE coaching tie-ups.

**Uzbekistan** — international-standard; English-taught; NMC/WHO-approved; low cost.
- Highlights: 5 yrs (internship incl.) · English · NEET required · WHO & NMC approved · low tuition/living · Indian food & hostel · safe.
- Universities: Tashkent Medical Academy; Samarkand State Medical University; Andijan State Medical Institute; Bukhara State Medical Institute; Fergana Medical Institute of Public Health; Urgench Branch of TMA.
- Fees (INR/yr): Tuition ₹2.2–3.5L · Hostel & food ₹70K–1.2L · **Total ₹3–4.7L**.
- Eligibility: 50% in 10+2 PCB · NEET qualified · passport · health certificate · photos · admission letter.
- Why: internationally accepted (FMGE/NEXT/USMLE/PLAB) · qualified faculty · modern hospitals · English-medium · cultural comfort · Indian food · growing Indian community.
- Why OTP: end-to-end counselling & docs · personalized recommendations · visa & travel · accommodation & insurance · direct university coordination · pre/post support · FMGE/NEXT coaching tie-ups.

**Kyrgyzstan** — globally recognized; 100% English; very affordable; strong Indian community.
- Highlights: 5 yrs · English · NMC & WHO approved · NEET mandatory (qualifying) · low cost · no donation/capitation · Indian mess & hostel.
- Universities: Osh State University; Jalal-Abad State University; Kyrgyz State Medical Academy (KSMA); International School of Medicine (ISM), Bishkek; Asian Medical Institute; Ala-Too International University.
- Fees (INR/yr): Tuition ₹2–3.5L · Hostel & food ₹70K–1.2L · **Total ₹3–4.7L**.
- Eligibility: 50% PCB in 12th · NEET qualified · passport · photos · medical fitness · admission letter.
- Why: valid worldwide (NEXT/USMLE/PLAB) · English-medium · affordable · simple admission, no entrance test · Indian food/hostel · strong Indian network · high FMGE pass rate.
- Why OTP: verified tie-ups · 100% transparent · personalized counselling & docs · affordable packages · regular parent updates · Indian rep in Kyrgyzstan · NEXT/FMGE guidance throughout.

### 5.2 Study-abroad destinations (non-MBBS variant)

**Netherlands** — innovative teaching; 2,100+ English programs; central Europe.
- Universities: TU Delft; University of Amsterdam; TU Eindhoven; Leiden; Utrecht; Erasmus Rotterdam; Wageningen; Maastricht.
- Popular courses: Engineering & Tech · Business & Management · CS & IT · Environmental Science · Health & Life Sciences · Social Sciences.
- Costs (EUR/yr): Tuition €6,000–15,000 · Living €10,000–12,000 · Health insurance €500–700 · Books €500–1,000.
- Admission: 12th for bachelor's / bachelor's for master's · IELTS 6.0 / TOEFL 80 · some portfolios/interviews.
- Visa: MVV (provisional residence permit) + VVR (residence permit) for >90 days; docs: passport, admission proof, financial proof, health insurance, TB test if applicable; ~60 days processing.
- Post-study: Orientation Year (Zoekjaar) visa — up to 12 months, any sector, transition to highly-skilled-migrant visa.
- Scholarships: Holland Scholarship (€5,000 yr 1) · Orange Tulip (via Nuffic Neso India) · Erasmus Mundus · university-specific.

**Sweden** — innovation, sustainability, research-led.
- Universities: Karolinska Institutet; Lund; Uppsala; Stockholm University; Chalmers.
- Popular courses: Engineering & Tech · CS & IT · Business & Management · Environmental Studies · Life Sciences & Medicine · Social Sciences.
- Costs (SEK/yr): Tuition 80,000–140,000 · Living 96,000–120,000 · Health insurance included in tuition · Books 7,500–10,000 (1 SEK ≈ 7.5 INR).
- Admission: 12th / bachelor's · IELTS 6.5 / TOEFL 90 · some portfolios/interviews.
- Visa: Residence Permit for Studies (>90 days); financial means min SEK 8,694/month; first tuition installment; ~2–3 months.
- Post-study: 6-month residence permit to seek work / start a business.
- Scholarships: Swedish Institute Scholarships · university-specific · Erasmus+.

**Spain** — rich culture, affordable, vibrant lifestyle.
- Universities: University of Barcelona; Autonomous University of Madrid; Pompeu Fabra; University of Valencia; University of Granada.
- Popular courses: Business & Management · Engineering & Tech · CS & IT · Hospitality & Tourism · Arts & Humanities · Health & Life Sciences.
- Costs (EUR/yr): Tuition €1,000–3,500 (public) / €5,000–20,000 (private) · Living €8,000–12,000 · Health insurance €500–800 · Books €500–1,000.
- Admission: 12th / bachelor's · IELTS 6.0 / TOEFL 80 · some portfolios/interviews.
- Visa: Student Visa (Type D, >90 days); docs: passport, acceptance letter, financial means, health insurance, medical certificate, police clearance; ~4–8 weeks.
- Post-study: Job Search Visa — up to 12 months, any sector, transition to work visa.
- Scholarships: Spanish Government Scholarships · Erasmus+ · university-specific · Inlaks Foundation (private).

**Germany (study-abroad)** — tuition-free public universities, strong job market.
- Universities: TU Munich (TUM); LMU Munich; Heidelberg; Humboldt Berlin; RWTH Aachen; University of Freiburg.
- Popular courses: Engineering (Mech/Elec/Civil) · CS & IT · Business & Management · Natural Sciences · Medicine & Health Sciences · Architecture & Design.
- Costs (EUR/mo): Tuition €0–1,500 (public) · Living €850–1,200 · Health insurance €80–100 · Books €50–100.
- Admission: 12th / bachelor's · English: IELTS 6.0 / TOEFL 80; German programs: TestDaF or DSH.
- Visa: National Visa (D-Visa); docs: passport, acceptance letter, blocked account (€11,208), health insurance, transcripts, language proof; ~6–12 weeks.
- Post-study: 18-month residence permit to seek employment.
- Scholarships: DAAD · Erasmus+ · university-specific.
- Note: Germany appears both as a study-abroad destination and (separately) as the Medical PG destination — link the two pages.

**UK** — 160+ universities, 65,000+ courses; shorter degrees; Graduate Route.
- Universities: Oxford; Cambridge; Imperial College London; UCL; Edinburgh; Manchester; King's College London; LSE.
- Popular courses: Business & Management · Engineering & Tech · CS & IT · Law · Medicine & Health Sciences · Social Sciences · Arts & Humanities.
- Costs (GBP/yr): Tuition £10,000–38,000 · Living £9,000–12,000 · Health surcharge £470/yr · Books £500–1,000.
- Admission: 12th / bachelor's · IELTS 6.0 / TOEFL 80 · some portfolios/interviews.
- Visa: Tier 4 (General) Student Visa; docs: passport, CAS, financial means, TB test, English proof; ~3 weeks.
- Post-study: Graduate Route — up to 2 years (3 for PhD).
- Scholarships: Chevening · Commonwealth · university-specific.

Every country/study-abroad page ends with the standard "Why OnTurningPoint" block (personalized counseling · application assistance · visa guidance · pre-departure briefing · post-arrival support) + admissions-open-2025–2026 CTA + contact block.

---

## 6. Legal pages (build as-is, with placeholders fixed)

- **Privacy Policy:** full text as provided (GDPR/CCPA/PIPEDA/CalOPPA). Replace the "(Insert official email address)" placeholder with **onturningpoint@gmail.com**.
- **Terms & Conditions:** full text as provided. Replace "[Your Country]" (governing law / jurisdiction, appears twice) with **India** (and courts in **Andhra Pradesh**) unless the client says otherwise — flag as a TODO for legal review.
- **Cookie Policy:** full text as provided, including the browser cookie-control instructions and the "All About Cookies" reference.

All three end with the standard contact block (§1).

---

## 7. Global elements

- **CTA (single, repeated):** "Book a free consultation" → scrolls to / links to `/contact`. Secondary CTAs use text/ghost style, never a second bright color.
- **Contact block component** (address, 3 phones as tel: links, email as mailto:, hours) reused on every page footer/CTA band.
- **Trust signals:** NMC/WHO/MCI/USMLE recognition, transparency, 24/7 support, Indian mentors abroad, FMGE/NEXT prep.
- **Accessibility:** semantic landmarks, visible focus states, alt text, 4.5:1 contrast (verify the dark-brown-on-lavender and muted-grey combos), keyboard-navigable menus/accordions, `prefers-reduced-motion`.
- **SEO:** unique title/description per page; keywords like "MBBS abroad 2025-2026", "study MBBS in Russia/Georgia/…", "overseas education consultancy Nellore"; JSON-LD `LocalBusiness` + `FAQPage` on MBBS page.

---

## 8. Content-file plan (so copy stays editable)

```
/content
  company.ts        mission, aim, vision, about, team, contact, hours
  home.ts           hero, stats, section blurbs
  mbbs.ts           why, destinations preview, steps, faqs
  services.ts       benefits[], offers[], whyOTP[]
  loan.ts           benefits[], includes[], eligibility[], documents[], countries[]
  valueAdded.ts     grouped service lists
  certification.ts  programs[], courses[], features[]
  medicalPG.ts      why[], eligibility[], process[], specializations[], postResidency[]
  internship.ts     why[], offerings[], features[], benefits[]
  placements.ts     network[], support[], successStories[], postPlacement[]
  countries.ts      typed array — one object per destination (see §5)
  legal.ts          privacy, terms, cookies (long strings / MDX)
```

---

## 9. Definition of done

- All pages in §3 build and render with the real copy from §4–§6.
- Design matches §2 (Swiss/editorial, pastel, airy, pill buttons, 32px cards, subtle motion).
- Raw white logo consumed from `/logo/logo.svg`, recolored to espresso-brown primary on white,
  web-ready versions output to `/public/logo/` and referenced in nav/footer/metadata; light+dark
  variants auto-derived; temporary wordmark fallback + TODO in place until the real file lands.
- Site is white-forward (white background; blue/lavender only as soft section accents).
- Curated stock photos (Unsplash/Pexels, commercial-free) downloaded into `/public/images/` and
  used in all §2.7 slots via next/image with alt text — hero, all 11 country pages, key sections,
  About/team (swappable placeholder headshots + TODO). No hotlinked/random stock URLs.
- Country pages all render from one template + `countries.ts`.
- Contact form validates and posts to `/api/contact` stub.
- `npm run build` passes clean (types + lint).
- design-critique + accessibility-review passes run; findings fixed; short change report provided.
- README explains: how to run, where to edit content, how to swap the logo, how to change colors.
