'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { company } from '@/content/company';
import { countryLinks, primaryNav, serviceLinks, type NavLink } from '@/content/nav';
import { EASE } from '@/lib/motion';
import { useFocusTrap } from '@/lib/useFocusTrap';
import { cn } from '@/lib/cn';

const menus: Record<string, NavLink[]> = {
  Services: serviceLinks,
  Countries: countryLinks,
};

/**
 * Floating pill navigation.
 *
 * At the top of the page the bar is invisible — just the logo, links and CTA
 * sitting on the page. Once scrolled, the link group condenses into a frosted
 * glass pill that lifts off the content. The active link is tracked by a shared
 * `layoutId` element so it slides between items instead of cutting.
 */
export function Nav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useFocusTrap(mobileRef, mobileOpen);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[70] focus:rounded-pill focus:bg-primary focus:px-6 focus:py-3 focus:text-white"
      >
        Skip to main content
      </a>

      <nav
        ref={navRef}
        aria-label="Primary"
        className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-8 md:pt-5"
      >
        <div className="mx-auto flex max-w-container items-center justify-between gap-6">
          {/* Logo — deliberately left outside the pill */}
          <Link
            href="/"
            className={cn(
              'flex shrink-0 items-center gap-2.5 rounded-pill px-3 py-2 transition-all duration-500 ease-brand',
              scrolled && 'glass'
            )}
            aria-label={`${company.name} — home`}
          >
            <Image
              src="/logo/logo-mark.svg"
              alt=""
              width={22}
              height={28}
              priority
              className="h-6 w-auto"
            />
            <span className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">
              {company.name}
            </span>
          </Link>

          {/* Desktop link pill */}
          <div
            className={cn(
              'hidden items-center rounded-pill p-1.5 transition-all duration-500 ease-brand lg:flex',
              scrolled ? 'glass' : 'border border-transparent'
            )}
          >
            <ul className="flex items-center gap-0.5">
              {primaryNav.map((item) => {
                const submenu = menus[item.label];
                const active = isActive(item.href);
                const panelId = `${menuId}-${item.label}`;
                const open = openMenu === item.label;

                const inner = (
                  <>
                    {/* Sliding active pill — shared layoutId animates between items */}
                    {active && !reduce && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-pill bg-primary/[0.07]"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                    {active && reduce && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-pill bg-primary/[0.07]"
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </>
                );

                const cls = cn(
                  'relative flex items-center gap-1 rounded-pill px-4 py-2 text-nav font-medium transition-colors duration-300',
                  active ? 'text-ink' : 'text-ink-muted hover:text-ink'
                );

                if (!submenu) {
                  return (
                    <li key={item.href}>
                      <Link href={item.href} aria-current={active ? 'page' : undefined} className={cls}>
                        {inner}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.href} className="relative">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenMenu(open ? null : item.label)}
                      className={cls}
                    >
                      {inner}
                      <ChevronDown
                        aria-hidden="true"
                        size={14}
                        strokeWidth={2}
                        className={cn(
                          'relative transition-transform duration-300 ease-brand',
                          open && 'rotate-180'
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {open && (
                        <motion.div
                          id={panelId}
                          initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={reduce ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.26, ease: EASE }}
                          style={{ transformOrigin: 'top center' }}
                          className={cn(
                            'glass absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-lg2 p-2',
                            item.label === 'Countries' ? 'w-[32rem]' : 'w-[24rem]'
                          )}
                        >
                          <ul className={cn('grid gap-0.5', item.label === 'Countries' && 'grid-cols-2')}>
                            {submenu.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="block rounded-md2 px-3.5 py-2.5 transition-colors duration-200 hover:bg-primary/[0.05]"
                                >
                                  <span className="block text-[0.8125rem] font-semibold tracking-[-0.01em] text-ink">
                                    {link.label}
                                  </span>
                                  {link.description && (
                                    <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                                      {link.description}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA + mobile trigger */}
          <div className="flex shrink-0 items-center gap-2">
            <Button href="/contact" className="hidden px-5 py-2.5 text-[0.8125rem] lg:inline-flex">
              {company.primaryCta}
            </Button>

            <button
              type="button"
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-pill transition-all duration-500 ease-brand lg:hidden',
                scrolled && 'glass'
              )}
              aria-expanded={mobileOpen}
              aria-controls={`${menuId}-mobile`}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
              {mobileOpen ? (
                <X aria-hidden="true" size={20} strokeWidth={1.75} />
              ) : (
                <Menu aria-hidden="true" size={20} strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id={`${menuId}-mobile`}
              ref={mobileRef}
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="glass mt-3 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-lg2 p-6 lg:hidden"
            >
              <ul>
                {primaryNav
                  .filter((i) => !menus[i.label])
                  .map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                        className="block border-b border-line py-3.5 text-xl font-semibold tracking-[-0.015em] text-ink"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
              </ul>

              {Object.entries(menus).map(([title, links]) => (
                <div key={title} className="mt-8">
                  <h2 className="text-eyebrow font-semibold uppercase text-ink-subtle">{title}</h2>
                  <ul className="mt-3 grid grid-cols-2 gap-x-6">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block border-b border-line py-2.5 text-[0.9375rem] text-ink-muted"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <Button href="/contact" className="mt-8 w-full py-3.5 text-[0.9375rem]">
                {company.primaryCta}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
