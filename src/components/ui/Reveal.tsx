'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/cn';

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'ul' | 'ol' | 'article' | 'header';
};

/**
 * Scroll-into-view reveal. Renders a plain element (no transform) when the user
 * prefers reduced motion, so nothing animates and nothing is left hidden.
 */
export function Reveal({ children, className, variants = fadeUp, delay = 0, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers direct `RevealItem` children as the group scrolls into view.
 * Use for card grids and lists.
 */
export function RevealGroup({
  children,
  className,
  step = 0.07,
  delay = 0,
  as = 'div',
}: Omit<RevealProps, 'variants'> & { step?: number }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={stagger(step, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

/** A child of `RevealGroup`. Inherits the parent's stagger timing. */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = 'div',
}: Omit<RevealProps, 'delay'>) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={cn(className)} variants={variants}>
      {children}
    </MotionTag>
  );
}
