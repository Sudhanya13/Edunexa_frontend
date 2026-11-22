"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar({ isAuthenticated = false, user = null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const currentUser = session?.user ?? user;
  const authenticated = Boolean(session?.user) || isAuthenticated;
  const roleLabel = currentUser?.role
    ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1).toLowerCase()
    : "Student";

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setUserDropdownOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setUserDropdownOpen(false);
          setMenuOpen(false);
          router.push("/signin");
          router.refresh();
        },
      },
    });
  };

  const links = [
    { label: "Home", href: "/" },
    { label: "Browse Tuitions", href: "/tuitions" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/how-it-works" },
  ];

  const userInitial =
    currentUser?.name?.charAt(0)?.toUpperCase() ||
    currentUser?.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Edunexa home"
        >
          <Image
            src="/edunexa-logo.svg"
            alt=""
            width={40}
            height={40}
            priority
            className="size-10"
          />
          <span className="text-xl font-extrabold tracking-tight text-slate-950">
            Edunexa
          </span>
        </Link>

        {/* Desktop Center Links */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-600"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Area */}
        <div className="hidden items-center gap-3 lg:flex">
          {authenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                aria-expanded={userDropdownOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-slate-50/70 py-1.5 pl-2 pr-3.5 transition hover:border-indigo-200 hover:bg-indigo-50/40"
              >
                {currentUser?.image ? (
                  <img
                    src={currentUser.image}
                    alt={currentUser.name || "User avatar"}
                    className="size-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid size-9 place-items-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                    {userInitial}
                  </span>
                )}
                <div className="text-left">
                  <p className="text-sm font-bold leading-none text-slate-900">
                    {currentUser?.name || "User"}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {roleLabel}
                  </p>
                </div>
                <ChevronDown
                  className={`size-4 text-slate-500 transition-transform duration-200 ${
                    userDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Logged-in User Dropdown Modal */}
              {userDropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2.5 w-64 origin-top-right rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-900/10"
                >
                  {/* User Summary Header */}
                  <div className="border-b border-slate-100 px-3 py-2.5">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {currentUser?.name || "User"}
                    </p>
                    {currentUser?.email && (
                      <p className="truncate text-xs text-slate-500">
                        {currentUser.email}
                      </p>
                    )}
                  </div>

                  {/* Navigation Actions */}
                  <div className="py-1.5">
                    <Link
                      href="/dashboard"
                      role="menuitem"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <LayoutDashboard className="size-4 text-slate-400" />
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <User className="size-4 text-slate-400" />
                      My Profile
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-slate-100 pt-1.5">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-rose-600 transition-colors hover:bg-rose-50"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}

            {authenticated ? (
              <div className="mt-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3">
                <div className="flex items-center gap-3 border-b border-slate-200/80 pb-3">
                  <span className="grid size-10 place-items-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                    {userInitial}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {currentUser?.name || "User"}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {currentUser?.email || currentUser?.role || "Student"}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex flex-col gap-1">
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white"
                  >
                    <LayoutDashboard className="size-4 text-slate-400" />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white"
                  >
                    <User className="size-4 text-slate-400" />
                    My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <Link
                  href="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-slate-200 py-3 text-center text-sm font-bold text-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-indigo-600 py-3 text-center text-sm font-bold text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
