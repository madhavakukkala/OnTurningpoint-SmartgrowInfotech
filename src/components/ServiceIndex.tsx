'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

export type ServiceItem = {
  title: string;
  body: string;
  href: string;
  image?: string;
  imageAlt?: string;
};

/**
 * Services index — an editorial list where hovering a row summons a preview
 * image that trails the pointer.
 *
 * Why this shape: seven services is too many for a card grid without the page
 * turning into wallpaper, but a plain list has no visual payoff. Putting the
 * imagery on hover keeps the resting state quiet — a clean typographic index —
 * while rewarding exploration.
 *
 * Implementation notes:
 * - Every preview image is mounted and cross-faded by opacity, so switching
 *   rows never flashes an unloaded image.
 * - Pointer position is read on rAF and fed through a spring, so the preview
 *   lags rather than snapping. The lag is what makes it feel considered.
 * - The preview is decorative: `aria-hidden`, pointer-events-none, and shown
 *   only for fine pointers with motion allowed. Touch and keyboard users get a
 *   static thumbnail in the row instead, so nobody depends on hover to see the
 *   imagery.
 */
export function ServiceIndex({ items }: { items: readonly ServiceItem[] }) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 190, damping: 24, mass: 0.5 });
  const py = useSpring(y, { stiffness: 190, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const rect = el.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      });
    };

    el.addEventListener('pointermove', onMove);
    return () => {
      el.removeEventListener('pointermove', onMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [enabled, x, y]);

  return (
    <div ref={containerRef} className="relative" onPointerLeave={() => setActive(null)}>
      {/* Cursor-tracked preview */}
      {enabled && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-20 hidden lg:block"
          style={{ left: px, top: py, x: '-50%', y: '-50%' }}
          animate={{
            opacity: active === null ? 0 : 1,
            scale: active === null ? 0.92 : 1,
          }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="relative h-[15rem] w-[19rem] overflow-hidden rounded-media shadow-lift">
            {items.map((item, i) =>
              item.image ? (
                <motion.div
                  key={item.href}
                  className="absolute inset-0"
                  animate={{ opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="19rem"
                    className="object-cover"
                  />
                </motion.div>
              ) : null
            )}
          </div>
        </motion.div>
      )}

      <ul className="border-t border-line">
        {items.map((item, i) => {
          const isActive = active === i;
          const dimmed = active !== null && !isActive;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={cn(
                  'group relative flex items-center gap-5 border-b border-line py-6 transition-opacity duration-500 ease-brand md:gap-8 md:py-8',
                  // Non-hovered rows recede, which focuses the eye on the active one
                  dimmed ? 'opacity-40' : 'opacity-100'
                )}
              >
                {/* Index */}
                <span
                  aria-hidden="true"
                  className="w-7 shrink-0 text-[0.75rem] font-medium tabular-nums text-ink-subtle"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Static thumbnail — the fallback for touch and keyboard */}
                {item.image && (
                  <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md2 lg:hidden">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="4rem"
                      className="object-cover"
                    />
                  </span>
                )}

                {/* Title — slides right on hover */}
                <h3
                  className={cn(
                    'flex-1 text-[1.375rem] font-semibold text-ink transition-transform duration-500 ease-brand md:text-[1.75rem] md:flex-none md:w-[38%]',
                    'motion-safe:group-hover:translate-x-2'
                  )}
                >
                  {item.title}
                </h3>

                <p className="hidden flex-1 text-[0.9375rem] text-ink-muted md:block">{item.body}</p>

                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-line text-ink-subtle transition-all duration-500 ease-brand group-hover:border-primary group-hover:bg-primary group-hover:text-white"
                >
                  <ArrowUpRight size={15} strokeWidth={2} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
