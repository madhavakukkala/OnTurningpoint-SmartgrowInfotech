import { Container, Section, Eyebrow } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { assurances, assurancesIntro, type Assurance } from '@/content/assurances';

/**
 * "What you're guaranteed" — occupies the social-proof slot on the homepage.
 *
 * Deliberately typographic: each item opens with a hairline rule rather than
 * sitting in a card, so the block reads as a list of commitments rather than as
 * another row of feature tiles. There are already three card grids on this page.
 */
export function Assurances({ items = assurances }: { items?: readonly Assurance[] }) {
  return (
    <Section tone="surface" aria-labelledby="assurances-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{assurancesIntro.eyebrow}</Eyebrow>
            <Heading
              id="assurances-heading"
              accent={assurancesIntro.headingAccent}
              className="mt-5"
            >
              {assurancesIntro.heading}
            </Heading>
            <Lede className="mt-6">{assurancesIntro.body}</Lede>
          </Reveal>

          <RevealGroup
            as="ul"
            className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-7"
            step={0.06}
          >
            {items.map((item) => (
              <RevealItem as="li" key={item.title}>
                <span aria-hidden="true" className="block h-px w-full bg-line" />
                <h3 className="mt-5 text-[1rem] font-semibold text-heading">{item.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
