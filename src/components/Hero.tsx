'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { MagneticCursor } from '@/components/MagneticCursor';
import { home } from '@/content/home';
import { company } from '@/content/company';
import { EASE } from '@/lib/motion';

/**
 * Home hero — typographic, no imagery.
 *
 * With the photograph removed there is nothing to balance an asymmetric layout
 * against, so the composition is centred: a single column on the optical
 * centre line, with whitespace doing the work the image used to do. Measure is
 * capped well below the container so the headline breaks where it is meant to
 * rather than running the full 1400px.
 *
 * Motion is one continuous sequence — eyebrow, then headline lines masking up,
 * then subhead and actions — so it reads as choreography rather than as several
 * unrelated animations firing at once.
 */

const line = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: 0,
    transition: { delay: 0.12 + i * 0.085, duration: 0.8, ease: EASE },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.34 + i * 0.09, duration: 0.55, ease: EASE },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const anim = reduce ? undefined : 'show';
  const init = reduce ? undefined : 'hidden';

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden pb-20 pt-14 md:pb-28 md:pt-20"
    >
      <MagneticCursor containerRef={sectionRef} />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <motion.p
            custom={0}
            variants={fade}
            initial={init}
            animate={anim}
            className="flex items-center justify-center gap-3 text-eyebrow font-semibold uppercase text-ink-muted"
          >
            <span aria-hidden="true" className="h-px w-6 bg-primary/30" />
            Overseas education consultancy · Nellore
            <span aria-hidden="true" className="h-px w-6 bg-primary/30" />
          </motion.p>

          {/* Headline — each line masks upward from its own clipping box */}
          <h1 className="mt-8 text-display font-bold text-ink">
            <span className="block overflow-hidden py-[0.06em]">
              <motion.span
                custom={0}
                variants={line}
                initial={init}
                animate={anim}
                className="block"
              >
                {home.hero.headline}
              </motion.span>
            </span>
            <span className="block overflow-hidden py-[0.06em]">
              <motion.span
                custom={1}
                variants={line}
                initial={init}
                animate={anim}
                className="block"
              >
                <span className="accent">{home.hero.headlineAccent}</span>
              </motion.span>
            </span>
          </h1>

          {/* Subhead */}
          <motion.p
            custom={1}
            variants={fade}
            initial={init}
            animate={anim}
            className="mx-auto mt-7 max-w-[54ch] text-body text-ink-muted"
          >
            {home.hero.subhead}
          </motion.p>

          {/* Actions */}
          <motion.div
            custom={2}
            variants={fade}
            initial={init}
            animate={anim}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button href="/contact" className="group">
              {company.primaryCta}
              <ArrowRight
                aria-hidden="true"
                size={17}
                strokeWidth={2}
                className="transition-transform duration-300 ease-brand group-hover:translate-x-1"
              />
            </Button>
            <Button href="/mbbs-abroad" variant="ghost">
              Explore MBBS abroad
            </Button>
          </motion.div>

          {/* Supporting line — carries the substance the image used to */}
          <motion.p
            custom={3}
            variants={fade}
            initial={init}
            animate={anim}
            className="mx-auto mt-10 max-w-[48ch] text-sm leading-relaxed text-ink-subtle"
          >
            NMC &amp; WHO approved universities across 11 countries. Fees, recognition and timelines
            confirmed in writing before you commit.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
