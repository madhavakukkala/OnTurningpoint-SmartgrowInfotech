import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Layout';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ContactBlock } from '@/components/ContactBlock';
import { company } from '@/content/company';
import { footerColumns } from '@/content/nav';
import { countries } from '@/content/countries';

/**
 * Footer.
 *
 * Structure follows the reference: functional links sit compactly at the top,
 * then the brand name runs edge-to-edge as the closing gesture. The wordmark is
 * sized in `vw` so it always spans the container regardless of viewport — that
 * full-bleed fit is the whole effect, and a fixed px size would break it.
 *
 * The giant wordmark is `aria-hidden`; it is decorative typography, and the
 * accessible brand name is already carried by the logo link above it.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const legalLinks = footerColumns.find((c) => c.title === 'Legal')?.links ?? [];

  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      <Container className="pb-8 pt-20 md:pt-28">
        {/* ---- Top: statement + link columns ---- */}
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="max-w-sm text-[1.625rem] font-semibold leading-[1.3] tracking-[-0.021em] text-white">
              Your turning point <span className="accent font-normal text-white/60">starts here.</span>
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-pill bg-white px-6 py-3 text-sm font-semibold text-primary transition-transform duration-300 ease-brand motion-safe:hover:-translate-y-0.5"
            >
              {company.primaryCta}
              <ArrowUpRight
                aria-hidden="true"
                size={15}
                strokeWidth={2}
                className="transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>

          <nav aria-label="Footer" className="lg:col-span-7">
            <RevealGroup className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4" step={0.05}>
              {footerColumns.map((col) => (
                <RevealItem key={col.title}>
                  <h2 className="text-eyebrow font-semibold uppercase text-white/40">{col.title}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-[0.8125rem] text-white/75 transition-colors duration-300 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              ))}
            </RevealGroup>
          </nav>
        </div>

        {/* ---- Contact + destinations ---- */}
        <Reveal className="mt-20 border-t border-white/10 pt-12">
          <ContactBlock onDark className="lg:grid-cols-4" />
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="text-eyebrow font-semibold uppercase text-white/40">Destinations</h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {countries.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/countries/${c.slug}`}
                  className="text-[0.8125rem] text-white/60 transition-colors duration-300 hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---- Small print ---- */}
        <div className="mt-20 flex flex-col gap-4 text-[0.75rem] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors duration-300 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* ---- Closing wordmark ---- */}
      <Reveal className="select-none px-4 md:px-8">
        <span
          aria-hidden="true"
          className="mx-auto block max-w-container text-center font-semibold leading-[0.78] tracking-[-0.045em] text-white/95"
          style={{ fontSize: 'clamp(3.5rem, 15.1vw, 15.5rem)' }}
        >
          {company.name}
        </span>
      </Reveal>
    </footer>
  );
}
