import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-20 pb-12 bg-[#050505] relative z-10 w-full mt-auto">
      <div className="max-w-[1200px] mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-[1.1rem] font-bold tracking-[-0.01em] text-[#f2f2f2] mb-4">The NEXUS Forum</h3>
            <p className="text-[0.85rem] text-[#a1a1aa] leading-relaxed max-w-[280px]">
              NEXUS is the official technical forum of UPES, dedicated to fostering innovation and engineering excellence among students.
            </p>
          </div>
          <div>
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#71717a] mb-6">Navigation</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/" className="text-[0.9rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">Home</Link></li>
              <li><Link href="/clubs" className="text-[0.9rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">Clubs</Link></li>
              <li><Link href="/events" className="text-[0.9rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">Events</Link></li>
              <li><Link href="/committee" className="text-[0.9rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">Committee</Link></li>
              <li><Link href="/archive" className="text-[0.9rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">Archive</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#71717a] mb-6">Connect</h3>
            <ul className="flex flex-col gap-3">
              <li><a href="https://instagram.com/nexus_upes" target="_blank" rel="noopener noreferrer" className="text-[0.9rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">Instagram</a></li>
              <li><a href="https://linkedin.com/company/nexus-forum" target="_blank" rel="noopener noreferrer" className="text-[0.9rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">LinkedIn</a></li>
              <li><a href="mailto:nexus@upes.ac.in" className="text-[0.9rem] text-[#a1a1aa] hover:text-[#f2f2f2] transition-colors">Email Us</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[0.8rem] text-[#71717a] gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="max-w-[400px] md:max-w-none text-center md:text-left">&copy; {new Date().getFullYear()} The NEXUS Forum, Computer Science &amp; Data Science Department, UPES. All rights reserved.</p>
            <div className="text-[0.75rem] opacity-70 flex flex-col items-center md:items-start mt-1">
              <p>Developed by <strong>Team DS</strong></p>
              <p>Lead Developer: Harshwardhan &bull; Contributors: Umang, Aarush</p>
            </div>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
