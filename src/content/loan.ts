/** Education Loan Assistance — BRIEF.md §4.5. */

export const loan = {
  hero: {
    eyebrow: 'Education loan assistance',
    headline: 'Fund the degree,',
    headlineAccent: 'not the stress',
    intro:
      'End-to-end education-loan assistance to fund your overseas medical education smoothly. We collaborate with leading nationalized and private banks, NBFCs and financial institutions.',
    image: '/images/loan.jpg',
    imageAlt: 'Education loan paperwork with a pen and calculator on a desk',
  },

  benefits: [
    { title: '100% funding', body: 'Covering tuition and living expenses, subject to lender approval.' },
    {
      title: 'Secured & unsecured options',
      body: 'Unsecured loans up to ₹75 lakhs in select cases, with no collateral required.',
    },
    { title: 'Fast approval', body: 'Applications tracked and followed up so decisions do not stall.' },
    {
      title: 'Lower interest rates',
      body: 'From as low as around 9.5% p.a., depending on the lender and your profile.',
    },
    {
      title: 'Moratorium period',
      body: 'Repayment begins after your course and internship are complete.',
    },
    {
      title: 'All countries & universities',
      body: 'Russia, Georgia, the Philippines, Uzbekistan, Europe and more.',
    },
  ],

  includes: [
    {
      title: 'Loan eligibility assessment',
      body: 'We check your and your co-applicant’s profile against each lender’s criteria before you apply.',
    },
    {
      title: 'Documentation support',
      body: 'Admission letter, fee structure, income and ID proofs, and collateral papers where applicable.',
    },
    {
      title: 'Bank tie-ups',
      body: 'SBI, Bank of Baroda, HDFC Credila, ICICI Bank, Avanse, Auxilo and more.',
    },
    { title: 'Application follow-up', body: 'We chase the file through sanction so nothing sits idle.' },
    { title: 'Disbursement assistance', body: 'Coordinating transfer of funds to the university on schedule.' },
  ],

  eligibility: [
    'Indian citizen',
    'Confirmed admission to a recognized foreign MBBS programme',
    'A co-applicant (parent or guardian) with steady income',
    'Collateral for secured loans, where applicable',
  ],

  documents: [
    'University admission letter',
    'Academic certificates — 10th, 12th and NEET',
    'Passport and visa copy',
    'Co-applicant income proof — ITR or salary slips',
    'Six months of bank statements',
    'Collateral papers, if applying for a secured loan',
    'Passport-size photographs',
  ],

  countries: [
    'Russia',
    'Georgia',
    'Kazakhstan',
    'Kyrgyzstan',
    'Philippines',
    'Uzbekistan',
    'Armenia',
    'and more',
  ],

  lenders: [
    'SBI',
    'Bank of Baroda',
    'HDFC Credila',
    'ICICI Bank',
    'Avanse',
    'Auxilo',
  ],

  note: 'Loan counselling is available Monday to Saturday, 10 AM to 7 PM.',
} as const;
