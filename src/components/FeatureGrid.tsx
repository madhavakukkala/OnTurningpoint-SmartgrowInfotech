import { Card, CardBody, CardTitle } from '@/components/ui/Card';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

export type Feature = { title: string; body?: string; href?: string };

/**
 * The workhorse grid for "why / benefits / what we offer" blocks.
 * Cards cycle through the quiet accent tints so a long grid stays calm but
 * not monotonous (BRIEF §2.1 — accents only, never the page background).
 */
const tones = ['surface', 'cool', 'warm', 'stone'] as const;

export function FeatureGrid({
  items,
  columns = 3,
  numbered = false,
  tone = 'cycle',
  className,
}: {
  items: readonly Feature[];
  columns?: 2 | 3 | 4;
  /** Renders a 01/02/03 step index — used for the admission process. */
  numbered?: boolean;
  tone?: 'cycle' | 'surface' | 'plain';
  className?: string;
}) {
  const colClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <RevealGroup as="div" className={cn('grid gap-1.5', colClass, className)}>
      {items.map((item, i) => (
        <RevealItem key={item.title}>
          <Card
            href={item.href}
            tone={tone === 'cycle' ? tones[i % tones.length] : tone === 'plain' ? 'plain' : 'surface'}
            className="h-full"
          >
            {numbered && (
              <span
                aria-hidden="true"
                className="mb-5 block text-sm font-semibold tabular-nums tracking-widest text-ink-subtle"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            )}
            <CardTitle>{item.title}</CardTitle>
            {item.body && <CardBody>{item.body}</CardBody>}
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/**
 * Compact checklist for plain string lists (eligibility, documents, highlights).
 * Uses a real <ul> so assistive tech announces the item count.
 */
export function CheckList({
  items,
  columns = 2,
  className,
}: {
  items: readonly string[];
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  const colClass = { 1: '', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' }[columns];

  return (
    <RevealGroup as="ul" className={cn('grid gap-x-8 gap-y-3', colClass, className)}>
      {items.map((item) => (
        <RevealItem as="li" key={item} className="flex gap-4">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="text-base leading-relaxed text-ink-muted">{item}</span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
