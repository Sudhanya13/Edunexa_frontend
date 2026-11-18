"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar({ isAuthenticated = false, user = null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "Browse Tuitions", href: "/tuitions" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Edunexa home">
          <Image
            src="/edunexa-logo.svg"
            alt=""
            width={40}
            height={40}
            priority
            className="size-10"
          />
          <span className="text-xl font-extrabold tracking-tight text-slate-950">Edunexa</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-600">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-indigo-600">Dashboard</Link>
              <Link href="/profile" className="text-sm font-semibold text-slate-600 hover:text-indigo-600">Update Profile</Link>
              <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                <span className="grid size-9 place-items-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                  {user?.name?.charAt(0) || "A"}
                </span>
                <div>
                  <p className="text-sm font-bold leading-none text-slate-900">{user?.name || "Alex Morgan"}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600">{user?.role || "Student"}</p>
                </div>
                <ChevronDown className="size-4 text-slate-400" />
              </div>
              <button type="button" className="rounded-lg px-3 py-2 text-sm font-bold text-slate-600 hover:text-rose-600">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/signin" className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100">Sign In</Link>
              <Link href="/signup" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700">Sign Up</Link>
            </>
          )}
        </div>

        <button type="button" onClick={() => setMenuOpen((open) => !open)} className="grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-700 lg:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">{link.label}</Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <Link href="/signin" className="rounded-xl border border-slate-200 py-3 text-center text-sm font-bold text-slate-700">Sign In</Link>
              <Link href="/signup" className="rounded-xl bg-indigo-600 py-3 text-center text-sm font-bold text-white">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
