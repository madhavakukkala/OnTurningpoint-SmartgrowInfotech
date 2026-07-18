import Image from 'next/image';
import { Container, Eyebrow } from '@/components/ui/Layout';
import { Heading } from '@/components/ui/Heading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { scaleIn } from '@/lib/motion';

export type Step = { title: string; body?: string };

/**
 * Six-step process over a photographic background with frosted-glass cards.
 *
 * Legibility over the photo is handled in layers rather than by one flat
 * overlay: the image is desaturated and lightened, a white wash sits on top of
 * it, and each card carries its own blurred surface. That keeps the photograph
 * readable as texture while text stays well clear of AA — the copy is never
 * sitting directly on image pixels.
 */
export function ProcessSection({
  steps,
  image,
  imageAlt,
  eyebrow = 'How it works',
  heading = 'From first call to first day',
  accent = 'in six steps',
  id = 'process-heading',
}: {
  steps: readonly Step[];
  image: string;
  imageAlt: string;
  eyebrow?: string;
  heading?: string;
  accent?: string;
  id?: string;
}) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden py-16 md:py-24 lg:py-30">
      {/* Background photograph */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="-z-20 object-cover"
        // Decorative texture, but it carries meaning for sighted users, so it
        // keeps a real alt rather than being emptied out.
      />
      {/* Wash: lifts the photo toward white so glass cards read cleanly on it */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white/92 via-white/88 to-white/94 backdrop-saturate-50"
      />

      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading id={id} accent={accent} className="mt-5">
            {heading}
          </Heading>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" step={0.06}>
          {steps.map((step, i) => (
            <RevealItem key={step.title} variants={scaleIn}>
              <div className="glass-on-photo h-full rounded-card p-7 transition-transform duration-500 ease-brand motion-safe:hover:-translate-y-1">
                <span
                  aria-hidden="true"
                  className="mb-5 block text-[0.75rem] font-semibold tabular-nums tracking-[0.14em] text-primary/50"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink">
                  {step.title}
                </h3>
                {step.body && (
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">{step.body}</p>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
