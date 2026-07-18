import type { Metadata, Viewport } from 'next';
import { Geist, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Loader } from '@/components/Loader';
import { company } from '@/content/company';
import { SITE_URL, localBusinessSchema, jsonLd } from '@/lib/seo';

/**
 * Typography.
 *
 * The reference site (superpower.com) sets NB International by Neubau — a
 * commercially licensed typeface we cannot legally bundle or self-host without
 * buying a webfont licence from the foundry.
 *
 * Geist is the closest openly-licensed match: both are rational neo-grotesques
 * that favour structure over optical correction, with tight even sidebearings
 * and near-closed apertures. If the client licenses NB International later,
 * swapping it in means changing only this declaration.
 *
 * Instrument Serif remains for the italic accent word.
 * next/font self-hosts both at build time — no runtime request to Google.
 */
const grotesk = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesk',
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} — Study MBBS Abroad | Overseas Education Consultancy, Nellore`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  keywords: [
    'MBBS abroad 2025-2026',
    'study MBBS in Russia',
    'study MBBS in Georgia',
    'study MBBS in Kyrgyzstan',
    'overseas education consultancy Nellore',
    'study abroad consultants Andhra Pradesh',
    'medical PG in Germany',
    'education loan for MBBS abroad',
  ],
  authors: [{ name: company.name }],
  creator: company.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: company.name,
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${grotesk.variable} ${serif.variable}`}>
      <head>
        {/*
          Scroll-reveal animations are server-rendered in their "hidden" state
          (opacity:0) and revealed by Framer Motion on the client. With JavaScript
          unavailable that reveal never runs and the page would read as blank, so
          force every animated element visible instead.
        */}
        <noscript>
          <style>{`
            [style*="opacity:0"], [style*="opacity: 0"] {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <Loader />
        <Nav />
        {/* The nav is fixed-position, so main must clear its height itself. */}
        <main id="main" className="pt-24 md:pt-28">
          {children}
        </main>
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(localBusinessSchema())}
        />
      </body>
    </html>
  );
}
