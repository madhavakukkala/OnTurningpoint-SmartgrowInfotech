'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { EASE } from '@/lib/motion';

export type FaqItem = { q: string; a: string };

/**
 * Accessible accordion.
 * Native <button> headers keep it keyboard-operable; aria-expanded and
 * aria-controls tie each header to its panel, and panels stay in the DOM order
 * expected by screen readers.
 */
export function FAQ({ items, idPrefix = 'faq' }: { items: readonly FaqItem[]; idPrefix?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${idPrefix}-panel-${i}`;
        const buttonId = `${idPrefix}-button-${i}`;

        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-primary"
              >
                <span className="text-lg font-semibold tracking-[-0.5px] text-heading">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 transition-transform duration-300 ease-brand"
                  style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                >
                  <Plus size={20} strokeWidth={1.5} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-prose pb-7 text-base leading-relaxed text-ink-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
