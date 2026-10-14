import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactEmail from '@/emails/ContactEmail';

// Limits are mirrored by the maxLength attributes in ContactForm.tsx.
const NAME_MAX = 100;
const EMAIL_MAX = 254;
const MESSAGE_MAX = 5000;
// Submissions faster than this are almost certainly bots.
const MIN_SUBMIT_MS = 3000;

// Deliberately simple: one @, a dot in the domain, and no whitespace, commas,
// semicolons or line breaks (which could be abused for header injection).
const EMAIL_RE = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const fail = (message: string, status: number) =>
  NextResponse.json({ success: false, message }, { status });

// Returned to bots so they can't tell they were filtered out.
const fakeSuccess = () =>
  NextResponse.json({ success: true, message: 'Email sent successfully' });

export async function POST(request: Request) {
  // Reject cross-site posts. Same-origin fetches send a matching Origin.
  const origin = request.headers.get('origin');
  if (origin) {
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      // Unparseable origin falls through to the 403 below.
    }
    // Behind a proxy the public host may only be in x-forwarded-host.
    const hosts = [
      request.headers.get('host'),
      request.headers.get('x-forwarded-host'),
    ];
    if (!originHost || !hosts.includes(originHost)) {
      return fail('Forbidden', 403);
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid request', 400);
  }

  if (!body || typeof body !== 'object') {
    return fail('Invalid request', 400);
  }

  const { name, email, message, company, startedAt } = body as Record<
    string,
    unknown
  >;

  // Honeypot: the field is hidden from humans, so any value means a bot.
  if (typeof company === 'string' && company.trim() !== '') {
    return fakeSuccess();
  }

  // Time-to-submit check: missing, garbage or too-fast timestamps are bots.
  if (
    typeof startedAt !== 'number' ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < MIN_SUBMIT_MS
  ) {
    return fakeSuccess();
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    return fail('Please fill in all fields', 400);
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (
    cleanName.length < 1 ||
    cleanName.length > NAME_MAX ||
    cleanEmail.length > EMAIL_MAX ||
    !EMAIL_RE.test(cleanEmail) ||
    cleanMessage.length < 1 ||
    cleanMessage.length > MESSAGE_MAX
  ) {
    return fail('Please check your input and try again', 400);
  }

  const token = process.env.RESEND_TOKEN;
  if (!token) {
    console.error('Contact form: RESEND_TOKEN is not configured');
    return fail('Failed to send email', 500);
  }

  const resend = new Resend(token);

  try {
    // Internal notification first: this is the one that decides success.
    const subjectName = cleanName.replace(/[\r\n]+/g, ' ');
    const { error } = await resend.emails.send({
      from: 'Website Contact Form <info@flowx.one>',
      to: ['info@flowx.one'],
      subject: `New contact form submission from ${subjectName}`,
      replyTo: cleanEmail,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(cleanMessage).replace(/\n/g, '<br>')}</p>
      `,
      text: `New Contact Form Submission\n\nName: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
    });

    if (error) {
      console.error('Resend error (notification):', error);
      return fail('Failed to send email', 500);
    }

    // Auto-reply to the visitor is best-effort; a failure here only logs.
    // The name is truncated so the reply can't carry much arbitrary text.
    try {
      const { error: replyError } = await resend.emails.send({
        from: 'flowX Contact <info@flowx.one>',
        to: [cleanEmail],
        subject: 'Thank you for contacting flowX',
        react: ContactEmail({ name: cleanName.slice(0, 50) }),
      });
      if (replyError) {
        console.error('Resend error (auto-reply):', replyError);
      }
    } catch (replyError) {
      console.error('Error sending auto-reply:', replyError);
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return fail('Failed to send email', 500);
  }
}
