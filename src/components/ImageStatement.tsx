import Image from 'next/image';
import { Container } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Full-bleed photographic statement — headline and actions set over the image.
 *
 * Legibility is handled by a directional scrim rather than a flat overlay: the
 * gradient is heaviest on the left where the text sits and clears toward the
 * right, so the photograph stays visible where nothing overlaps it. A flat
 * 50% wash would have to be dark enough for the worst pixel in the frame,
 * which flattens the whole image.
 *
 * A second, very soft vertical scrim catches the mobile case, where the copy
 * stacks over the middle of the frame rather than the left third.
 */
export function ImageStatement({
  image,
  imageAlt,
  eyebrow,
  headline,
  headlineAccent,
  body,
  primaryCta,
  secondaryCta,
  id = 'statement-heading',
}: {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  headline: string;
  headlineAccent?: string;
  body?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  id?: string;
}) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden">
      <div className="relative min-h-[32rem] md:min-h-[38rem] lg:min-h-[42rem]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />

        {/* Directional scrim — heavy where the text sits, clearing to the right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(18,10,9,0.88)] via-[rgba(18,10,9,0.55)] to-[rgba(18,10,9,0.15)]"
        />
        {/* Vertical softener for the stacked mobile layout */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgba(18,10,9,0.5)] to-transparent md:hidden"
        />

        <Container className="relative flex min-h-[32rem] items-center py-20 md:min-h-[38rem] lg:min-h-[42rem]">
          <Reveal className="max-w-xl">
            {eyebrow && (
              <p className="mb-5 text-eyebrow font-semibold uppercase text-white/60">{eyebrow}</p>
            )}

            <h2 id={id} className="text-display font-bold text-white">
              {headline}
              {headlineAccent && (
                <>
                  {' '}
                  <span className="accent text-white/80">{headlineAccent}</span>
                </>
              )}
            </h2>

            {body && (
              <p className="mt-6 max-w-[46ch] text-body text-white/75">{body}</p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={primaryCta.href} variant="onDark">
                {primaryCta.label}
              </Button>
              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  /* Translucent rather than outlined — an outline over
                     photography competes with the image edges. */
                  className="border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
