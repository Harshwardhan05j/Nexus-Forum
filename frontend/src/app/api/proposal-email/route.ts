import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { transporter } from "@/lib/nodemailer";
import { rateLimit } from "@/lib/rateLimit";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@nexusforum.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@nexusforum.com';

// Sanitize user input before embedding in email HTML
function escapeHtml(unsafe: string): string {
  return String(unsafe ?? '')
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
    const data = await req.json();
    const { organizer_name, organizer_email, event_title, event_type, proposed_date, expected_attendees, venue_needed, description, club_team } = data;

    if (!organizer_name || !organizer_email || !event_title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (description && description.length > 3000) {
      return NextResponse.json({ error: 'Description is too long (max 3000 chars).' }, { status: 400 });
    }

    // 1. Basic validation - prevent exact duplicate event titles from same person
    const existing = await prisma.event_proposals.findFirst({
        where: { 
            organizer_email: organizer_email.toLowerCase(),
            event_title: event_title 
        }
    });

    if (existing) {
        return NextResponse.json({ error: 'A proposal for this event title has already been submitted!' }, { status: 400 });
    }

    // 2. Save to Database
    await prisma.event_proposals.create({
      data: {
        organizer_name,
        organizer_email: organizer_email.toLowerCase(),
        event_title,
        event_type,
        proposed_date: proposed_date ? new Date(proposed_date) : null,
        expected_attendees: expected_attendees ? parseInt(expected_attendees) : null,
        venue_needed,
        description,
        club_team: club_team || null,
        status: 'pending'
      }
    });

    // 3. Send Email to User
    try {
      await transporter.sendMail({
        from: `"Nexus Forum" <${EMAIL_FROM}>`,
        to: organizer_email,
        subject: 'Your Event Proposal has been received',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #9333ea;">Proposal Received!</h2>
            <p>Hi ${escapeHtml(organizer_name)},</p>
            <p>Thank you for submitting your event proposal for "<strong>${escapeHtml(event_title)}</strong>".</p>
            <p>Our team is currently reviewing your application. We will reach back to you within <strong>3-5 working days</strong> with updates or next steps.</p>
            <br />
            <p>Best Regards,<br /><strong>The Nexus Team</strong></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">&copy; 2026 The Nexus Forum. All rights reserved.</p>
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
        subject: 'New Event Proposal Submitted',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #9333ea;">New Event Proposal Submitted</h2>
            <p>A new event proposal has been submitted with the following details:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Organizer:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(organizer_name)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(organizer_email)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Event Title:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(event_title)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Type:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(event_type)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(proposed_date)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Attendees:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(String(expected_attendees))}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Venue:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(venue_needed)}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Club/Team:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(club_team || 'N/A')}</td></tr>
            </table>
            <br />
            <p><strong>Description:</strong></p>
            <div style="padding: 15px; background-color: #f9f9f9; border-radius: 5px; color: #333; line-height: 1.6;">${escapeHtml(description)}</div>
          </div>
        `,
      });
    } catch (e) {
      console.error("Email to admin failed:", e);
    }

    return NextResponse.json({ success: true, message: 'Proposal submitted successfully' });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
  }
}
