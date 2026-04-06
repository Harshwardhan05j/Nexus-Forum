"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EventProposal() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    organizer_name: '',
    organizer_email: '',
    event_title: '',
    event_type: '',
    proposed_date: '',
    expected_attendees: '',
    venue_needed: '',
    description: '',
    club_team: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/proposal-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Your proposal has been received! We will review it shortly.');
      } else {
        setStatus('error');
        setMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send proposal. Please check your connection.');
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-purple-900/10 blur-[150px] rounded-full"></div>
      
      <div className="w-full max-w-[700px] relative z-10 py-12">
        <div className="text-center mb-10">
          <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-purple-400 mb-4 block">Event Proposal</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">Host Your Own Event</h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-[550px] mx-auto">
            Share your idea with the Nexus Team. All proposals are reviewed by the admin and you&apos;ll be contacted within 3–5 working days.
          </p>
        </div>

        <div className="bg-[#0e0e0e]/80 border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden backdrop-blur-2xl">
          {status === 'success' ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Proposal Submitted!</h2>
              <p className="text-zinc-400 mb-10 leading-relaxed">{message}</p>
              <button 
                onClick={() => router.push('/')}
                className="px-10 py-3.5 bg-white text-black font-extrabold rounded-xl hover:scale-105 transition-all"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Organizer Info Section */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6 border-b border-white/5 pb-2">Organizer Information</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-400 ml-1">FULL NAME</label>
                    <input 
                      type="text" 
                      name="organizer_name" 
                      placeholder="Your full name" 
                      required 
                      value={formData.organizer_name}
                      onChange={handleChange}
                      className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-400 ml-1">EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      name="organizer_email" 
                      placeholder="you@example.com" 
                      required 
                      value={formData.organizer_email}
                      onChange={handleChange}
                      className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Event Details Section */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6 border-b border-white/5 pb-2">Event Details</p>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-400 ml-1">EVENT TITLE</label>
                    <input 
                      type="text" 
                      name="event_title" 
                      placeholder="e.g. Workshop on Computer Vision" 
                      required 
                      value={formData.event_title}
                      onChange={handleChange}
                      className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-400 ml-1">EVENT TYPE</label>
                      <select 
                        name="event_type" 
                        required
                        value={formData.event_type}
                        onChange={handleChange}
                        className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm appearance-none"
                      >
                        <option value="">Select type</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Hackathon">Hackathon</option>
                        <option value="Talk / Guest Lecture">Talk / Guest Lecture</option>
                        <option value="Competition">Competition</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-400 ml-1">PROPOSED DATE</label>
                      <input 
                        type="date" 
                        name="proposed_date" 
                        required 
                        value={formData.proposed_date}
                        onChange={handleChange}
                        className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-400 ml-1">EXPECTED ATTENDEES</label>
                      <input 
                        type="number" 
                        name="expected_attendees" 
                        placeholder="e.g. 100" 
                        min="1" 
                        required 
                        value={formData.expected_attendees}
                        onChange={handleChange}
                        className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-400 ml-1">VENUE / MODE</label>
                      <select 
                        name="venue_needed" 
                        required 
                        value={formData.venue_needed}
                        onChange={handleChange}
                        className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm appearance-none"
                      >
                        <option value="">Select option</option>
                        <option value="Online">Online</option>
                        <option value="On-Campus Venue Needed">On-Campus Venue Needed</option>
                        <option value="Arranging Own Venue">Arranging Own Venue</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6 border-b border-white/5 pb-2">Proposal Details</p>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-400 ml-1">WHAT IS THIS EVENT ABOUT?</label>
                    <textarea 
                      name="description" 
                      rows={4} 
                      placeholder="Describe the event, its goals, and why it's beneficial..." 
                      required 
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm"
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-400 ml-1">YOUR CLUB / TEAM (OPTIONAL)</label>
                    <input 
                      type="text" 
                      name="club_team" 
                      placeholder="e.g. Web Nest Club" 
                      value={formData.club_team}
                      onChange={handleChange}
                      className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/5 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="button" 
                  onClick={() => router.back()}
                  className="px-6 py-4 border border-white/5 rounded-xl font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all w-1/3"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="flex-1 bg-white text-black font-black py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-zinc-400 border-t-black rounded-full animate-spin"></span>
                  ) : (
                    <>Submit Proposal <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center font-medium">{message}</p>
              )}
            </form>
          )}
        </div>
      </div>

      <footer className="py-12 text-zinc-600 text-xs tracking-widest relative z-10 uppercase font-bold">
        © 2026 The Nexus Forum • Innovate • Inspire • Integrate
      </footer>
    </main>
  );
}
