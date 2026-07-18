import { NextResponse } from 'next/server';

/**
 * Contact form endpoint → Google Sheets.
 *
 * Validates server-side (never trust the client), screens obvious bots, then
 * forwards the enquiry to a Google Apps Script web app that appends a row to
 * the enquiries spreadsheet.
 *
 * Setup instructions live in scripts/google-apps-script.gs.
 * Requires two environment variables:
 *   GOOGLE_SHEETS_WEBHOOK_URL
 *   GOOGLE_SHEETS_SHARED_SECRET
 *
 * If those are unset (local development), the enquiry is logged to the server
 * console and reported as a FAILURE rather than a success. Silently accepting
 * an enquiry that goes nowhere is the worst possible behaviour here — the
 * visitor would believe someone is going to call them back.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Apps Script can be slow to cold-start; beyond this the visitor is waiting too long. */
const TIMEOUT_MS = 8000;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name, email, phone, message, company } = (body ?? {}) as Record<string, unknown>;

  /**
   * Honeypot. `company` is hidden from real users, so anything in it is a bot.
   * Returns 200 OK deliberately — telling a spammer they were detected just
   * invites another attempt with the field left blank.
   */
  if (typeof company === 'string' && company.trim() !== '') {
    console.warn('[contact] honeypot triggered, discarding submission');
    return NextResponse.json({ ok: true });
  }

  const errors: string[] = [];
  if (typeof name !== 'string' || !name.trim()) errors.push('name');
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) errors.push('email');
  if (typeof phone !== 'string' || !phone.trim()) errors.push('phone');
  if (typeof message !== 'string' || !message.trim()) errors.push('message');

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Invalid or missing fields: ${errors.join(', ')}.` },
      { status: 400 }
    );
  }

  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_SHARED_SECRET;

  const enquiry = {
    name: (name as string).trim(),
    email: (email as string).trim(),
    phone: (phone as string).trim(),
    message: (message as string).trim(),
  };

  if (!webhook || !secret) {
    console.warn(
      '[contact] GOOGLE_SHEETS_WEBHOOK_URL / GOOGLE_SHEETS_SHARED_SECRET are not set — ' +
        'the enquiry was NOT recorded anywhere:',
      enquiry
    );
    return NextResponse.json(
      { ok: false, error: 'The enquiry service is not configured.' },
      { status: 503 }
    );
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...enquiry, secret }),
      // Apps Script answers with a 302 to script.googleusercontent.com.
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timer);

    // Apps Script returns 200 even for its own internal errors, so the body
    // has to be inspected rather than trusting the status code.
    const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

    if (!res.ok || !result?.ok) {
      console.error('[contact] sheets webhook rejected the enquiry:', result?.error ?? res.status, enquiry);
      return NextResponse.json(
        { ok: false, error: 'Could not record the enquiry.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Logged in full so a failed enquiry is at least recoverable from the
    // host's logs rather than lost outright.
    console.error('[contact] sheets webhook unreachable:', err, enquiry);
    return NextResponse.json({ ok: false, error: 'Could not record the enquiry.' }, { status: 502 });
  }
}
