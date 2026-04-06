import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions";
import Providers from "@/app/providers";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "The Nexus Forum | Data Science",
  description: "Official Computer Science Engineering and Data Science Department Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim());
  const isAdmin = session?.user?.email && adminEmails.includes(session.user.email);

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="antialiased font-inter bg-[#050505] text-[#f2f2f2] min-h-screen overflow-x-hidden">
        <nav className="flex justify-between items-center w-[90%] max-w-[1400px] mx-auto mt-[30px] sticky top-[30px] z-[100]">
          <Link href="/" className="flex items-center bg-[#141414]/40 backdrop-blur-xl border border-white/10 rounded-full h-[50px] px-6 text-white font-bold tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="relative w-[110px] h-[36px] flex items-center justify-center">
              <Image 
                src="/static/NEXUS white font.png" 
                alt="Nexus Logo" 
                fill 
                className="object-contain" 
              />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center bg-[#141414]/40 backdrop-blur-xl border border-white/10 rounded-full h-[50px] px-9 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="flex gap-10">
              <Link href="/" className="text-white/55 hover:text-white transition-colors text-sm tracking-wide">home</Link>
              <Link href="/events" className="text-white/55 hover:text-white transition-colors text-sm tracking-wide">events</Link>
              <Link href="/clubs" className="text-white/55 hover:text-white transition-colors text-sm tracking-wide">clubs</Link>
              <Link href="/committee" className="text-white/55 hover:text-white transition-colors text-sm tracking-wide">committee</Link>
            </div>
          </div>

          <div className="flex gap-3">
            {session ? (
              <>
                <div className="flex items-center bg-[#141414]/40 backdrop-blur-xl border border-white/10 rounded-full h-[50px] px-5 gap-3 text-[#f2f2f2] text-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <span>{session.user?.name}</span>
                </div>
                {isAdmin && (
                  <Link href="/admin" className="flex items-center justify-center h-[50px] px-4 rounded-full text-[13px] font-medium text-purple-400 bg-[#141414]/40 backdrop-blur-xl border border-purple-500/20 hover:bg-purple-500/10 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    admin
                  </Link>
                )}
                <form action={handleSignOut}>
                  <button className="flex items-center justify-center h-[50px] px-6 rounded-full text-[13px] font-medium text-white/80 bg-[#141414]/40 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:text-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer">
                    log out
                  </button>
                </form>
              </>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="flex items-center justify-center h-[50px] px-6 rounded-full text-[13px] font-medium text-white/80 bg-[#141414]/40 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:text-white transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  log in
                </Link>
                <Link href="/signup" className="flex items-center justify-center h-[50px] px-6 rounded-full text-[13px] font-semibold text-black bg-white border border-white hover:bg-[#f0f0f0] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)] transition-all">
                  sign up
                </Link>
              </div>
            )}
          </div>
        </nav>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
