import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, Section } from '@/components/ui/Layout';
import { Heading } from '@/components/ui/Heading';
import { SectionHeader } from '@/components/SectionHeader';
import { CountryHero } from '@/components/CountryHero';
import { FeesTable } from '@/components/FeesTable';
import { CheckList } from '@/components/FeatureGrid';
import { CTABand } from '@/components/CTABand';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { countries, getCountry, GERMANY_PG_HREF } from '@/content/countries';
import { pageMetadata } from '@/lib/seo';

/**
 * ONE template for all eleven destinations, driven entirely by
 * `src/content/countries.ts`. MBBS destinations render the fees + eligibility
 * variant; study-abroad destinations render courses, costs, visa, scholarships
 * and post-study work.
 */

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};

  return pageMetadata({
    title: country.seo.title,
    description: country.seo.description,
    path: `/countries/${country.slug}`,
  });
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  return (
    <>
      <CountryHero country={country} />

      {/* Highlights — the at-a-glance facts */}
      <Section tone="surface" aria-labelledby="highlights-heading" compact>
        <Container>
          <SectionHeader
            id="highlights-heading"
            eyebrow="At a glance"
            heading="The essentials"
            className="max-w-2xl"
          />
          <CheckList items={country.highlights} columns={3} className="mt-12" />
        </Container>
      </Section>

      {/* Universities */}
      <Section aria-labelledby="universities-heading">
        <Container>
          <SectionHeader
            id="universities-heading"
            eyebrow="Universities"
            heading="Where you"
            accent="could study"
            lede={
              country.kind === 'mbbs'
                ? 'Representative universities we place students in. Current recognition status is confirmed in writing before you apply.'
                : 'Leading institutions we support applications to.'
            }
          />
          <RevealGroup as="ul" className="mt-16 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {country.universities.map((u, i) => (
              <RevealItem
                as="li"
                key={u}
                className="flex gap-5 border-b border-line py-6 text-base text-ink"
              >
                <span aria-hidden="true" className="shrink-0 tabular-nums text-ink-subtle">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {u}
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---- MBBS variant: fees + eligibility ---- */}
      {country.kind === 'mbbs' && (
        <Section tone="cool" aria-labelledby="fees-heading">
          <Container>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionHeader
                  id="fees-heading"
                  eyebrow="Cost"
                  heading="What it"
                  accent="actually costs"
                  lede="Annual costs in Indian rupees, covering tuition plus hostel and food."
                  className=""
                />
              </div>
              <div className="lg:col-span-7">
                <FeesTable
                  rows={country.fees}
                  caption={`Estimated annual cost of studying MBBS in ${country.name}`}
                  note={country.feesNote}
                  columnLabel="Per year (INR)"
                />
              </div>
            </div>
          </Container>
        </Section>
      )}

      {country.kind === 'mbbs' && (
        <Section aria-labelledby="eligibility-heading">
          <Container>
            <SectionHeader
              id="eligibility-heading"
              eyebrow="Eligibility"
              heading="What you"
              accent="need to apply"
            />
            <CheckList items={country.eligibility} columns={2} className="mt-12" />
          </Container>
        </Section>
      )}

      {/* ---- Study-abroad variant: courses, costs, admission, visa, scholarships ---- */}
      {country.kind === 'study' && (
        <>
          <Section tone="cool" aria-labelledby="courses-heading">
            <Container>
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <SectionHeader
                    id="courses-heading"
                    eyebrow="Popular courses"
                    heading="What students"
                    accent="study here"
                    className=""
                  />
                  <div className="mt-10">
                    <CheckList items={country.courses} columns={1} />
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <h3 className="mb-6 text-eyebrow font-semibold uppercase text-ink-muted">
                    Annual costs
                  </h3>
                  <FeesTable
                    rows={country.costs}
                    caption={`Estimated annual cost of studying in ${country.name}`}
                    note={country.costsNote}
                  />
                </div>
              </div>
            </Container>
          </Section>

          <Section aria-labelledby="admission-heading">
            <Container>
              <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
                <div>
                  <SectionHeader
                    id="admission-heading"
                    eyebrow="Admission"
                    heading="Entry"
                    accent="requirements"
                    className=""
                  />
                  <CheckList items={country.admission} columns={1} className="mt-10" />
                </div>

                <div>
                  <Reveal>
                    <h2 className="text-display-xs font-bold text-heading">{country.visa.name}</h2>
                    <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-muted">
                      {country.visa.summary}
                    </p>
                  </Reveal>
                  <CheckList items={country.visa.documents} columns={1} className="mt-8" />
                  <Reveal className="mt-8">
                    <p className="text-sm text-ink-subtle">
                      Typical processing time: {country.visa.processing}.
                    </p>
                  </Reveal>
                </div>
              </div>
            </Container>
          </Section>

          <Section tone="stone" aria-labelledby="after-heading">
            <Container>
              <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
                <div>
                  <Heading id="after-heading" accent="after you graduate">
                    Working
                  </Heading>
                  <p className="mt-8 max-w-prose text-body text-ink-muted">
                    {country.postStudyWork}
                  </p>
                </div>
                <div>
                  <h3 className="text-display-xs font-bold text-heading">Scholarships</h3>
                  <CheckList items={country.scholarships} columns={1} className="mt-8" />
                </div>
              </div>
            </Container>
          </Section>
        </>
      )}

      {/* Why study here */}
      <Section tone={country.kind === 'mbbs' ? 'surface' : 'default'} aria-labelledby="why-study-heading">
        <Container>
          <SectionHeader
            id="why-study-heading"
            eyebrow="Why here"
            heading={`Why students choose`}
            accent={country.name}
          />
          <CheckList items={country.whyStudy} columns={2} className="mt-12" />
        </Container>
      </Section>

      {/* Why OnTurningPoint */}
      <Section
        tone={country.kind === 'mbbs' ? 'default' : 'surface'}
        aria-labelledby="why-otp-heading"
      >
        <Container>
          <SectionHeader
            id="why-otp-heading"
            eyebrow="Why OnTurningPoint"
            heading="How we"
            accent="support you"
          />
          <CheckList items={country.whyOTP} columns={2} className="mt-12" />

          {/* Germany is both a study-abroad destination and the Medical PG
              destination — cross-link the two pages (BRIEF §5.2). */}
          {country.slug === 'germany' && (
            <Reveal className="mt-14">
              <p className="max-w-prose text-base text-ink-muted">
                Already qualified as a doctor?{' '}
                <Link
                  href={GERMANY_PG_HREF}
                  className="font-semibold text-ink underline underline-offset-4 transition-colors hover:text-primary"
                >
                  See our guide to Medical PG in Germany
                </Link>{' '}
                — structured residency with no tuition fees and a monthly stipend.
              </p>
            </Reveal>
          )}
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
