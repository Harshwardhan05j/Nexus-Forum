import Link from "next/link";
import Image from "next/image";
import { Search, Users, Plus } from "lucide-react";

export default function ClubsPage() {
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
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#9333ea] mb-4 inline-block">Explore</span>
          <h1 className="text-[3.5rem] font-bold tracking-[-0.03em] mb-6 text-[#f2f2f2]">Nexus Clubs</h1>
          <p className="text-[1.15rem] text-[#a1a1aa] max-w-[500px] mx-auto">Discover specialized groups focused on modern tech stacks, collaboration, and industry readiness.</p>
        </header>

        <section className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="relative flex-1 max-w-full md:max-w-[320px] w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a1a1aa] w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search clubs..." 
              className="w-full bg-[#0e0e0e] border border-white/5 rounded-lg py-3 pl-12 pr-4 text-[#f2f2f2] text-[0.95rem] focus:outline-none focus:border-[#a1a1aa] focus:bg-[#141414] transition-all"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <button className="bg-[#f2f2f2] text-[#050505] border border-[#f2f2f2] px-4 py-2 rounded-md text-[0.9rem] font-medium whitespace-nowrap">All</button>
            <button className="bg-[#0e0e0e] border border-white/5 text-[#a1a1aa] hover:bg-[#f2f2f2] hover:text-[#050505] px-4 py-2 rounded-md text-[0.9rem] font-medium transition-all whitespace-nowrap">Software</button>
            <button className="bg-[#0e0e0e] border border-white/5 text-[#a1a1aa] hover:bg-[#f2f2f2] hover:text-[#050505] px-4 py-2 rounded-md text-[0.9rem] font-medium transition-all whitespace-nowrap">AI/ML</button>
            <button className="bg-[#0e0e0e] border border-white/5 text-[#a1a1aa] hover:bg-[#f2f2f2] hover:text-[#050505] px-4 py-2 rounded-md text-[0.9rem] font-medium transition-all whitespace-nowrap">Data Science</button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-[120px]">
          {/* Club Card 1 */}
          <div className="bg-[#0e0e0e] rounded-xl overflow-hidden border border-white/5 flex flex-col transition-all hover:-translate-y-1 hover:bg-[#141414]">
            <div className="h-[200px] w-full relative border-b border-white/5">
              <Image src="/static/1000100511hosodud.jpg" alt="Web Nest Technology Club" fill className="object-cover" />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-[1.5rem] font-semibold tracking-[-0.02em] mb-3 text-[#f2f2f2]">Web Nest</h3>
              <p className="text-[#a1a1aa] text-[0.95rem] leading-relaxed mb-6 flex-1">Foster innovation and technical excellence by diving into modern web development, scalable frameworks, and cloud deployment.</p>
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-[0.85rem] text-[#a1a1aa] font-medium">
                  <Users className="w-4 h-4" /> 124 Members
                </div>
                <Link href="/join/web-nest" className="bg-[#f2f2f2] text-[#050505] px-4 py-1.5 rounded-md text-[0.85rem] font-medium hover:bg-[#e5e5e5] transition-colors">Join Club</Link>
              </div>
            </div>
          </div>

          {/* Club Card 2 */}
          <div className="bg-[#0e0e0e] rounded-xl overflow-hidden border border-white/5 flex flex-col transition-all hover:-translate-y-1 hover:bg-[#141414]">
            <div className="h-[200px] w-full relative border-b border-white/5">
              <Image src="/static/4167275_18770.jpg" alt="Data Science Innovation Club" fill className="object-cover" />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-[1.5rem] font-semibold tracking-[-0.02em] mb-3 text-[#f2f2f2]">Data Science Innovation</h3>
              <p className="text-[#a1a1aa] text-[0.95rem] leading-relaxed mb-6 flex-1">Turn data into insights. Hands-on Machine Learning, AI architectures, and deep neural networks applied to real datasets.</p>
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-[0.85rem] text-[#a1a1aa] font-medium">
                  <Users className="w-4 h-4" /> 189 Members
                </div>
                <Link href="/join/data-science" className="bg-[#f2f2f2] text-[#050505] px-4 py-1.5 rounded-md text-[0.85rem] font-medium hover:bg-[#e5e5e5] transition-colors">Join Club</Link>
              </div>
            </div>
          </div>

          {/* Club Card 3 */}
          <div className="bg-[#0e0e0e] rounded-xl overflow-hidden border border-white/5 flex flex-col transition-all hover:-translate-y-1 hover:bg-[#141414]">
            <div className="h-[200px] w-full relative border-b border-white/5">
              <Image src="/static/14140043_5384286.jpg" alt="Career Catalyst Club" fill className="object-cover" />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-[1.5rem] font-semibold tracking-[-0.02em] mb-3 text-[#f2f2f2]">Career Catalyst</h3>
              <p className="text-[#a1a1aa] text-[0.95rem] leading-relaxed mb-6 flex-1">Achieve absolute industry-readiness through algorithmic problem solving, mock interviews, and advanced competitive programming.</p>
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-[0.85rem] text-[#a1a1aa] font-medium">
                  <Users className="w-4 h-4" /> 210 Members
                </div>
                <Link href="/join/career-catalyst" className="bg-[#f2f2f2] text-[#050505] px-4 py-1.5 rounded-md text-[0.85rem] font-medium hover:bg-[#e5e5e5] transition-colors">Join Club</Link>
              </div>
            </div>
          </div>

          {/* Add Club Placeholder */}
          <div className="bg-transparent border border-dashed border-[#a1a1aa] hover:border-[#f2f2f2] rounded-xl flex items-center justify-center min-h-[480px] cursor-pointer group transition-all">
            <div className="text-center text-[#a1a1aa] group-hover:text-[#f2f2f2] transition-colors">
              <Plus className="w-8 h-8 mx-auto mb-4" />
              <h4 className="text-[1.1rem] font-medium text-[#f2f2f2]">Propose a New Club</h4>
            </div>
          </div>
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
