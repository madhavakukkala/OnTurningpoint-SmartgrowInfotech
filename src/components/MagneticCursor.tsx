'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Soft trailing cursor, scoped to whichever element wraps it.
 *
 * A small filled dot tracks the pointer 1:1 while a larger ring lags behind on a
 * spring — the lag is what reads as "expensive" rather than gimmicky. The ring
 * scales up over interactive elements so the cursor doubles as an affordance.
 *
 * Constraints:
 * - Fine pointers only. Never renders on touch, where it would be meaningless.
 * - Skipped under `prefers-reduced-motion`.
 * - `pointer-events-none` and `aria-hidden` — purely decorative, and it never
 *   replaces the real cursor, so nothing is lost if it fails to render.
 */
export function MagneticCursor({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [inside, setInside] = useState(false);
  const [hot, setHot] = useState(false);
  const frame = useRef<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // The ring lags; the dot does not.
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    // Only on devices with a precise pointer.
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

        const target = e.target as HTMLElement | null;
        setHot(Boolean(target?.closest('a, button')));
      });
    };

    const onEnter = () => setInside(true);
    const onLeave = () => {
      setInside(false);
      setHot(false);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [enabled, containerRef, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {/* Trailing ring */}
      <motion.div
        className="absolute rounded-full border border-primary/25"
        style={{ left: ringX, top: ringY, x: '-50%', y: '-50%' }}
        animate={{
          width: hot ? 64 : 36,
          height: hot ? 64 : 36,
          opacity: inside ? (hot ? 0.9 : 0.55) : 0,
        }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Precise dot */}
      <motion.div
        className="absolute rounded-full bg-primary"
        style={{ left: x, top: y, x: '-50%', y: '-50%' }}
        animate={{
          width: hot ? 4 : 6,
          height: hot ? 4 : 6,
          opacity: inside ? 0.85 : 0,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
