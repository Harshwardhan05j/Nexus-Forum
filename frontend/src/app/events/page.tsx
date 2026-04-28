import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Sparkles } from "lucide-react";
import React from "react";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Upcoming Tech Events & Hackathons | Nexus Forum",
  description: "Explore upcoming coding competitions, tech talks, and hackathons hosted by the Nexus Forum CSE department.",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  let approvedEvents: any[] = [];
  try {
    approvedEvents = await prisma.event_proposals.findMany({
      where: { status: 'approved' },
      orderBy: { proposed_date: 'asc' },
    });
  } catch (err) {
    console.error("Prisma Error in EventsPage:", err);
    // approvedEvents remains [] which triggers the graceful fallback UI already below
  }

  return (
    <>
      <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden pointer-events-none bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 min-w-full min-h-full object-cover opacity-80"
        >
          <source src="/static/9255216-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#050505]/40 border-none backdrop-blur-sm"></div>
      </div>
      <main className="max-w-[1200px] mx-auto px-5 md:px-12 pt-[40px] min-h-[calc(100vh-184px)] relative z-10 mt-nav">
        <header className="text-center pt-[40px] md:pt-[60px] pb-[30px] md:pb-[40px]">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#9333ea] mb-4 inline-block">Connect & Learn</span>
          <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[3.5rem] font-bold tracking-[-0.03em] mb-4 md:mb-6 text-[#f2f2f2]">Nexus Events</h1>
          <p className="text-[1rem] md:text-[1.15rem] text-[#a1a1aa] max-w-[580px] mx-auto">Participate in hands-on workshops, competitive hackathons, and technical summits designed for deep skill building and networking.</p>
        </header>

        {/* Ambient Showcase Strip */}
        <div className="relative w-full overflow-hidden mb-20 select-none mask-fade-edges">
          <div className="flex w-max gap-4 animate-infinite-scroll py-4 hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, groupIdx) => (
              <React.Fragment key={groupIdx}>
                {[
                  "/static/images/showcase/38e33fcd-af96-4ba9-a77c-9071ead7304f.jpg",
                  "/static/images/showcase/790beb96-253a-45ba-bd21-03ccfc4c6a26.jpg",
                  "/static/images/showcase/5efcc58e-5e49-4253-9188-0e1c8a72eab0.jpg",
                  "/static/images/showcase/1a3dc921-82ac-4e10-b5ed-592d387ff3e6.jpg",
                ].map((src, i) => (
                  <div key={`${groupIdx}-${i}`} className="relative w-[200px] h-[120px] rounded-lg overflow-hidden border border-white/10 flex-none opacity-50 hover:opacity-100 transition-opacity">
                    <Image src={src} alt="" aria-hidden="true" fill className="object-cover" sizes="200px" />
                    <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay"></div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Featured Event Section (Fallback/Highlight) */}
        <section className="flex flex-col md:flex-row bg-[#0e0e0e] border border-white/5 rounded-xl overflow-hidden mb-12 md:mb-16 transition-all hover:bg-[#141414] hover:-translate-y-1">
          <div className="flex-[1.1] min-h-[220px] md:min-h-[480px] relative">
            <Image src="/static/4167275_18770.jpg" alt="Data Dive Masterclass" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
          </div>
          <div className="flex-1 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-[#9333ea] uppercase text-[0.85rem] font-semibold tracking-[0.1em] mb-3 md:mb-4">
              <Sparkles className="w-4 h-4" /> Featured Session
            </div>
            <h2 className="text-[1.6rem] md:text-[2.5rem] font-bold tracking-[-0.02em] mb-3 md:mb-4 text-[#f2f2f2]">Data Dive Masterclass</h2>
            <p className="text-[0.95rem] md:text-[1.05rem] text-[#a1a1aa] leading-relaxed mb-5 md:mb-8">
              Join us for an intensive, hands-on data analytics experience. You'll tackle real-world datasets, build predictive models, and uncover hidden insights globally utilizing modern MLOps pipelines.
            </p>
            <div className="flex gap-4">
              <Link href="/event-register/Data%20Dive%20Masterclass" className="bg-[#9333ea] text-white px-5 py-2.5 rounded-md text-[0.9rem] font-medium hover:bg-[#a855f7] transition-colors shadow-lg shadow-purple-900/20">Register Now</Link>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="relative flex-1 max-w-full md:max-w-[320px] w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a1a1aa] w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="w-full bg-[#0e0e0e] border border-white/5 rounded-lg py-3 pl-12 pr-4 text-[#f2f2f2] text-[0.95rem] focus:outline-none focus:border-[#a1a1aa] focus:bg-[#141414] transition-all"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 items-center">
            <Link href="/event-proposal" className="border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 px-5 py-2.5 rounded-md text-[0.85rem] font-bold transition-all whitespace-nowrap">
              + PROPOSE NEW EVENT
            </Link>
          </div>
        </section>

        {/* Dynamic Events Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-[120px]">
          {approvedEvents.length > 0 ? (
            approvedEvents.map((event) => (
              <div key={event.id} className="bg-[#0e0e0e] border border-white/5 rounded-xl p-10 flex flex-col transition-all hover:bg-[#141414] hover:-translate-y-1 group">
                <div className="flex items-center gap-2 text-[#9333ea] uppercase text-[0.85rem] font-semibold tracking-[0.1em] mb-4">
                  <Calendar className="w-4 h-4" /> {event.proposed_date ? new Date(event.proposed_date).toLocaleDateString() : 'TBD'}
                </div>
                <h3 className="text-[1.5rem] font-semibold tracking-[-0.01em] mb-3 text-[#f2f2f2] group-hover:text-purple-400 transition-colors">
                  {event.event_title}
                </h3>
                <p className="text-[#a1a1aa] text-[0.95rem] leading-relaxed mb-8 flex-1">
                  {event.event_description || 'No description provided.'}
                </p>
                <div className="pt-6 border-t border-white/5 text-[0.85rem]">
                  <Link href={`/event-register/${encodeURIComponent(event.event_title)}`} className="bg-[#f2f2f2] text-[#050505] px-5 py-2 rounded-md font-bold hover:bg-white transition-all inline-block">
                    Register Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Fallback Static Cards if no approved events exist yet */}
              <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-10 flex flex-col transition-all hover:bg-[#141414]">
                <div className="flex items-center gap-2 text-zinc-500 uppercase text-[0.85rem] font-semibold tracking-[0.1em] mb-4">
                  <Calendar className="w-4 h-4" /> Coming Soon
                </div>
                <h3 className="text-[1.5rem] font-semibold tracking-[-0.01em] mb-3 text-[#f2f2f2]">HackRonyX Build-a-thon</h3>
                <p className="text-[#a1a1aa] text-[0.95rem] leading-relaxed mb-8 flex-1">Our upcoming flagship event. Stay tuned for registration dates and prize details.</p>
                <div className="pt-6 border-t border-white/5 text-[0.85rem]">
                  <span className="text-zinc-500 font-medium">Opening Soon</span>
                </div>
              </div>
              <div className="md:col-span-2 flex items-center justify-center border border-dashed border-white/5 rounded-xl p-10 text-zinc-600">
                <p>New events are currently being curated. Check back shortly!</p>
              </div>
            </>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-[#0e0e0e] border-y border-white/5 py-16 md:py-[100px] text-center mb-16 md:mb-[120px] -mx-5 md:-mx-12 px-5 md:px-12">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#9333ea] mb-4 inline-block">Collaborate & Lead</span>
          <h2 className="text-[1.8rem] md:text-[2.5rem] font-semibold tracking-[-0.03em] mb-3 md:mb-4 text-[#f2f2f2]">Have an Idea for an Event?</h2>
          <p className="text-[#a1a1aa] text-[1rem] md:text-[1.1rem] max-w-[600px] mx-auto mb-6 md:mb-8">We're always looking for new ideas and passionate organizers. Submit your event proposal and our team will help you bring it to life.</p>
          <Link href="/event-proposal" className="bg-white text-black px-8 py-3.5 rounded-md text-[1rem] font-bold hover:bg-zinc-200 transition-all shadow-xl shadow-white/5">
            Submit Your Proposal &rarr;
          </Link>
        </section>
      </main>
    </>
  );
}

