import Link from "next/link";
import { ChevronLeft, Info } from "lucide-react";

export default function CommitteeApplicationPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 mt-nav">
      <div className="max-w-[800px] mx-auto px-6">
        
        <Link href="/committee" className="inline-flex items-center text-zinc-500 hover:text-white transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Committee
        </Link>

        <div className="bg-[#0e0e0e] border border-white/5 rounded-2xl p-8 md:p-12">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-6">
            <Info className="w-6 h-6" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Committee Applications</h1>
          <p className="text-zinc-400 text-lg mb-8">
            Thank you for your interest in joining the Nexus Forum Committee. Applications for the <span className="text-white font-medium">2026-27 Academic Cycle</span> are currently scheduled to open in <span className="text-purple-400 font-semibold">August 2026</span>.
          </p>

          <div className="space-y-6">
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
              <h3 className="font-semibold text-white mb-2">Who can apply?</h3>
              <p className="text-zinc-500 text-sm">
                Applications are open to all students of Computer Science Engineering & Data Science, UPES. We look for students with technical proficiency, leadership potential, and a passion for community building.
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
              <h3 className="font-semibold text-white mb-2">Available Roles</h3>
              <ul className="text-zinc-500 text-sm list-disc list-inside space-y-2">
                <li>Technical Leads (Web, AI/ML, Cloud)</li>
                <li>Event Coordinators</li>
                <li>Design & Creative Leads</li>
                <li>Public Relations & Outreach</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center text-center">
            <p className="text-zinc-500 text-sm mb-6">Applications are currently closed. Please check back in August 2026.</p>
            <Link href="/" className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
