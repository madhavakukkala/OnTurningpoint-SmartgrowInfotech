import Image from 'next/image';
import { Container } from '@/components/ui/Layout';
import { Heading } from '@/components/ui/Heading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

export type Step = {
  title: string;
  body?: string;
  image?: string;
  imageAlt?: string;
};

/**
 * "How it works" — centred heading and subhead over a row of numbered image
 * cards, following the reference layout.
 *
 * The step number sits in a translucent chip on the image rather than above the
 * text, so the sequence is legible while scanning the images alone. Because the
 * chip sits on an unpredictable photograph, it uses a dark scrim rather than a
 * tint — white on 55% black holds contrast over any of these images.
 *
 * Six steps render 2/3-up rather than the reference's four-across; forcing six
 * into one row would leave each card too narrow to read at desktop widths.
 */
export function ProcessSection({
  steps,
  eyebrow,
  heading = 'How it works',
  accent,
  subhead = 'One team owns your file from the first consultation to your first week on campus.',
  id = 'process-heading',
}: {
  steps: readonly Step[];
  eyebrow?: string;
  heading?: string;
  accent?: string;
  subhead?: string;
  id?: string;
}) {
  return (
    <section aria-labelledby={id} className="py-16 md:py-24 lg:py-30">
      <Container>
        {/* Centred header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          {eyebrow && (
            <p className="mb-5 text-eyebrow font-semibold uppercase text-ink-muted">{eyebrow}</p>
          )}
          <Heading id={id} accent={accent} balance>
            {heading}
          </Heading>
          {subhead && (
            <p className="mx-auto mt-5 max-w-[52ch] text-body text-ink-muted">{subhead}</p>
          )}
        </Reveal>

        {/* Numbered image cards */}
        <RevealGroup
          as="ol"
          className="mt-14 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3"
          step={0.07}
        >
          {steps.map((step, i) => (
            <RevealItem as="li" key={step.title} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-surface">
                {step.image && (
                  <Image
                    src={step.image}
                    alt={step.imageAlt ?? ''}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-brand motion-safe:group-hover:scale-[1.05]"
                  />
                )}

                {/* Step number chip */}
                <span
                  aria-hidden="true"
                  className="absolute left-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-md2 bg-black/55 text-[0.8125rem] font-semibold tabular-nums text-white backdrop-blur-sm"
                >
                  {i + 1}
                </span>
              </div>

              <h3 className="mt-5 text-[1.125rem] font-semibold tracking-[-0.5px] text-heading">
                {/* The visible number is decorative above; screen readers get the
                    ordinal from the <ol>, so it is not repeated here. */}
                {step.title}
              </h3>
              {step.body && (
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{step.body}</p>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
