import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CardTone = 'plain' | 'surface' | 'blue' | 'lavender' | 'sand' | 'outline';

const toneClass: Record<CardTone, string> = {
  plain: 'bg-white shadow-card',
  surface: 'bg-surface',
  blue: 'bg-section-blue',
  lavender: 'bg-section-lavender',
  sand: 'bg-section-sand',
  /* Formerly a hairline outline — cards now separate by fill alone. */
  outline: 'bg-surface',
};

/**
 * Large 32px-radius card with a very subtle shadow (BRIEF §2.4).
 * Pass `href` to make the whole card a link.
 */
export function Card({
  children,
  className,
  tone = 'surface',
  href,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  tone?: CardTone;
  href?: string;
  padded?: boolean;
}) {
  const classes = cn(
    'rounded-card',
    toneClass[tone],
    padded && 'p-8 md:p-10',
    href &&
      'block transition duration-300 ease-brand motion-safe:hover:-translate-y-1 hover:shadow-lift',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('text-xl font-bold tracking-tight text-ink', className)}>{children}</h3>;
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('mt-3 text-base leading-relaxed text-ink-muted', className)}>{children}</p>;
}
