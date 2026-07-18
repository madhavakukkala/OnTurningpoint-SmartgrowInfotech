import { Container, Section } from '@/components/ui/Layout';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { FeatureGrid, CheckList } from '@/components/FeatureGrid';
import { Reveal } from '@/components/ui/Reveal';
import { CTABand } from '@/components/CTABand';
import { valueAdded } from '@/content/valueAdded';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Value Added Services | SOP, IELTS, Visa & Pre-Departure',
  description:
    'SOP, LOR and CV support, IELTS, TOEFL, PTE, GRE, GMAT and German coaching, visa and scholarship assistance, FOREX, accommodation, flights and airport pickup.',
  path: '/value-added-services',
});

export default function ValueAddedServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={valueAdded.hero.eyebrow}
        headline={valueAdded.hero.headline}
        headlineAccent={valueAdded.hero.headlineAccent}
        intro={valueAdded.hero.intro}
        image={valueAdded.hero.image}
        imageAlt={valueAdded.hero.imageAlt}
      />

      <Section tone="surface" aria-labelledby="vas-commitments-heading">
        <Container>
          <SectionHeader
            id="vas-commitments-heading"
            eyebrow="Our commitments"
            heading="What we promise"
            accent="before anything else"
            lede="Three things that hold true on every file, whatever the destination."
          />
          <FeatureGrid items={valueAdded.commitments} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <Section aria-labelledby="vas-groups-heading">
        <Container>
          <SectionHeader
            id="vas-groups-heading"
            eyebrow="The full list"
            heading="Every service,"
            accent="grouped by stage"
            lede="Ordered roughly the way you will need them — from the first shortlist to your first week abroad."
          />

          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-x-16">
            {valueAdded.groups.map((group, i) => (
              <Reveal key={group.title} delay={i * 0.05}>
                <h3 className="text-display-xs font-bold text-ink">{group.title}</h3>
                <CheckList items={group.items} columns={1} className="mt-8" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="lavender" aria-labelledby="vas-why-otp-heading">
        <Container>
          <SectionHeader
            id="vas-why-otp-heading"
            eyebrow="Why OnTurningPoint"
            heading="One team,"
            accent="one plan"
          />
          <FeatureGrid items={valueAdded.whyOTP} columns={4} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
