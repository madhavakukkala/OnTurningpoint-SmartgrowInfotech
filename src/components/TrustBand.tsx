import { Container } from '@/components/ui/Layout';
import { Marquee } from '@/components/Marquee';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Trust band above the metrics.
 *
 * Replaces the previous hard `border-y` rules. The band is separated from the
 * page by a very faint vertical wash that resolves to white at both edges, so
 * there is no visible seam — the section reads as a change in air rather than
 * as a boxed-off strip.
 *
 * The recognition marks are set well below full-strength ink, matching the
 * reference where endorsement logos sit quietly rather than competing with the
 * content around them. They still clear AA at this weight.
 */
export function TrustBand({
  items,
  label = 'Recognised by the bodies that matter',
}: {
  items: readonly string[];
  label?: string;
}) {
  return (
    <section aria-labelledby="trust-heading" className="relative isolate py-14 md:py-16">
      {/* Faint wash — white at both edges, barely tinted through the middle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#f6f6f7] to-white"
      />

      <Container>
        <Reveal>
          <h2
            id="trust-heading"
            className="text-center text-[0.9375rem] font-medium text-ink-muted"
          >
            {label}
          </h2>
        </Reveal>
      </Container>

      <Reveal className="mt-8">
        <Marquee items={items} muted />
      </Reveal>
    </section>
  );
}
