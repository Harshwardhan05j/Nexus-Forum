import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { transporter } from "@/lib/nodemailer";
import { rateLimit } from "@/lib/rateLimit";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@nexusforum.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@nexusforum.com';

// Sanitize user input before embedding in email HTML
function escapeHtml(unsafe: string): string {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.headers.get('x-real-ip') ?? 'unknown';
  const { allowed } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const { full_name, email, department, year, clg, state, city, mobile_no } = await req.json();

    if (!full_name || !email || !department || !year || !clg || !state || !city || !mobile_no) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Basic Validation - Prevent Duplicate Submissions
    const existing = await prisma.hackronyx_willingness.findFirst({
      where: { email: email.toLowerCase() }
    });

    if (existing) {
      return NextResponse.json({ error: 'You have already registered your interest!' }, { status: 400 });
    }

    // 2. Save to Database
    await prisma.hackronyx_willingness.create({
      data: {
        full_name,
        email: email.toLowerCase(),
        department,
        year,
        clg,
        state,
        city,
        mobile_no,
      }
    });

    // 3. Send Email to User
    try {
      await transporter.sendMail({
        from: `"Nexus Forum" <${EMAIL_FROM}>`,
        to: email,
        subject: 'Hackronyx 2026 Registration Confirmed',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #9333ea;">Registration Confirmed!</h2>
            <p>Hi ${escapeHtml(full_name)},</p>
            <p>Thank you for expressing your interest in <strong>HackRonyX 2026</strong>. We've successfully received your participation willingness form.</p>
            <p>This early response helps us shape a better experience for everyone. We will reach out to you soon with more details about the event, rules, and schedules.</p>
            <br />
            <p>Best Regards,<br /><strong>The Nexus Team</strong></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">&copy; 2026 The Nexus Forum | HackRonyX Flagship Initiative</p>
          </div>
        `,
      });
    } catch (e) {
      console.error("Email to user failed:", e);
    }

    // 4. Send Email to Admin
    try {
      await transporter.sendMail({
        from: `"Nexus Notifications" <${EMAIL_FROM}>`,
        to: ADMIN_EMAIL,
        subject: 'New Hackronyx Registration',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #9333ea;">New Hackronyx Registration</h2>
            <p>A new user has registered for Hackronyx 2026:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(full_name)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(email)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Department:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(department)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Year:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(year)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>College:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(clg)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>State:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(state)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>City:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(city)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Mobile:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(mobile_no)}</td></tr>
            </table>
            <br />
            <p>Check the admin dashboard for details.</p>
          </div>
        `,
      });
    } catch (e) {
      console.error("Email to admin failed:", e);
    }

    return NextResponse.json({ success: true, message: 'Registration successful' });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
  }
}
