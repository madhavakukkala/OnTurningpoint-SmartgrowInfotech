import type { Metadata } from 'next';
import { company, contact } from '@/content/company';

/**
 * TODO(client): set NEXT_PUBLIC_SITE_URL to the real production domain before
 * launch — it drives canonical URLs, Open Graph URLs and sitemap.xml.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onturningpoint.com').replace(
  /\/$/,
  ''
);

/** Builds per-page metadata with canonical + Open Graph, on top of the root defaults. */
export function pageMetadata({
  title,
  description,
  path,
  image = '/opengraph-image',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    // Absolute: the root layout's "%s | OnTurningPoint" template would push these
    // past the ~60 characters Google renders before truncating. Each page owns
    // its full title and includes the brand only where it earns the space.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: company.name,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: image, width: 1200, height: 630, alt: company.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/** JSON-LD LocalBusiness schema (BRIEF §7) — rendered once in the root layout. */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: company.name,
    alternateName: [...company.alsoKnownAs],
    description: company.description,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/logo.svg`,
    image: `${SITE_URL}/opengraph-image`,
    email: contact.email,
    telephone: contact.phones.map((p) => `+91${p}`),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${contact.address.line1}, ${contact.address.line2}`,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    areaServed: 'IN',
  };
}

/** FAQPage schema — used on the MBBS pillar page (BRIEF §7). */
export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Serialises schema for a <script type="application/ld+json"> tag. */
export function jsonLd(schema: object) {
  return { __html: JSON.stringify(schema).replace(/</g, '\\u003c') };
}
