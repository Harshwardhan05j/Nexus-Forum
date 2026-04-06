import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { transporter } from '@/lib/nodemailer';
import { rateLimit } from '@/lib/rateLimit';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@nexusforum.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@nexusforum.com';

function escapeHtml(unsafe: string): string {
  return String(unsafe ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.headers.get('x-real-ip') ?? 'unknown';
  const { allowed } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const { event_name, full_name, email, phone, year, expectations } = await req.json();

    if (!event_name?.trim() || !full_name?.trim() || !email?.trim() || !phone?.trim() || !year?.trim() || !expectations?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (expectations.length > 2000) {
      return NextResponse.json({ error: 'Expectations field is too long (max 2000 chars).' }, { status: 400 });
    }

    await prisma.event_registrations.create({
      data: {
        event_name: event_name.trim(),
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        year: year.trim(),
        expectations: expectations.trim(),
      },
    });

    // Email to user
    try {
      await transporter.sendMail({
        from: `"Nexus Forum" <${EMAIL_FROM}>`,
        to: email,
        subject: `Registration Confirmed — ${event_name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:10px;">
            <h2 style="color:#9333ea;">You're Registered!</h2>
            <p>Hi ${escapeHtml(full_name)},</p>
            <p>Your registration for <strong>${escapeHtml(event_name)}</strong> has been confirmed. We're excited to have you join us!</p>
            <p>We'll send you further details about the event schedule, venue, and requirements closer to the date.</p>
            <br/><p>Best Regards,<br/><strong>The Nexus Team</strong></p>
            <hr style="border:none;border-top:1px solid #eee;margin:20px 0;"/>
            <p style="font-size:12px;color:#777;">&copy; 2026 The Nexus Forum</p>
          </div>`,
      });
    } catch (e) { console.error('User email failed:', e); }

    // Email to admin
    try {
      await transporter.sendMail({
        from: `"Nexus Notifications" <${EMAIL_FROM}>`,
        to: ADMIN_EMAIL,
        subject: `New Event Registration — ${event_name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:10px;">
            <h2 style="color:#9333ea;">New Event Registration</h2>
            <p>Someone just registered for <strong>${escapeHtml(event_name)}</strong>:</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Name:</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(full_name)}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Email:</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(email)}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Phone:</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(phone)}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Year:</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(year)}</td></tr>
            </table>
            <p><b>Expectations:</b></p>
            <div style="padding:12px;background:#f9f9f9;border-radius:5px;">${escapeHtml(expectations)}</div>
          </div>`,
      });
    } catch (e) { console.error('Admin email failed:', e); }

    return NextResponse.json({ success: true, message: `Successfully registered for ${event_name}!` });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}
