import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Country } from '@/content/countries';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

/**
 * Destination card — the copy sits inside the photograph over a gradient scrim.
 *
 * Legibility: the scrim is a three-stop gradient reaching 88% black at the base,
 * which holds white text above 4.5:1 even over the brightest images in the set
 * (the snow in country-kyrgyzstan and the sky in country-philippines were the
 * two worst cases). It is NOT a flat 50% overlay — that would either wash out
 * the image or under-protect the text depending on the photo.
 */
export function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group relative block h-full overflow-hidden rounded-media shadow-card transition-shadow duration-500 ease-brand hover:shadow-lift"
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4]">
        <Image
          src={country.image}
          alt={country.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-brand motion-safe:group-hover:scale-[1.06]"
        />

        {/* Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[rgba(2,24,34,0.88)] via-[rgba(2,24,34,0.35)] to-transparent"
        />

        {/* Copy */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[1.375rem] font-semibold tracking-[-0.5px] text-white">
              {country.name}
            </h3>
            <span
              aria-hidden="true"
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border border-white/30 text-white transition-all duration-500 ease-brand group-hover:border-white group-hover:bg-white group-hover:text-primary"
            >
              <ArrowUpRight size={15} strokeWidth={2} />
            </span>
          </div>

          {/*
            The blurb is clipped to zero height and expands on hover/focus, so the
            resting state stays calm. `max-h` rather than `display` keeps it in the
            accessibility tree at all times — screen readers always announce it.
          */}
          <p className="mt-0 max-h-0 overflow-hidden text-sm leading-relaxed text-white/75 opacity-0 transition-all duration-500 ease-brand group-hover:mt-2.5 group-hover:max-h-24 group-hover:opacity-100 group-focus-visible:mt-2.5 group-focus-visible:max-h-24 group-focus-visible:opacity-100 motion-reduce:mt-2.5 motion-reduce:max-h-24 motion-reduce:opacity-100">
            {country.cardBlurb}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function CountryGrid({ items }: { items: readonly Country[] }) {
  return (
    <RevealGroup as="ul" className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3" step={0.06}>
      {items.map((c) => (
        <RevealItem as="li" key={c.slug}>
          <CountryCard country={c} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
