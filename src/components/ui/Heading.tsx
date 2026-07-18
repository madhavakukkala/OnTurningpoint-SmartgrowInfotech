import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Level = 'h1' | 'h2' | 'h3' | 'h4';
type Size = 'display' | 'section' | 'sub';

/**
 * Sentence-case display headings.
 *
 * The uppercase treatment was dropped deliberately: at these sizes all-caps
 * costs a lot of readability (no ascender/descender silhouette to read by) and
 * the reference site carries its hierarchy through weight and scale instead.
 * Weight 700 rather than 800 — 800 reads heavy once the caps are gone.
 */
const sizeClass: Record<Size, string> = {
  display: 'text-display font-bold',
  section: 'text-display-sm font-bold',
  sub: 'text-display-xs font-semibold',
};

/**
 * Editorial display heading. `accent` is rendered in the light italic serif to
 * create the mixed "STUDY MBBS / abroad" look from BRIEF §2.2.
 *
 * The accent is part of the same heading element, so screen readers announce
 * "Study MBBS abroad" as one continuous heading.
 */
export function Heading({
  children,
  accent,
  as: Tag = 'h2',
  size = 'section',
  className,
  id,
  balance = true,
}: {
  children: ReactNode;
  accent?: ReactNode;
  as?: Level;
  size?: Size;
  className?: string;
  id?: string;
  balance?: boolean;
}) {
  return (
    <Tag
      id={id}
      className={cn(sizeClass[size], balance && '[text-wrap:balance]', 'text-heading', className)}
    >
      {children}
      {accent ? (
        <>
          {' '}
          <span className="accent">{accent}</span>
        </>
      ) : null}
    </Tag>
  );
}

/** Standard supporting paragraph under a heading. */
export function Lede({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('max-w-prose text-body text-ink-muted', className)}>{children}</p>
  );
}
