import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions";
import Providers from "@/app/providers";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nexus Forum | CSE & Data Science Tech Community",
  description: "Join The Nexus Forum, the official tech hub for CSE and Data Science students to collaborate, build projects, and innovate. Discover events and clubs today.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
  const isAdmin = !!(session?.user?.email && adminEmails.includes(session.user.email.toLowerCase()));

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="antialiased font-inter bg-[#050505] text-[#f2f2f2] min-h-screen overflow-x-hidden">
        <nav className="flex justify-between items-center w-[92%] max-w-[1400px] mx-auto mt-[20px] md:mt-[30px] sticky top-[20px] md:top-[30px] z-[100]">
          <Link href="/" className="flex items-center text-white font-bold tracking-wide transition-all active:scale-95 group px-2 h-[56px] md:h-[64px]">
            <div className="relative w-[140px] md:w-[190px] h-[40px] md:h-[52px] flex items-center justify-center transition-all">
              {/* Background ambient halo */}
              <div className="absolute -inset-4 bg-blue-500/10 blur-[40px] rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
              
              <Image 
                src="/static/NEXUS white font.png" 
                alt="The Nexus Forum - Official CSE and Data Science Department Hub" 
                fill 
                className="object-contain transition-all duration-500 group-hover:scale-[1.03] animate-logo-glow" 
                sizes="(max-width: 768px) 140px, 190px"
                priority
              />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center bg-[#141414]/40 backdrop-blur-xl border border-white/10 rounded-full h-[64px] px-12 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="flex gap-12">
              <Link href="/" className="text-white/55 hover:text-white transition-colors text-sm tracking-wide">home</Link>
              <Link href="/events" className="text-white/55 hover:text-white transition-colors text-sm tracking-wide">events</Link>
              <Link href="/clubs" className="text-white/55 hover:text-white transition-colors text-sm tracking-wide">clubs</Link>
              <Link href="/committee" className="text-white/55 hover:text-white transition-colors text-sm tracking-wide">committee</Link>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:flex gap-3">
              {session ? (
                <>
                  <div className="flex items-center bg-[#141414]/40 backdrop-blur-xl border border-white/10 rounded-full h-[64px] px-8 gap-4 text-[#f2f2f2] text-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <span>{session.user?.name}</span>
                  </div>
                  {isAdmin && (
                    <Link href="/admin" className="flex items-center justify-center h-[64px] px-6 rounded-full text-[13px] font-medium text-purple-400 bg-[#141414]/40 backdrop-blur-xl border border-purple-500/20 hover:bg-purple-500/10 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                      admin
                    </Link>
                  )}
                  <form action={handleSignOut}>
                    <button className="flex items-center justify-center h-[56px] px-6 rounded-full text-[13px] font-medium text-white/80 bg-[#141414]/40 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:text-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer">
                      log out
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link href="/login" className="flex items-center justify-center h-[56px] px-6 rounded-full text-[13px] font-medium text-white/80 bg-[#141414]/40 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:text-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    log in
                  </Link>
                  <Link href="/signup" className="flex items-center justify-center h-[56px] px-7 rounded-full text-[13px] font-semibold text-black bg-white border border-white hover:bg-[#f0f0f0] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)] transition-all">
                    sign up
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Trigger */}
            <MobileMenu session={session} isAdmin={isAdmin} />
          </div>
        </nav>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
