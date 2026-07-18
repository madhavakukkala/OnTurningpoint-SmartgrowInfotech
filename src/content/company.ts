/**
 * Company foundation — BRIEF.md §1 + §4.1.
 * Reused site-wide (footer, contact block, about page, JSON-LD schema).
 * FACTS: do not change phone, email, or address without client sign-off.
 */

export const company = {
  name: 'OnTurningPoint',
  legalName: 'OnTurningPoint Overseas Education',
  alsoKnownAs: ['On Turning Point', 'OTP'],
  tagline: 'Overseas education consultancy',
  description:
    'Overseas-education consultancy in Nellore, Andhra Pradesh — expert, transparent, end-to-end guidance for MBBS abroad, study abroad, certification and placements.',
  primaryCta: 'Book a free consultation',
} as const;

export const contact = {
  address: {
    line1: 'Nellore Branch, near Ramalingapuram',
    line2: 'Under Railway bridge, behind Punjabi Family Dhaba',
    city: 'SPSR Nellore (Dist)',
    region: 'Andhra Pradesh',
    postalCode: '524003',
    country: 'India',
  },
  /** Full address as one line — used in schema.org markup and the footer. */
  addressOneLine:
    'Nellore Branch, near Ramalingapuram, under Railway bridge, behind Punjabi Family Dhaba, SPSR Nellore (Dist), Andhra Pradesh — 524003',
  phones: ['8500470231', '8500471231', '8500450231'],
  email: 'onturningpoint@gmail.com',
  hours: {
    weekdays: 'Monday – Saturday, 10:00 AM – 7:00 PM',
    sunday: 'Sunday closed',
  },
} as const;

/** Normalises a display phone number into a `tel:` href (India country code). */
export function telHref(phone: string) {
  return `tel:+91${phone.replace(/\D/g, '')}`;
}

export const foundation = {
  mission:
    'Empower students with the right guidance and resources to achieve their dream of quality education abroad. We are committed to making global education accessible, transparent, and hassle-free — the bridge that connects ambition with opportunity, through personalized counseling, honest advice, and end-to-end support.',
  aim: 'Simplify studying abroad with expert guidance, transparent processes, and trustworthy support at every step — a stress-free journey from choosing the right university to securing admissions and settling abroad.',
  vision:
    'A future where every student, regardless of background, has access to world-class education without barriers. We aspire to be a globally trusted name guiding thousands of students toward successful international careers through ethical practices, expert advice, and heartfelt support.',
  about:
    'OnTurningPoint is more than an overseas-education consultancy — it is a trusted partner in building a brighter future. With experienced counselors and a strong network of reputed universities worldwide, we specialize in helping students pursue MBBS and other professional courses abroad. Studying overseas is a major turning point in life; every student’s dream is handled with care, precision, and a personalized approach — from career counseling and university selection to admission assistance, visa support, and beyond.',
} as const;

export type TeamMember = {
  name: string;
  role: string;
  /** TODO(client): replace these placeholder headshots with real team photos. */
  image: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: 'Prem Kumar J',
    role: 'Founder / Director',
    image: '/images/team-1.jpg',
    bio: 'Founded OnTurningPoint to make studying abroad transparent and reachable for students from Nellore and beyond.',
  },
  {
    name: 'P. Enoch',
    role: 'CEO',
    image: '/images/team-2.jpg',
    bio: 'Leads university partnerships and keeps every admission pathway honest, documented and on schedule.',
  },
  {
    name: 'Rahelamma J',
    role: 'Career Counselor & Application Executive',
    image: '/images/team-3.jpg',
    bio: 'Guides students through course selection, applications and documentation from first call to boarding pass.',
  },
  {
    name: 'Chaitanya Royal',
    role: 'Digital Marketing Executive',
    image: '/images/team-4.jpg',
    bio: 'Shares student stories and keeps families informed about destinations, deadlines and admissions news.',
  },
];

export const values = [
  {
    title: 'Ethical',
    body: 'No capitation, no inflated promises. If a university is not the right fit for you, we say so.',
  },
  {
    title: 'Transparent',
    body: 'Fees, timelines and recognition status are laid out in writing before you commit to anything.',
  },
  {
    title: 'Personalized',
    body: 'Every student gets a plan built around their marks, budget and long-term career goal.',
  },
];

/** The standard "Why OnTurningPoint" block that closes most pages (BRIEF §5). */
export const whyOTPStandard = [
  'Personalized counseling',
  'Application assistance',
  'Visa guidance',
  'Pre-departure briefing',
  'Post-arrival support',
];
