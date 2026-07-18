/** Services — Benefits & What We Offer. BRIEF.md §4.4. */

export const services = {
  hero: {
    eyebrow: 'Services',
    headline: 'Everything between',
    headlineAccent: 'here and there',
    intro:
      'From the first counselling session to your first day on campus — and every form, fee and flight in between.',
    image: '/images/services.jpg',
    imageAlt: 'A counsellor and a student reviewing application documents together',
  },

  benefits: [
    { title: 'Affordable education', body: 'Total costs from ₹3 lakh a year, with no capitation or donation.' },
    { title: 'Globally recognized degrees', body: 'Recognition by MCI, WHO and eligibility for USMLE.' },
    { title: 'No entrance exams', body: 'Most universities admit on 10+2 marks and NEET qualification alone.' },
    { title: 'English-medium instruction', body: 'Full programmes taught in English — no language barrier.' },
    { title: 'World-class infrastructure', body: 'Modern campuses, simulation labs and active research units.' },
    { title: 'Multicultural environment', body: 'Study alongside students from across the world.' },
    { title: 'Post-graduation opportunities', body: 'Routes into MD, MS and residency programmes abroad.' },
    { title: 'High acceptance rate', body: 'Far more accessible than the Indian private medical system.' },
    { title: 'Affordable living', body: 'Hostel and food costs from ₹70,000 a year in several destinations.' },
  ],

  offers: [
    { title: 'Expert consultation & guidance', body: 'An honest assessment of what your profile can realistically reach.' },
    { title: 'University & programme selection', body: 'A shortlist built around your marks, budget and where you want to practise.' },
    { title: 'Application & documentation assistance', body: 'Forms, transcripts, attestation and translations, handled correctly the first time.' },
    { title: 'Visa assistance', body: 'Invitation letters, embassy appointments and document verification.' },
    { title: 'Pre-departure support', body: 'A full briefing on travel, money, weather, culture and what to pack.' },
    { title: 'Accommodation & travel assistance', body: 'Flights, hostel booking and airport pickup arranged before you fly.' },
    { title: 'Post-arrival services', body: 'Registration, local documentation and settling in during the first weeks.' },
    { title: 'Continuous support', body: 'A point of contact for you and your parents throughout the course.' },
    { title: 'Internship & clinical support', body: 'Guidance through clinical rotations and internship placement.' },
    { title: 'Post-graduation career counselling', body: 'Licensing exams, PG options and job placement after you qualify.' },
  ],

  whyOTP: [
    { title: 'Proven track record', body: 'Students placed and supported across every destination we recommend.' },
    { title: 'Trusted university network', body: 'Direct relationships with recognized institutions — not agent chains.' },
    { title: 'Customized approach', body: 'No template plans. Your shortlist is built for your profile.' },
    { title: '24/7 support', body: 'Reachable when it matters, including for families back home.' },
  ],
} as const;
