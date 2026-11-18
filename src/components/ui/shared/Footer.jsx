import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.9fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/edunexa-logo.svg"
                alt=""
                width={40}
                height={40}
                className="size-10"
              />
              <span className="text-xl font-extrabold text-white">Edunexa</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">A smarter way to find trusted tutors, discover tuitions, and keep every learning goal within reach.</p>
            <div className="mt-6 flex gap-3">
              <a href="#" aria-label="X" className="grid size-9 place-items-center rounded-full border border-slate-800 text-slate-300 transition hover:border-indigo-500 hover:text-white"><FaXTwitter className="size-4" /></a>
              <a href="#" aria-label="Facebook" className="grid size-9 place-items-center rounded-full border border-slate-800 text-slate-300 transition hover:border-indigo-500 hover:text-white"><FaFacebookF className="size-4" /></a>
              <a href="#" aria-label="Instagram" className="grid size-9 place-items-center rounded-full border border-slate-800 text-slate-300 transition hover:border-indigo-500 hover:text-white"><FaInstagram className="size-4" /></a>
              <a href="#" aria-label="LinkedIn" className="grid size-9 place-items-center rounded-full border border-slate-800 text-slate-300 transition hover:border-indigo-500 hover:text-white"><FaLinkedinIn className="size-4" /></a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">Quick Links</h2>
            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/tuitions" className="hover:text-white">Browse Tuitions</Link>
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
              <Link href="/how-it-works" className="hover:text-white">How It Works</Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">Contact</h2>
            <div className="mt-5 space-y-4 text-sm text-slate-400">
              <a href="mailto:hello@edunexa.com" className="flex items-center gap-3 hover:text-white"><Mail className="size-4 text-indigo-400" />hello@edunexa.com</a>
              <a href="tel:+912255550000" className="flex items-center gap-3 hover:text-white"><Phone className="size-4 text-indigo-400" />+91 22 5555 0000</a>
              <p className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-indigo-400" />Mumbai, India</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 Edunexa. All rights reserved.</p>
          <div className="flex gap-5"><a href="#" className="hover:text-slate-300">Privacy Policy</a><a href="#" className="hover:text-slate-300">Terms of Service</a></div>
        </div>
      </div>
    </footer>
  );
}
