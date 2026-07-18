/** Placements — BRIEF.md §4.10. */

export const placements = {
  hero: {
    eyebrow: 'Placements',
    headline: 'From graduation',
    headlineAccent: 'to a contract',
    intro: 'Bridging academic learning and professional employment worldwide.',
    image: '/images/placements.jpg',
    imageAlt: 'A bright open-plan workplace with professionals at their desks',
  },

  network: [
    { title: 'Multinational corporations', body: 'Established employers hiring across engineering, IT and finance.' },
    { title: 'Startups & SMEs', body: 'Fast-moving teams where graduates take on scope early.' },
    { title: 'Research institutions', body: 'Assistantships and funded research positions.' },
    { title: 'Healthcare facilities', body: 'Hospitals and clinics recruiting internationally qualified staff.' },
    { title: 'Educational institutions', body: 'Teaching and academic support roles.' },
  ],

  support: [
    { title: 'Personalized career counseling', body: 'Mapping your qualification to the roles that actually hire it.' },
    { title: 'Resume & cover letter', body: 'Written to the conventions of the country you are applying in.' },
    { title: 'Interview preparation', body: 'Mock interviews with structured feedback.' },
    { title: 'Job-search strategies', body: 'Where to look, when to apply and how to follow up.' },
    { title: 'Networking', body: 'Introductions into our employer and alumni network.' },
  ],

  /** Example placement outcomes by market — BRIEF §4.10. */
  successStories: [
    { country: 'Germany', body: 'Engineering roles in automotive and manufacturing.' },
    { country: 'United Kingdom', body: 'Finance and IT positions in London.' },
    { country: 'Canada', body: 'Healthcare roles across provincial health systems.' },
    { country: 'Australia', body: 'Teaching positions in schools and colleges.' },
    { country: 'USA', body: 'Research assistantships at universities and institutes.' },
  ],

  postPlacement: [
    { title: 'Workplace integration', body: 'Support through the first months in a new working culture.' },
    { title: 'Career-progression guidance', body: 'Planning the step after the first role.' },
    { title: 'Alumni network access', body: 'A community of OnTurningPoint graduates already in the market.' },
  ],
} as const;
