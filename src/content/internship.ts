/** Internship Training — BRIEF.md §4.9. */

export const internship = {
  hero: {
    eyebrow: 'Internship training',
    headline: 'Where coursework',
    headlineAccent: 'meets the real thing',
    intro: 'Bridging academia and industry with real-world experience.',
    image: '/images/internship.jpg',
    imageAlt: 'Young professionals collaborating around laptops during an internship',
  },

  why: [
    { title: 'Practical exposure', body: 'Work on the tools and problems the industry actually uses.' },
    { title: 'Skill enhancement', body: 'Turn theory into something you can demonstrate.' },
    { title: 'Professional networking', body: 'Build contacts before you need them.' },
    { title: 'Career clarity', body: 'Find out what the work is really like before you commit.' },
    { title: 'Resume building', body: 'Certified, verifiable experience on your CV.' },
  ],

  offerings: [
    {
      title: 'Big Data',
      body: 'HDFS, Hive, Sqoop, Spark, Python, Scala and NoSQL.',
    },
    { title: 'Software Development', body: 'Full-stack fundamentals and version-controlled team workflow.' },
    { title: 'Data Science & Analytics', body: 'Statistics, modelling, visualisation and reporting.' },
    { title: 'Cloud Computing', body: 'AWS and Azure infrastructure, deployment and operations.' },
    { title: 'Cybersecurity', body: 'Security fundamentals, threat analysis and defensive practice.' },
  ],

  offeringsNote: 'All programmes are available online and offline.',

  features: [
    'Internship certificate',
    'Project completion certificate',
    'Inplant training (IPT) certificate',
    'Training library access',
    'Resume building',
    'Placement guidance',
    'Mock interviews',
    'Personalized career counseling',
    'Technical support',
  ],

  benefits: [
    { title: 'Real-world experience', body: 'Shipping work under real constraints and deadlines.' },
    { title: 'Skill development', body: 'Depth in a stack rather than a survey of many.' },
    { title: 'Networking', body: 'Mentors and peers who stay useful after the programme.' },
    { title: 'Career advancement', body: 'A credible starting point for your first role.' },
    { title: 'Academic credit', body: 'Certificates accepted for college internship requirements.' },
  ],
} as const;
