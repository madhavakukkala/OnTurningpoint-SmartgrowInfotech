/**
 * Destination data — BRIEF.md §5.
 *
 * Every country page at /countries/[slug] renders from this array via one shared
 * template. To add a destination, append an object here and drop a matching
 * photo at /public/images/country-<slug>.jpg — no new page file is needed.
 *
 * FACTS: universities, fees and eligibility come verbatim from the brief.
 * Do not edit them without client sign-off.
 */

export type FeeRow = {
  label: string;
  amount: string;
  /** Renders the row emphasised — used for the "Total" line. */
  emphasis?: boolean;
};

type CountryBase = {
  slug: string;
  name: string;
  /** Short label used on cards and in the nav dropdown. */
  cardBlurb: string;
  image: string;
  imageAlt: string;
  /** One-paragraph overview shown in the page hero. */
  overview: string;
  highlights: string[];
  universities: string[];
  whyStudy: string[];
  whyOTP: string[];
  seo: { title: string; description: string };
};

export type MbbsCountry = CountryBase & {
  kind: 'mbbs';
  /** Annual cost breakdown in INR. */
  fees: FeeRow[];
  feesNote?: string;
  eligibility: string[];
};

export type StudyCountry = CountryBase & {
  kind: 'study';
  courses: string[];
  /** Annual cost breakdown in the local currency. */
  costs: FeeRow[];
  costsNote?: string;
  admission: string[];
  visa: { name: string; summary: string; documents: string[]; processing: string };
  postStudyWork: string;
  scholarships: string[];
};

export type Country = MbbsCountry | StudyCountry;

export const countries: Country[] = [
  /* ------------------------------------------------------------------ */
  /* MBBS destinations (BRIEF §5.1)                                      */
  /* ------------------------------------------------------------------ */
  {
    kind: 'mbbs',
    slug: 'russia',
    name: 'Russia',
    cardBlurb: '30+ NMC-approved universities, strong clinical training.',
    image: '/images/country-russia.jpg',
    imageAlt: 'Historic architecture and open city square in Russia',
    overview:
      'Russia hosts 30+ NMC-approved medical universities known for strong academics, modern clinical practice and a research-oriented approach. It remains one of the most established and affordable routes to an MBBS for Indian students.',
    highlights: [
      '6 years including internship',
      'English / bilingual medium',
      'NEET mandatory',
      'NMC & WHO approved',
      'Globally accepted degree',
      'Indian mess and hostel available',
      'Clinical training in government hospitals',
    ],
    universities: [
      'Crimea Federal University',
      'Kazan State Medical University',
      'First Moscow State Medical University',
      'Bashkir State Medical University',
      'Volgograd State Medical University',
      'Orenburg State Medical University',
      'RUDN (People’s Friendship University of Russia)',
    ],
    fees: [
      { label: 'Tuition', amount: '₹2.5 – 5 lakh / year' },
      { label: 'Hostel & food', amount: '₹1 – 1.5 lakh / year' },
      { label: 'Total', amount: '₹3.5 – 6.5 lakh / year', emphasis: true },
    ],
    feesNote: 'English-medium programmes may cost slightly more.',
    eligibility: [
      '50% in 10+2 with Physics, Chemistry and Biology (40% for reserved categories)',
      'NEET qualification is mandatory',
      'Valid passport and passport-size photographs',
      'University admission letter',
      'Health certificate',
    ],
    whyStudy: [
      'Globally recognized — eligible for NEXT, FMGE and USMLE',
      'Affordable tuition compared with private Indian colleges',
      'Advanced infrastructure and simulation labs',
      'Universities with high global rankings',
      'English-medium programmes available',
      'Indian food and cultural support on campus',
      'Climate adaptability and a strong Indian student community',
    ],
    whyOTP: [
      'Direct university partnerships',
      'Transparent admission and visa process',
      'Help selecting genuine English-medium programmes',
      'Indian mentors based in Russia',
      'Pre-departure and post-arrival support',
      'Accommodation, food and academic support',
      'NEXT / FMGE-focused guidance',
    ],
    seo: {
      title: 'MBBS in Russia 2025-26 | Fees, Universities & Admission',
      description:
        'Study MBBS in Russia with OnTurningPoint. NMC & WHO approved universities, ₹3.5–6.5 lakh per year, English-medium options and full visa support.',
    },
  },
  {
    kind: 'mbbs',
    slug: 'georgia',
    name: 'Georgia',
    cardBlurb: 'English-medium, NMC/WHO recognised, globally accepted.',
    image: '/images/country-georgia.jpg',
    imageAlt: 'Old town rooftops and hills in Tbilisi, Georgia',
    overview:
      'Georgia has become a favourite for Indian medical aspirants — NMC and WHO recognised universities, fully English-medium teaching, no entrance test beyond NEET, and degrees accepted for FMGE, USMLE and PLAB.',
    highlights: [
      '6 years duration',
      'English medium',
      'NMC & WHO approved',
      'NEET required (qualifying)',
      'No additional entrance test',
      'FMGE / USMLE / PLAB recognition',
      'Affordable overall cost',
    ],
    universities: [
      'Tbilisi State Medical University',
      'Batumi Shota Rustaveli State University',
      'Ivane Javakhishvili Tbilisi State University',
      'University of Georgia',
      'Georgian American University',
      'European University, Tbilisi',
    ],
    fees: [
      { label: 'Tuition', amount: '₹3 – 5 lakh / year' },
      { label: 'Hostel & food', amount: '₹70,000 – 1.2 lakh / year' },
      { label: 'Total', amount: '₹3.7 – 6.2 lakh / year', emphasis: true },
    ],
    eligibility: [
      '50% in 10+2 with Physics, Chemistry and Biology',
      'NEET qualification is mandatory',
      'Valid passport and passport-size photographs',
      'Health certificate',
      'University admission letter',
    ],
    whyStudy: [
      'Eligible for FMGE, NEXT, USMLE and PLAB',
      'Affordable tuition and living costs',
      'Well-equipped teaching facilities',
      'Fully English-medium instruction',
      'Safe and friendly for international students',
      'Comfortable climate and cultural fit',
      'Direct admission — no capitation fee',
      'Indian food and an established Indian community',
    ],
    whyOTP: [
      'Expert university selection',
      '100% transparent process',
      'Full visa assistance',
      'Pre-departure and post-arrival support',
      'Indian mentors based in Georgia',
      'FMGE / NEXT preparation support',
    ],
    seo: {
      title: 'MBBS in Georgia 2025-26 | Fees, Universities & Admission',
      description:
        'MBBS in Georgia with OnTurningPoint — NMC & WHO approved, English-medium, ₹3.7–6.2 lakh per year, no entrance test beyond NEET.',
    },
  },
  {
    kind: 'mbbs',
    slug: 'kazakhstan',
    name: 'Kazakhstan',
    cardBlurb: 'Government universities, 5-year course, strong FMGE record.',
    image: '/images/country-kazakhstan.jpg',
    imageAlt: 'Modern skyline and wide boulevards in Kazakhstan',
    overview:
      'Kazakhstan offers government medical universities with English-medium teaching, a shorter five-year course, a high FMGE pass rate and a cost of living close to India — a strong value option for Indian students.',
    highlights: [
      '5 years duration',
      'English medium',
      'NMC & WHO approved',
      'NEET required',
      'No donation or capitation fee',
      'Affordable tuition and living',
      'FMGE / NEXT coaching available',
    ],
    universities: [
      'Kazakh National Medical University (Almaty)',
      'Astana Medical University',
      'Karaganda State Medical University',
      'South Kazakhstan Medical Academy',
      'Semey State Medical University',
      'West Kazakhstan Marat Ospanov State Medical University',
    ],
    fees: [
      { label: 'Tuition', amount: '₹2.5 – 4 lakh / year' },
      { label: 'Hostel & food', amount: '₹80,000 – 1.2 lakh / year' },
      { label: 'Total', amount: '₹3.5 – 5.2 lakh / year', emphasis: true },
    ],
    eligibility: [
      '50% in 10+2 with Physics, Chemistry and Biology',
      'NEET qualified',
      'Valid passport',
      'Medical fitness certificate',
      'Passport-size photographs',
      'Admission / invitation letter',
    ],
    whyStudy: [
      'Shorter five-year course',
      'Low cost with a high return on investment',
      'English-medium teaching',
      'Government universities with modern infrastructure',
      'Good FMGE performance among graduates',
      'Indian mess and hostel facilities',
      'Globally recognized — USMLE, PLAB and NEXT eligible',
    ],
    whyOTP: [
      'A trusted partner from first call to graduation',
      'University selection based on your budget and goal',
      '100% transparent process',
      'Full documentation and visa handling',
      'Travel, forex and insurance support',
      'Post-arrival support on the ground',
      'Academic guidance through to course completion',
    ],
    seo: {
      title: 'MBBS in Kazakhstan 2025-26 | Fees & Universities',
      description:
        'MBBS in Kazakhstan with OnTurningPoint — government universities, 5-year English-medium course, ₹3.5–5.2 lakh per year, no capitation.',
    },
  },
  {
    kind: 'mbbs',
    slug: 'philippines',
    name: 'Philippines',
    cardBlurb: 'US-pattern BS + MD, 100% English, high FMGE pass rate.',
    image: '/images/country-philippines.jpg',
    imageAlt: 'Coastline and palm trees in the Philippines',
    overview:
      'The Philippines follows the US medical pattern — a one-year BS followed by a four-to-five-year MD. Teaching is entirely in English, clinical rotations are strong, and the country records a high FMGE pass rate among Indian graduates.',
    highlights: [
      '6 years (1 year BS + 5 years MD)',
      '100% English medium',
      'NMC approved',
      'NEET required',
      'USMLE / PLAB / NEXT preparation support',
      'High FMGE pass rate (above 50%)',
    ],
    universities: [
      'AMA School of Medicine',
      'Davao Medical School Foundation (DMSF)',
      'University of Perpetual Help System DALTA',
      'Bicol Christian College of Medicine',
      'UV Gullas College of Medicine',
      'Our Lady of Fatima University',
    ],
    fees: [
      { label: 'Tuition (BS + MD)', amount: '₹3.5 – 6.5 lakh / year' },
      { label: 'Hostel & food', amount: '₹1 – 1.5 lakh / year' },
      { label: 'Total', amount: '₹4.5 – 8 lakh / year', emphasis: true },
    ],
    eligibility: [
      '50% in 12th with Physics, Chemistry and Biology (40% for SC/ST/OBC)',
      'NEET qualified',
      'Valid passport',
      'Medical fitness certificate',
      'Passport-size photographs',
      'Admission letter',
    ],
    whyStudy: [
      'An English-speaking country — no language barrier',
      'US MD curriculum',
      'Strong clinical rotations',
      'Built-in USMLE and FMGE preparation',
      'Similar climate and food to India',
      'Deep, practice-heavy clinical training',
      'Large and settled Indian student community',
    ],
    whyOTP: [
      'Expert counselling and university comparisons',
      'Transparent fee structures',
      'Visa and documentation handling',
      'Pre-departure and travel support',
      'Accommodation and food setup on arrival',
      'Academic mentorship through the course',
      'FMGE / NEXT / USMLE coaching tie-ups',
    ],
    seo: {
      title: 'MBBS in Philippines 2025-26 | BS+MD Fees & Universities',
      description:
        'MBBS in the Philippines with OnTurningPoint — US-pattern BS+MD, 100% English, NMC approved, ₹4.5–8 lakh per year and a high FMGE pass rate.',
    },
  },
  {
    kind: 'mbbs',
    slug: 'uzbekistan',
    name: 'Uzbekistan',
    cardBlurb: 'Low-cost, English-taught, NMC/WHO approved.',
    image: '/images/country-uzbekistan.jpg',
    imageAlt: 'Tiled domes and historic architecture in Samarkand, Uzbekistan',
    overview:
      'Uzbekistan combines international-standard medical education with some of the lowest tuition and living costs available to Indian students. Programmes are English-taught and universities are NMC and WHO approved.',
    highlights: [
      '5 years including internship',
      'English medium',
      'NEET required',
      'WHO & NMC approved',
      'Low tuition and living costs',
      'Indian food and hostel available',
      'Safe environment for students',
    ],
    universities: [
      'Tashkent Medical Academy',
      'Samarkand State Medical University',
      'Andijan State Medical Institute',
      'Bukhara State Medical Institute',
      'Fergana Medical Institute of Public Health',
      'Urgench Branch of Tashkent Medical Academy',
    ],
    fees: [
      { label: 'Tuition', amount: '₹2.2 – 3.5 lakh / year' },
      { label: 'Hostel & food', amount: '₹70,000 – 1.2 lakh / year' },
      { label: 'Total', amount: '₹3 – 4.7 lakh / year', emphasis: true },
    ],
    eligibility: [
      '50% in 10+2 with Physics, Chemistry and Biology',
      'NEET qualified',
      'Valid passport',
      'Health certificate',
      'Passport-size photographs',
      'Admission letter',
    ],
    whyStudy: [
      'Internationally accepted — FMGE, NEXT, USMLE and PLAB',
      'Qualified faculty',
      'Modern teaching hospitals',
      'English-medium instruction',
      'Cultural comfort for Indian students',
      'Indian food available',
      'A growing Indian student community',
    ],
    whyOTP: [
      'End-to-end counselling and documentation',
      'Personalized university recommendations',
      'Visa and travel handling',
      'Accommodation and insurance arrangement',
      'Direct coordination with universities',
      'Pre-departure and post-arrival support',
      'FMGE / NEXT coaching tie-ups',
    ],
    seo: {
      title: 'MBBS in Uzbekistan 2025-26 | Fees & Universities',
      description:
        'MBBS in Uzbekistan with OnTurningPoint — WHO & NMC approved, English-taught, ₹3–4.7 lakh per year including hostel and food.',
    },
  },
  {
    kind: 'mbbs',
    slug: 'kyrgyzstan',
    name: 'Kyrgyzstan',
    cardBlurb: 'Very affordable, 100% English, strong Indian community.',
    image: '/images/country-kyrgyzstan.jpg',
    imageAlt: 'Mountain landscape and lake scenery in Kyrgyzstan',
    overview:
      'Kyrgyzstan offers globally recognized medical degrees at some of the lowest total costs available, taught entirely in English, with a large and well-established Indian student community.',
    highlights: [
      '5 years duration',
      'English medium',
      'NMC & WHO approved',
      'NEET mandatory (qualifying)',
      'Low overall cost',
      'No donation or capitation fee',
      'Indian mess and hostel available',
    ],
    universities: [
      'Osh State University',
      'Jalal-Abad State University',
      'Kyrgyz State Medical Academy (KSMA)',
      'International School of Medicine (ISM), Bishkek',
      'Asian Medical Institute',
      'Ala-Too International University',
    ],
    fees: [
      { label: 'Tuition', amount: '₹2 – 3.5 lakh / year' },
      { label: 'Hostel & food', amount: '₹70,000 – 1.2 lakh / year' },
      { label: 'Total', amount: '₹3 – 4.7 lakh / year', emphasis: true },
    ],
    eligibility: [
      '50% in 12th with Physics, Chemistry and Biology',
      'NEET qualified',
      'Valid passport',
      'Passport-size photographs',
      'Medical fitness certificate',
      'Admission letter',
    ],
    whyStudy: [
      'Degree valid worldwide — NEXT, USMLE and PLAB',
      'English-medium instruction',
      'Among the most affordable MBBS routes',
      'Simple admission with no entrance test',
      'Indian food and hostel facilities',
      'A strong Indian student network',
      'High FMGE pass rate',
    ],
    whyOTP: [
      'Verified university tie-ups only',
      '100% transparent costs',
      'Personalized counselling and documentation',
      'Affordable all-in packages',
      'Regular progress updates to parents',
      'An Indian representative in Kyrgyzstan',
      'NEXT / FMGE guidance throughout the course',
    ],
    seo: {
      title: 'MBBS in Kyrgyzstan 2025-26 | Fees & Universities',
      description:
        'MBBS in Kyrgyzstan with OnTurningPoint — NMC & WHO approved, 100% English, ₹3–4.7 lakh per year, no donation or capitation.',
    },
  },

  /* ------------------------------------------------------------------ */
  /* Study-abroad destinations (BRIEF §5.2)                              */
  /* ------------------------------------------------------------------ */
  {
    kind: 'study',
    slug: 'netherlands',
    name: 'Netherlands',
    cardBlurb: '2,100+ English-taught programmes in central Europe.',
    image: '/images/country-netherlands.jpg',
    imageAlt: 'Canal houses and bicycles in Amsterdam, the Netherlands',
    overview:
      'The Netherlands is known for innovative, discussion-led teaching and offers more than 2,100 English-taught programmes. Its central European location and one-year job-search visa make it a strong base for an international career.',
    highlights: [
      '2,100+ English-taught programmes',
      'Innovative, problem-based teaching',
      'Central European location',
      'Orientation Year visa after graduation',
    ],
    universities: [
      'TU Delft',
      'University of Amsterdam',
      'TU Eindhoven',
      'Leiden University',
      'Utrecht University',
      'Erasmus University Rotterdam',
      'Wageningen University',
      'Maastricht University',
    ],
    courses: [
      'Engineering & Technology',
      'Business & Management',
      'Computer Science & IT',
      'Environmental Science',
      'Health & Life Sciences',
      'Social Sciences',
    ],
    costs: [
      { label: 'Tuition', amount: '€6,000 – 15,000 / year' },
      { label: 'Living', amount: '€10,000 – 12,000 / year' },
      { label: 'Health insurance', amount: '€500 – 700 / year' },
      { label: 'Books & materials', amount: '€500 – 1,000 / year' },
    ],
    admission: [
      '12th standard for bachelor’s / a bachelor’s degree for master’s',
      'IELTS 6.0 or TOEFL 80',
      'Some programmes require a portfolio or interview',
    ],
    visa: {
      name: 'MVV + VVR',
      summary:
        'Stays longer than 90 days need an MVV (provisional residence permit) together with a VVR (residence permit).',
      documents: [
        'Valid passport',
        'Proof of admission',
        'Proof of sufficient funds',
        'Health insurance',
        'TB test where applicable',
      ],
      processing: 'Around 60 days',
    },
    postStudyWork:
      'The Orientation Year (Zoekjaar) visa allows up to 12 months to find work in any sector, and can transition into a highly-skilled-migrant visa.',
    scholarships: [
      'Holland Scholarship — €5,000 in the first year',
      'Orange Tulip Scholarship (via Nuffic Neso India)',
      'Erasmus Mundus',
      'University-specific scholarships',
    ],
    whyStudy: [
      'One of the widest ranges of English-taught degrees in Europe',
      'Teaching built around problem-solving and group work',
      'Strong graduate employability across the EU',
      'A 12-month post-study job-search visa',
    ],
    whyOTP: [
      'Course and university shortlisting matched to your profile',
      'SOP, LOR and CV support',
      'MVV and VVR application guidance',
      'Scholarship applications and follow-up',
      'Accommodation and pre-departure briefing',
    ],
    seo: {
      title: 'Study in the Netherlands | Universities, Costs & Visa',
      description:
        'Study in the Netherlands — 2,100+ English-taught programmes, €6,000–15,000 tuition, MVV/VVR visa support and Orientation Year guidance.',
    },
  },
  {
    kind: 'study',
    slug: 'sweden',
    name: 'Sweden',
    cardBlurb: 'Innovation, sustainability and research-led teaching.',
    image: '/images/country-sweden.jpg',
    imageAlt: 'Waterfront and colourful old town buildings in Stockholm, Sweden',
    overview:
      'Sweden is built around innovation, sustainability and research-led teaching. Students work independently, close to faculty, in a country with one of the strongest research outputs per capita in the world.',
    highlights: [
      'Research-led, independent study culture',
      'World leader in innovation and sustainability',
      'Health insurance included in tuition',
      '6-month post-study residence permit',
    ],
    universities: [
      'Karolinska Institutet',
      'Lund University',
      'Uppsala University',
      'Stockholm University',
      'Chalmers University of Technology',
    ],
    courses: [
      'Engineering & Technology',
      'Computer Science & IT',
      'Business & Management',
      'Environmental Studies',
      'Life Sciences & Medicine',
      'Social Sciences',
    ],
    costs: [
      { label: 'Tuition', amount: 'SEK 80,000 – 140,000 / year' },
      { label: 'Living', amount: 'SEK 96,000 – 120,000 / year' },
      { label: 'Health insurance', amount: 'Included in tuition' },
      { label: 'Books & materials', amount: 'SEK 7,500 – 10,000 / year' },
    ],
    costsNote: 'Approximate conversion: 1 SEK ≈ ₹7.5.',
    admission: [
      '12th standard for bachelor’s / a bachelor’s degree for master’s',
      'IELTS 6.5 or TOEFL 90',
      'Some programmes require a portfolio or interview',
    ],
    visa: {
      name: 'Residence Permit for Studies',
      summary: 'Required for any course longer than 90 days.',
      documents: [
        'Valid passport',
        'Proof of admission',
        'Proof of financial means — minimum SEK 8,694 per month',
        'Proof of the first tuition installment',
        'Health insurance where required',
      ],
      processing: 'Around 2–3 months',
    },
    postStudyWork:
      'A six-month residence permit is available after graduation to look for work or start a business.',
    scholarships: [
      'Swedish Institute Scholarships',
      'University-specific scholarships',
      'Erasmus+',
    ],
    whyStudy: [
      'Research-intensive universities with global reputations',
      'A flat, collaborative academic culture',
      'Strong links to tech, life sciences and clean energy industries',
      'Health insurance bundled into tuition',
    ],
    whyOTP: [
      'University and programme shortlisting',
      'Application, SOP and CV support',
      'Residence permit and financial-proof guidance',
      'Swedish Institute scholarship applications',
      'Accommodation and pre-departure briefing',
    ],
    seo: {
      title: 'Study in Sweden | Universities, Costs, Visa & Scholarships',
      description:
        'Study in Sweden with OnTurningPoint — Karolinska, Lund, Uppsala and more. Tuition, residence permit and Swedish Institute scholarship guidance.',
    },
  },
  {
    kind: 'study',
    slug: 'spain',
    name: 'Spain',
    cardBlurb: 'Affordable public universities and a vibrant lifestyle.',
    image: '/images/country-spain.jpg',
    imageAlt: 'Sunlit plaza and Spanish architecture in Barcelona, Spain',
    overview:
      'Spain pairs a rich culture and vibrant student lifestyle with some of the most affordable public-university tuition in Western Europe, plus a 12-month job-search visa after graduation.',
    highlights: [
      'Low public-university tuition',
      'Rich culture and student lifestyle',
      'Strong hospitality and business schools',
      '12-month Job Search Visa',
    ],
    universities: [
      'University of Barcelona',
      'Autonomous University of Madrid',
      'Pompeu Fabra University',
      'University of Valencia',
      'University of Granada',
    ],
    courses: [
      'Business & Management',
      'Engineering & Technology',
      'Computer Science & IT',
      'Hospitality & Tourism',
      'Arts & Humanities',
      'Health & Life Sciences',
    ],
    costs: [
      { label: 'Tuition (public)', amount: '€1,000 – 3,500 / year' },
      { label: 'Tuition (private)', amount: '€5,000 – 20,000 / year' },
      { label: 'Living', amount: '€8,000 – 12,000 / year' },
      { label: 'Health insurance', amount: '€500 – 800 / year' },
      { label: 'Books & materials', amount: '€500 – 1,000 / year' },
    ],
    admission: [
      '12th standard for bachelor’s / a bachelor’s degree for master’s',
      'IELTS 6.0 or TOEFL 80',
      'Some programmes require a portfolio or interview',
    ],
    visa: {
      name: 'Student Visa (Type D)',
      summary: 'Required for courses longer than 90 days.',
      documents: [
        'Valid passport',
        'Acceptance letter',
        'Proof of financial means',
        'Health insurance',
        'Medical certificate',
        'Police clearance certificate',
      ],
      processing: 'Around 4–8 weeks',
    },
    postStudyWork:
      'The Job Search Visa allows up to 12 months in any sector after graduation, and can transition into a work visa.',
    scholarships: [
      'Spanish Government Scholarships',
      'Erasmus+',
      'University-specific scholarships',
      'Inlaks Foundation (private)',
    ],
    whyStudy: [
      'Among the lowest tuition in Western Europe at public universities',
      'Well-regarded business and hospitality programmes',
      'Large international student community',
      'A 12-month job-search visa after graduation',
    ],
    whyOTP: [
      'Public vs private university cost comparisons',
      'Application and documentation support',
      'Type D visa guidance and document checklists',
      'Scholarship applications and follow-up',
      'Accommodation and pre-departure briefing',
    ],
    seo: {
      title: 'Study in Spain | Universities, Tuition, Visa & Scholarships',
      description:
        'Study in Spain with OnTurningPoint — public tuition from €1,000, Type D student visa support and a 12-month job search visa after graduation.',
    },
  },
  {
    kind: 'study',
    slug: 'germany',
    name: 'Germany',
    cardBlurb: 'Tuition-free public universities and a strong job market.',
    image: '/images/country-germany.jpg',
    imageAlt: 'Historic and modern buildings along a river in Germany',
    overview:
      'Germany combines tuition-free public universities with Europe’s strongest engineering job market and an 18-month post-study residence permit — one of the most generous graduate routes anywhere.',
    highlights: [
      'Tuition-free public universities',
      'Europe’s strongest engineering job market',
      '18-month post-study residence permit',
      'English and German-taught programmes',
    ],
    universities: [
      'Technical University of Munich (TUM)',
      'LMU Munich',
      'Heidelberg University',
      'Humboldt University of Berlin',
      'RWTH Aachen University',
      'University of Freiburg',
    ],
    courses: [
      'Engineering (Mechanical, Electrical, Civil)',
      'Computer Science & IT',
      'Business & Management',
      'Natural Sciences',
      'Medicine & Health Sciences',
      'Architecture & Design',
    ],
    costs: [
      { label: 'Tuition (public)', amount: '€0 – 1,500 / month' },
      { label: 'Living', amount: '€850 – 1,200 / month' },
      { label: 'Health insurance', amount: '€80 – 100 / month' },
      { label: 'Books & materials', amount: '€50 – 100 / month' },
    ],
    admission: [
      '12th standard for bachelor’s / a bachelor’s degree for master’s',
      'English-taught programmes: IELTS 6.0 or TOEFL 80',
      'German-taught programmes: TestDaF or DSH',
    ],
    visa: {
      name: 'National Visa (D-Visa)',
      summary: 'The standard long-stay student visa for degree programmes in Germany.',
      documents: [
        'Valid passport',
        'Acceptance letter',
        'Blocked account of €11,208',
        'Health insurance',
        'Academic transcripts',
        'Language proficiency proof',
      ],
      processing: 'Around 6–12 weeks',
    },
    postStudyWork:
      'Graduates receive an 18-month residence permit to seek employment in Germany.',
    scholarships: ['DAAD', 'Erasmus+', 'University-specific scholarships'],
    whyStudy: [
      'No tuition fees at most public universities',
      'World-leading engineering and applied sciences',
      'Strong industry links and paid internships',
      'An 18-month window to find work after graduating',
    ],
    whyOTP: [
      'Public university and blocked-account guidance',
      'German language coaching (A1 through B2)',
      'D-Visa documentation and appointment support',
      'DAAD and Erasmus+ scholarship applications',
      'Accommodation and pre-departure briefing',
    ],
    seo: {
      title: 'Study in Germany | Tuition-Free Universities & Visa Guide',
      description:
        'Study in Germany — tuition-free public universities, D-Visa and blocked account support, DAAD scholarships and an 18-month post-study permit.',
    },
  },
  {
    kind: 'study',
    slug: 'uk',
    name: 'United Kingdom',
    cardBlurb: '160+ universities, shorter degrees, Graduate Route visa.',
    image: '/images/country-uk.jpg',
    imageAlt: 'Riverside skyline and historic architecture in London, United Kingdom',
    overview:
      'The UK offers over 160 universities and 65,000+ courses, with shorter degrees than most countries — three-year bachelor’s and one-year master’s — plus the two-year Graduate Route visa after graduation.',
    highlights: [
      '160+ universities, 65,000+ courses',
      'Shorter degrees — 3-year bachelor’s, 1-year master’s',
      'Graduate Route: up to 2 years post-study',
      'Globally recognized qualifications',
    ],
    universities: [
      'University of Oxford',
      'University of Cambridge',
      'Imperial College London',
      'University College London (UCL)',
      'University of Edinburgh',
      'University of Manchester',
      'King’s College London',
      'London School of Economics (LSE)',
    ],
    courses: [
      'Business & Management',
      'Engineering & Technology',
      'Computer Science & IT',
      'Law',
      'Medicine & Health Sciences',
      'Social Sciences',
      'Arts & Humanities',
    ],
    costs: [
      { label: 'Tuition', amount: '£10,000 – 38,000 / year' },
      { label: 'Living', amount: '£9,000 – 12,000 / year' },
      { label: 'Immigration health surcharge', amount: '£470 / year' },
      { label: 'Books & materials', amount: '£500 – 1,000 / year' },
    ],
    admission: [
      '12th standard for bachelor’s / a bachelor’s degree for master’s',
      'IELTS 6.0 or TOEFL 80',
      'Some programmes require a portfolio or interview',
    ],
    visa: {
      name: 'Tier 4 (General) Student Visa',
      summary: 'The standard student route for degree-level study in the UK.',
      documents: [
        'Valid passport',
        'CAS (Confirmation of Acceptance for Studies)',
        'Proof of financial means',
        'TB test certificate',
        'English language proof',
      ],
      processing: 'Around 3 weeks',
    },
    postStudyWork:
      'The Graduate Route allows up to 2 years of work after graduation — 3 years for PhD graduates.',
    scholarships: [
      'Chevening Scholarships',
      'Commonwealth Scholarships',
      'University-specific scholarships',
    ],
    whyStudy: [
      'Shorter degrees mean lower total cost and faster entry to work',
      'Globally recognized universities and qualifications',
      'English-speaking with a large Indian student community',
      'Up to two years to work after graduating',
    ],
    whyOTP: [
      'University shortlisting across all 160+ institutions',
      'UCAS and direct application handling',
      'CAS, financial-proof and Tier 4 visa guidance',
      'Chevening and Commonwealth scholarship support',
      'Accommodation and pre-departure briefing',
    ],
    seo: {
      title: 'Study in the UK | Universities, Tuition, Visa & Graduate Route',
      description:
        'Study in the UK with OnTurningPoint — 160+ universities, Tier 4 visa support, Chevening scholarships and the 2-year Graduate Route.',
    },
  },
];

export const mbbsCountries = countries.filter((c): c is MbbsCountry => c.kind === 'mbbs');
export const studyCountries = countries.filter((c): c is StudyCountry => c.kind === 'study');

export function getCountry(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

/**
 * Germany appears twice on the site — as a study-abroad destination here and as
 * the Medical PG destination at /medical-pg-germany. The two pages cross-link.
 */
export const GERMANY_PG_HREF = '/medical-pg-germany';
