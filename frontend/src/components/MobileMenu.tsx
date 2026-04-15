"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Home, Calendar, Users, Briefcase, Settings, LogOut, LogIn, UserPlus, Camera } from "lucide-react";
import { handleSignOut } from "@/app/actions";

interface MobileMenuProps {
  session: any;
  isAdmin: boolean;
}

export default function MobileMenu({ session, isAdmin }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/clubs", label: "Clubs", icon: Briefcase },
    { href: "/committee", label: "Committee", icon: Users },
    { href: "/archive", label: "Archive", icon: Camera },
  ];

  return (
    <div className="md:hidden">
      {/* Trigger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#141414]/60 backdrop-blur-xl border border-white/10 text-white transition-all active:scale-95"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1000] animate-in fade-in duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-[#0a0a0a] border-l border-white/5 z-[1001] shadow-2xl transition-transform duration-500 ease-out p-8 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Nexus</span>
          <button onClick={closeMenu} className="text-zinc-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="flex items-center gap-4 p-4 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all group"
            >
              <link.icon size={20} className="group-hover:text-purple-400 transition-colors" />
              <span className="text-[15px] font-medium tracking-wide">{link.label}</span>
            </Link>
          ))}
          
          {isAdmin && (
            <Link
              href="/admin"
              onClick={closeMenu}
              className="flex items-center gap-4 p-4 rounded-2xl text-purple-400 hover:bg-purple-500/10 transition-all group"
            >
              <Settings size={20} />
              <span className="text-[15px] font-medium tracking-wide">Admin Dashboard</span>
            </Link>
          )}
        </nav>

        <div className="mt-auto border-t border-white/5 pt-8">
          {session ? (
            <div className="space-y-4">
              <div className="px-4">
                <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest mb-1">Logged in as</p>
                <p className="text-white text-sm font-semibold truncate">{session?.user?.name || session?.user?.email || "User"}</p>
              </div>
              <form action={handleSignOut}>
                <button 
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all"
                  onClick={closeMenu}
                >
                  <LogOut size={20} />
                  <span className="text-[15px] font-medium tracking-wide">Log Out</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all font-outfit"
              >
                <LogIn size={18} /> Log In
              </Link>
              <Link
                href="/signup"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-500 transition-all font-outfit"
              >
                <UserPlus size={18} /> Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
