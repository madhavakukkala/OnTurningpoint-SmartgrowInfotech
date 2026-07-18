import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Loader } from '@/components/Loader';
import { company } from '@/content/company';
import { SITE_URL, localBusinessSchema, jsonLd } from '@/lib/seo';

/**
 * Typography — BRIEF §2.2.
 * Inter stands in for the Swiss grotesk (General Sans / Satoshi / Neue Haas),
 * paired with Instrument Serif for the light italic editorial accent.
 * next/font self-hosts both at build time — no runtime request to Google.
 */
const grotesk = Inter({
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
