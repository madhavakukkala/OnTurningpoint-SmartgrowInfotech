'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { whatsappHref } from '@/content/company';

type Fields = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Indian mobile numbers: 10 digits, optionally with +91 / 0 prefix and spacing. */
const PHONE_RE = /^(\+?91[-\s]?)?[0]?[6-9]\d{9}$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = 'Please enter a valid email address, for example name@example.com.';
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!PHONE_RE.test(values.phone.replace(/[\s-]/g, '')))
    errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
  if (!values.message.trim()) errors.message = 'Please tell us how we can help.';
  return errors;
}

const EMPTY: Fields = { name: '', email: '', phone: '', message: '' };

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  /** Honeypot. Hidden from real users; bots fill every field they can find. */
  const [honeypot, setHoneypot] = useState('');
  /** Built on success, so the WhatsApp message carries the enquiry details. */
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const set = (field: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    // Clear the error as soon as the user starts correcting the field
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first field with an error so keyboard and screen-reader
      // users are taken straight to what needs fixing.
      const first = (Object.keys(found) as (keyof Fields)[])[0];
      document.getElementById(first)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // `company` is the honeypot — empty for real users, filled by bots.
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      if (!res.ok) throw new Error('Request failed');

      // Hand off to WhatsApp with the enquiry already written out, so the
      // conversation starts with context rather than "hi".
      const handoff = whatsappHref(
        `Hi OnTurningPoint, I just submitted an enquiry on your website.\n\n` +
          `Name: ${values.name}\n` +
          `Phone: ${values.phone}\n\n` +
          values.message
      );
      setWhatsappUrl(handoff);

      /**
       * Best-effort auto-open. Browsers only allow window.open inside a user
       * gesture, and awaiting the fetch has already ended that window, so
       * Safari and Firefox will usually block this. That is why the success
       * panel always shows a real link as well — the button is the reliable
       * path, this is a convenience when it happens to work.
       */
      window.open(handoff, '_blank', 'noopener,noreferrer');

      setStatus('success');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-card bg-section-cool p-10 md:p-12">
        <h3 className="text-2xl font-bold tracking-[-0.5px] text-heading">
          Thank you — we have your enquiry.
        </h3>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-muted">
          Our team will get back to you within 24 hours. To get an answer sooner, continue the
          conversation on WhatsApp — your details are already filled in.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a
            href={whatsappUrl || whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            /*
              WhatsApp brand green, with a dark-green label rather than white:
              white on #25D366 is 1.98:1, the dark label is 6.20:1.
              The 1px darker border is there because the fill itself is only
              1.74:1 against this panel, so without it the button's edge is not
              discernible (WCAG 1.4.11). The border reads 3.77:1.
            */
            className="inline-flex items-center gap-2.5 rounded-pill border border-[#178C46] bg-[#25D366] px-6 py-3.5 text-[0.9375rem] font-semibold text-[#0B3D25] transition-transform duration-300 ease-brand motion-safe:hover:-translate-y-0.5"
          >
            <MessageCircle aria-hidden="true" size={18} strokeWidth={2} />
            Continue on WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="text-base font-semibold text-ink underline underline-offset-4 hover:text-primary"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <Field
        id="name"
        label="Full name"
        value={values.name}
        onChange={set('name')}
        error={errors.name}
        autoComplete="name"
      />
      <Field
        id="email"
        label="Email address"
        type="email"
        value={values.email}
        onChange={set('email')}
        error={errors.email}
        autoComplete="email"
      />
      <Field
        id="phone"
        label="Phone number"
        type="tel"
        value={values.phone}
        onChange={set('phone')}
        error={errors.phone}
        autoComplete="tel"
      />
      <Field
        id="message"
        label="How can we help?"
        value={values.message}
        onChange={set('message')}
        error={errors.message}
        textarea
      />

      {/*
        Honeypot. Positioned off-screen rather than display:none — bots often
        skip hidden inputs, but they do fill absolutely-positioned ones. Kept
        out of the tab order and out of the accessibility tree so no real user
        can reach it by keyboard or screen reader.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave this field empty)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-base font-medium text-primary">
          Something went wrong and your enquiry was not sent. Please call us on{' '}
          <a href="tel:+918500470231" className="underline underline-offset-4">
            8500470231
          </a>{' '}
          or email{' '}
          <a href="mailto:onturningpoint@gmail.com" className="underline underline-offset-4">
            onturningpoint@gmail.com
          </a>{' '}
          so we do not miss you.
        </p>
      )}

      <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
        {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
      </Button>

      <p className="text-sm text-ink-subtle">
        Our team will get back to you within 24 hours.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  textarea = false,
  autoComplete,
}: {
  id: keyof Fields;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const errorId = `${id}-error`;
  const shared = cn(
    'w-full rounded-lg2 border bg-white px-5 py-4 text-base text-ink transition-colors',
    'placeholder:text-ink-subtle focus:border-primary',
    error ? 'border-primary' : 'border-line'
  );

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={onChange}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(shared, 'resize-y')}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={shared}
        />
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm font-medium text-primary">
          {error}
        </p>
      )}
    </div>
  );
}
