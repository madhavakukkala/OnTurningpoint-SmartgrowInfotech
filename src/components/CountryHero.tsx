import Image from 'next/image';
import Link from 'next/link';
import { Container, Eyebrow } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/content/company';
import type { Country } from '@/content/countries';

/**
 * Country page hero — a full-width photograph of the destination, with the
 * heading and overview set below it so the type still leads the page.
 */
export function CountryHero({ country }: { country: Country }) {
  const isMbbs = country.kind === 'mbbs';

  return (
    <header className="pb-12 pt-8 md:pb-16 md:pt-12">
      <Container>
        {/* Breadcrumb — orients the visitor and gives search engines the hierarchy */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/countries" className="transition-colors hover:text-primary">
                Destinations
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span aria-current="page" className="text-ink">
                {country.name}
              </span>
            </li>
          </ol>
        </nav>

        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-media shadow-card md:aspect-[21/9]">
            <Image
              src={country.image}
              alt={country.imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Eyebrow>{isMbbs ? 'MBBS destination' : 'Study abroad destination'}</Eyebrow>
            <Heading as="h1" size="display" accent={isMbbs ? 'abroad' : undefined} className="mt-6">
              {isMbbs ? `MBBS in ${country.name}` : `Study in ${country.name}`}
            </Heading>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pt-4" delay={0.08}>
            <Lede>{country.overview}</Lede>
            <div className="mt-10">
              <Button href="/contact">{company.primaryCta}</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </header>
  );
}
