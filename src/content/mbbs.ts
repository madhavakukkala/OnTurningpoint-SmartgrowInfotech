/** MBBS Abroad pillar page — BRIEF.md §4.3. */

/**
 * A trending destination. `href` is optional — only the destinations that have a
 * dedicated country page link out. Declared explicitly so the optional property
 * survives `as const`, which would otherwise produce a union where `href` only
 * exists on some members.
 */
export type TrendingDestination = {
  country: string;
  universities: readonly string[];
  note: string;
  href?: string;
};

/** Declared separately from `mbbs` so the annotation applies despite `as const`. */
const trendingDestinations: TrendingDestination[] = [
  {
    country: 'Russia',
    universities: [
      'Kazan State Medical University',
      'Saint Petersburg State Medical University',
      'Crimea Federal University',
    ],
    note: 'Affordable fees, high quality, MCI recognition and English-medium programmes.',
    href: '/countries/russia',
  },
  {
    country: 'China',
    universities: [
      'Zhejiang University',
      'Shandong University',
      'Beijing University of Chinese Medicine',
    ],
    note: 'Affordable, top-tier and globally recognized, with strong clinical experience.',
  },
  {
    country: 'Ukraine',
    universities: [
      'Kyiv Medical University',
      'Odessa National Medical University',
      'Kharkiv National Medical University',
    ],
    note: 'Affordable, 100% English-medium and mostly MCI-recognized.',
  },
  {
    country: 'Philippines',
    universities: [
      'University of the Philippines',
      'University of Santo Tomas',
      'University of Cebu',
    ],
    note: 'A Western-standard system whose graduates are eligible for screening exams.',
    href: '/countries/philippines',
  },
  {
    country: 'Europe (Germany, Poland and more)',
    universities: ['Heidelberg University (Germany)', 'Medical University of Gdańsk (Poland)'],
    note: 'English-taught programmes, with free or low-cost options in Germany.',
    href: '/countries/germany',
  },
];

export const mbbs = {
  hero: {
    eyebrow: 'MBBS Abroad 2025–2026',
    headline: 'Embark on your',
    headlineAccent: 'medical journey',
    intro:
      'Expert guidance and support to study MBBS in Russia, China, Ukraine, the Philippines or Europe for 2025–2026.',
    image: '/images/mbbs.jpg',
    imageAlt: 'Medical students working together in a bright university laboratory',
  },

  whyChoose: [
    {
      title: 'Affordable & competitive fees',
      body: 'Tuition and living costs well below private medical colleges in India.',
    },
    {
      title: 'Recognized global qualifications',
      body: 'Degrees recognized by WHO, MCI and accepted for USMLE.',
    },
    {
      title: 'High-quality education & research',
      body: 'Strong medical curricula backed by active research programmes.',
    },
    {
      title: 'Postgraduate opportunities',
      body: 'Clear routes into MD and MS programmes after graduation.',
    },
  ],

  /** Trending destinations 2025–2026, verbatim from BRIEF §4.3. */
  destinations: trendingDestinations,

  benefits: [
    { title: 'Higher acceptance rate', body: 'More seats and simpler entry criteria than the Indian private system.' },
    { title: 'Global exposure', body: 'Study alongside students and patients from across the world.' },
    { title: 'Advanced learning methods', body: 'Simulation labs, early clinical rotations and research-led teaching.' },
  ],

  /**
   * The six-step admission process.
   * `image` is used by the "How it works" card layout on the homepage; the
   * FeatureGrid rendering on this page ignores it.
   */
  steps: [
    {
      title: 'Initial consultation',
      body: 'We review your marks, NEET score, budget and long-term goal.',
      image: '/images/services.jpg',
      imageAlt: 'A counsellor and a student talking through options together',
    },
    {
      title: 'University selection',
      body: 'A shortlist matched to your profile — with recognition status in writing.',
      image: '/images/mbbs.jpg',
      imageAlt: 'A medical university laboratory',
    },
    {
      title: 'Application submission',
      body: 'We prepare and submit your application and supporting documents.',
      image: '/images/loan.jpg',
      imageAlt: 'Application paperwork laid out on a desk',
    },
    {
      title: 'Visa processing',
      body: 'Invitation letter, embassy appointment and document checks.',
      image: '/images/about-office.jpg',
      imageAlt: 'A bright office where applications are prepared',
    },
    {
      title: 'Pre-departure support',
      body: 'Travel, forex, insurance and a full briefing before you fly.',
      image: '/images/value-added.jpg',
      imageAlt: 'A packed suitcase ready for departure',
    },
    {
      title: 'Post-arrival assistance',
      body: 'Airport pickup, accommodation, registration and ongoing support.',
      image: '/images/internship.jpg',
      imageAlt: 'Students settling in together after arriving abroad',
    },
  ],

  whyOTP: [
    { title: 'Expert guidance', body: 'Counselors with first-hand knowledge of every destination we recommend.' },
    { title: 'Seamless process', body: 'One team owns your file end to end — nothing gets handed off and lost.' },
    { title: 'Affordability', body: 'Transparent costs, and education-loan assistance to fund them.' },
    {
      title: 'Post-admission support',
      body: 'Accommodation, cultural adjustment and 24/7 support once you are there.',
    },
  ],

  faqs: [
    {
      q: 'How long is an MBBS abroad?',
      a: 'Typically 5–6 years, depending on the university and country. Some programmes include the internship year within that duration.',
    },
    {
      q: 'Are entrance exams required?',
      a: 'Some countries require them and some do not. We provide guidance on the exact requirement for each university and country.',
    },
    {
      q: 'Can I practise in India afterwards?',
      a: 'Yes. You will need to appear for the MCI Screening Test — the FMGE, now transitioning to NEXT.',
    },
    {
      q: 'Are scholarships available?',
      a: 'Many universities offer scholarships for international students. OnTurningPoint helps you explore and apply for the ones you qualify for.',
    },
  ],
} as const;
