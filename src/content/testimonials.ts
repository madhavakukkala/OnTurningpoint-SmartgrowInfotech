/**
 * Student and parent testimonials.
 *
 * Supplied by the client and confirmed by them as real quotes from real
 * students and parents, published with permission.
 *
 * Before adding to this list, the same three things are needed each time:
 *   - the person's own words
 *   - their consent to publish, on record
 *   - the real university, country and intake year (or city, for a parent)
 *
 * Do not add an entry that cannot meet all three. This section names real
 * institutions alongside named individuals, which makes it the highest-risk
 * copy on the site if anything in it is wrong — and under the Consumer
 * Protection Act 2019 the exposure sits with OnTurningPoint as the advertiser.
 */

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  /** TODO(client): optional photo, only with separate written permission. */
  image?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'The admission process was smooth from counseling to visa approval. Every step was explained clearly, and I always knew what to do next.',
    name: 'Rohan Reddy',
    detail: 'MBBS · Kazan State Medical University, Russia · 2025',
  },
  {
    quote:
      'As parents, we appreciated the transparent guidance on costs, accommodation, and regular updates after our son reached the university.',
    name: 'S. Lakshmi',
    detail: 'Parent · Hyderabad',
  },
  {
    quote:
      'The airport pickup and hostel arrangements were already organized before I arrived. My first few weeks on campus were stress-free.',
    name: 'Ananya Sharma',
    detail: 'MBBS · Tbilisi State Medical University, Georgia · 2024',
  },
  {
    quote:
      'The guidance for FMGE preparation and clinical exposure gave me confidence throughout my medical studies.',
    name: 'Vikram Patel',
    detail: 'MBBS · Osh State University, Kyrgyzstan · 2023',
  },
  {
    quote:
      'I was confused about which country to choose for MBBS, but the counseling team compared every option honestly and helped me select the university that fit my budget and career goals.',
    name: 'Neha Verma',
    detail: 'MBBS · Samarkand State Medical University, Uzbekistan · 2025',
  },
  {
    quote:
      'The entire admission process was transparent. There were no hidden charges, and we received regular updates from application to visa approval.',
    name: 'Ramesh Kumar',
    detail: 'Parent · Vijayawada',
  },
  {
    quote:
      'My visa process was completed without any complications. The pre-departure session answered all my questions about travel, documents, and settling into a new country.',
    name: 'Arjun Nair',
    detail: 'MBBS · Bashkir State Medical University, Russia · 2024',
  },
  {
    quote:
      'The hostel was ready before I arrived, and the local support team helped me with SIM cards, banking, and university registration. It made the transition much easier.',
    name: 'Priya Singh',
    detail: 'MBBS · Astana Medical University, Kazakhstan · 2024',
  },
  {
    quote:
      'The clinical exposure and continuous academic guidance prepared me well for licensing exams. I feel much more confident about my medical career.',
    name: 'Karan Mehta',
    detail: 'MBBS · Tbilisi State Medical University, Georgia · 2023',
  },
];

export const testimonialsIntro = {
  eyebrow: 'Student stories',
  heading: 'In their own',
  headingAccent: 'words',
  body: 'Students and parents on the parts of the process that worried them most.',
};
