"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const CLUB_META: Record<string, { label: string; color: string; desc: string }> = {
  'web-nest': { label: 'Web Nest Technology Club', color: '#3b82f6', desc: 'Full-stack development, modern web frameworks, and cloud deployment.' },
  'data-science': { label: 'Data Science Innovation Club', color: '#9333ea', desc: 'Machine learning, deep learning architectures, and data engineering.' },
  'career-catalyst': { label: 'Career Catalyst', color: '#10b981', desc: 'Industry readiness, DSA, competitive programming, and mock interviews.' },
};

export default function JoinClubPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.club as string;
  const meta = CLUB_META[slug];

  const [formData, setFormData] = useState({
    full_name: '', email: '', phone: '', department: '', year: '', skills: '', motivation: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  if (!meta) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Club Not Found</h1>
          <button onClick={() => router.push('/clubs')} className="px-6 py-3 bg-white text-black font-bold rounded-xl">Back to Clubs</button>
        </div>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/join-club', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ club_name: meta.label, ...formData }),
      });
      const result = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(result.message);
      } else {
        setStatus('error');
        setMessage(result.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Connection error. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: `${meta.color}18` }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: `${meta.color}0f` }} />

      <div className="w-full max-w-[620px] relative z-10 py-12">
        <div className="text-center mb-10">
          <span className="text-[12px] font-bold uppercase tracking-[0.15em] mb-4 block" style={{ color: meta.color }}>Club Application</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">{meta.label}</h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-[480px] mx-auto">{meta.desc}</p>
        </div>

        <div className="bg-[#0e0e0e]/80 border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Application Submitted!</h2>
              <p className="text-zinc-400 mb-8">{message} Check your email for confirmation.</p>
              <button onClick={() => router.push('/clubs')} className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all">Back to Clubs</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-2">Personal Information</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">FULL NAME</label>
                  <input type="text" name="full_name" placeholder="Your full name" required value={formData.full_name} onChange={handleChange}
                    className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">EMAIL ADDRESS</label>
                  <input type="email" name="email" placeholder="you@college.edu" required value={formData.email} onChange={handleChange}
                    className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">PHONE NUMBER</label>
                  <input type="text" name="phone" placeholder="+91 00000 00000" required value={formData.phone} onChange={handleChange}
                    className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400">DEPARTMENT</label>
                  <input type="text" name="department" placeholder="e.g. CSE-DS" required value={formData.department} onChange={handleChange}
                    className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400">YEAR OF STUDY</label>
                <select name="year" required value={formData.year} onChange={handleChange}
                  className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm appearance-none">
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-2 pt-2">Your Profile</p>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400">RELEVANT SKILLS</label>
                <input type="text" name="skills" placeholder="e.g. Python, React, SQL, Machine Learning..." required value={formData.skills} onChange={handleChange}
                  className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400">WHY DO YOU WANT TO JOIN?</label>
                <textarea name="motivation" rows={4} placeholder="Tell us your motivation and what you hope to gain..." required value={formData.motivation} onChange={handleChange}
                  className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm resize-none" />
              </div>

              {status === 'error' && <p className="text-red-400 text-sm font-medium text-center">{message}</p>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => router.back()}
                  className="px-5 py-3.5 border border-white/5 rounded-xl font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={status === 'loading'}
                  className="flex-1 bg-white text-black font-black py-3.5 rounded-xl hover:bg-zinc-100 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                  {status === 'loading'
                    ? <span className="w-5 h-5 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
                    : 'Submit Application →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
