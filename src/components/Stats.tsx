import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

export type Stat = { value: string; label: string };

/**
 * Trust strip. Deliberately typographic rather than charted — these are four
 * headline figures, and a chart would add noise without adding meaning.
 * The value and its label are read as one unit by assistive tech.
 */
export function Stats({ items }: { items: readonly Stat[] }) {
  return (
    <RevealGroup
      as="ul"
      className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
    >
      {items.map((s) => (
        <RevealItem as="li" key={s.label} className="border-t border-line pt-6">
          <p className="text-4xl font-extrabold tracking-[-1px] text-ink md:text-5xl">{s.value}</p>
          <p className="mt-2 text-sm leading-snug text-ink-muted">{s.label}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
