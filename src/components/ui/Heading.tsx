import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Level = 'h1' | 'h2' | 'h3' | 'h4';
type Size = 'display' | 'section' | 'sub';

const sizeClass: Record<Size, string> = {
  // BRIEF §2.2 — uppercase Swiss display, tight tracking, 0.95 line-height
  display: 'text-display font-extrabold uppercase',
  section: 'text-display-sm font-extrabold uppercase',
  sub: 'text-display-xs font-bold',
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
      className={cn(sizeClass[size], balance && '[text-wrap:balance]', 'text-ink', className)}
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
