import { Container, Section, Eyebrow } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { testimonialsIntro, type Testimonial } from '@/content/testimonials';

/**
 * Student testimonials.
 *
 * Quotes are marked up as <blockquote>/<cite> rather than plain paragraphs, so
 * assistive tech announces them as attributed quotations rather than as body
 * copy in the site's own voice — which matters when the whole point is that
 * someone else said it.
 *
 * The homepage only renders this once TESTIMONIALS_READY is true; see
 * src/content/testimonials.ts.
 */
export function Testimonials({ items }: { items: readonly Testimonial[] }) {
  return (
    <Section aria-labelledby="testimonials-heading">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{testimonialsIntro.eyebrow}</Eyebrow>
          <Heading
            id="testimonials-heading"
            accent={testimonialsIntro.headingAccent}
            className="mt-5"
          >
            {testimonialsIntro.heading}
          </Heading>
          <Lede className="mt-6">{testimonialsIntro.body}</Lede>
        </Reveal>

        <RevealGroup as="ul" className="mt-14 grid gap-1.5 md:grid-cols-3" step={0.07}>
          {items.map((t, i) => (
            <RevealItem as="li" key={i} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-card bg-surface p-7 md:p-8">
                <blockquote className="text-[1.0625rem] leading-relaxed text-ink">
                  <p>{t.quote}</p>
                </blockquote>

                <figcaption className="mt-8 border-t border-line pt-5">
                  <cite className="block not-italic text-[0.9375rem] font-semibold text-ink">
                    {t.name}
                  </cite>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-muted">
                    {t.detail}
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
