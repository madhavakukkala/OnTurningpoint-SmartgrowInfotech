import { cn } from '@/lib/cn';

/**
 * Continuous scrolling strip for trust signals (NMC, WHO, USMLE …).
 * The track is duplicated and translated -50% so the loop is seamless.
 *
 * a11y: the whole strip is aria-hidden and the real content is exposed once in
 * a visually-hidden list, so screen readers get the items exactly once instead
 * of twice. The animation is disabled under prefers-reduced-motion (globals.css).
 */
export function Marquee({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <div className={cn('relative overflow-hidden py-6', className)}>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* `edge-fade` masks both ends so the strip dissolves rather than cutting.
          A mask beats overlaid gradients here — it works over any background,
          including the tinted sections, instead of only over white. */}
      <div aria-hidden="true" className="edge-fade flex w-max motion-safe:animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={item} className="flex items-center whitespace-nowrap">
                <span className="px-8 text-sm font-medium uppercase tracking-[0.16em] text-ink-muted">
                  {item}
                </span>
                <span className="h-1 w-1 rounded-full bg-primary/30" />
              </span>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}
