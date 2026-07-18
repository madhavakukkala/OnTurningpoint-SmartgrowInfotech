import { Container, Section } from '@/components/ui/Layout';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { FeatureGrid, CheckList } from '@/components/FeatureGrid';
import { CTABand } from '@/components/CTABand';
import { internship } from '@/content/internship';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Internship Training | Big Data, Cloud & Cybersecurity',
  description:
    'Internships bridging academia and industry — Big Data, software development, data science, cloud and cybersecurity, with certificates and mock interviews.',
  path: '/internship',
});

export default function InternshipPage() {
  return (
    <>
      <PageHero
        eyebrow={internship.hero.eyebrow}
        headline={internship.hero.headline}
        headlineAccent={internship.hero.headlineAccent}
        intro={internship.hero.intro}
        image={internship.hero.image}
        imageAlt={internship.hero.imageAlt}
      />

      <Section tone="surface" aria-labelledby="internship-why-heading">
        <Container>
          <SectionHeader
            id="internship-why-heading"
            eyebrow="Why intern"
            heading="Theory only takes"
            accent="you so far"
            lede="Five reasons an internship changes what happens after your degree."
          />
          <FeatureGrid items={internship.why} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <Section aria-labelledby="internship-offerings-heading">
        <Container>
          <SectionHeader
            id="internship-offerings-heading"
            eyebrow="Programmes"
            heading="Five tracks,"
            accent="each one hands-on"
            lede="Pick the stack you want depth in rather than a survey of everything."
          />
          <FeatureGrid items={internship.offerings} columns={3} className="mt-16" />
          <p className="mt-8 text-base text-ink-subtle">{internship.offeringsNote}</p>
        </Container>
      </Section>

      <Section tone="cool" aria-labelledby="internship-features-heading">
        <Container>
          <SectionHeader
            id="internship-features-heading"
            eyebrow="What's included"
            heading="Everything that comes"
            accent="with the programme"
          />
          <CheckList items={internship.features} columns={2} className="mt-16" />
        </Container>
      </Section>

      <Section aria-labelledby="internship-benefits-heading">
        <Container>
          <SectionHeader
            id="internship-benefits-heading"
            eyebrow="Benefits"
            heading="What you leave"
            accent="with"
          />
          <FeatureGrid items={internship.benefits} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
