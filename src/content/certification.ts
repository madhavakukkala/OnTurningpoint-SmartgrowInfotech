/** Professional Certification Training — BRIEF.md §4.7. */

export const certification = {
  hero: {
    eyebrow: 'Professional certification training',
    headline: 'Certify what',
    headlineAccent: 'you can already do',
    intro: 'Industry-recognized certification training to stay ahead in the job market.',
    image: '/images/certification.jpg',
    imageAlt: 'A student taking an online certification course on a laptop',
  },

  programs: [
    { title: 'Microsoft', body: 'Azure fundamentals through administrator-level certification.' },
    { title: 'Oracle', body: 'Database and SQL/PLSQL certification tracks.' },
    { title: 'AWS', body: 'Solution architect and cloud data engineering paths.' },
    { title: 'IABAC', body: 'Data science and business analytics certification.' },
    { title: 'Cloudera', body: 'Big data certification across Hadoop and Spark.' },
  ],

  courses: [
    'AZ-900 — Azure Fundamentals',
    'AZ-104 — Azure Administrator',
    'AWS Solution Architect',
    'AWS Cloud Data Engineer',
    'Oracle SQL / PLSQL',
    'Selenium',
    'Salesforce Admin',
  ],

  features: [
    { title: 'Expert instructors', body: 'Trainers working in the field they teach.' },
    { title: 'Flexible online learning', body: 'Sessions that fit around college or work.' },
    { title: 'Hands-on projects', body: 'Build something real, not just pass a quiz.' },
    { title: 'Certification guidance', body: 'Exam booking, preparation and practice tests.' },
    { title: 'Career support', body: 'Placement assistance once you are certified.' },
  ],

  whyOTP: [
    { title: 'Personalized learning paths', body: 'Built around the role you are aiming for.' },
    { title: 'Comprehensive resources', body: 'Recordings, labs and a training library you keep access to.' },
    { title: 'Community engagement', body: 'Learn alongside a cohort, not alone in a video player.' },
    { title: 'Continuous updates', body: 'Course content revised as vendor exams change.' },
  ],
} as const;
