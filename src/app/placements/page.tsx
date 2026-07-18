import { Container, Section } from '@/components/ui/Layout';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { FeatureGrid } from '@/components/FeatureGrid';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { CTABand } from '@/components/CTABand';
import { placements } from '@/content/placements';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Placements — From Graduation to a Contract',
  description:
    'Placement support that turns academic learning into employment — an employer network across five sectors, career counselling and interview preparation.',
  path: '/placements',
});

export default function PlacementsPage() {
  return (
    <>
      <PageHero
        eyebrow={placements.hero.eyebrow}
        headline={placements.hero.headline}
        headlineAccent={placements.hero.headlineAccent}
        intro={placements.hero.intro}
        image={placements.hero.image}
        imageAlt={placements.hero.imageAlt}
      />

      <Section tone="surface" aria-labelledby="placements-network-heading">
        <Container>
          <SectionHeader
            id="placements-network-heading"
            eyebrow="Employer network"
            heading="Who is"
            accent="hiring"
            lede="Our network spans five kinds of employer, across engineering, IT, finance, healthcare and education."
          />
          <FeatureGrid items={placements.network} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <Section aria-labelledby="placements-support-heading">
        <Container>
          <SectionHeader
            id="placements-support-heading"
            eyebrow="How we help"
            heading="Support through"
            accent="the whole search"
            lede="From working out which roles fit your qualification to the introduction that gets you in the room."
          />
          <FeatureGrid items={placements.support} columns={3} className="mt-16" />
        </Container>
      </Section>

      {/*
        successStories is keyed by `country`, not `title`, so it cannot use
        FeatureGrid. It is rendered as a bordered definition-style list and
        labelled as illustrative — these are example outcomes by market, not
        named individuals.
      */}
      <Section tone="stone" aria-labelledby="placements-outcomes-heading">
        <Container>
          <SectionHeader
            id="placements-outcomes-heading"
            eyebrow="Example outcomes"
            heading="The kind of roles"
            accent="graduates land"
            lede="Illustrative examples of the placements we support, by market. They are representative of the roles in our network, not individual case studies."
          />
          <RevealGroup as="ul" className="mt-16 border-t border-line">
            {placements.successStories.map((story) => (
              <RevealItem
                as="li"
                key={story.country}
                className="grid gap-2 border-b border-line py-6 sm:grid-cols-3 sm:gap-8 sm:py-7"
              >
                <h3 className="text-display-xs font-bold text-ink">{story.country}</h3>
                <p className="text-base leading-relaxed text-ink-muted sm:col-span-2 sm:pt-1">
                  {story.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section aria-labelledby="placements-post-heading">
        <Container>
          <SectionHeader
            id="placements-post-heading"
            eyebrow="After you start"
            heading="We do not stop"
            accent="at the offer letter"
          />
          <FeatureGrid items={placements.postPlacement} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
