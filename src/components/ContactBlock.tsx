import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { contact, telHref } from '@/content/company';
import { cn } from '@/lib/cn';

/**
 * Reusable contact block (BRIEF §7) — reused in the footer, the CTA band and
 * on the contact page. Phones are `tel:` links and email is a `mailto:` link so
 * they are actionable on mobile.
 */
export function ContactBlock({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  const label = onDark ? 'text-white/60' : 'text-ink-subtle';
  const value = onDark ? 'text-white' : 'text-ink';
  const link = onDark ? 'text-white hover:text-white/70' : 'text-ink hover:text-primary';

  const rows = [
    {
      icon: MapPin,
      label: 'Visit us',
      content: (
        <address className={cn('not-italic leading-relaxed', value)}>
          {contact.address.line1},<br />
          {contact.address.line2},<br />
          {contact.address.city}, {contact.address.region} — {contact.address.postalCode}
        </address>
      ),
    },
    {
      icon: Phone,
      label: 'Call us',
      content: (
        <ul className={cn('space-y-1', value)}>
          {contact.phones.map((p) => (
            <li key={p}>
              <a href={telHref(p)} className={cn('transition-colors', link)}>
                {p}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: Mail,
      label: 'Email us',
      content: (
        <a href={`mailto:${contact.email}`} className={cn('break-all transition-colors', link)}>
          {contact.email}
        </a>
      ),
    },
    {
      icon: Clock,
      label: 'Opening hours',
      content: (
        <p className={value}>
          {contact.hours.weekdays}
          <br />
          <span className={label}>{contact.hours.sunday}</span>
        </p>
      ),
    },
  ];

  return (
    <div className={cn('grid gap-10 sm:grid-cols-2', className)}>
      {rows.map(({ icon: Icon, label: rowLabel, content }) => (
        <div key={rowLabel} className="flex gap-4">
          <Icon
            aria-hidden="true"
            size={20}
            strokeWidth={1.5}
            className={cn('mt-1 shrink-0', onDark ? 'text-white/70' : 'text-ink-subtle')}
          />
          <div className="text-base">
            <p className={cn('mb-2 text-eyebrow font-semibold uppercase', label)}>{rowLabel}</p>
            {content}
          </div>
        </div>
      ))}
    </div>
  );
}
