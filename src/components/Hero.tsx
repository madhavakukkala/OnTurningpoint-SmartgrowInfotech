'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { MagneticCursor } from '@/components/MagneticCursor';
import { home } from '@/content/home';
import { company } from '@/content/company';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

/**
 * Home hero — full-bleed photograph with the headline set over it, matching the
 * statement section further down the page.
 *
 * The six-line headline is authored line by line (see home.hero.headlineLines)
 * rather than left to wrap, so every break lands where it was intended and each
 * line can mask up on its own beat. Line length is the constraint: past roughly
 * 34 characters a line re-wraps on laptop widths and the stagger falls apart.
 *
 * Legibility uses the same directional scrim as ImageStatement — heaviest on
 * the left under the copy, clearing to the right so the photograph survives.
 */

const line = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: 0,
    transition: { delay: 0.1 + i * 0.075, duration: 0.8, ease: EASE },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.55 + i * 0.09, duration: 0.55, ease: EASE },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const anim = reduce ? undefined : 'show';
  const init = reduce ? undefined : 'hidden';

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      <MagneticCursor containerRef={sectionRef} />

      <div className="relative min-h-[42rem] md:min-h-[46rem] lg:min-h-[48rem]">
        <Image
          src={home.hero.image}
          alt={home.hero.imageAlt}
          fill
          sizes="100vw"
          className="-z-20 object-cover"
          priority
        />

        {/* Directional scrim — heavy under the copy, clearing right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(18,10,9,0.9)] via-[rgba(18,10,9,0.62)] to-[rgba(18,10,9,0.2)]"
        />
        {/* Vertical softener for the stacked mobile layout */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgba(18,10,9,0.55)] to-transparent md:hidden"
        />

        <Container className="relative flex min-h-[42rem] items-center py-24 md:min-h-[46rem] lg:min-h-[48rem]">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.p
              custom={0}
              variants={fade}
              initial={init}
              animate={anim}
              className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-white/60"
            >
              <span aria-hidden="true" className="h-px w-7 bg-white/40" />
              Overseas education consultancy · Nellore
            </motion.p>

            {/* Six-line headline — one clipping box per line */}
            <h1 className="mt-8 text-display font-bold text-white">
              {home.hero.headlineLines.map((l, i) => (
                <span key={l.text} className="block overflow-hidden py-[0.055em]">
                  <motion.span
                    custom={i}
                    variants={line}
                    initial={init}
                    animate={anim}
                    className={cn('block', l.accent && 'accent text-white/85')}
                  >
                    {l.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subhead */}
            <motion.p
              custom={1}
              variants={fade}
              initial={init}
              animate={anim}
              className="mt-8 max-w-[52ch] text-body text-white/75"
            >
              {home.hero.subhead}
            </motion.p>

            {/* Actions */}
            <motion.div
              custom={2}
              variants={fade}
              initial={init}
              animate={anim}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button href="/contact" variant="onDark" className="group">
                {company.primaryCta}
                <ArrowRight
                  aria-hidden="true"
                  size={17}
                  strokeWidth={2}
                  className="transition-transform duration-300 ease-brand group-hover:translate-x-1"
                />
              </Button>
              <Button
                href="/mbbs-abroad"
                className="border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                Explore MBBS abroad
              </Button>
            </motion.div>

            {/* Inline trust row */}
            <motion.ul
              custom={3}
              variants={fade}
              initial={init}
              animate={anim}
              className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/15 pt-7"
            >
              {home.hero.highlights.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/30" />}
                  <span className="text-[0.8125rem] font-medium text-white/70">{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </Container>
      </div>
    </section>
  );
}
