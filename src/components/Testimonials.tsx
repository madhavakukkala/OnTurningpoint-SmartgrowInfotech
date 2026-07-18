'use client';

import { Quote } from 'lucide-react';
import { Container, Section, Eyebrow } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { testimonialsIntro, type Testimonial } from '@/content/testimonials';

/**
 * Testimonials — a single row of cards drifting continuously right to left,
 * fading out at both edges and pausing on hover or keyboard focus.
 *
 * Mechanics: the set is rendered twice inside a `w-max` track that translates
 * -50%, so the second copy arrives exactly where the first began and the loop
 * is seamless. Same approach as the trust band.
 *
 * Accessibility:
 * - Only the FIRST copy is exposed; the duplicate carries aria-hidden, so a
 *   screen reader reads each quote once rather than twice.
 * - Quotes use blockquote/cite, so they are announced as attributed quotations
 *   rather than as copy in the site's own voice.
 * - The track pauses on hover AND on focus-within, so a keyboard user tabbing
 *   into a card is not carried off-screen mid-read.
 * - The rail is a real scroll container. Under prefers-reduced-motion the
 *   animation is disabled globally, and the row stays manually scrollable
 *   rather than stranding the user on the first two cards.
 */
export function Testimonials({ items }: { items: readonly Testimonial[] }) {
  return (
    <Section aria-labelledby="testimonials-heading">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{testimonialsIntro.eyebrow}</Eyebrow>
          <Heading
            id="testimonials-heading"
            accent={testimonialsIntro.headingAccent}
            className="mt-5"
          >
            {testimonialsIntro.heading}
          </Heading>
          <Lede className="mt-5">{testimonialsIntro.body}</Lede>
        </Reveal>
      </Container>

      {/* Full-bleed rail — deliberately outside Container so cards run to the edges */}
      <div className="group relative mt-12 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="edge-fade flex w-max gap-2.5 motion-safe:animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              // The duplicate exists only to close the loop visually.
              aria-hidden={copy === 1 ? 'true' : undefined}
              className="flex shrink-0 gap-2.5"
            >
              {items.map((t, i) => (
                <li key={`${copy}-${i}`} className="w-[19rem] shrink-0 sm:w-[22rem]">
                  <figure className="flex h-full flex-col justify-between rounded-card bg-surface p-7">
                    <Quote
                      aria-hidden="true"
                      size={20}
                      strokeWidth={1.5}
                      className="mb-5 text-ink-subtle"
                    />
                    <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-ink">
                      <p>{t.quote}</p>
                    </blockquote>
                    <figcaption className="mt-7 border-t border-line pt-5">
                      <cite className="block text-[0.875rem] font-semibold not-italic text-ink">
                        {t.name}
                      </cite>
                      <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-muted">
                        {t.detail}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Section>
  );
}
