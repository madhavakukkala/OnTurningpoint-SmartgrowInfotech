import Link from 'next/link';
import { Container, Section } from '@/components/ui/Layout';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { FeatureGrid, CheckList } from '@/components/FeatureGrid';
import { CTABand } from '@/components/CTABand';
import { Reveal } from '@/components/ui/Reveal';
import { medicalPG } from '@/content/medicalPG';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Medical PG in Germany | Residency, Stipends & Licensing',
  description:
    'Postgraduate medical training in Germany — no tuition fees, a 4–6 year residency, stipends of €2,300–€4,500 a month and a path to permanent residency.',
  path: '/medical-pg-germany',
});

export default function MedicalPGGermanyPage() {
  return (
    <>
      <PageHero
        eyebrow={medicalPG.hero.eyebrow}
        headline={medicalPG.hero.headline}
        headlineAccent={medicalPG.hero.headlineAccent}
        intro={medicalPG.hero.intro}
        image={medicalPG.hero.image}
        imageAlt={medicalPG.hero.imageAlt}
      />

      <Section tone="surface" aria-labelledby="why-heading">
        <Container>
          <SectionHeader
            id="why-heading"
            eyebrow="Why Germany"
            heading="Paid training,"
            accent="not paid tuition"
          />
          <FeatureGrid items={medicalPG.why} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <Section aria-labelledby="eligibility-heading">
        <Container>
          <SectionHeader
            id="eligibility-heading"
            eyebrow="Eligibility"
            heading="What you"
            accent="need to qualify"
            lede="Language requirements vary by state — we confirm which apply to the state you are targeting."
          />
          <CheckList items={medicalPG.eligibility} columns={2} className="mt-12" />
        </Container>
      </Section>

      <Section tone="blue" aria-labelledby="process-heading">
        <Container>
          <SectionHeader
            id="process-heading"
            eyebrow="Application process"
            heading="Five stages,"
            accent="in order"
            lede="The sequence matters — language proficiency gates everything that follows."
          />
          <FeatureGrid items={medicalPG.process} columns={3} numbered tone="plain" className="mt-16" />
        </Container>
      </Section>

      <Section aria-labelledby="specializations-heading">
        <Container>
          <SectionHeader
            id="specializations-heading"
            eyebrow="Specializations"
            heading="Choose your"
            accent="Facharzt"
          />
          <CheckList items={medicalPG.specializations} columns={3} className="mt-12" />
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="post-residency-heading">
        <Container>
          <SectionHeader
            id="post-residency-heading"
            eyebrow="After Approbation"
            heading="What comes"
            accent="after residency"
          />
          <FeatureGrid items={medicalPG.postResidency} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <Section aria-labelledby="why-otp-heading">
        <Container>
          <SectionHeader
            id="why-otp-heading"
            eyebrow="Why OnTurningPoint"
            heading="A long process,"
            accent="properly guided"
          />
          <FeatureGrid items={medicalPG.whyOTP} columns={4} className="mt-16" />

          {/* Germany is also a study-abroad destination — cross-link (BRIEF §5.2). */}
          <Reveal className="mt-14">
            <p className="max-w-prose text-base text-ink-muted">
              Looking at Germany for a bachelor’s or master’s instead?{' '}
              <Link
                href="/countries/germany"
                className="font-semibold text-ink underline underline-offset-4 transition-colors hover:text-primary"
              >
                See our Study in Germany guide
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
