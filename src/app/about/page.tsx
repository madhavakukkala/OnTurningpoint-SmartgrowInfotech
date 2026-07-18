import Image from 'next/image';
import { Container, Section, Eyebrow } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import { FeatureGrid } from '@/components/FeatureGrid';
import { CTABand } from '@/components/CTABand';
import { foundation, team, values } from '@/content/company';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About OnTurningPoint | Overseas Education Consultancy',
  description:
    'OnTurningPoint is a Nellore-based consultancy helping students study MBBS and other professional courses abroad. Meet the team and read our mission and vision.',
  path: '/about',
});

const pillars = [
  { title: 'Our mission', body: foundation.mission },
  { title: 'Our aim', body: foundation.aim },
  { title: 'Our vision', body: foundation.vision },
];

export default function AboutPage() {
  return (
    <>
      <header className="pb-12 pt-12 md:pb-16 md:pt-20">
        <Container>
          <Reveal className="max-w-4xl">
            <Eyebrow>About us</Eyebrow>
            <Heading as="h1" size="display" accent="in a life" className="mt-6">
              The turning point
            </Heading>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6" delay={0.08}>
              <Lede>{foundation.about}</Lede>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={0.14}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-media shadow-card">
                <Image
                  src="/images/about-office.jpg"
                  alt="A bright modern consultancy office with natural window light"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </header>

      {/* Mission / aim / vision */}
      <Section tone="surface" aria-labelledby="pillars-heading">
        <Container>
          <SectionHeader
            id="pillars-heading"
            eyebrow="What drives us"
            heading="Accessible, transparent,"
            accent="hassle-free"
          />
          <FeatureGrid items={pillars} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      {/* Team */}
      <Section aria-labelledby="team-heading">
        <Container>
          <SectionHeader
            id="team-heading"
            eyebrow="The team"
            heading="The people"
            accent="behind your file"
            lede="A small team, which is deliberate — you deal with the same people from first call to graduation."
          />

          {/* TODO(client): swap these placeholder headshots for real team photos.
              Drop them into /public/images/team-1..4.jpg and update the `image`
              fields in src/content/company.ts if you rename them. */}
          <RevealGroup as="ul" className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <RevealItem as="li" key={member.name}>
                <div className="relative aspect-square overflow-hidden rounded-media shadow-card">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-ink-subtle">{member.role}</p>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{member.bio}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="sand" aria-labelledby="values-heading">
        <Container>
          <SectionHeader
            id="values-heading"
            eyebrow="How we work"
            heading="Three things we"
            accent="will not trade"
          />
          <FeatureGrid items={values} columns={3} tone="plain" className="mt-16" />
        </Container>
      </Section>

      <CTABand />
    </>
  );
}
