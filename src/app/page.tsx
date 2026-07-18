import { Container, Section, Eyebrow } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Hero } from '@/components/Hero';
import { ServiceIndex } from '@/components/ServiceIndex';
import { TrustBand } from '@/components/TrustBand';
import { ProcessSection } from '@/components/ProcessSection';
import { Testimonials } from '@/components/Testimonials';
import { ImageStatement } from '@/components/ImageStatement';
import { TESTIMONIALS_READY, testimonialsPlaceholder } from '@/content/testimonials';
import { company } from '@/content/company';
// Marquee is now rendered inside TrustBand rather than directly.
import { FeatureGrid } from '@/components/FeatureGrid';
import { CountryGrid } from '@/components/CountryCard';
import { Stats } from '@/components/Stats';
import { CTABand } from '@/components/CTABand';
import { home } from '@/content/home';
import { mbbs } from '@/content/mbbs';
import { countries } from '@/content/countries';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Study MBBS Abroad 2025-26 | OnTurningPoint, Nellore',
  description:
    'OnTurningPoint guides Nellore students to MBBS and study-abroad programmes in 11 countries — university selection, visas, education loans and arrival support.',
  path: '/',
});

const trustSignals = [
  'NMC approved',
  'WHO recognised',
  'MCI recognition',
  'USMLE eligible',
  'FMGE / NEXT support',
  'Indian mentors abroad',
  'Transparent fees',
  '24/7 support',
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Trust band — soft wash, no rules */}
      <TrustBand items={trustSignals} />

      {/* ---------------------------------------------------------------- */}
      {/* Metrics                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="stats-heading" compact>
        <Container>
          <h2 id="stats-heading" className="sr-only">
            OnTurningPoint by the numbers
          </h2>
          <Stats items={home.stats} />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Why MBBS abroad                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="why-abroad-heading">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>{home.whyAbroad.eyebrow}</Eyebrow>
            <Heading id="why-abroad-heading" accent={home.whyAbroad.headingAccent} className="mt-6">
              {home.whyAbroad.heading}
            </Heading>
          </Reveal>
          <FeatureGrid items={home.whyAbroad.items} columns={4} className="mt-16" />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Destinations                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="surface" aria-labelledby="destinations-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <Eyebrow>{home.destinations.eyebrow}</Eyebrow>
              <Heading
                id="destinations-heading"
                accent={home.destinations.headingAccent}
                className="mt-6"
              >
                {home.destinations.heading}
              </Heading>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:pt-16" delay={0.08}>
              <Lede>{home.destinations.body}</Lede>
            </Reveal>
          </div>

          <div className="mt-16">
            <CountryGrid items={countries.slice(0, 6)} />
          </div>

          <Reveal className="mt-14">
            <Button href="/countries" variant="ghost">
              View all 11 destinations
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Services preview                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="services-heading">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>{home.services.eyebrow}</Eyebrow>
            <Heading id="services-heading" accent={home.services.headingAccent} className="mt-6">
              {home.services.heading}
            </Heading>
          </Reveal>

          <Reveal className="mt-14">
            <ServiceIndex items={home.services.items} />
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* How it works — numbered image cards                               */}
      {/* ---------------------------------------------------------------- */}
      <ProcessSection steps={mbbs.steps} />

      {/* ---------------------------------------------------------------- */}
      {/* Why OnTurningPoint                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="why-us-heading">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>{home.whyUs.eyebrow}</Eyebrow>
            <Heading id="why-us-heading" accent={home.whyUs.headingAccent} className="mt-6">
              {home.whyUs.heading}
            </Heading>
          </Reveal>
          <FeatureGrid items={home.whyUs.items} columns={3} className="mt-16" />
        </Container>
      </Section>

      {/* Testimonials render only once real, permissioned quotes are in place —
          see src/content/testimonials.ts. */}
      {TESTIMONIALS_READY && <Testimonials items={testimonialsPlaceholder} />}

      {/* ---------------------------------------------------------------- */}
      {/* Full-bleed statement                                              */}
      {/* ---------------------------------------------------------------- */}
      <ImageStatement
        image="/images/hero.jpg"
        imageAlt="Graduates celebrating at the end of their degree"
        eyebrow="Admissions open · 2025–2026"
        headline="Your turning point"
        headlineAccent="starts here"
        body="Tell us your marks, your budget and where you want to practise. The first consultation is free, and there is no obligation."
        primaryCta={{ label: company.primaryCta, href: '/contact' }}
        secondaryCta={{ label: 'Explore destinations', href: '/countries' }}
      />

      <CTABand
        heading={home.cta.heading}
        headingAccent={home.cta.headingAccent}
        body={home.cta.body}
      />
    </>
  );
}
