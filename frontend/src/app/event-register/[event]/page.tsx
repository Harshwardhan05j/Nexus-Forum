"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Decode URL-encoded event names (e.g. "Data%20Dive%20Masterclass" → "Data Dive Masterclass")
function decodeEventName(raw: string) {
  try { return decodeURIComponent(raw); } catch { return raw; }
}

export default function EventRegisterPage() {
  const params = useParams();
  const router = useRouter();
  const eventName = decodeEventName(params.event as string);

  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', year: '', expectations: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/event-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_name: eventName, ...formData }),
      });
      const result = await res.json();
      if (res.ok) { setStatus('success'); setMessage(result.message); }
      else { setStatus('error'); setMessage(result.error || 'Something went wrong.'); }
    } catch {
      setStatus('error'); setMessage('Connection error. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-[580px] relative z-10 py-12">
        <div className="text-center mb-10">
          <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-purple-400 mb-4 block">Event Registration</span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">{eventName}</h1>
          <p className="text-zinc-400 leading-relaxed max-w-[420px] mx-auto">Complete the form below to secure your spot. You'll receive a confirmation email once registered.</p>
        </div>

        <div className="bg-[#0e0e0e]/80 border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">You're Registered!</h2>
              <p className="text-zinc-400 mb-8">{message} A confirmation email has been sent to you.</p>
              <button onClick={() => router.push('/events')} className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all">View More Events</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  <label className="text-[11px] font-bold text-zinc-400">YEAR OF STUDY</label>
                  <select name="year" required value={formData.year} onChange={handleChange}
                    className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm appearance-none">
                    <option value="">Select year</option>
                    <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400">WHAT DO YOU EXPECT FROM THIS EVENT?</label>
                <textarea name="expectations" rows={4} placeholder="Share what you're hoping to learn or gain..." required value={formData.expectations} onChange={handleChange}
                  className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm resize-none" />
              </div>

              {status === 'error' && <p className="text-red-400 text-sm font-medium text-center">{message}</p>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => router.back()} className="px-5 py-3.5 border border-white/5 rounded-xl font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all">Cancel</button>
                <button type="submit" disabled={status === 'loading'}
                  className="flex-1 bg-white text-black font-black py-3.5 rounded-xl hover:bg-zinc-100 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                  {status === 'loading'
                    ? <span className="w-5 h-5 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
                    : 'Confirm Registration →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
