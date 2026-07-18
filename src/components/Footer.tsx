import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Layout';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { company, contact, telHref } from '@/content/company';
import { footerColumns } from '@/content/nav';
import { countries } from '@/content/countries';
import { SITE_URL } from '@/lib/seo';

/**
 * Footer — white card, following the reference layout: a brand block on the
 * left carrying the QR code and direct contact routes, multi-column links on
 * the right, and a hairline bottom bar for copyright and legal.
 *
 * Deliberately NOT copied from the reference, because the equivalents do not
 * exist for this business and inventing them would be false advertising:
 *   - App Store badge — there is no OnTurningPoint app.
 *   - "Hear from our CEO / play video" — no such video was supplied.
 *   - Social icons — no verified handles were provided. Adding placeholder
 *     links would send students to accounts that may not be the client's.
 *   - Newsletter signup — there is no mailing list or backend to receive it;
 *     a form that silently discards addresses is worse than no form.
 * The QR block takes that space instead. Add any of the above once the client
 * confirms they exist.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const legalLinks = footerColumns.find((c) => c.title === 'Legal')?.links ?? [];
  const linkColumns = footerColumns.filter((c) => c.title !== 'Legal');

  return (
    <footer className="bg-surface pb-6 pt-2">
      {/* The footer sits as a card on a tinted ground, so it reads as a
          distinct surface rather than as more page. */}
      <div className="mx-4 rounded-card bg-bg px-0 py-16 md:mx-8 md:py-20">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
            {/* ---- Brand block ---- */}
            <Reveal className="lg:col-span-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5"
                aria-label={`${company.name} — home`}
              >
                <Image
                  src="/logo/logo-mark.svg"
                  alt=""
                  width={22}
                  height={28}
                  className="h-7 w-auto"
                />
                <span className="text-[1.0625rem] font-semibold text-heading">{company.name}</span>
              </Link>

              <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
                <span className="font-semibold text-ink">Not sure where to start?</span> Book a free
                consultation and we will tell you honestly what your marks, budget and goal can
                reach.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-white shadow-subtle transition-all duration-300 ease-brand hover:bg-primary-soft motion-safe:hover:-translate-y-0.5"
              >
                {company.primaryCta}
              </Link>

              {/* QR + direct contact */}
              <div className="mt-10 flex flex-wrap items-stretch gap-2">
                <div className="flex flex-col items-center rounded-card bg-surface p-4">
                  <Image
                    src="/qr-site.svg"
                    alt={`QR code linking to ${SITE_URL.replace(/^https?:\/\//, '')}`}
                    width={104}
                    height={104}
                    className="h-[104px] w-[104px]"
                  />
                  <span className="mt-3 text-[0.6875rem] leading-tight text-ink-subtle">
                    Scan to visit
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-center rounded-card bg-surface p-5">
                  <span className="text-eyebrow font-semibold uppercase text-ink-subtle">
                    Talk to us
                  </span>
                  <a
                    href={telHref(contact.phones[0])}
                    className="mt-2 block text-[0.9375rem] font-semibold text-ink transition-colors hover:text-primary"
                  >
                    {contact.phones[0]}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1 block break-all text-[0.8125rem] text-ink-muted transition-colors hover:text-ink"
                  >
                    {contact.email}
                  </a>
                  <span className="mt-3 block text-[0.75rem] leading-snug text-ink-subtle">
                    {contact.hours.weekdays}
                  </span>
                </div>
              </div>
            </Reveal>

            {/* ---- Link columns ---- */}
            <nav aria-label="Footer" className="lg:col-span-8">
              <RevealGroup
                className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
                step={0.05}
              >
                {linkColumns.map((col) => (
                  <RevealItem key={col.title}>
                    <h2 className="text-eyebrow font-semibold uppercase text-ink-subtle">
                      {col.title}
                    </h2>
                    <ul className="mt-5 space-y-3">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-[0.875rem] text-ink transition-colors duration-300 hover:text-ink-muted"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </RevealItem>
                ))}

                {/* Destinations gets its own column to match the reference's
                    four-column rhythm rather than wrapping as a loose list. */}
                <RevealItem>
                  <h2 className="text-eyebrow font-semibold uppercase text-ink-subtle">
                    Destinations
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {countries.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/countries/${c.slug}`}
                          className="text-[0.875rem] text-ink transition-colors duration-300 hover:text-ink-muted"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              </RevealGroup>
            </nav>
          </div>

          {/* ---- Bottom bar ---- */}
          <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 text-[0.75rem] text-ink-subtle md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {company.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors duration-300 hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
