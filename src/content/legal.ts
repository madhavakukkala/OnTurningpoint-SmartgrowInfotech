/**
 * Legal pages — BRIEF.md §6.
 *
 * ⚠️ TODO(legal review): BRIEF.md references "full text as provided" for all three
 * policies but does not include that text. The copy below is a complete, standard
 * policy set covering the regimes named in the brief (GDPR, CCPA, PIPEDA, CalOPPA)
 * and is written to be accurate for this site as built. It has NOT been reviewed by
 * a lawyer. Replace each section with the client's own approved wording before launch.
 *
 * Placeholders already resolved per BRIEF §6:
 *   "(Insert official email address)" -> onturningpoint@gmail.com
 *   "[Your Country]"                  -> India (courts in Andhra Pradesh)
 */
import { contact } from './company';

export type LegalSection = { heading: string; body: string[]; list?: string[] };
export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  /** TODO(client): update when the policies are next revised. */
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const LAST_UPDATED = '1 January 2026';

export const privacyPolicy: LegalDoc = {
  slug: 'privacy-policy',
  title: 'Privacy Policy',
  description:
    'How OnTurningPoint collects, uses, stores and protects the personal information of students and visitors.',
  updated: LAST_UPDATED,
  intro:
    'OnTurningPoint respects your privacy. This policy explains what personal information we collect when you use our website or our counselling services, why we collect it, how we protect it, and the rights you have over it.',
  sections: [
    {
      heading: 'Information we collect',
      body: [
        'We only collect information that we need in order to advise you and to process an application on your behalf.',
      ],
      list: [
        'Contact details you submit through our enquiry form — name, email address, phone number and your message.',
        'Academic and application information you share with us during counselling, such as marks, NEET scores and passport details.',
        'Technical information collected automatically, such as your IP address, browser type and the pages you visit.',
      ],
    },
    {
      heading: 'How we use your information',
      body: ['Your information is used for the following purposes and no others.'],
      list: [
        'Responding to your enquiry and providing counselling.',
        'Preparing and submitting university applications, visa applications and loan applications on your instruction.',
        'Keeping you and your guardians informed about the progress of your application.',
        'Improving our website and services.',
      ],
    },
    {
      heading: 'Sharing your information',
      body: [
        'We share your information only with the universities, embassies, banks and service providers required to process the application you have asked us to pursue, and only to the extent necessary. We do not sell your personal information to anyone, and we do not share it for advertising purposes.',
        'We may disclose information where we are required to do so by law.',
      ],
    },
    {
      heading: 'Data retention',
      body: [
        'We keep your information for as long as needed to provide our services and to meet our legal and record-keeping obligations. When it is no longer needed, it is securely deleted.',
      ],
    },
    {
      heading: 'Security',
      body: [
        'We apply reasonable administrative, technical and physical safeguards to protect your information. No method of transmission over the internet is entirely secure, so we cannot guarantee absolute security.',
      ],
    },
    {
      heading: 'Your rights',
      body: [
        'Depending on where you live, you may have rights under the GDPR, the CCPA, PIPEDA and CalOPPA. These typically include the following.',
      ],
      list: [
        'The right to access the personal information we hold about you.',
        'The right to have inaccurate information corrected.',
        'The right to request deletion of your information.',
        'The right to object to or restrict certain processing.',
        'The right to withdraw consent at any time.',
        'The right not to be discriminated against for exercising any of these rights.',
      ],
    },
    {
      heading: "Children's privacy",
      body: [
        'Our services are directed at prospective students and their guardians. We do not knowingly collect information from children under 13. If you believe a child has provided us with personal information, contact us and we will delete it.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'We may update this policy from time to time. The date at the top of this page shows when it was last revised.',
      ],
    },
    {
      heading: 'Contact us',
      body: [
        `To exercise any of your rights, or to ask a question about this policy, email us at ${contact.email} or write to us at ${contact.addressOneLine}.`,
      ],
    },
  ],
};

export const termsAndConditions: LegalDoc = {
  slug: 'terms',
  title: 'Terms & Conditions',
  description:
    'The terms that govern your use of the OnTurningPoint website and our overseas-education consultancy services.',
  updated: LAST_UPDATED,
  intro:
    'These terms govern your use of the OnTurningPoint website and our consultancy services. By using this website or engaging our services, you agree to them.',
  sections: [
    {
      heading: 'Use of this website',
      body: [
        'You may use this website for lawful purposes only. You must not use it in any way that damages it, disrupts access for others, or breaches any applicable law.',
      ],
    },
    {
      heading: 'Our services',
      body: [
        'OnTurningPoint provides counselling, application assistance, visa guidance, loan assistance and related support services. We act as an adviser and facilitator.',
        'We do not guarantee admission to any university, the grant of any visa, the approval of any loan, or any employment outcome. Those decisions rest entirely with the universities, embassies, lenders and employers concerned.',
      ],
    },
    {
      heading: 'Accuracy of information',
      body: [
        'Fees, course durations, recognition status, eligibility criteria and visa requirements shown on this website are provided for general guidance and are subject to change by the institutions and authorities that set them. We make reasonable efforts to keep this information current, but you should confirm the details that apply to you before making a decision.',
      ],
    },
    {
      heading: 'Your responsibilities',
      body: ['To let us act for you effectively, you agree to the following.'],
      list: [
        'Provide accurate, complete and truthful information and documents.',
        'Meet the deadlines we communicate to you.',
        'Pay any university, embassy, examination or third-party fees directly and on time.',
        'Comply with the laws and visa conditions of your destination country.',
      ],
    },
    {
      heading: 'Fees and payments',
      body: [
        'Our service fees, and what they cover, are agreed with you in writing before we begin work. Third-party fees — university tuition, application fees, visa fees, examination fees and travel costs — are separate and are payable directly to the relevant organisation.',
      ],
    },
    {
      heading: 'Intellectual property',
      body: [
        'All content on this website, including text, design, graphics and logos, belongs to OnTurningPoint and may not be reproduced without our written permission.',
      ],
    },
    {
      heading: 'Limitation of liability',
      body: [
        'To the fullest extent permitted by law, OnTurningPoint is not liable for indirect or consequential loss arising from your use of this website or our services, or from any decision taken by a university, embassy, lender or employer.',
      ],
    },
    {
      heading: 'Governing law',
      body: [
        // TODO(legal review): confirm jurisdiction with the client before launch.
        'These terms are governed by the laws of India. Any dispute arising from them is subject to the exclusive jurisdiction of the courts of Andhra Pradesh, India.',
      ],
    },
    {
      heading: 'Contact us',
      body: [
        `If you have a question about these terms, email us at ${contact.email} or write to us at ${contact.addressOneLine}.`,
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  slug: 'cookie-policy',
  title: 'Cookie Policy',
  description: 'What cookies this website uses, why they are used, and how you can control them.',
  updated: LAST_UPDATED,
  intro:
    'This policy explains what cookies are, how this website uses them, and how you can control them in your browser.',
  sections: [
    {
      heading: 'What cookies are',
      body: [
        'Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, to remember your preferences, and to provide information to the site owner about how the site is used.',
      ],
    },
    {
      heading: 'How we use cookies',
      body: ['This website uses a small number of cookies, in the following categories.'],
      list: [
        'Essential cookies, which are required for the site to function and cannot be switched off.',
        'Preference cookies, which remember choices you have made, such as your language.',
        'Analytics cookies, which help us understand which pages are useful so we can improve them.',
      ],
    },
    {
      heading: 'Controlling cookies',
      body: [
        'You can control and delete cookies through your browser settings. Most browsers let you view what cookies are stored, delete them individually or all at once, block them from particular sites, block all third-party cookies, or clear all cookies when you close the browser.',
        'Please note that if you block or delete cookies, some parts of this website may not work as expected.',
        'You can find detailed, browser-by-browser instructions on the independent guide "All About Cookies" at allaboutcookies.org.',
      ],
    },
    {
      heading: 'Third-party cookies',
      body: [
        'Some cookies may be set by third-party services used on this site, such as analytics providers or embedded maps. We do not control these cookies; please refer to the relevant provider’s own policy.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'We may update this policy as our use of cookies changes. The date at the top of this page shows when it was last revised.',
      ],
    },
    {
      heading: 'Contact us',
      body: [
        `If you have a question about our use of cookies, email us at ${contact.email} or write to us at ${contact.addressOneLine}.`,
      ],
    },
  ],
};

export const legalDocs = [privacyPolicy, termsAndConditions, cookiePolicy];
