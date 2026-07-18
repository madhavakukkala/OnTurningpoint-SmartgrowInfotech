/**
 * "What you're guaranteed" — the credentials block that occupies the social-proof
 * slot on the homepage in place of testimonials.
 *
 * Every item here restates a commitment already made elsewhere in BRIEF.md
 * (recognition bodies, transparency, no capitation, end-to-end support). None of
 * it is a new promise, and none of it is a claim about volume, ranking or
 * outcomes that the client has not substantiated.
 *
 * Before adding an item: if it cannot be pointed back to something the client
 * has actually committed to in writing, it does not belong here — this section
 * is the one a parent will read most carefully.
 */

export type Assurance = { title: string; body: string };

export const assurancesIntro = {
  eyebrow: 'What you’re guaranteed',
  heading: 'The things we put',
  headingAccent: 'in writing',
  body: 'No verbal promises, no numbers we cannot show you. Everything below is confirmed before you pay anything.',
};

export const assurances: Assurance[] = [
  {
    title: 'Recognition confirmed in writing',
    body: 'NMC and WHO approval status for every university we shortlist — checked and given to you in writing before you apply, not after.',
  },
  {
    title: 'Fees itemised, no capitation',
    body: 'Tuition, hostel and food broken out separately, in rupees, for the full duration. We do not take donation or capitation, and neither do the universities we work with.',
  },
  {
    title: 'One counsellor, start to finish',
    body: 'The same person owns your file from the first consultation to your first week on campus. Nothing gets handed to a different desk halfway through.',
  },
  {
    title: 'Licensing exams accounted for',
    body: 'We only recommend programmes whose graduates are eligible for FMGE and NEXT, and we tell you exactly what each destination requires to practise in India.',
  },
  {
    title: 'Support after you land',
    body: 'Airport pickup, accommodation and local registration are arranged before you fly, with an Indian point of contact on the ground in several destinations.',
  },
  {
    title: 'Your family stays informed',
    body: 'Parents get progress updates through the admission and visa process, and can reach us directly on any of our three numbers, Monday to Saturday.',
  },
];
