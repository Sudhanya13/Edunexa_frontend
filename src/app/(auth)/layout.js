import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Edunexa home">
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
          <Link href="/" className="text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-600">
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row lg:px-8">
          <p>© 2026 Edunexa. All rights reserved.</p>
          <p>Learn with confidence.</p>
        </div>
      </footer>
    </div>
  );
}
