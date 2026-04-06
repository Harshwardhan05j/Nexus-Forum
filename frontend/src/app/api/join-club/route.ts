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

const VALID_CLUBS = ['Career Catalyst', 'Data Science Innovation Club', 'Web Nest Technology Club'];

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.headers.get('x-real-ip') ?? 'unknown';
  const { allowed } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const { club_name, full_name, email, phone, department, year, skills, motivation } = await req.json();

    // Validation
    if (!VALID_CLUBS.includes(club_name)) {
      return NextResponse.json({ error: 'Invalid club name.' }, { status: 400 });
    }
    if (!full_name?.trim() || !email?.trim() || !phone?.trim() || !department?.trim() || !year?.trim() || !skills?.trim() || !motivation?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (skills.length > 500) {
      return NextResponse.json({ error: 'Skills field is too long (max 500 chars).' }, { status: 400 });
    }
    if (motivation.length > 2000) {
      return NextResponse.json({ error: 'Motivation field is too long (max 2000 chars).' }, { status: 400 });
    }

    // Save to correct table (with duplicate check)
    const emailNorm = email.trim().toLowerCase();
    const data = { full_name: full_name.trim(), email: emailNorm, phone: phone.trim(), department: department.trim(), year: year.trim(), skills: skills.trim(), motivation: motivation.trim() };

    if (club_name === 'Career Catalyst') {
      const exists = await prisma.career_catalyst.findFirst({ where: { email: emailNorm } });
      if (exists) return NextResponse.json({ error: 'You have already applied to Career Catalyst.' }, { status: 400 });
      await prisma.career_catalyst.create({ data });
    } else if (club_name === 'Data Science Innovation Club') {
      const exists = await prisma.data_science_innovation.findFirst({ where: { email: emailNorm } });
      if (exists) return NextResponse.json({ error: 'You have already applied to Data Science Innovation Club.' }, { status: 400 });
      await prisma.data_science_innovation.create({ data });
    } else if (club_name === 'Web Nest Technology Club') {
      const exists = await prisma.web_nest_technology.findFirst({ where: { email: emailNorm } });
      if (exists) return NextResponse.json({ error: 'You have already applied to Web Nest Technology Club.' }, { status: 400 });
      await prisma.web_nest_technology.create({ data });
    }

    // Email to user
    try {
      await transporter.sendMail({
        from: `"Nexus Forum" <${EMAIL_FROM}>`,
        to: email,
        subject: `Application Received — ${club_name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:10px;">
            <h2 style="color:#9333ea;">Application Received!</h2>
            <p>Hi ${escapeHtml(full_name)},</p>
            <p>Thank you for applying to join <strong>${escapeHtml(club_name)}</strong> at the Nexus Forum. We've received your application and our team will review it shortly.</p>
            <p>We'll reach out within <strong>3–5 working days</strong> to let you know the next steps.</p>
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
        subject: `New Club Application — ${club_name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:10px;">
            <h2 style="color:#9333ea;">New Club Application</h2>
            <p>A new application was submitted for <strong>${escapeHtml(club_name)}</strong>:</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Name:</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(full_name)}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Email:</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(email)}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Phone:</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(phone)}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Department:</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(department)}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Year:</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(year)}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;"><b>Skills:</b></td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(skills)}</td></tr>
            </table>
            <p><b>Motivation:</b></p>
            <div style="padding:12px;background:#f9f9f9;border-radius:5px;">${escapeHtml(motivation)}</div>
          </div>`,
      });
    } catch (e) { console.error('Admin email failed:', e); }

    return NextResponse.json({ success: true, message: `Application submitted for ${club_name}!` });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}
