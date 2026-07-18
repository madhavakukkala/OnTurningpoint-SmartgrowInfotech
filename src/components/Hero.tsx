'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Container } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { MagneticCursor } from '@/components/MagneticCursor';
import { home } from '@/content/home';
import { company } from '@/content/company';
import { EASE } from '@/lib/motion';

/**
 * Home hero.
 *
 * Layout reasoning — the previous version put a full-bleed display heading above
 * a narrow text column, which left the eye with no path: the headline ended
 * nowhere near the copy that explained it. This version runs a single optical
 * line down the left (eyebrow → headline → lede → actions) so reading order and
 * visual order agree, with the photograph anchoring the right as a counterweight
 * rather than competing for first read.
 *
 * Motion is staged, not simultaneous: the eyebrow sets the frame, the headline
 * masks up per line, then supporting copy fades. Everything is one continuous
 * ~1s sequence so it reads as choreography rather than as a list of animations.
 */

const line = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: 0,
    transition: { delay: 0.15 + i * 0.09, duration: 0.85, ease: EASE },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.45 + i * 0.1, duration: 0.6, ease: EASE },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  // Gentle parallax: the photo drifts slower than the page.
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const anim = reduce ? undefined : 'show';
  const init = reduce ? undefined : 'hidden';

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden pb-16 pt-6 md:pb-24 md:pt-10">
      <MagneticCursor containerRef={sectionRef} />

      <Container>
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---- Left: the single reading column ---- */}
          <div className="lg:col-span-7">
            <motion.p
              custom={0}
              variants={fade}
              initial={init}
              animate={anim}
              className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-ink-muted"
            >
              <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
              Overseas education consultancy · Nellore
            </motion.p>

            {/* Each line masks upward from its own overflow box */}
            <h1 className="mt-7 text-display font-bold text-ink">
              <span className="block overflow-hidden py-[0.06em]">
                <motion.span custom={0} variants={line} initial={init} animate={anim} className="block">
                  {home.hero.headline}
                </motion.span>
              </span>
              <span className="block overflow-hidden py-[0.06em]">
                <motion.span custom={1} variants={line} initial={init} animate={anim} className="block">
                  <span className="accent">{home.hero.headlineAccent}</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              custom={1}
              variants={fade}
              initial={init}
              animate={anim}
              className="mt-8 max-w-[46ch] text-body text-ink-muted"
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
          </div>

          {/* ---- Right: counterweight image + inline proof ---- */}
          <div className="lg:col-span-5">
            <motion.div
              ref={imageWrapRef}
              initial={reduce ? undefined : { opacity: 0, scale: 1.04 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: EASE }}
              className="relative aspect-[4/5] overflow-hidden rounded-media shadow-card sm:aspect-[3/2] lg:aspect-[4/5]"
            >
              <motion.div style={reduce ? undefined : { y: imageY }} className="absolute inset-[-6%]">
                <Image
                  src={home.hero.image}
                  alt={home.hero.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Small proof line under the image — grounds the claim without a heavy stat band */}
            <motion.p
              custom={3}
              variants={fade}
              initial={init}
              animate={anim}
              className="mt-5 text-sm leading-relaxed text-ink-subtle"
            >
              NMC &amp; WHO approved universities across 11 countries — fees, recognition and
              timelines confirmed in writing before you commit.
            </motion.p>
          </div>
        </div>

        {/* Scroll affordance */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-16 hidden lg:block"
        >
          <span className="inline-flex items-center gap-2.5 text-eyebrow font-semibold uppercase text-ink-subtle">
            <motion.span
              aria-hidden="true"
              animate={reduce ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={14} strokeWidth={2} />
            </motion.span>
            Scroll
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
