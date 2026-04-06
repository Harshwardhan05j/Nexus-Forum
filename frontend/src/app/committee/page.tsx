import Link from "next/link";
import Image from "next/image";

export default function CommitteePage() {
  return (
    <>
      <main className="max-w-[1200px] mx-auto px-12 pt-[100px] min-h-screen relative z-10">
        {/* Header */}
        <header className="text-center py-[100px] pb-[72px]">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#9333ea] mb-4 inline-block">Leadership 2025–26</span>
          <h1 className="text-[3.5rem] font-bold tracking-[-0.03em] mb-5 text-[#f2f2f2]">The Steering Committee</h1>
          <p className="text-[1.15rem] text-[#a1a1aa] max-w-[560px] mx-auto">Meet the dedicated members who drive the Nexus Forum's vision, governance, and community initiatives forward.</p>
        </header>

        {/* Faculty Coordinator */}
        <section className="mb-[96px]">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#a1a1aa] mb-[40px] pb-4 border-b border-white/5">Faculty Coordinator</p>
          <div className="flex flex-col md:flex-row items-center gap-[40px] bg-[#0e0e0e] border border-white/5 rounded-xl p-[48px] max-w-[700px] transition-colors hover:bg-[#141414]">
            <div className="w-[96px] h-[96px] rounded-full overflow-hidden shrink-0 bg-[#1a1a1a] relative">
              <Image src="/static/2037 - Aashish Dandekar (The Brainwaves).jpg" alt="Ashish Dandekar" fill className="object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-[1.6rem] font-semibold tracking-[-0.02em] mb-1.5 text-[#f2f2f2]">Ashish Dandekar</h3>
              <span className="text-[0.85rem] font-medium text-[#9333ea] uppercase tracking-[0.07em] mb-3 block">Faculty Coordinator</span>
              <p className="text-[#a1a1aa] text-[0.95rem] mb-5">Guiding excellence and fostering innovation across the Nexus Forum with deep domain expertise and a commitment to student growth.</p>
              <a href="https://www.linkedin.com/in/dr-aashish-r-dandekar-195b6269" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#a1a1aa] text-[0.9rem] font-medium hover:text-[#f2f2f2] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                View Profile
              </a>
            </div>
          </div>
        </section>

        {/* Executive Committee */}
        <section className="mb-[96px]">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#a1a1aa] mb-[40px] pb-4 border-b border-white/5">Executive Committee</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Member 1 */}
            <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-[40px] px-[32px] text-center transition-all hover:-translate-y-1 hover:bg-[#141414] flex flex-col items-center">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#1a1a1a] mb-6 relative">
                <Image src="/static/cc7.png" alt="Rushabh Wakekar" fill className="object-cover" />
              </div>
              <h3 className="text-[1.2rem] font-semibold tracking-[-0.01em] mb-1.5 text-[#f2f2f2]">Rushabh Wakekar</h3>
              <div className="text-[0.8rem] font-semibold uppercase tracking-[0.07em] text-[#9333ea] mb-3">President</div>
              <p className="text-[#a1a1aa] text-[0.88rem] leading-relaxed mb-5 flex-1">Leading with vision and integrity, setting strategic direction for the forum's initiatives.</p>
              <a href="https://www.linkedin.com/in/rushabhwakekar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#a1a1aa] text-[0.9rem] font-medium hover:text-[#f2f2f2] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>

            {/* Member 2 */}
            <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-[40px] px-[32px] text-center transition-all hover:-translate-y-1 hover:bg-[#141414] flex flex-col items-center">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#1a1a1a] mb-6 relative">
                <Image src="/static/cc2.png" alt="Manjosh Lilhare" fill className="object-cover" />
              </div>
              <h3 className="text-[1.2rem] font-semibold tracking-[-0.01em] mb-1.5 text-[#f2f2f2]">Manjosh Lilhare</h3>
              <div className="text-[0.8rem] font-semibold uppercase tracking-[0.07em] text-[#9333ea] mb-3">Vice President</div>
              <p className="text-[#a1a1aa] text-[0.88rem] leading-relaxed mb-5 flex-1">Driving strategic initiatives forward and supporting cross-team alignment across all club activities.</p>
              <a href="https://www.linkedin.com/in/manjosh-lilhare-496922291" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#a1a1aa] text-[0.9rem] font-medium hover:text-[#f2f2f2] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>

            {/* Member 3 */}
            <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-[40px] px-[32px] text-center transition-all hover:-translate-y-1 hover:bg-[#141414] flex flex-col items-center">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#1a1a1a] mb-6 relative">
                <Image src="/static/cc1.png" alt="Ajinkya Mariche" fill className="object-cover" />
              </div>
              <h3 className="text-[1.2rem] font-semibold tracking-[-0.01em] mb-1.5 text-[#f2f2f2]">Ajinkya Mariche</h3>
              <div className="text-[0.8rem] font-semibold uppercase tracking-[0.07em] text-[#9333ea] mb-3">Secretary</div>
              <p className="text-[#a1a1aa] text-[0.88rem] leading-relaxed mb-5 flex-1">Ensuring smooth operations, communications, and coordination across all forum departments.</p>
              <a href="https://www.linkedin.com/in/ajinkya-mariche-1b948729a" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#a1a1aa] text-[0.9rem] font-medium hover:text-[#f2f2f2] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>

            {/* Member 4 */}
            <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-[40px] px-[32px] text-center transition-all hover:-translate-y-1 hover:bg-[#141414] flex flex-col items-center">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#1a1a1a] mb-6 relative">
                <Image src="/static/cc4.png" alt="Priyanshi Khadgi" fill className="object-cover" />
              </div>
              <h3 className="text-[1.2rem] font-semibold tracking-[-0.01em] mb-1.5 text-[#f2f2f2]">Priyanshi Khadgi</h3>
              <div className="text-[0.8rem] font-semibold uppercase tracking-[0.07em] text-[#9333ea] mb-3">Joint Secretary</div>
              <p className="text-[#a1a1aa] text-[0.88rem] leading-relaxed mb-5 flex-1">Supporting governance, administration, and documentation processes across the forum.</p>
              <a href="https://www.linkedin.com/in/priyanshi-khadgi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#a1a1aa] text-[0.9rem] font-medium hover:text-[#f2f2f2] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>

            {/* Member 5 */}
            <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-[40px] px-[32px] text-center transition-all hover:-translate-y-1 hover:bg-[#141414] flex flex-col items-center">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#1a1a1a] mb-6 relative">
                <Image src="/static/cc6.png" alt="Shivansh Agrawal" fill className="object-cover" />
              </div>
              <h3 className="text-[1.2rem] font-semibold tracking-[-0.01em] mb-1.5 text-[#f2f2f2]">Shivansh Agrawal</h3>
              <div className="text-[0.8rem] font-semibold uppercase tracking-[0.07em] text-[#9333ea] mb-3">Treasurer</div>
              <p className="text-[#a1a1aa] text-[0.88rem] leading-relaxed mb-5 flex-1">Managing resources, budgets, and ensuring sustainable financial health for all forum events.</p>
              <a href="https://www.linkedin.com/in/shivansh-agrawal-51810827b" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#a1a1aa] text-[0.9rem] font-medium hover:text-[#f2f2f2] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>

            {/* Member 6 */}
            <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-[40px] px-[32px] text-center transition-all hover:-translate-y-1 hover:bg-[#141414] flex flex-col items-center">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#1a1a1a] mb-6 relative">
                <Image src="/static/cc8.png" alt="Harshwardhan Jadhav" fill className="object-cover" />
              </div>
              <h3 className="text-[1.2rem] font-semibold tracking-[-0.01em] mb-1.5 text-[#f2f2f2]">Harshwardhan Jadhav</h3>
              <div className="text-[0.8rem] font-semibold uppercase tracking-[0.07em] text-[#9333ea] mb-3">Joint Treasurer</div>
              <p className="text-[#a1a1aa] text-[0.88rem] leading-relaxed mb-5 flex-1">Supporting financial management and assisting in budget planning for all forum activities.</p>
              <a href="https://www.linkedin.com/in/harshwardhan-jadhav-608847253" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#a1a1aa] text-[0.9rem] font-medium hover:text-[#f2f2f2] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>

            {/* Member 7 */}
            <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-[40px] px-[32px] text-center transition-all hover:-translate-y-1 hover:bg-[#141414] flex flex-col items-center">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#1a1a1a] mb-6 relative">
                <Image src="/static/cc3.png" alt="Shrenik Nil" fill className="object-cover" />
              </div>
              <h3 className="text-[1.2rem] font-semibold tracking-[-0.01em] mb-1.5 text-[#f2f2f2]">Shrenik Nil</h3>
              <div className="text-[0.8rem] font-semibold uppercase tracking-[0.07em] text-[#9333ea] mb-3">Documentation Head</div>
              <p className="text-[#a1a1aa] text-[0.88rem] leading-relaxed mb-5 flex-1">Capturing moments, milestones, and maintaining the institutional memory of the Nexus Forum.</p>
              <a href="https://www.linkedin.com/in/shrenik-nil-b30980285" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#a1a1aa] text-[0.9rem] font-medium hover:text-[#f2f2f2] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>

            {/* Member 8 */}
            <div className="bg-[#0e0e0e] border border-white/5 rounded-xl p-[40px] px-[32px] text-center transition-all hover:-translate-y-1 hover:bg-[#141414] flex flex-col items-center">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#1a1a1a] mb-6 relative">
                <Image src="/static/cc5.png" alt="Mohit Gupta" fill className="object-cover" />
              </div>
              <h3 className="text-[1.2rem] font-semibold tracking-[-0.01em] mb-1.5 text-[#f2f2f2]">Mohit Gupta</h3>
              <div className="text-[0.8rem] font-semibold uppercase tracking-[0.07em] text-[#9333ea] mb-3">Mentor</div>
              <p className="text-[#a1a1aa] text-[0.88rem] leading-relaxed mb-5 flex-1">Providing mentorship, strategic guidance, and technical expertise to the forum community.</p>
              <a href="https://www.linkedin.com/in/mohit-gupta-25-" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#a1a1aa] text-[0.9rem] font-medium hover:text-[#f2f2f2] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>

          </div>
        </section>

        {/* Advisory Board */}
        <section className="mb-[96px]">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#a1a1aa] mb-[40px] pb-4 border-b border-white/5">Club Leads & Advisory</p>
          <div className="flex flex-col gap-[1px] bg-white/5 border border-white/5 overflow-hidden rounded-xl">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#0e0e0e] p-[24px] px-[32px] hover:bg-[#141414] transition-colors">
              <h4 className="text-[1.05rem] font-semibold tracking-[-0.01em] text-[#f2f2f2]">Nishant Gakare</h4>
              <span className="text-[0.85rem] text-[#a1a1aa]">Club Head — Web Nest Technology</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#0e0e0e] p-[24px] px-[32px] hover:bg-[#141414] transition-colors">
              <h4 className="text-[1.05rem] font-semibold tracking-[-0.01em] text-[#f2f2f2]">Vaishnav Raut</h4>
              <span className="text-[0.85rem] text-[#a1a1aa]">Co-Head — Web Nest Technology</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#0e0e0e] p-[24px] px-[32px] hover:bg-[#141414] transition-colors">
              <h4 className="text-[1.05rem] font-semibold tracking-[-0.01em] text-[#f2f2f2]">Rajat Kantode</h4>
              <span className="text-[0.85rem] text-[#a1a1aa]">Club Head — Data Science Innovation</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#0e0e0e] p-[24px] px-[32px] hover:bg-[#141414] transition-colors">
              <h4 className="text-[1.05rem] font-semibold tracking-[-0.01em] text-[#f2f2f2]">Dhanshri Wanjari</h4>
              <span className="text-[0.85rem] text-[#a1a1aa]">Co-Head — Data Science Innovation</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#0e0e0e] p-[24px] px-[32px] hover:bg-[#141414] transition-colors">
              <h4 className="text-[1.05rem] font-semibold tracking-[-0.01em] text-[#f2f2f2]">Rashika Modak</h4>
              <span className="text-[0.85rem] text-[#a1a1aa]">Club Head — Career Catalyst</span>
            </div>
          </div>
        </section>

        {/* Governance CTA */}
        <section className="bg-[#0e0e0e] border-y border-white/5 py-[100px] text-center mb-[120px] -mx-12 px-12">
          <h2 className="text-[2.5rem] font-semibold tracking-[-0.03em] mb-4 text-[#f2f2f2]">Interested in serving?</h2>
          <p className="text-[#a1a1aa] text-[1.1rem] max-w-[560px] mx-auto mb-8">Applications for the next committee cycle open each academic year. Learn about governance roles and expectations before applying.</p>
          <Link href="#" className="bg-transparent border border-white/15 text-[#f2f2f2] px-8 py-3.5 rounded-md text-[1rem] font-medium hover:border-white/40 transition-colors">
            View Governance Documentation
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
