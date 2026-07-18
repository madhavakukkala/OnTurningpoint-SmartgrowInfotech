import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container, Section } from '@/components/ui/Layout';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { FeatureGrid } from '@/components/FeatureGrid';
import { FAQ } from '@/components/FAQ';
import { CountryGrid } from '@/components/CountryCard';
import { CTABand } from '@/components/CTABand';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { mbbs } from '@/content/mbbs';
import { mbbsCountries } from '@/content/countries';
import { pageMetadata, faqSchema, jsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'MBBS Abroad 2025-26 | Fees, Universities & Admission Process',
  description:
    'Study MBBS abroad in 2025-26 — trending destinations, NMC and WHO recognised universities, the six-step admission process and answers to common questions.',
  path: '/mbbs-abroad',
});

export default function MbbsAbroadPage() {
  return (
    <>
      <PageHero
        eyebrow={mbbs.hero.eyebrow}
        headline={mbbs.hero.headline}
        headlineAccent={mbbs.hero.headlineAccent}
        intro={mbbs.hero.intro}
        image={mbbs.hero.image}
        imageAlt={mbbs.hero.imageAlt}
      />

      {/* Why choose MBBS abroad */}
      <Section tone="surface" aria-labelledby="why-mbbs-heading">
        <Container>
          <SectionHeader
            id="why-mbbs-heading"
            eyebrow="Why choose MBBS abroad"
            heading="A recognised degree,"
            accent="at a reachable cost"
          />
          <FeatureGrid items={mbbs.whyChoose} columns={4} tone="plain" className="mt-16" />
        </Container>
      </Section>

      {/* Trending destinations */}
      <Section aria-labelledby="trending-heading">
        <Container>
          <SectionHeader
            id="trending-heading"
            eyebrow="Trending destinations 2025–2026"
            heading="Where students are"
            accent="going this year"
            lede="Representative universities in each destination. We confirm current recognition status in writing before you apply."
          />

          <RevealGroup as="ul" className="mt-16 border-t border-line">
            {mbbs.destinations.map((d) => (
              <RevealItem as="li" key={d.country} className="border-b border-line py-10">
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <h3 className="text-2xl font-bold tracking-tight text-ink">
                      {d.href ? (
                        <Link
                          href={d.href}
                          className="group inline-flex items-center gap-2 transition-colors hover:text-primary"
                        >
                          {d.country}
                          <ArrowUpRight
                            aria-hidden="true"
                            size={20}
                            strokeWidth={1.5}
                            className="text-ink-subtle transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </Link>
                      ) : (
                        d.country
                      )}
                    </h3>
                    <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-muted">{d.note}</p>
                  </div>

                  <div className="lg:col-span-8">
                    <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                      {d.universities.map((u) => (
                        <li key={u} className="flex gap-3 text-base text-ink-muted">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          />
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Benefits */}
      <Section tone="blue" aria-labelledby="benefits-heading">
        <Container>
          <SectionHeader
            id="benefits-heading"
            eyebrow="Benefits"
            heading="More than a"
            accent="second option"
          />
          <FeatureGrid items={mbbs.benefits} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      {/* Admission process */}
      <Section aria-labelledby="process-heading">
        <Container>
          <SectionHeader
            id="process-heading"
            eyebrow="Admission process"
            heading="Six steps,"
            accent="fully guided"
            lede="One team owns your file from the first consultation to your first week on campus."
          />
          <FeatureGrid items={mbbs.steps} columns={3} numbered className="mt-16" />
        </Container>
      </Section>

      {/* Full destination grid */}
      <Section tone="surface" aria-labelledby="destinations-heading">
        <Container>
          <SectionHeader
            id="destinations-heading"
            eyebrow="Destination guides"
            heading="Compare fees,"
            accent="universities and eligibility"
            lede="Detailed guides for every MBBS destination we place students in."
          />
          <div className="mt-16">
            <CountryGrid items={mbbsCountries} />
          </div>
        </Container>
      </Section>

      {/* Why OnTurningPoint */}
      <Section aria-labelledby="why-otp-heading">
        <Container>
          <SectionHeader
            id="why-otp-heading"
            eyebrow="Why OnTurningPoint"
            heading="Guidance that stays"
            accent="after you land"
          />
          <FeatureGrid items={mbbs.whyOTP} columns={4} className="mt-16" />
        </Container>
      </Section>

      {/* FAQs */}
      <Section tone="surface" aria-labelledby="faq-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                id="faq-heading"
                eyebrow="FAQs"
                heading="Questions"
                accent="students ask"
                className=""
              />
            </div>
            <div className="lg:col-span-8">
              <FAQ items={mbbs.faqs} idPrefix="mbbs-faq" />
            </div>
          </div>
        </Container>
      </Section>

      <CTABand />

      {/* FAQPage structured data — BRIEF §7 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(mbbs.faqs))} />
    </>
  );
}
