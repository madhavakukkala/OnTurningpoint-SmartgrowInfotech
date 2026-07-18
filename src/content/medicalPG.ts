/** Medical PG in Germany — BRIEF.md §4.8. */

export const medicalPG = {
  hero: {
    eyebrow: 'Medical PG in Germany',
    headline: 'Specialise in Germany,',
    headlineAccent: 'and get paid to do it',
    intro:
      'Germany offers world-class healthcare, a structured residency (Facharztweiterbildung) and a strong emphasis on research — with no tuition fees at most public universities.',
    image: '/images/medical-pg.jpg',
    imageAlt: 'A German city skyline at golden hour',
  },

  why: [
    { title: 'No tuition fees', body: 'At most public universities — you earn while you specialise.' },
    { title: 'Structured residency', body: 'Facharztweiterbildung runs 4–6 years with a defined curriculum.' },
    { title: 'Stipends of €2,300–€4,500 / month', body: 'A full salary throughout your residency years.' },
    { title: 'Global recognition', body: 'A German specialist qualification is respected worldwide.' },
    { title: 'Pathway to permanent residency', body: 'Residency years count toward long-term settlement.' },
  ],

  eligibility: [
    'MBBS from a recognized institution',
    'Valid MCI / NMC registration',
    'German language at B2 or C1 level — Fachsprachprüfung is required in some states',
    'Kenntnisprüfung (clinical knowledge test) for non-EU doctors',
  ],

  process: [
    {
      title: 'Language preparation',
      body: 'A1 and A2 in India, then B1 and B2 in Germany, followed by medical German.',
    },
    { title: 'Document verification', body: 'Degree, registration and transcripts verified and translated.' },
    { title: 'Observership', body: 'Clinical observation in a German hospital to build familiarity and contacts.' },
    {
      title: 'Licensing exams',
      body: 'Fachsprachprüfung (medical language) followed by the Kenntnisprüfung.',
    },
    { title: 'Residency application', body: 'Applying to hospitals for a Facharztweiterbildung position.' },
  ],

  specializations: [
    'Internal Medicine',
    'Surgery',
    'Pediatrics',
    'Radiology',
    'Anesthesiology',
    'Neurology',
    'Psychiatry',
    'Orthopedics',
  ],

  postResidency: [
    { title: 'Practise independently', body: 'Full licence (Approbation) to practise as a specialist.' },
    { title: 'Subspecialize', body: 'Continue into a narrower fellowship within your field.' },
    { title: 'EU-wide opportunities', body: 'A German qualification is recognized across the European Union.' },
  ],

  whyOTP: [
    { title: 'Comprehensive guidance', body: 'From your first German class to your residency contract.' },
    { title: 'Experienced counselors', body: 'Familiar with state-by-state licensing differences.' },
    { title: 'Personalized assistance', body: 'A plan matched to your specialisation and timeline.' },
    { title: 'Post-arrival support', body: 'Accommodation, registration and settling in once you land.' },
  ],
} as const;
