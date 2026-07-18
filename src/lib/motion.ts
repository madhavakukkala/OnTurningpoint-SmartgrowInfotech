import type { Variants } from 'framer-motion';

/**
 * Shared motion vocabulary — BRIEF §2.5.
 * Subtle only: fade-up / slide / scale, ~300ms, eased, staggered on scroll-in.
 * `prefers-reduced-motion` is honoured globally in globals.css and per-component
 * via framer-motion's `useReducedMotion`.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

/** Parent wrapper that staggers its children as they scroll into view. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Consistent viewport config so sections animate once, slightly before entry. */
export const viewportOnce = { once: true, margin: '-80px' } as const;
