import { Container, Section } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Layout';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import { CountryGrid } from '@/components/CountryCard';
import { CTABand } from '@/components/CTABand';
import { mbbsCountries, studyCountries, countries } from '@/content/countries';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Study Abroad Destinations | 11 Countries for MBBS & More',
  description:
    'Compare eleven destinations — MBBS in Russia, Georgia, Kazakhstan, the Philippines, Uzbekistan and Kyrgyzstan, plus higher education across Europe and the UK.',
  path: '/countries',
});

export default function CountriesPage() {
  return (
    <>
      <header className="pb-12 pt-12 md:pb-16 md:pt-20">
        <Container>
          <Reveal className="max-w-4xl">
            <Eyebrow>Destinations</Eyebrow>
            <Heading as="h1" size="display" accent="one honest shortlist" className="mt-6">
              Eleven countries,
            </Heading>
            <Lede className="mt-8">
              Every destination below is one we actively place students in. Each guide sets out the
              universities, the real annual cost, the eligibility criteria and what happens after you
              graduate — so you can compare {countries.length} options on the same terms.
            </Lede>
          </Reveal>
        </Container>
      </header>

      <Section aria-labelledby="mbbs-destinations-heading" compact>
        <Container>
          <SectionHeader
            id="mbbs-destinations-heading"
            eyebrow="MBBS destinations"
            heading="Study medicine"
            accent="abroad"
            lede="NMC and WHO approved medical universities with English-medium programmes."
          />
          <div className="mt-16">
            <CountryGrid items={mbbsCountries} />
          </div>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="study-destinations-heading">
        <Container>
          <SectionHeader
            id="study-destinations-heading"
            eyebrow="Study abroad destinations"
            heading="Engineering, business"
            accent="and beyond"
            lede="Bachelor’s and master’s programmes across Europe and the UK, with post-study work routes."
          />
          <div className="mt-16">
            <CountryGrid items={studyCountries} />
          </div>
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
