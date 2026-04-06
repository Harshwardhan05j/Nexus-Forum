import Link from "next/link";
import Image from "next/image";
import { Search, Calendar } from "lucide-react";

export default function EventsPage() {
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
      <main className="max-w-[1200px] mx-auto px-12 pt-[100px] min-h-[calc(100vh-184px)] relative z-10">
        <header className="text-center py-[100px] pb-[60px]">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#9333ea] mb-4 inline-block">Connect & Learn</span>
          <h1 className="text-[3.5rem] font-bold tracking-[-0.03em] mb-6 text-[#f2f2f2]">Upcoming Events</h1>
          <p className="text-[1.15rem] text-[#a1a1aa] max-w-[580px] mx-auto">Participate in hands-on workshops, competitive hackathons, and technical summits designed for deep skill building and networking.</p>
        </header>

        {/* Featured Event */}
        <section className="flex flex-col md:flex-row bg-[#0e0e0e] border border-white/5 rounded-xl overflow-hidden mb-16 transition-all hover:bg-[#141414] hover:-translate-y-1">
          <div className="flex-[1.1] min-h-[300px] md:min-h-[480px] relative">
            <Image src="/static/4167275_18770.jpg" alt="Data Dive Masterclass" fill className="object-cover" />
          </div>
          <div className="flex-1 p-[48px] flex flex-col justify-center">
            <div className="flex items-center gap-2 text-[#9333ea] uppercase text-[0.85rem] font-semibold tracking-[0.1em] mb-4">
              <Calendar className="w-4 h-4" /> Aug 31, 2026
            </div>
            <h2 className="text-[2.5rem] font-bold tracking-[-0.02em] mb-4 text-[#f2f2f2]">Data Dive Masterclass</h2>
            <p className="text-[1.05rem] text-[#a1a1aa] leading-relaxed mb-8">
              Join us for an intensive, hands-on data analytics experience. You'll tackle real-world datasets, build predictive models, and uncover hidden insights globally utilizing modern MLOps pipelines.
            </p>
            <div className="flex gap-4">
              <Link href="/event-register/Data%20Dive%20Masterclass" className="bg-[#9333ea] text-white px-5 py-2.5 rounded-md text-[0.9rem] font-medium hover:bg-[#a855f7] transition-colors">Register Now</Link>
              <Link href="#" className="bg-transparent text-[#a1a1aa] hover:text-[#f2f2f2] px-5 py-2.5 rounded-md text-[0.9rem] font-medium transition-colors">View Schedule &rarr;</Link>
            </div>
          </div>
        </section>

        {/* Filters Section */}
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
            <button className="bg-[#f2f2f2] text-[#050505] border border-[#f2f2f2] px-4 py-2 rounded-md text-[0.9rem] font-medium whitespace-nowrap">All Events</button>
            <button className="bg-[#0e0e0e] border border-white/5 text-[#a1a1aa] hover:bg-[#f2f2f2] hover:text-[#050505] px-4 py-2 rounded-md text-[0.9rem] font-medium transition-all whitespace-nowrap">Workshops</button>
            <button className="bg-[#0e0e0e] border border-white/5 text-[#a1a1aa] hover:bg-[#f2f2f2] hover:text-[#050505] px-4 py-2 rounded-md text-[0.9rem] font-medium transition-all whitespace-nowrap">Seminars</button>
            <button className="bg-[#0e0e0e] border border-white/5 text-[#a1a1aa] hover:bg-[#f2f2f2] hover:text-[#050505] px-4 py-2 rounded-md text-[0.9rem] font-medium transition-all whitespace-nowrap">Hackathons</button>
            <Link href="/event-proposal" className="ml-3 border border-dashed border-white/10 text-[#9333ea] hover:bg-[#9333ea]/10 px-4 py-2 rounded-md text-[0.85rem] font-medium transition-colors whitespace-nowrap">
              + Propose Event
            </Link>
          </div>
        </section>

        {/* Events Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-[120px]">
          {/* Event Card 1 */}
          <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-10 flex flex-col transition-all hover:bg-[#141414] hover:-translate-y-1">
            <div className="flex items-center gap-2 text-[#9333ea] uppercase text-[0.85rem] font-semibold tracking-[0.1em] mb-4">
              <Calendar className="w-4 h-4" /> Sep 15, 2026
            </div>
            <h3 className="text-[1.5rem] font-semibold tracking-[-0.01em] mb-3 text-[#f2f2f2]">Data Hackathon v2.0</h3>
            <p className="text-[#a1a1aa] text-[0.95rem] leading-relaxed mb-8 flex-1">Collaborate, innovate, and solve intense data challenges in a high-energy 48-hour hackathon. Great prizes and cloud credits for winners.</p>
            <div className="pt-6 border-t border-white/5 text-[0.85rem]">
               <Link href="/event-register/Data%20Hackathon%20v2.0" className="bg-[#f2f2f2] text-[#050505] px-4 py-1.5 rounded-md font-medium hover:bg-[#e5e5e5] transition-colors">Register Now</Link>
            </div>
          </div>

          {/* Event Card 2 */}
          <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-10 flex flex-col transition-all hover:bg-[#141414] hover:-translate-y-1">
            <div className="flex items-center gap-2 text-[#9333ea] uppercase text-[0.85rem] font-semibold tracking-[0.1em] mb-4">
              <Calendar className="w-4 h-4" /> Oct 02, 2026
            </div>
            <h3 className="text-[1.5rem] font-semibold tracking-[-0.01em] mb-3 text-[#f2f2f2]">Neural Networks Seminar</h3>
            <p className="text-[#a1a1aa] text-[0.95rem] leading-relaxed mb-8 flex-1">An in-depth exploration of deep learning architectures, backward propagation algorithms, and optimizing neural networks for scale.</p>
            <div className="pt-6 border-t border-white/5 text-[0.85rem]">
               <Link href="/event-register/Neural%20Networks%20Seminar" className="bg-[#f2f2f2] text-[#050505] px-4 py-1.5 rounded-md font-medium hover:bg-[#e5e5e5] transition-colors">Register Now</Link>
            </div>
          </div>

          {/* Event Card 3 */}
          <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-10 flex flex-col transition-all hover:bg-[#141414] hover:-translate-y-1">
            <div className="flex items-center gap-2 text-[#9333ea] uppercase text-[0.85rem] font-semibold tracking-[0.1em] mb-4">
              <Calendar className="w-4 h-4" /> Oct 28, 2026
            </div>
            <h3 className="text-[1.5rem] font-semibold tracking-[-0.01em] mb-3 text-[#f2f2f2]">System Design Workshop</h3>
            <p className="text-[#a1a1aa] text-[0.95rem] leading-relaxed mb-8 flex-1">Learn how to architect large-scale distributed systems, handle massive throughput efficiently, and ensure system-wide fault tolerance.</p>
            <div className="pt-6 border-t border-white/5 text-[0.85rem]">
               <Link href="/event-register/System%20Design%20Workshop" className="bg-[#f2f2f2] text-[#050505] px-4 py-1.5 rounded-md font-medium hover:bg-[#e5e5e5] transition-colors">Register Now</Link>
            </div>
          </div>
        </section>

        {/* Host Event CTA */}
        <section className="bg-[#0e0e0e] border-y border-white/5 py-[100px] text-center mb-[120px] -mx-12 px-12">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#9333ea] mb-4 inline-block">Collaborate & Lead</span>
          <h2 className="text-[2.5rem] font-semibold tracking-[-0.03em] mb-4 text-[#f2f2f2]">Have an Idea for an Event?</h2>
          <p className="text-[#a1a1aa] text-[1.1rem] max-w-[600px] mx-auto mb-8">We're always looking for new ideas and passionate organizers. Submit your event proposal and our team will help you bring it to life.</p>
          <Link href="/event-proposal" className="bg-[#9333ea] text-white px-8 py-3.5 rounded-md text-[1rem] font-medium hover:bg-[#a855f7] transition-colors">
            Submit Your Proposal &rarr;
          </Link>
        </section>
      </main>

      <footer className="border-t border-white/5 pt-20 pb-12 bg-[#050505] relative z-10 w-full mt-auto">
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
