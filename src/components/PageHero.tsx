import Image from 'next/image';
import { Container, Eyebrow } from '@/components/ui/Layout';
import { Heading, Lede } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/content/company';

/**
 * Shared hero for every inner page. Type leads, the image supports —
 * whitespace still carries the layout (BRIEF §2.7).
 */
export function PageHero({
  eyebrow,
  headline,
  headlineAccent,
  intro,
  image,
  imageAlt,
  cta = true,
}: {
  eyebrow: string;
  headline: string;
  headlineAccent?: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  cta?: boolean;
}) {
  return (
    <header className="pb-12 pt-12 md:pb-16 md:pt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading as="h1" size="display" accent={headlineAccent} className="mt-6">
              {headline}
            </Heading>
            <Lede className="mt-8">{intro}</Lede>
            {cta && (
              <div className="mt-10">
                <Button href="/contact">{company.primaryCta}</Button>
              </div>
            )}
          </Reveal>

          {image && (
            <Reveal className="lg:col-span-5" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-media shadow-card lg:aspect-[3/4]">
                <Image
                  src={image}
                  alt={imageAlt ?? ''}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </header>
  );
}
