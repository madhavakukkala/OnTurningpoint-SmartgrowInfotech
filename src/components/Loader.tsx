'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { company } from '@/content/company';

const SESSION_KEY = 'otp-intro-shown';

/**
 * First-load intro.
 *
 * The brand mark draws in, the wordmark letters rise behind it, a hairline
 * progress rule completes, then the whole panel wipes upward to reveal the page.
 *
 * Deliberate constraints:
 * - Shown ONCE per session. A loader on every navigation is friction, not polish.
 * - Skipped entirely under `prefers-reduced-motion`.
 * - Purely decorative and `aria-hidden`; the page content is already in the DOM
 *   behind it, so screen readers and crawlers never wait on this.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    setVisible(true);
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setVisible(false);
      document.body.style.overflow = '';
    }, 1900);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  const letters = company.name.split('');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
              {/* Mark — scales up and settles */}
              <motion.svg
                width="44"
                height="55"
                viewBox="0 0 130.99 164.6"
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                <motion.path
                  fill="var(--primary)"
                  d="M33.06,164.55l-26.97.02C2.28,164.58,0,161.62,0,158.01v-73.59c0-4.1,2.77-6.54,6.79-6.54l79.11.02c3.18,0,6.11-2.42,6.11-5.61v-27.8c0-3.2-2.95-5.58-6.11-5.58H9.88c-1.89-.01-3.2-1.66-3.6-2.84-.62-1.82-.12-3.42,1.2-4.74L35.33,3.49C37.53,1.3,40.41,0,43.63,0h81.52c3.2,0,5.8,2.77,5.8,5.85v36.49c0,3.26-1.42,6.09-3.69,8.35l-62.94,62.94c-2.07,2.07-5.1,3.17-8.02,3.17l-43.9.03c-1.56,0-2.9,1.26-3.41,2.35-.65,1.4-.73,3.22.52,4.47l26.83,26.81c2.09,2.09,2.73,3.92,2.71,7.01-.02,3.35-1.8,7.1-5.99,7.1Z"
                />
                {/* The dot lands last — the "point" in OnTurningPoint */}
                <motion.circle
                  fill="var(--primary)"
                  cx="108.76"
                  cy="142.37"
                  r="22.23"
                  initial={{ scale: 0, originX: '108.76px', originY: '142.37px' }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                />
              </motion.svg>

              {/* Wordmark — letters rise behind a clipping mask */}
              <span className="flex overflow-hidden text-2xl font-semibold tracking-[-0.02em] text-ink">
                {letters.map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.28 + i * 0.022, duration: 0.55, ease: EASE }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            </div>

            {/* Hairline progress rule */}
            <div className="mt-7 h-px w-40 overflow-hidden bg-line">
              <motion.div
                className="h-full bg-primary"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
