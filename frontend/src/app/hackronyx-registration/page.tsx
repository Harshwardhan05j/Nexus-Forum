"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HackronyxRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    department: '',
    year: '',
    clg: '',
    state: '',
    city: '',
    mobile_no: '',
    otherDepartment: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const submissionData = {
        ...formData,
        department: formData.department === 'Other' ? formData.otherDepartment : formData.department
      };

      const response = await fetch('/api/register-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Registration confirmed! Check your email for details.');
        // Optional: redirect after some time
        // setTimeout(() => router.push('/'), 3000);
      } else {
        setStatus('error');
        setMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send registration. Please check your connection.');
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-[600px] relative z-10">
        <div className="text-center mb-12">
          <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-purple-500 mb-4 block">Registration Launch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">HackRonyX 2026</h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-[500px] mx-auto">
            Express your willingness to participate in our flagship national hackathon. Your early response helps us shape the experience.
          </p>
        </div>

        <div className="bg-[#0e0e0e]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">Registration Confirmed!</h2>
              <p className="text-zinc-400 mb-8">{message}</p>
              <button 
                onClick={() => router.push('/')}
                className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="full_name" className="text-xs font-semibold text-zinc-400 ml-1">Full Name</label>
                  <input 
                    id="full_name"
                    type="text" 
                    name="full_name"
                    placeholder="John Doe"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-zinc-400 ml-1">Email Id</label>
                  <input 
                    id="email"
                    type="email" 
                    name="email"
                    placeholder="john.doe@college.edu"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="department" className="text-xs font-semibold text-zinc-400 ml-1">Department</label>
                    <div className="relative group">
                      <select 
                        id="department"
                        name="department"
                        required
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all text-zinc-300 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-zinc-900">Select Department</option>
                        <option value="Computer Science Engineering (Data Science)" className="bg-zinc-900">Computer Science Engineering (Data Science)</option>
                        <option value="Information Technology" className="bg-zinc-900">Information Technology</option>
                        <option value="Electronics & Telecommunication" className="bg-zinc-900">Electronics & Telecommunication</option>
                        <option value="Mechanical Engineering" className="bg-zinc-900">Mechanical Engineering</option>
                        <option value="Civil Engineering" className="bg-zinc-900">Civil Engineering</option>
                        <option value="Artificial Intelligence & Data Science" className="bg-zinc-900">Artificial Intelligence & Data Science</option>
                        <option value="Other" className="bg-zinc-900">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="year" className="text-xs font-semibold text-zinc-400 ml-1">Year of Study</label>
                    <div className="relative group">
                      <select 
                        id="year"
                        name="year"
                        required
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all text-zinc-300 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-zinc-900">Select Year</option>
                        <option value="1st Year" className="bg-zinc-900">1st Year</option>
                        <option value="2nd Year" className="bg-zinc-900">2nd Year</option>
                        <option value="3rd Year" className="bg-zinc-900">3rd Year</option>
                        <option value="4th Year" className="bg-zinc-900">4th Year</option>
                        <option value="Post Graduate" className="bg-zinc-900">Post Graduate</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conditional Other Department Field */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${formData.department === 'Other' ? 'max-h-32 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
                  <div className="space-y-2">
                    <label htmlFor="otherDepartment" className="text-xs font-semibold text-zinc-400 ml-1">Please specify your department</label>
                    <input 
                      id="otherDepartment"
                      type="text" 
                      name="otherDepartment"
                      placeholder="Enter your department"
                      required={formData.department === 'Other'}
                      value={formData.otherDepartment}
                      onChange={handleChange}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="clg" className="text-xs font-semibold text-zinc-400 ml-1">College/University Name</label>
                <input 
                  id="clg"
                  type="text" 
                  name="clg"
                  placeholder="Your Institution"
                  required
                  value={formData.clg}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="state" className="text-xs font-semibold text-zinc-400 ml-1">State</label>
                  <input 
                    id="state"
                    type="text" 
                    name="state"
                    placeholder="e.g., Uttarakhand"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="city" className="text-xs font-semibold text-zinc-400 ml-1">City</label>
                  <input 
                    id="city"
                    type="text" 
                    name="city"
                    placeholder="e.g., Dehradun"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="mobile_no" className="text-xs font-semibold text-zinc-400 ml-1">Mobile Number</label>
                <input 
                  id="mobile_no"
                  type="text" 
                  name="mobile_no"
                  placeholder="+91 00000 00000"
                  required
                  value={formData.mobile_no}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span className="w-5 h-5 border-2 border-zinc-400 border-t-black rounded-full animate-spin"></span>
                ) : (
                  <>Submit Response <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center font-medium">{message}</p>
              )}
            </form>
          )}
        </div>
      </div>
      
      <footer className="mt-12 text-zinc-500 text-sm relative z-10">
        © 2026 The Nexus Forum | HackRonyX Flagship Initiative
      </footer>
    </main>
  );
}
