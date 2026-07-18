/**
 * Site navigation — BRIEF.md §3.
 * Nav is kept to 5 items + one CTA; the smaller service pages are grouped into
 * the "Services" mega-menu so the bar stays minimal.
 */
import { countries } from './countries';

export type NavLink = { label: string; href: string; description?: string };

export const serviceLinks: NavLink[] = [
  { label: 'All services', href: '/services', description: 'Benefits and everything we offer' },
  { label: 'Education loan', href: '/education-loan', description: 'Up to 100% funding through banks and NBFCs' },
  { label: 'Value added services', href: '/value-added-services', description: 'SOP, coaching, forex, travel and insurance' },
  { label: 'Certification training', href: '/certification-training', description: 'Microsoft, AWS, Oracle, IABAC, Cloudera' },
  { label: 'Medical PG in Germany', href: '/medical-pg-germany', description: 'Paid, structured residency with no tuition' },
  { label: 'Internship training', href: '/internship', description: 'Big data, cloud, cybersecurity, data science' },
  { label: 'Placements', href: '/placements', description: 'Career counselling and a global employer network' },
];

export const countryLinks: NavLink[] = [
  { label: 'All destinations', href: '/countries' },
  ...countries.map((c) => ({ label: c.name, href: `/countries/${c.slug}` })),
];

export const primaryNav: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Countries', href: '/countries' },
  { label: 'MBBS Abroad', href: '/mbbs-abroad' },
  { label: 'Contact', href: '/contact' },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: 'Study abroad',
    links: [
      { label: 'MBBS Abroad', href: '/mbbs-abroad' },
      { label: 'All destinations', href: '/countries' },
      { label: 'Medical PG in Germany', href: '/medical-pg-germany' },
      { label: 'Education loan', href: '/education-loan' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'All services', href: '/services' },
      { label: 'Value added services', href: '/value-added-services' },
      { label: 'Certification training', href: '/certification-training' },
      { label: 'Internship training', href: '/internship' },
      { label: 'Placements', href: '/placements' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy-policy' },
      { label: 'Terms & conditions', href: '/terms' },
      { label: 'Cookie policy', href: '/cookie-policy' },
    ],
  },
];
