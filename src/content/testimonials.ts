/**
 * ⚠️ PLACEHOLDER CONTENT — MUST BE REPLACED BEFORE LAUNCH ⚠️
 *
 * BRIEF.md supplies no testimonials, and inventing student quotes for a real
 * consultancy would be fabricating reviews: prospective students and parents
 * make a serious financial decision partly on this section, and made-up praise
 * attributed to made-up students is straightforwardly deceptive. It may also
 * breach India's Consumer Protection Act 2019 provisions on misleading
 * advertising and endorsements.
 *
 * So the entries below are deliberately NOT realistic. They are visibly
 * unfinished so nobody can mistake them for genuine reviews if this ships by
 * accident. Replace every field with a real, permissioned quote.
 *
 * For each testimonial you need:
 *   - the student's own words, and their consent to publish
 *   - their real name (or an initial, if they prefer)
 *   - the university and country they actually attend
 *   - the intake year
 *
 * If real testimonials are not available yet, delete the <Testimonials />
 * block from src/app/page.tsx rather than shipping these.
 */

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  /** TODO(client): optional student photo, with written permission to use it. */
  image?: string;
};

export const testimonialsPlaceholder: Testimonial[] = [
  {
    quote: '[Replace with a real student quote — their own words, with permission to publish.]',
    name: '[Student name]',
    detail: '[Course] · [University], [Country] · [Year]',
  },
  {
    quote: '[Replace with a real student quote — their own words, with permission to publish.]',
    name: '[Student name]',
    detail: '[Course] · [University], [Country] · [Year]',
  },
  {
    quote: '[Replace with a real parent or student quote, with permission to publish.]',
    name: '[Name]',
    detail: '[Relationship] · [City]',
  },
];

/**
 * `false` — the homepage renders <Assurances /> in this slot instead.
 *
 * To bring testimonials back: fill in real, permissioned quotes above, then in
 * src/app/page.tsx swap <Assurances /> for
 *   <Testimonials items={testimonialsPlaceholder} />
 * (renaming the export once it holds real content). The component and its
 * markup are finished and ready.
 */
export const TESTIMONIALS_READY = false;

export const testimonialsIntro = {
  eyebrow: 'Student stories',
  heading: 'Where our students',
  headingAccent: 'ended up',
  body: 'Real students, real universities, real outcomes.',
};
