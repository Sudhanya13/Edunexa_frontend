import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p
          aria-hidden="true"
          className="text-8xl font-semibold tracking-tight text-neutral-300 dark:text-neutral-700"
        >
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold">We can’t find that page</h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          The page may have moved, or the link may be mistyped. Head back to the
          home page to keep going.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-neutral-900 px-5 py-2.5 font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:outline-white"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
