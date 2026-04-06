import Link from "next/link";
import Image from "next/image";
import { Code, Network, Rocket } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const ARCHIVE_IMAGES = [
  { src: "/static/DSC_0048 - NISCHAL PURI.JPG", title: "Keynote Address", desc: "Annual technical summit 2024" },
  { src: "/static/DSC_1584-2 - Abhinav Muley.JPG", title: "HackRonyX Winner", desc: "First prize distribution" },
  { src: "/static/DSC_1602 (2) - Jayshri Harde.JPG", title: "Committee Meeting", desc: "Planning session for upcoming events" },
  { src: "/static/1000100511hosodud.jpg", title: "Web Nest Inauguration", desc: "Ribbon cutting ceremony" },
  { src: "/static/1000100512hkoyxx.jpg", title: "Coding Bootcamp", desc: "Hands-on web development workshop" },
  { src: "/static/25001216_7040859.jpg", title: "Data Science Seminar", desc: "Introduction to Neural Networks" },
  { src: "/static/25860667_7088807.jpg", title: "Career Catalyst", desc: "Resume building & interview prep" },
  { src: "/static/4167275_18770.jpg", title: "Open Source Contribution", desc: "GitHub Hacktoberfest participation" }
];

export default async function Home() {
  // Atomic DB-backed visitor counter — safe for concurrent users & serverless
  const statsRow = await prisma.site_stats.upsert({
    where: { id: 1 },
    create: { id: 1, views: 1 },
    update: { views: { increment: 1 } },
  });
  const totalVisitors = statsRow.views;

  const [totalUsers, eventRegsCount, approvedEvents] = await Promise.all([
    prisma.user.count(),
    prisma.event_registrations.count(),
    prisma.event_proposals.findMany({
      where: { status: 'approved' },
      take: 2,
      orderBy: { submitted_on: 'desc' },
    }),
  ]);

  return (
    <>
      <div className="w-full overflow-hidden bg-gradient-to-r from-[#9333ea] to-[#7928ca] text-white py-3 relative z-[40] mt-4 mb-4 shadow-[0_4px_20px_rgba(147,51,234,0.3)]">
        <div className="inline-block whitespace-nowrap pl-full box-content animate-ticker">
          <div className="inline-block px-[50px] text-[0.75rem] font-extrabold uppercase tracking-[0.12em]">
            HackRonyX 2026: National Hackathon is Coming Soon &bull; Register Your Interest Now
          </div>
          <div className="inline-block px-[50px] text-[0.75rem] font-extrabold uppercase tracking-[0.12em]">
            Exclusive Technical Collaboration with Industry Leaders &bull; Join 3000+ Innovators
          </div>
          <div className="inline-block px-[50px] text-[0.75rem] font-extrabold uppercase tracking-[0.12em]">
            HackRonyX 2026: National Hackathon is Coming Soon &bull; Register Your Interest Now
          </div>
          <div className="inline-block px-[50px] text-[0.75rem] font-extrabold uppercase tracking-[0.12em]">
            Exclusive Technical Collaboration with Industry Leaders &bull; Join 3000+ Innovators
          </div>
        </div>
      </div>

      <div className="ambient-blobs">
        <div className="blob orange-blob"></div>
        <div className="blob red-blob"></div>
        <div className="blob blue-blob"></div>
        <div className="blob purple-blob"></div>
      </div>

      <main className="relative z-10 pt-[100px]">
        <div className="max-w-[1200px] mx-auto px-12">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[calc(100vh-184px)] py-[120px]">
            <div className="max-w-[600px]">
              <h1 className="text-[3rem] md:text-[4.5rem] font-bold leading-[1.05] tracking-[-0.04em] mb-6">
                The <span className="text-[#9333ea]">Nexus</span> Forum
              </h1>
              <p className="text-[1.25rem] text-[#a1a1aa] mb-10 max-w-[480px]">
                Official Computer Science Engineering and <strong className="text-[#f2f2f2] font-semibold">Data Science</strong> Department Platform. A high-performance hub for technical collaboration, insights, and innovation.
              </p>
              <div className="flex gap-4">
                <Link href="/clubs" className="inline-flex items-center justify-center px-5 py-2.5 rounded-md text-[0.9rem] font-medium bg-[#f2f2f2] text-[#050505] border border-transparent hover:bg-[#e5e5e5] transition-all">
                  Explore Clubs
                </Link>
                <Link href="/events" className="inline-flex items-center justify-center px-5 py-2.5 rounded-md text-[0.9rem] font-medium bg-transparent text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">
                  View Events &rarr;
                </Link>
              </div>
            </div>

            <div className="hidden md:flex h-full justify-end items-center">
              <div className="w-[440px] h-[440px] bg-[#0e0e0e] rounded-2xl border border-white/5 relative overflow-hidden flex items-end p-10 gap-4">
                <div className="flex-1 bg-[#141414] rounded relative h-[40%] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:bg-[#1a1a1a] after:rounded after:h-full"></div>
                <div className="flex-1 bg-[#141414] rounded relative h-[70%] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:bg-[#1a1a1a] after:rounded after:h-full"></div>
                <div className="flex-1 bg-[#141414] rounded relative h-[50%] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:bg-[#1a1a1a] after:rounded after:h-full"></div>
                <div className="flex-1 bg-[#9333ea]/90 rounded relative h-[90%]"></div>
                <div className="flex-1 bg-[#141414] rounded relative h-[60%] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:bg-[#1a1a1a] after:rounded after:h-full"></div>
              </div>
            </div>
          </section>
        </div>

        {/* ── Layered Typography Statement ───────────────────────────── */}
        <div className="relative overflow-hidden py-12 md:py-20 flex flex-col items-center justify-center select-none">
          {/* Ghost / outlined text — sits behind */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center text-[clamp(80px,18vw,260px)] font-black tracking-tighter leading-none pointer-events-none"
            style={{
              WebkitTextStroke: '1.5px rgba(147,51,234,0.18)',
              color: 'transparent',
              letterSpacing: '-0.04em',
            }}
          >
            NEXUS
          </span>

          {/* Solid gradient text — sits on top */}
          <span
            className="relative z-10 text-[clamp(80px,18vw,260px)] font-black tracking-tighter leading-none"
            style={{
              background: 'linear-gradient(135deg, #9333ea 0%, #c026d3 40%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.04em',
              filter: 'drop-shadow(0 0 60px rgba(147,51,234,0.25))',
            }}
          >
            NEXUS
          </span>

          {/* Tagline below */}
          <p className="relative z-10 mt-4 text-zinc-500 text-sm md:text-base font-medium tracking-[0.2em] uppercase">
            Where innovation meets engineering
          </p>
        </div>

        <section className="bg-[#0e0e0e] border-y border-white/5 py-16">
          <div className="max-w-[1200px] mx-auto px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div>
              <h3 className="text-[3.5rem] font-medium tracking-[-0.03em] mb-2 text-[#f2f2f2]">
                {totalVisitors.toLocaleString()}
              </h3>
              <p className="text-[0.9rem] text-[#a1a1aa] uppercase tracking-[0.05em] font-medium">Total Visitors</p>
            </div>
            <div>
              <h3 className="text-[3.5rem] font-medium tracking-[-0.03em] mb-2 text-[#f2f2f2]">{totalUsers + 50}+</h3>
              <p className="text-[0.9rem] text-[#a1a1aa] uppercase tracking-[0.05em] font-medium">Active Students</p>
            </div>
            <div>
              <h3 className="text-[3.5rem] font-medium tracking-[-0.03em] mb-2 text-[#f2f2f2]">3</h3>
              <p className="text-[0.9rem] text-[#a1a1aa] uppercase tracking-[0.05em] font-medium">Specialized Clubs</p>
            </div>
            <div>
              <h3 className="text-[3.5rem] font-medium tracking-[-0.03em] mb-2 text-[#f2f2f2]">{eventRegsCount + 10}+</h3>
              <p className="text-[0.9rem] text-[#a1a1aa] uppercase tracking-[0.05em] font-medium">Yearly Events</p>
            </div>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-12">
          <section className="py-[120px]">
            <div className="mb-16">
              <h2 className="text-[2.5rem] font-semibold tracking-[-0.03em] mb-4">Featured Clubs</h2>
              <p className="text-[#a1a1aa] text-[1.1rem]">Join specialized groups focused on modern tech stacks.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {/* Web Nest */}
              <div className="group [perspective:1000px] cursor-pointer">
                <div className="relative h-full bg-[#0a0a0a] rounded-[24px] p-[2px] transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(5deg)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#3b82f6] before:to-[#60a5fa] before:rounded-[24px] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 group-hover:shadow-[rgba(59,130,246,0.3)_0px_30px_30px_-20px]">
                  <div className="relative h-full flex flex-col gap-6 bg-[#0a0a0a] rounded-[22px] p-8 [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:translateZ(30px)] border border-white/5 shadow-inner overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#3b82f6] blur-[50px] opacity-10 group-hover:opacity-30 rounded-full transition-opacity duration-500 pointer-events-none"></div>
                    <div className="w-12 h-12 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6] [transform:translateZ(20px)] border border-[#3b82f6]/20">
                      <Code />
                    </div>
                    <div className="[transform:translateZ(20px)]">
                      <h3 className="text-[1.25rem] font-semibold mb-2 tracking-[-0.01em] text-white">Web Nest</h3>
                      <p className="text-zinc-400 text-[0.95rem] leading-relaxed">Full-stack development, modern web frameworks, and cloud deployment strategies.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Science */}
              <div className="group [perspective:1000px] cursor-pointer">
                <div className="relative h-full bg-[#0a0a0a] rounded-[24px] p-[2px] transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(0deg)_rotateX(8deg)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#9333ea] before:to-[#c084fc] before:rounded-[24px] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 group-hover:shadow-[rgba(147,51,234,0.3)_0px_30px_30px_-20px]">
                  <div className="relative h-full flex flex-col gap-6 bg-[#0a0a0a] rounded-[22px] p-8 [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:translateZ(30px)] border border-white/5 shadow-inner overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#9333ea] blur-[50px] opacity-10 group-hover:opacity-30 rounded-full transition-opacity duration-500 pointer-events-none"></div>
                    <div className="w-12 h-12 rounded-lg bg-[#9333ea]/10 flex items-center justify-center text-[#9333ea] [transform:translateZ(20px)] border border-[#9333ea]/20">
                      <Network />
                    </div>
                    <div className="[transform:translateZ(20px)]">
                      <h3 className="text-[1.25rem] font-semibold mb-2 tracking-[-0.01em] text-white">Data Science Innovation</h3>
                      <p className="text-zinc-400 text-[0.95rem] leading-relaxed">Machine learning models, deep learning architectures, and data engineering.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Catalyst */}
              <div className="group [perspective:1000px] cursor-pointer">
                <div className="relative h-full bg-[#0a0a0a] rounded-[24px] p-[2px] transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-10deg)_rotateX(5deg)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#10b981] before:to-[#34d399] before:rounded-[24px] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 group-hover:shadow-[rgba(16,185,129,0.3)_0px_30px_30px_-20px]">
                  <div className="relative h-full flex flex-col gap-6 bg-[#0a0a0a] rounded-[22px] p-8 [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:translateZ(30px)] border border-white/5 shadow-inner overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#10b981] blur-[50px] opacity-10 group-hover:opacity-30 rounded-full transition-opacity duration-500 pointer-events-none"></div>
                    <div className="w-12 h-12 rounded-lg bg-[#10b981]/10 flex items-center justify-center text-[#10b981] [transform:translateZ(20px)] border border-[#10b981]/20">
                      <Rocket />
                    </div>
                    <div className="[transform:translateZ(20px)]">
                      <h3 className="text-[1.25rem] font-semibold mb-2 tracking-[-0.01em] text-white">Career Catalyst</h3>
                      <p className="text-zinc-400 text-[0.95rem] leading-relaxed">Industry readiness, algorithmic problem solving, and technical interview prep.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-[120px]">
            <div className="mb-16">
              <h2 className="text-[2.5rem] font-semibold tracking-[-0.03em] mb-4">Upcoming Events</h2>
              <p className="text-[#a1a1aa] text-[1.1rem]">Technical workshops, hackathons, and guest lectures.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

              {/* HackRonyX Main Event */}
              <div className="md:col-span-2 group [perspective:1000px] cursor-pointer">
                <div className="relative h-full bg-[#0a0a0a] rounded-[30px] p-[2px] transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(3deg)_rotateX(2deg)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#9333ea] before:to-[#6366f1] before:rounded-[30px] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 group-hover:shadow-[rgba(147,51,234,0.3)_0px_40px_40px_-20px]">
                  <div className="relative h-full flex flex-col justify-between bg-[#0a0a0a] rounded-[28px] p-10 min-h-[400px] [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:translateZ(40px)] border border-white/5 shadow-inner overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#9333ea] blur-[80px] opacity-10 group-hover:opacity-30 rounded-full transition-opacity duration-500 pointer-events-none"></div>

                    <div className="[transform:translateZ(30px)]">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-[0.85rem] font-semibold text-[#9333ea] uppercase tracking-[0.05em] drop-shadow-md">June 2026</span>
                        <span className="text-[0.72rem] font-bold uppercase tracking-[0.08em] px-3 py-1 bg-[#9333ea]/10 text-[#a855f7] border border-[#9333ea]/20 rounded-full shadow-sm">Upcoming</span>
                      </div>
                      <h3 className="text-[2.2rem] font-bold tracking-[-0.02em] mb-4 text-white">HackRonyX 2026</h3>
                      <p className="text-zinc-400 mb-8 max-w-[600px] leading-relaxed">The second edition of our flagship national hackathon returns. Compete, build, and innovate over 48 hours with thousands of participants from across the country.</p>
                    </div>

                    <div className="[transform:translateZ(30px)]">
                      <Link href="/hackronyx-registration" className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-[0.95rem] font-bold bg-[#f2f2f2] text-[#050505] hover:bg-[#e5e5e5] transition-all shadow-[0_4px_14px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)]">
                        Mark Interest &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stacked Dynamic Approved Events */}
              <div className="flex flex-col gap-6 md:gap-10">
                {approvedEvents.length > 0 ? (
                  approvedEvents.map((ev, i) => (
                    <div key={ev.id} className="group [perspective:1000px] cursor-pointer flex-1">
                      <div className={`relative h-full bg-[#0a0a0a] rounded-[24px] p-[2px] transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-5deg)_rotateX(5deg)] before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 ${i % 2 === 0
                          ? "before:from-[#f59e0b] before:to-[#ea580c] group-hover:shadow-[rgba(245,158,11,0.3)_0px_20px_20px_-10px] before:rounded-[24px]"
                          : "before:from-[#10b981] before:to-[#6ee7b7] group-hover:shadow-[rgba(16,185,129,0.3)_0px_20px_20px_-10px] before:rounded-[24px]"
                        }`}>
                        <div className="relative h-full flex flex-col justify-center bg-[#0a0a0a] rounded-[22px] p-8 [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:translateZ(30px)] border border-white/5 shadow-inner overflow-hidden">
                          <div className={`absolute -top-4 -right-4 w-32 h-32 blur-[50px] opacity-10 group-hover:opacity-30 rounded-full transition-opacity duration-500 pointer-events-none ${i % 2 === 0 ? "bg-[#f59e0b]" : "bg-[#10b981]"
                            }`}></div>

                          <div className="[transform:translateZ(20px)] mb-6">
                            <span className={`text-[0.85rem] font-bold uppercase tracking-[0.05em] drop-shadow-sm ${i % 2 === 0 ? "text-[#f59e0b]" : "text-[#10b981]"
                              }`}>
                              {ev.proposed_date ? new Date(ev.proposed_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'TBD'}
                            </span>
                          </div>
                          <h3 className="text-[1.25rem] font-semibold mb-6 tracking-[-0.01em] text-white [transform:translateZ(20px)]">
                            {ev.event_title}
                          </h3>

                          <div className="[transform:translateZ(20px)] mt-auto">
                            <Link href="/events" className="text-[0.9rem] font-bold text-[#f2f2f2] hover:text-white transition-colors flex items-center gap-2">
                              View Details &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center rounded-[24px] border border-white/5 bg-[#0a0a0a] min-h-[150px]">
                    <p className="text-zinc-500 font-medium">New events dropping soon.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="py-24 border-t border-white/5 relative z-10">
            <div className="mb-14">
              <h2 className="text-[2.5rem] font-semibold tracking-[-0.03em] mb-4">Nexus Archive</h2>
              <p className="text-[#a1a1aa] text-[1.1rem]">A visual journey through our past events, hackathons, and the incredible community.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
              {ARCHIVE_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className={`group relative rounded-xl overflow-hidden bg-[#0e0e0e] border border-white/5 hover:border-white/20 hover:shadow-[0_8px_30px_rgb(147,51,234,0.15)] transition-all duration-500 hover:-translate-y-2 ${i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  style={{ minHeight: i % 5 === 0 ? '400px' : '260px' }}
                >
                  <div className="absolute inset-0 bg-[#0a0a0a] transition-transform duration-700 ease-in-out group-hover:scale-105"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 text-[#f2f2f2] group-hover:opacity-40 transition-opacity">
                    <Code size={40} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-[#f2f2f2] font-semibold text-lg tracking-tight mb-1">{img.title}</h3>
                    <p className="text-[#a1a1aa] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{img.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-24 border-t border-white/5 mb-20">
            <div className="mb-14">
              <h2 className="text-[2.5rem] font-semibold tracking-[-0.03em] mb-4">Legacy & Achievements</h2>
              <p className="text-[#a1a1aa] text-[1.1rem]">Highlighting historical milestones and major technical contributions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-16">

              {/* Card 1 - Emerald 3D Holographic variant */}
              <div className="group [perspective:1000px] cursor-pointer">
                <div className="relative h-full bg-[#0a0a0a] rounded-[30px] p-[2px] transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(10deg)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgb(0,255,214)] before:to-[rgb(8,226,96)] before:rounded-[30px] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 group-hover:shadow-[rgba(8,226,96,0.3)_40px_50px_25px_-40px,rgba(8,226,96,0.15)_0px_25px_25px_-5px]">

                  <div className="relative h-full bg-[#0a0a0a] rounded-[28px] p-8 [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:translateZ(40px)] border border-white/5 shadow-inner">
                    <div className="absolute -top-4 -right-4 w-32 h-32 bg-[rgb(0,255,214)] blur-[50px] opacity-5 group-hover:opacity-20 rounded-full transition-opacity duration-500"></div>

                    <div className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[rgb(0,255,214)] mb-3 drop-shadow-md">2025 Milestone</div>
                    <h4 className="text-[1.2rem] font-semibold tracking-[-0.01em] mb-3 text-white">HackRonyX 2025 National Hackathon</h4>
                    <p className="text-[0.9rem] text-zinc-400 leading-relaxed mb-6">Our inaugural flagship hackathon brought together over 1200 participants from 50+ universities. It featured 48 hours of intense coding, resulting in 200+ deployed projects targeting real-world problems.</p>

                    <div className="flex gap-2 flex-wrap [transform:translateZ(20px)]">
                      <span className="text-[0.7rem] font-bold px-3 py-1 rounded-full bg-[rgb(0,255,214)]/10 text-[rgb(0,255,214)] border border-[rgb(0,255,214)]/20 shadow-sm">1200+ Attendees</span>
                      <span className="text-[0.7rem] font-bold px-3 py-1 rounded-full bg-[rgb(0,255,214)]/10 text-[rgb(0,255,214)] border border-[rgb(0,255,214)]/20 shadow-sm">National Level</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Deep Purple 3D Holographic variant */}
              <div className="group [perspective:1000px] cursor-pointer">
                <div className="relative h-full bg-[#0a0a0a] rounded-[30px] p-[2px] transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-10deg)_rotateX(10deg)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#a855f7] before:to-[#6366f1] before:rounded-[30px] before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 group-hover:shadow-[rgba(168,85,247,0.3)_40px_50px_25px_-40px,rgba(168,85,247,0.15)_0px_25px_25px_-5px]">

                  <div className="relative h-full bg-[#0a0a0a] rounded-[28px] p-8 [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:translateZ(40px)] border border-white/5 shadow-inner">
                    <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#a855f7] blur-[50px] opacity-5 group-hover:opacity-20 rounded-full transition-opacity duration-500"></div>

                    <div className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[#a855f7] mb-3 drop-shadow-md">2026 Collaboration</div>
                    <h4 className="text-[1.2rem] font-semibold tracking-[-0.01em] mb-3 text-white">NVIDIA Deep Learning Lab</h4>
                    <p className="text-[0.9rem] text-zinc-400 leading-relaxed mb-6">A specialized hands-on workshop in collaboration with NVIDIA DLI. Members gained practical experience with GPU-accelerated computing, training complex models on cloud clusters.</p>

                    <div className="flex gap-2 flex-wrap [transform:translateZ(20px)]">
                      <span className="text-[0.7rem] font-bold px-3 py-1 rounded-full bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20 shadow-sm">NVIDIA DLI</span>
                      <span className="text-[0.7rem] font-bold px-3 py-1 rounded-full bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20 shadow-sm">GPU Computing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center py-[120px]">
              <h2 className="text-[2.2rem] font-semibold tracking-[-0.03em] mb-7">Ready to build the future?</h2>
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 rounded-md text-[1.1rem] font-medium bg-[#9333ea] text-white border border-transparent hover:bg-[#a855f7] transition-all">
                Join Nexus Forum
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/5 pt-20 pb-12 bg-[#050505] relative z-10">
        <div className="max-w-[1200px] mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h3 className="text-[0.95rem] font-bold tracking-[-0.01em] text-[#f2f2f2] mb-3">NEXUS Forum</h3>
              <p className="text-[0.82rem] text-[#a1a1aa] leading-relaxed max-w-[240px]">
                NEXUS is the technical forum of UPES, fostering innovation and technical excellence among students.
              </p>
            </div>
            <div>
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#71717a] mb-4">Navigation</h3>
              <ul className="flex flex-col gap-2.5">
                <li><Link href="/" className="text-[0.875rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">Home</Link></li>
                <li><Link href="/clubs" className="text-[0.875rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">Clubs</Link></li>
                <li><Link href="/events" className="text-[0.875rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">Events</Link></li>
                <li><Link href="/committee" className="text-[0.875rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">Committee</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#71717a] mb-4">Connect</h3>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#" className="text-[0.875rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">Instagram</a></li>
                <li><a href="#" className="text-[0.875rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center pt-8 border-t border-white/5 text-[0.8rem] text-[#71717a]">
            <p>&copy; 2026 NEXUS Forum. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
