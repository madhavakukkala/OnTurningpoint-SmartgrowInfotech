/** Home page copy — BRIEF.md §4.2. */

export const home = {
  hero: {
    /** Display heading is split so the second word can take the italic serif accent. */
    headline: 'Study MBBS',
    headlineAccent: 'abroad',
    subhead:
      'Expert, transparent, end-to-end guidance for MBBS and study-abroad — from choosing the right university to settling in.',
    /** Second paragraph, added so the hero carries substance without imagery. */
    body: 'A medical seat abroad is reachable on marks most students already have, at a fraction of private-college fees in India. We tell you honestly what your profile can reach, then handle the university, the paperwork, the visa and the landing.',
    /** Inline trust row under the actions. Every item is verifiable — no counts. */
    highlights: ['NMC & WHO approved', '11 destinations', 'Fees from ₹3L a year', 'NEET-based admission'],
    footnote:
      'Fees, recognition status and timelines confirmed in writing before you commit. No capitation, no donation.',
    /** Unused since the hero became type-only; kept in case imagery returns. */
    image: '/images/hero.jpg',
    imageAlt: 'A student walking through a bright university campus',
  },

  /**
   * Trust strip metrics.
   * TODO(client): confirm these four figures before launch — they are currently
   * placeholders and appear prominently on the homepage.
   */
  stats: [
    { value: '10+', label: 'Years guiding students' },
    { value: '1,000+', label: 'Students counselled' },
    { value: '50+', label: 'Partner universities' },
    { value: '11', label: 'Destination countries' },
  ],

  whyAbroad: {
    eyebrow: 'Why MBBS abroad',
    heading: 'A medical degree',
    headingAccent: 'within reach',
    items: [
      {
        title: 'Affordable & competitive fees',
        body: 'Total costs from ₹3 lakh a year — a fraction of private medical college fees in India, with no capitation or donation.',
      },
      {
        title: 'Globally recognized',
        body: 'Universities approved by WHO and the NMC, with degrees accepted for FMGE, NEXT, USMLE and PLAB.',
      },
      {
        title: 'High-quality education',
        body: 'Modern simulation labs, government teaching hospitals and clinical exposure from the early years.',
      },
      {
        title: 'PG opportunities',
        body: 'Clear pathways into MD/MS abroad — including structured, paid residency in Germany.',
      },
    ],
  },

  destinations: {
    eyebrow: 'Destinations',
    heading: 'Eleven countries,',
    headingAccent: 'one honest shortlist',
    body: 'We match you to a destination by your marks, your budget and where you want to practise — not by whichever university pays the highest commission.',
  },

  services: {
    eyebrow: 'What we do',
    heading: 'Support that does not stop',
    headingAccent: 'at the admission letter',
    items: [
      { title: 'Admissions', body: 'University selection, applications and documentation.', href: '/services' },
      { title: 'Education loans', body: 'Up to 100% funding through banks and NBFCs.', href: '/education-loan' },
      { title: 'Value added services', body: 'SOP, LOR, coaching, forex, insurance and travel.', href: '/value-added-services' },
      { title: 'Certification training', body: 'Microsoft, AWS, Oracle, IABAC and Cloudera.', href: '/certification-training' },
      { title: 'Medical PG in Germany', body: 'Paid residency, no tuition fees, PR pathway.', href: '/medical-pg-germany' },
      { title: 'Internship training', body: 'Big data, cloud, cybersecurity and data science.', href: '/internship' },
      { title: 'Placements', body: 'Career counselling, interview prep and a global network.', href: '/placements' },
    ],
  },

  whyUs: {
    eyebrow: 'Why OnTurningPoint',
    heading: 'Ambition, meet',
    headingAccent: 'opportunity',
    items: [
      { title: 'Expert guidance', body: 'Counselors who have placed students in every destination we recommend.' },
      { title: 'Seamless process', body: 'One team owns your file from first call to first day of class.' },
      { title: 'Affordability', body: 'Transparent, written costs — and loan support to cover them.' },
      { title: 'Post-admission support', body: 'Accommodation, cultural adjustment and academic mentoring.' },
      { title: '24/7 support', body: 'Reachable when it matters — including for parents back home.' },
    ],
  },

  cta: {
    heading: 'Your turning point',
    headingAccent: 'starts with a conversation',
    body: 'Tell us your marks, your budget and where you want to practise. We will tell you honestly what is possible — free, with no obligation.',
  },
} as const;
