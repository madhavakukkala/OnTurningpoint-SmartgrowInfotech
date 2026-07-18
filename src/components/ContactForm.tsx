'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';

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
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-card bg-section-cool p-10 md:p-12"
      >
        <h3 className="text-2xl font-bold tracking-[-0.5px] text-ink">Thank you — we have your enquiry.</h3>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-muted">
          Our team will get back to you within 24 hours. If it is urgent, call us on any of the
          numbers listed above.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 text-base font-semibold text-ink underline underline-offset-4 hover:text-primary"
        >
          Send another enquiry
        </button>
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

      {status === 'error' && (
        <p role="alert" className="text-base font-medium text-primary">
          Something went wrong sending your enquiry. Please try again, or email us directly at
          onturningpoint@gmail.com.
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
