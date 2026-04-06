import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import AdminDashboard from './AdminDashboard';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
    redirect('/');
  }

  const [users, webNest, dsi, cc, eventRegs, proposals, hackronyx] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.web_nest_technology.findMany({ orderBy: { applied_on: 'desc' } }),
    prisma.data_science_innovation.findMany({ orderBy: { applied_on: 'desc' } }),
    prisma.career_catalyst.findMany({ orderBy: { applied_on: 'desc' } }),
    prisma.event_registrations.findMany({ orderBy: { registered_on: 'desc' } }),
    prisma.event_proposals.findMany({ orderBy: { submitted_on: 'desc' } }),
    prisma.hackronyx_willingness.findMany({ orderBy: { submitted_at: 'desc' } }),
  ]);

  const allClubMembers = [
    ...webNest.map(r => ({ ...r, club: 'Web Nest Technology Club' })),
    ...dsi.map(r => ({ ...r, club: 'Data Science Innovation Club' })),
    ...cc.map(r => ({ ...r, club: 'Career Catalyst' })),
  ].sort((a, b) => new Date(b.applied_on ?? 0).getTime() - new Date(a.applied_on ?? 0).getTime());

  return (
    <AdminDashboard 
      session={session}
      users={users}
      allClubMembers={allClubMembers}
      eventRegs={eventRegs}
      proposals={proposals}
      hackronyx={hackronyx}
    />
  );
}
