import { Check } from 'lucide-react';
import { Container } from '@/components/ui/Layout';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

export type ProofItem = { title: string; body: string };

/**
 * The section directly below the hero — three value propositions on a hairline
 * grid, following the reference site's structure.
 *
 * Kept typographic rather than carded: the reference leans on rules and
 * whitespace here, and boxing these would repeat the card pattern that already
 * appears three times further down the page.
 */
export function ProofGrid({ items, id = 'proof-heading' }: { items: readonly ProofItem[]; id?: string }) {
  return (
    <section aria-labelledby={id} className="border-y border-line py-14 md:py-16">
      <Container>
        <h2 id={id} className="sr-only">
          Why students choose OnTurningPoint
        </h2>

        <RevealGroup className="grid gap-x-12 gap-y-10 md:grid-cols-3" step={0.08}>
          {items.map((item) => (
            <RevealItem key={item.title}>
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-primary/[0.07] text-primary"
                >
                  <Check size={13} strokeWidth={2.5} />
                </span>
                <div>
                  <h3 className="text-[1.0625rem] font-semibold tracking-[-0.014em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[36ch] text-[0.9375rem] leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
