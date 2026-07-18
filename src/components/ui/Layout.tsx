import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** 1400px max-width container with the responsive 80px outer margin (BRIEF §2.3). */
export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn('container-grid', className)}>{children}</Tag>;
}

type Tone = 'default' | 'surface' | 'blue' | 'lavender' | 'sand' | 'dark';

const toneClass: Record<Tone, string> = {
  default: 'bg-bg',
  surface: 'bg-surface',
  blue: 'bg-section-blue',
  lavender: 'bg-section-lavender',
  sand: 'bg-section-sand',
  dark: 'bg-primary text-white',
};

/**
 * Vertical section rhythm — 120px desktop, ~64–72px mobile (BRIEF §2.3).
 * `tone` applies one of the quiet accent tints; default is the white page bg.
 */
export function Section({
  children,
  className,
  tone = 'default',
  id,
  as: Tag = 'section',
  'aria-labelledby': labelledBy,
  compact = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
  as?: ElementType;
  'aria-labelledby'?: string;
  compact?: boolean;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn(compact ? 'py-12 md:py-16' : 'py-16 md:py-24 lg:py-30', toneClass[tone], className)}
    >
      {children}
    </Tag>
  );
}

/** Small uppercase tracked label that sits above a section heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-eyebrow font-semibold uppercase text-ink-muted', className)}>{children}</p>
  );
}
