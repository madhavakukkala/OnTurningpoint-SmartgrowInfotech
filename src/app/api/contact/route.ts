import { NextResponse } from 'next/server';

/**
 * Contact form endpoint — STUB.
 *
 * It validates the payload server-side (never trust the client) and logs it.
 * TODO(integration): replace the console.log below with your real destination —
 * e.g. Resend / SendGrid for email, or a POST into your CRM. The response shape
 * ({ ok: true }) is what ContactForm expects, so swapping the body out is enough.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name, email, phone, message } = (body ?? {}) as Record<string, unknown>;

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

  console.log('[contact] new enquiry', {
    name,
    email,
    phone,
    message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
