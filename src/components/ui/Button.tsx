import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost' | 'onDark';

/**
 * Pill buttons — BRIEF §2.4.
 * There is exactly ONE filled CTA colour on this site (espresso brown).
 * Secondary actions use the ghost/text style, never a second brand colour.
 */
const base =
  'inline-flex items-center justify-center gap-2 rounded-pill px-8 py-4 text-base font-semibold ' +
  'transition duration-300 ease-brand motion-safe:hover:-translate-y-0.5 ' +
  'disabled:pointer-events-none disabled:opacity-60';

const variantClass: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-soft shadow-subtle',
  ghost: 'border border-line text-ink hover:border-ink hover:bg-surface',
  onDark: 'bg-white text-primary hover:bg-white/90',
};

type Common = { variant?: Variant; className?: string; children: ReactNode };

type LinkButtonProps = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> & {
    href: string;
  };

type NativeButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
  };

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = 'primary', className, children } = props;
  const classes = cn(base, variantClass[variant], className);

  // Strip the presentational props so the rest can be spread onto the element.
  const rest = { ...props } as Record<string, unknown>;
  delete rest.variant;
  delete rest.className;
  delete rest.children;
  delete rest.href;

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
