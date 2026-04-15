"use client";

import { useState } from 'react';
import { updateProposalStatus } from '@/app/actions';

type TabKey = 'users' | 'clubs' | 'events' | 'proposals' | 'hackronyx';

interface AdminDashboardProps {
  session: any;
  users: any[];
  allClubMembers: any[];
  eventRegs: any[];
  proposals: any[];
  hackronyx: any[];
}

export default function AdminDashboard({
  session,
  users,
  allClubMembers,
  eventRegs,
  proposals,
  hackronyx,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('hackronyx');

  const fmt = (d: Date | null | undefined) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

  const statCards = [
    { key: 'users', label: 'Registered Users', value: users.length, color: '#9333ea' },
    { key: 'clubs', label: 'Club Applications', value: allClubMembers.length, color: '#3b82f6' },
    { key: 'events', label: 'Event Registrations', value: eventRegs.length, color: '#10b981' },
    { key: 'proposals', label: 'Event Proposals', value: proposals.length, color: '#f59e0b' },
    { key: 'hackronyx', label: 'HackRonyX Interest', value: hackronyx.length, color: '#ef4444' },
  ];

  return (
    <main className="max-w-[1300px] mx-auto px-6 pt-[120px] pb-20 min-h-screen relative z-10">
      {/* Header */}
      <div className="mb-12">
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#9333ea] mb-3 block">Admin Panel</span>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Dashboard</h1>
        <p className="text-zinc-500 text-sm">Logged in as <span className="text-zinc-300">{session.user.email}</span></p>
      </div>

      {/* Stat Cards as Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {statCards.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveTab(s.key as TabKey)}
            className={`text-left bg-[#0e0e0e] border transition-all duration-300 rounded-xl p-5 group ${
              activeTab === s.key ? 'border-zinc-400/30' : 'border-white/5 hover:border-white/10'
            }`}
            style={{
              boxShadow: activeTab === s.key ? `0 0 20px ${s.color}15` : 'none',
            }}
          >
            <div
              className={`text-3xl font-black mb-1 transition-transform group-hover:scale-105 duration-300 ${
                activeTab === s.key ? '' : 'opacity-70 group-hover:opacity-100'
              }`}
              style={{ color: s.color }}
            >
              {s.value}
            </div>
            <div className={`text-xs font-semibold uppercase tracking-wide transition-colors ${
              activeTab === s.key ? 'text-zinc-300' : 'text-zinc-500 group-hover:text-zinc-400'
            }`}>
              {s.label}
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'hackronyx' && (
          <Section 
            title="HackRonyX 2026 — Interest Registrations" 
            count={hackronyx.length} 
            color="#ef4444"
            action={<DownloadButton onClick={() => downloadCSV(hackronyx, 'hackronyx_willingness.csv', [
              { label: 'Full Name', key: 'full_name' },
              { label: 'Email ID', key: 'email' },
              { label: 'Department', key: 'department' },
              { label: 'Year', key: 'year' },
              { label: 'College', key: 'clg' },
              { label: 'State', key: 'state' },
              { label: 'City', key: 'city' },
              { label: 'Mobile No', key: 'mobile_no' },
              { label: 'Submitted At', key: 'submitted_at' },
            ])} />}
          >
            <Table headers={['#', 'Name', 'Email', 'Department', 'Year', 'College', 'State', 'City', 'Mobile', 'Submitted']}>
              {hackronyx.map((r, i) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-white">
                  <Td>{i + 1}</Td><Td>{r.full_name}</Td><Td muted>{r.email}</Td>
                  <Td>{r.department}</Td><Td muted>{r.year}</Td><Td>{r.clg}</Td>
                  <Td muted>{r.state}</Td><Td muted>{r.city}</Td>
                  <Td muted>{r.mobile_no}</Td><Td muted>{fmt(r.submitted_at)}</Td>
                </tr>
              ))}
            </Table>
          </Section>
        )}

        {activeTab === 'clubs' && (
          <Section 
            title="Club Applications" 
            count={allClubMembers.length} 
            color="#3b82f6"
            action={<DownloadButton onClick={() => downloadCSV(allClubMembers, 'club_applications.csv', [
              { label: 'Full Name', key: 'full_name' },
              { label: 'Email ID', key: 'email' },
              { label: 'Club', key: 'club' },
              { label: 'Department', key: 'department' },
              { label: 'Year', key: 'year' },
              { label: 'Applied On', key: 'applied_on' },
            ])} />}
          >
            <Table headers={['#', 'Name', 'Email', 'Club', 'Department', 'Year', 'Applied']}>
              {allClubMembers.map((r, i) => (
                <tr key={`${r.club}-${r.id}`} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-white">
                  <Td>{i + 1}</Td><Td>{r.full_name}</Td><Td muted>{r.email}</Td>
                  <Td><ClubBadge name={r.club} /></Td>
                  <Td>{r.department}</Td><Td muted>{r.year}</Td><Td muted>{fmt(r.applied_on)}</Td>
                </tr>
              ))}
            </Table>
          </Section>
        )}

        {activeTab === 'events' && (
          <Section 
            title="Event Registrations" 
            count={eventRegs.length} 
            color="#10b981"
            action={<DownloadButton onClick={() => downloadCSV(eventRegs, 'event_registrations.csv', [
              { label: 'Full Name', key: 'full_name' },
              { label: 'Email ID', key: 'email' },
              { label: 'Event Name', key: 'event_name' },
              { label: 'Phone', key: 'phone' },
              { label: 'Year', key: 'year' },
              { label: 'Registered On', key: 'registered_on' },
              { label: 'Expectations', key: 'expectations' },
            ])} />}
          >
            <Table headers={['#', 'Name', 'Email', 'Event', 'Phone', 'Year', 'Registered']}>
              {eventRegs.map((r, i) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-white">
                  <Td>{i + 1}</Td><Td>{r.full_name}</Td><Td muted>{r.email}</Td>
                  <Td><span className="text-purple-400 font-medium">{r.event_name}</span></Td>
                  <Td muted>{r.phone}</Td><Td muted>{r.year}</Td><Td muted>{fmt(r.registered_on)}</Td>
                </tr>
              ))}
            </Table>
          </Section>
        )}

        {activeTab === 'proposals' && (
          <Section 
            title="Event Proposals" 
            count={proposals.length} 
            color="#f59e0b"
            action={<DownloadButton onClick={() => downloadCSV(proposals, 'event_proposals.csv', [
              { label: 'Organizer Name', key: 'organizer_name' },
              { label: 'Email ID', key: 'organizer_email' },
              { label: 'Event Title', key: 'event_title' },
              { label: 'Type', key: 'event_type' },
              { label: 'Proposed Date', key: 'proposed_date' },
              { label: 'Expected Attendees', key: 'expected_attendees' },
              { label: 'Venue Needed', key: 'venue_needed' },
              { label: 'Description', key: 'description' },
              { label: 'Status', key: 'status' },
              { label: 'Submitted On', key: 'submitted_on' },
            ])} />}
          >
            <Table headers={['#', 'Organizer', 'Email', 'Event Title', 'Type', 'Date', 'Status', 'Submitted', 'Actions']}>
              {proposals.map((r, i) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-white">
                  <Td>{i + 1}</Td><Td>{r.organizer_name}</Td><Td muted>{r.organizer_email}</Td>
                  <Td><span className="font-medium">{r.event_title}</span></Td>
                  <Td muted>{r.event_type}</Td><Td muted>{fmt(r.proposed_date)}</Td>
                  <Td><StatusBadge status={r.status} /></Td>
                  <Td muted>{fmt(r.submitted_on)}</Td>
                  <Td>
                    <form action={async (formData) => {
                      await updateProposalStatus(formData);
                    }} className="flex gap-2">
                      <input type="hidden" name="id" value={r.id} />
                      {r.status === 'pending' ? (
                        <>
                          <button type="submit" name="status" value="approved" className="px-2 py-1 bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20 rounded text-[10px] font-bold uppercase transition-colors">Approve</button>
                          <button type="submit" name="status" value="rejected" className="px-2 py-1 bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20 rounded text-[10px] font-bold uppercase transition-colors">Reject</button>
                        </>
                      ) : (
                        <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-wider">Processed</span>
                      )}
                    </form>
                  </Td>
                </tr>
              ))}
            </Table>
          </Section>
        )}

        {activeTab === 'users' && (
          <Section 
            title="Registered Users (Google OAuth)" 
            count={users.length} 
            color="#9333ea"
            action={<DownloadButton onClick={() => downloadCSV(users, 'registered_users.csv', [
              { label: 'Name', key: 'name' },
              { label: 'Email ID', key: 'email' },
              { label: 'Role', key: 'role' },
              { label: 'Created At', key: 'createdAt' },
              { label: 'Updated At', key: 'updatedAt' },
            ])} />}
          >
            <Table headers={['#', 'Name', 'Email', 'Joined']}>
              {users.map((r, i) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-white">
                  <Td>{i + 1}</Td><Td>{r.name ?? '—'}</Td><Td muted>{r.email}</Td>
                  <Td muted>{fmt(r.createdAt)}</Td>
                </tr>
              ))}
            </Table>
          </Section>
        )}
      </div>
    </main>
  );
}

// ── Small UI helpers ─────────────────────────────────────────────────────────

function downloadCSV(data: any[], filename: string, mapping?: { label: string; key: string }[]) {
  if (!data || data.length === 0) return;
  
  const baseMapping = mapping || Object.keys(data[0]).map(k => ({ label: k, key: k }));
  const actualMapping = [{ label: 'S.No', key: 'sno' }, ...baseMapping];

  const headers = actualMapping.map(m => `"${m.label.replace(/"/g, '""')}"`).join(',');
  const rows = data.map((row, i) => 
    actualMapping.map(m => {
      let val: any;
      if (m.key === 'sno') {
        val = i + 1;
      } else {
        val = row[m.key] === null || row[m.key] === undefined ? '' : row[m.key];
      }
      
      // Format dates if they look like dates
      const finalVal = (typeof val === 'string' && val.includes('T') && !isNaN(Date.parse(val))) 
        ? new Date(val).toLocaleString('en-IN') 
        : val;
      
      return `"${String(finalVal).replace(/"/g, '""')}"`;
    }).join(',')
  );

  const csvContent = [headers, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  
  try {
    link.click();
  } finally {
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
}

function Section({ title, count, color, children, action }: { title: string; count: number; color: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">{title}</h2>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: `${color}22`, color }}>{count}</span>
        </div>
        {action}
      </div>
      <div className="bg-[#0e0e0e] border border-white/5 rounded-xl overflow-hidden">{children}</div>
    </section>
  );
}

function DownloadButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-zinc-300 transition-all flex items-center gap-2"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      Download CSV
    </button>
  );
}

function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            {headers.map(h => (
              <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Td({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return <td className={`px-5 py-3.5 ${muted ? 'text-zinc-500' : 'text-zinc-200'}`}>{children}</td>;
}

function ClubBadge({ name }: { name: string }) {
  const colors: Record<string, string> = {
    'Web Nest Technology Club': '#3b82f6',
    'Data Science Innovation Club': '#9333ea',
    'Career Catalyst': '#10b981',
  };
  const c = colors[name] || '#a1a1aa';
  return <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${c}22`, color: c }}>{name}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = { pending: '#f59e0b', approved: '#10b981', rejected: '#ef4444' };
  const c = map[status] || '#a1a1aa';
  return <span className="text-xs font-bold px-2 py-0.5 rounded-full capitalize" style={{ background: `${c}22`, color: c }}>{status}</span>;
}
