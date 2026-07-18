/** Value Added Services — BRIEF.md §4.6. */

export const valueAdded = {
  hero: {
    eyebrow: 'Value added services',
    headline: 'Beyond the',
    headlineAccent: 'admission letter',
    intro:
      'End-to-end support that continues long after your seat is confirmed — documentation, coaching, travel, money and the first weeks on the ground.',
    image: '/images/value-added.jpg',
    imageAlt: 'An open suitcase packed with travel essentials before departure',
  },

  commitments: [
    { title: 'Credentialed admissions', body: 'Only recognized, verified institutions make it onto your shortlist.' },
    { title: 'Zero college fees options', body: 'Including tuition-free public universities in Germany.' },
    { title: 'Best-fit college & course', body: 'Matched to your profile and goal, not to a commission structure.' },
  ],

  groups: [
    {
      title: 'Academic & admission support',
      items: [
        'Personalized college assessment',
        'Super-selective college admission',
        'Expertly curated college list',
        'Academic selection guidance',
        'Monthly intensive support',
      ],
    },
    {
      title: 'Documentation',
      items: ['SOP writing & review', 'LOR writing & review', 'CV writing & review'],
    },
    {
      title: 'Language & test coaching',
      items: ['German language coaching', 'IELTS, TOEFL, PTE, GRE and GMAT coaching'],
    },
    {
      title: 'Visa & financial',
      items: ['Visa assistance', 'Scholarship assistance & follow-up', 'FOREX card services'],
    },
    {
      title: 'Pre-departure & post-arrival',
      items: [
        'Accommodation arrangement',
        'Flight bookings',
        'Airport pickup & drop',
        'Travel & health insurance',
        'Indian food assistance',
      ],
    },
  ],

  whyOTP: [
    { title: 'Holistic approach', body: 'Every part of the journey handled by one team, in one plan.' },
    { title: 'Expert team', body: 'Counselors, documentation specialists and language trainers in house.' },
    { title: 'Proven track record', body: 'Students supported across eleven destinations.' },
    { title: 'Personalized attention', body: 'Your file is never a template.' },
  ],
} as const;
