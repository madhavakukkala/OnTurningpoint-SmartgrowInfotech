'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Country } from '@/content/countries';
import { CountryCard } from '@/components/CountryCard';

/**
 * Auto-advancing destination rail that stays manually scrollable.
 *
 * Built on a native `overflow-x: auto` track rather than a transform-based
 * carousel, so trackpad, touch, shift+wheel and keyboard scrolling all work for
 * free, and the scrollbar remains a real affordance. Auto-scroll simply nudges
 * `scrollLeft` on each frame.
 *
 * It pauses whenever the user is plausibly engaged — pointer over the rail,
 * keyboard focus inside it, an active touch/drag, or the tab hidden — so the
 * motion never fights the person trying to read. It resumes shortly after.
 *
 * Under `prefers-reduced-motion` the auto-scroll never starts; the rail is a
 * plain scroller. That matters here because continuous horizontal motion is a
 * common vestibular trigger.
 *
 * Accessibility: cards are ordinary links in a real list, so tab order and
 * screen-reader output are unchanged from the static grid. The arrow buttons
 * are labelled and page the rail by roughly one card.
 */
export function CountryCarousel({ items }: { items: readonly Country[] }) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLUListElement>(null);
  const rafRef = useRef<number | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = useState(false);

  /* Auto-advance loop */
  useEffect(() => {
    if (reduce || paused) return;
    const track = trackRef.current;
    if (!track) return;

    // Slow enough to read a card in passing; ~24px per second.
    const SPEED = 0.4;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(now - last, 50); // clamp after a tab-switch stall
      last = now;

      const max = track.scrollWidth - track.clientWidth;
      if (max > 0) {
        // Wrap back to the start once the end is reached.
        track.scrollLeft = track.scrollLeft >= max - 1 ? 0 : track.scrollLeft + SPEED * (dt / 16.67);
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, paused]);

  /* Pause while the tab is hidden — otherwise it silently scrolls to the end */
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  /** Pause now; resume after the user has been idle for a moment. */
  const holdThenResume = (ms = 2500) => {
    setPaused(true);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setPaused(false), ms);
  };

  useEffect(
    () => () => {
      if (resumeRef.current) clearTimeout(resumeRef.current);
    },
    []
  );

  const page = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('li');
    const amount = card ? card.getBoundingClientRect().width + 6 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: reduce ? 'auto' : 'smooth' });
    holdThenResume(4000);
  };

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        // `scrollbar-width: none` hides the bar without disabling scrolling.
        className="flex snap-x snap-mandatory gap-1.5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onPointerDown={() => holdThenResume(4000)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onWheel={() => holdThenResume()}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => holdThenResume(4000)}
      >
        {items.map((c) => (
          <li
            key={c.slug}
            className="w-[76%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[23.5%]"
          >
            <CountryCard country={c} />
          </li>
        ))}
      </ul>

      {/* Manual paging */}
      <div className="mt-7 flex items-center gap-2">
        <button
          type="button"
          onClick={() => page(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-pill border border-line text-ink transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
        >
          <span className="sr-only">Scroll destinations left</span>
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => page(1)}
          className="flex h-11 w-11 items-center justify-center rounded-pill border border-line text-ink transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
        >
          <span className="sr-only">Scroll destinations right</span>
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </button>

        <p className="ml-3 text-[0.8125rem] text-ink-subtle">
          Scroll or drag to browse all {items.length} destinations
        </p>
      </div>
    </div>
  );
}
