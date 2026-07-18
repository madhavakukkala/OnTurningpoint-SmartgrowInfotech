'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { MagneticCursor } from '@/components/MagneticCursor';
import { home } from '@/content/home';
import { company } from '@/content/company';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';

/**
 * Home hero — near-black full-viewport panel with the copy in the left third
 * and a supporting stat rail pinned to the bottom.
 *
 * The photograph is retained but taken down to roughly 10% visibility, which is
 * how the reference treats its own image: it reads as texture and depth in an
 * otherwise black field rather than as a picture. Keeping it that low also
 * means the white type sits on a near-uniform ground, so contrast does not
 * depend on which part of the photo a line happens to land over.
 *
 * The section pulls itself up under the fixed nav with a negative margin that
 * cancels the padding on <main>, so the panel runs edge to edge behind it.
 */

const line = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: 0,
    transition: { delay: 0.12 + i * 0.09, duration: 0.85, ease: EASE },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.1, duration: 0.6, ease: EASE },
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
      // Cancels the top padding on <main> so the panel sits behind the nav.
      className="relative isolate -mt-24 flex min-h-[100svh] flex-col overflow-hidden bg-[#021D29] md:-mt-28"
    >
      <MagneticCursor containerRef={sectionRef} />

      <Image
        src={home.hero.image}
        alt={home.hero.imageAlt}
        fill
        sizes="100vw"
        priority
        className="-z-20 object-cover opacity-[0.55]"
      />
      {/*
        Directional scrim rather than an even vignette. The copy occupies the
        left column, so the darkness is concentrated there and clears across to
        the right — that lets the photograph read properly on the open side
        while the type still sits on a near-black ground. An even overlay would
        have to be dark enough for the text everywhere, which is what made the
        previous version look flat.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[rgba(2,29,41,0.94)] via-[rgba(2,29,41,0.72)] to-[rgba(2,29,41,0.34)]"
      />
      {/* Floor for the stat rail, which runs the full width */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-[rgba(2,29,41,0.92)] to-transparent"
      />

      {/* ---- Main copy ---- */}
      <Container className="relative flex flex-1 items-center pb-16 pt-36 md:pt-40">
        <div className="max-w-2xl">
          {/* Eligibility line */}
          <motion.p
            custom={0}
            variants={fade}
            initial={init}
            animate={anim}
            className="flex items-center gap-2.5 text-[0.9375rem] text-white"
          >
            <Check aria-hidden="true" size={16} strokeWidth={2.25} />
            {home.hero.eligibility}
          </motion.p>

          {/* Four-word headline across two lines */}
          <h1 className="mt-5 text-display font-bold text-white">
            {home.hero.headlineLines.map((l, i) => (
              <span key={l.text} className="block overflow-hidden py-[0.055em]">
                <motion.span
                  custom={i}
                  variants={line}
                  initial={init}
                  animate={anim}
                  className={cn('block', l.accent && 'accent text-white/90')}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            custom={1}
            variants={fade}
            initial={init}
            animate={anim}
            className="mt-6 max-w-[46ch] text-[0.9375rem] font-medium text-white"
          >
            {home.hero.subhead}
          </motion.p>

          <motion.div
            custom={2}
            variants={fade}
            initial={init}
            animate={anim}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button href="/contact" variant="onDark">
              {company.primaryCta}
            </Button>
            <Button
              href="/mbbs-abroad"
              className="bg-white/[0.12] text-white backdrop-blur-sm hover:bg-white/20"
            >
              Explore MBBS abroad
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* ---- Bottom stat rail ---- */}
      <Container className="relative pb-12 md:pb-14">
        <motion.dl
          custom={3}
          variants={fade}
          initial={init}
          animate={anim}
          className="flex flex-wrap gap-y-6"
        >
          {home.hero.heroStats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                'pr-8 md:pr-10',
                // Hairline rules between items, matching the reference
                i > 0 && 'border-l border-white/20 pl-8 md:pl-10'
              )}
            >
              <dt className="text-[0.9375rem] font-semibold text-white">{s.label}</dt>
              <dd className="mt-1 text-[0.9375rem] text-white/55">{s.detail}</dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
