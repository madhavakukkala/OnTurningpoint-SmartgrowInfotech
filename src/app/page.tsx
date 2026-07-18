import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container, Section, Eyebrow } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Hero } from '@/components/Hero';
import { ProcessSection } from '@/components/ProcessSection';
import { FeatureGrid } from '@/components/FeatureGrid';
import { CountryGrid } from '@/components/CountryCard';
import { Stats } from '@/components/Stats';
import { Marquee } from '@/components/Marquee';
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

      {/* Trust signal marquee */}
      <div className="border-y border-line">
        <Marquee items={trustSignals} />
      </div>

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

          <RevealGroup as="ul" className="mt-16 border-t border-line">
            {home.services.items.map((item) => (
              <RevealItem as="li" key={item.href}>
                <Link
                  href={item.href}
                  className="group flex flex-col gap-2 border-b border-line py-8 transition-colors hover:bg-surface md:flex-row md:items-center md:gap-10 md:px-4"
                >
                  <h3 className="text-2xl font-bold tracking-[-1px] text-ink md:w-[38%] md:shrink-0">
                    {item.title}
                  </h3>
                  <p className="flex-1 text-base text-ink-muted">{item.body}</p>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={22}
                    strokeWidth={1.5}
                    className="hidden shrink-0 text-ink-subtle transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary md:block"
                  />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
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

      <CTABand
        heading={home.cta.heading}
        headingAccent={home.cta.headingAccent}
        body={home.cta.body}
      />
    </>
  );
}
