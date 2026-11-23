export default function PageSkeleton({ variant = "generic" }) {
  if (variant === "tuitions") {
    return (
      <main
        role="status"
        aria-live="polite"
        aria-label="Loading tuition listings"
        className="min-h-[65vh] animate-pulse bg-slate-50 px-5 py-16 lg:px-8"
      >
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="h-5 w-28 rounded bg-slate-200" />
          <div className="space-y-3">
            <div className="h-10 w-full max-w-md rounded-lg bg-slate-200" />
            <div className="h-5 w-full max-w-lg rounded bg-slate-200/80" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="h-36 rounded-xl bg-slate-200" />
                <div className="mt-5 h-5 w-3/4 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-full rounded bg-slate-200/80" />
                <div className="mt-2 h-4 w-2/3 rounded bg-slate-200/80" />
                <div className="mt-5 h-10 w-full rounded-lg bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
        <span className="sr-only">Loading tuition listings...</span>
      </main>
    );
  }

  if (variant === "tuition-detail") {
    return (
      <main
        role="status"
        aria-live="polite"
        aria-label="Loading tuition details"
        className="min-h-[65vh] animate-pulse bg-slate-50 px-5 py-10 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="h-5 w-36 rounded bg-slate-200" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="h-8 w-3/4 rounded-lg bg-slate-200" />
              <div className="mt-4 h-5 w-1/2 rounded bg-slate-200/80" />
              <div className="mt-8 h-52 rounded-2xl bg-slate-200" />
              <div className="mt-6 space-y-3">
                <div className="h-4 w-full rounded bg-slate-200/80" />
                <div className="h-4 w-11/12 rounded bg-slate-200/80" />
                <div className="h-4 w-4/5 rounded bg-slate-200/80" />
              </div>
            </div>
            <div className="h-fit rounded-3xl border border-slate-200 bg-white p-6">
              <div className="h-12 w-12 rounded-full bg-slate-200" />
              <div className="mt-5 h-6 w-2/3 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-slate-200/80" />
              <div className="mt-7 h-11 w-full rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
        <span className="sr-only">Loading tuition details...</span>
      </main>
    );
  }

  if (variant === "checkout") {
    return (
      <main
        role="status"
        aria-live="polite"
        aria-label="Loading checkout"
        className="min-h-[70vh] animate-pulse bg-slate-50 px-5 py-12 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <div className="h-5 w-28 rounded bg-slate-200" />
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <div className="mx-auto h-7 w-40 rounded-full bg-slate-200" />
            <div className="mx-auto mt-5 h-9 w-72 max-w-full rounded-lg bg-slate-200" />
            <div className="mx-auto mt-3 h-5 w-96 max-w-full rounded bg-slate-200/80" />
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="h-96 rounded-3xl border border-slate-200 bg-white p-6">
              <div className="h-12 w-12 rounded-2xl bg-slate-200" />
              <div className="mt-5 h-7 w-1/2 rounded bg-slate-200" />
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="mt-5 h-4 w-full rounded bg-slate-200/80"
                />
              ))}
            </div>
            <div className="h-80 rounded-3xl border border-slate-200 bg-white p-6">
              <div className="h-6 w-2/3 rounded bg-slate-200" />
              <div className="mt-8 h-5 w-full rounded bg-slate-200/80" />
              <div className="mt-5 h-10 w-2/5 rounded bg-slate-200" />
              <div className="mt-8 h-12 w-full rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
        <span className="sr-only">Loading checkout...</span>
      </main>
    );
  }

  if (variant === "pricing") {
    return (
      <main
        role="status"
        aria-live="polite"
        aria-label="Loading pricing plans"
        className="min-h-[65vh] animate-pulse bg-slate-50 px-5 py-12 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto h-7 w-44 rounded-full bg-slate-200" />
            <div className="mx-auto mt-5 h-9 w-96 max-w-full rounded-lg bg-slate-200" />
            <div className="mx-auto mt-3 h-5 w-[28rem] max-w-full rounded bg-slate-200/80" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[420px] rounded-3xl border border-slate-200 bg-white p-6"
              >
                <div className="h-6 w-1/2 rounded bg-slate-200" />
                <div className="mt-6 h-12 w-2/5 rounded-lg bg-slate-200" />
                {Array.from({ length: 5 }).map((__, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="mt-5 h-4 w-full rounded bg-slate-200/80"
                  />
                ))}
                <div className="mt-8 h-11 w-full rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
        <span className="sr-only">Loading pricing plans...</span>
      </main>
    );
  }

  return (
    <main
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="min-h-[65vh] animate-pulse bg-slate-50 px-5 py-16 lg:px-8"
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="h-5 w-28 rounded bg-slate-200" />
        <div className="h-10 w-80 max-w-full rounded-lg bg-slate-200" />
        <div className="h-5 w-[32rem] max-w-full rounded bg-slate-200/80" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-48 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="h-5 w-16 rounded bg-slate-200" />
              <div className="mt-5 h-6 w-3/4 rounded bg-slate-200" />
              <div className="mt-4 h-4 w-full rounded bg-slate-200/80" />
              <div className="mt-2 h-4 w-5/6 rounded bg-slate-200/80" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading page...</span>
    </main>
  );
}
