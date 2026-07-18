import { Container, Section } from '@/components/ui/Layout';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { FeatureGrid } from '@/components/FeatureGrid';
import { CTABand } from '@/components/CTABand';
import { services } from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Study Abroad Services | Admissions, Visa & Accommodation',
  description:
    'Nine benefits of studying MBBS abroad and the ten services we provide, from university selection and visas to accommodation and career counselling.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={services.hero.eyebrow}
        headline={services.hero.headline}
        headlineAccent={services.hero.headlineAccent}
        intro={services.hero.intro}
        image={services.hero.image}
        imageAlt={services.hero.imageAlt}
      />

      <Section tone="surface" aria-labelledby="benefits-heading">
        <Container>
          <SectionHeader
            id="benefits-heading"
            eyebrow="Benefits"
            heading="Why students choose"
            accent="to study abroad"
            lede="Nine reasons an overseas medical degree works out better than you might expect."
          />
          <FeatureGrid items={services.benefits} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <Section aria-labelledby="offer-heading">
        <Container>
          <SectionHeader
            id="offer-heading"
            eyebrow="What we offer"
            heading="Ten services,"
            accent="one continuous handover"
            lede="Each of these is included — you are not upsold a package at every stage."
          />
          <FeatureGrid items={services.offers} columns={2} className="mt-16" />
        </Container>
      </Section>

      <Section tone="lavender" aria-labelledby="why-otp-heading">
        <Container>
          <SectionHeader
            id="why-otp-heading"
            eyebrow="Why OnTurningPoint"
            heading="The difference is"
            accent="how we work"
          />
          <FeatureGrid items={services.whyOTP} columns={4} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
