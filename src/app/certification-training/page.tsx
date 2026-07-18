import { Container, Section } from '@/components/ui/Layout';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { FeatureGrid, CheckList } from '@/components/FeatureGrid';
import { CTABand } from '@/components/CTABand';
import { certification } from '@/content/certification';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Certification Training | Azure, AWS, Oracle & Data Science',
  description:
    'Industry-recognized training in Microsoft Azure, AWS, Oracle, IABAC and Cloudera — AZ-900, AZ-104, Selenium and Salesforce Admin, with placement help.',
  path: '/certification-training',
});

export default function CertificationTrainingPage() {
  return (
    <>
      <PageHero
        eyebrow={certification.hero.eyebrow}
        headline={certification.hero.headline}
        headlineAccent={certification.hero.headlineAccent}
        intro={certification.hero.intro}
        image={certification.hero.image}
        imageAlt={certification.hero.imageAlt}
      />

      <Section tone="surface" aria-labelledby="cert-programs-heading">
        <Container>
          <SectionHeader
            id="cert-programs-heading"
            eyebrow="Programs"
            heading="Certification tracks"
            accent="that employers know"
            lede="Vendor certifications with real hiring weight, taught to the current exam blueprint."
          />
          <FeatureGrid items={certification.programs} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <Section aria-labelledby="cert-courses-heading">
        <Container>
          <SectionHeader
            id="cert-courses-heading"
            eyebrow="Courses"
            heading="What you can"
            accent="train for"
            lede="Pick a single exam or a full path — the schedule is built around what you already know."
          />
          <CheckList items={certification.courses} columns={2} className="mt-16" />
        </Container>
      </Section>

      <Section tone="blue" aria-labelledby="cert-features-heading">
        <Container>
          <SectionHeader
            id="cert-features-heading"
            eyebrow="How training runs"
            heading="Taught by people"
            accent="doing the work"
            lede="Live instruction, real projects and support right through to the exam booking."
          />
          <FeatureGrid items={certification.features} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <Section aria-labelledby="cert-why-otp-heading">
        <Container>
          <SectionHeader
            id="cert-why-otp-heading"
            eyebrow="Why OnTurningPoint"
            heading="Training that keeps"
            accent="pace with you"
          />
          <FeatureGrid items={certification.whyOTP} columns={4} className="mt-16" />
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
