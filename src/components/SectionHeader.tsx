import { Eyebrow } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Standard section opener: eyebrow → display heading → optional lede.
 * `id` is wired to the section's aria-labelledby so every section is a
 * properly labelled landmark.
 */
export function SectionHeader({
  eyebrow,
  heading,
  accent,
  lede,
  id,
  className = 'max-w-3xl',
}: {
  eyebrow?: string;
  heading: string;
  accent?: string;
  lede?: string;
  id: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading id={id} accent={accent} className={eyebrow ? 'mt-6' : undefined}>
        {heading}
      </Heading>
      {lede && <Lede className="mt-8">{lede}</Lede>}
    </Reveal>
  );
}
