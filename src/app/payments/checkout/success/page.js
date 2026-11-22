import Link from "next/link";
import {
  ArrowRight,
  Check,
  LayoutDashboard,
  ReceiptText,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { pricingPlansByRole } from "@/lib/pricing";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export const metadata = {
  title: "Payment Successful | Edunexa",
};

// export default async function CheckoutSuccessPage({ searchParams }) {
//   const { role: requestedRole, session_id: sessionId } = await searchParams;
//   const role = requestedRole === "student" ? "student" : "tutor";
//   const plan = pricingPlansByRole[role].pro;
//   const audienceLabel = role === "student" ? "Student" : "Tutor";
//   const reference =
//     typeof sessionId === "string" && sessionId.length > 8
//       ? sessionId.slice(-8).toUpperCase()
//       : "EDU-PRO";

//   return (
//     <main className="relative min-h-[72vh] overflow-hidden bg-slate-50 px-5 py-12 sm:py-16 lg:px-8">
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-indigo-100/80 to-transparent"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute left-1/2 top-24 size-72 -translate-x-1/2 rounded-full bg-emerald-200/20 blur-3xl"
//       />

//       <div className="relative mx-auto max-w-3xl">
//         <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
//           <div className="relative px-6 pb-8 pt-10 text-center sm:px-10 sm:pb-10 sm:pt-12">
//             <div
//               aria-hidden="true"
//               className="absolute left-8 top-9 size-2 rounded-full bg-indigo-300"
//             />
//             <div
//               aria-hidden="true"
//               className="absolute right-10 top-16 size-3 rotate-45 rounded-sm bg-amber-300"
//             />
//             <div
//               aria-hidden="true"
//               className="absolute bottom-8 left-16 size-2 rounded-full bg-emerald-400"
//             />

//             <div className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
//               <span className="grid size-14 place-items-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-200">
//                 <Check aria-hidden="true" className="size-8 stroke-[3]" />
//               </span>
//             </div>

//             <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
//               Payment successful
//             </p>
//             <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
//               Thank you for your purchase!
//             </h1>
//             <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
//               Your Stripe checkout for{" "}
//               <span className="font-bold text-slate-900">{plan.name}</span> is
//               complete. Welcome to a smarter Edunexa experience.
//             </p>
//           </div>

//           <div className="border-t border-slate-100 px-6 py-6 sm:px-10">
//             <div className="grid gap-3 sm:grid-cols-2">
//               <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
//                 <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigo-700">
//                   <Sparkles aria-hidden="true" className="size-5" />
//                 </span>
//                 <div>
//                   <p className="text-xs font-semibold text-slate-500">
//                     Membership
//                   </p>
//                   <p className="mt-0.5 font-bold text-slate-900">
//                     {audienceLabel} · Pro
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
//                 <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
//                   <ReceiptText aria-hidden="true" className="size-5" />
//                 </span>
//                 <div>
//                   <p className="text-xs font-semibold text-slate-500">
//                     Order reference
//                   </p>
//                   <p className="mt-0.5 font-bold text-slate-900">{reference}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
//               <Link
//                 href="/tuitions"
//                 className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/60 hover:text-indigo-700"
//               >
//                 <Search aria-hidden="true" className="size-4" />
//                 Browse tuitions
//               </Link>
//               <Link
//                 href="/dashboard"
//                 className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
//               >
//                 <LayoutDashboard aria-hidden="true" className="size-4" />
//                 Go to dashboard
//                 <ArrowRight aria-hidden="true" className="size-4" />
//               </Link>
//             </div>

//             <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-500">
//               <ShieldCheck
//                 aria-hidden="true"
//                 className="size-4 shrink-0 text-emerald-600"
//               />
//               Your purchase details are securely processed by Edunexa.
//             </p>
//           </div>
//         </section>

//         <p className="mt-6 text-center text-sm text-slate-500">
//           Need help with your membership?{" "}
//           <a
//             href="mailto:hello@edunexa.com"
//             className="font-bold text-indigo-700 hover:text-indigo-800"
//           >
//             Contact support
//           </a>
//         </p>
//       </div>
//     </main>
//   );
// }
export default async function CheckoutSuccessPage({ searchParams }) {
  const { session_id: sessionId } = await searchParams;

  // Confirm that the user is logged in
  const authSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!authSession) {
    redirect("/signin");
  }

  if (!sessionId) {
    redirect("/payments/checkout");
  }

  // Retrieve the actual Stripe Checkout Session
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

  // Verify that this checkout belongs to the logged-in user
  if (
    checkoutSession.client_reference_id !== authSession.user.id ||
    checkoutSession.payment_status !== "paid" ||
    checkoutSession.mode !== "subscription"
  ) {
    redirect("/payments/checkout");
  }

  const role = authSession.user.role?.toLowerCase();
  if (role !== "student" && role !== "tutor") {
    redirect("/dashboard");
  }

  const plan = pricingPlansByRole[role].pro;
  const audienceLabel = role === "student" ? "Student" : "Tutor";

  const reference =
    sessionId.length > 8 ? sessionId.slice(-8).toUpperCase() : "EDU-PRO";

  return (
    <main className="relative min-h-[72vh] overflow-hidden bg-slate-50 px-5 py-12 sm:py-16 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-indigo-100/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 size-72 -translate-x-1/2 rounded-full bg-emerald-200/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
          <div className="relative px-6 pb-8 pt-10 text-center sm:px-10 sm:pb-10 sm:pt-12">
            <div
              aria-hidden="true"
              className="absolute left-8 top-9 size-2 rounded-full bg-indigo-300"
            />
            <div
              aria-hidden="true"
              className="absolute right-10 top-16 size-3 rotate-45 rounded-sm bg-amber-300"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-16 size-2 rounded-full bg-emerald-400"
            />

            <div className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
              <span className="grid size-14 place-items-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-200">
                <Check aria-hidden="true" className="size-8 stroke-[3]" />
              </span>
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
              Payment successful
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Thank you for your purchase!
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
              Your Stripe checkout for{" "}
              <span className="font-bold text-slate-900">{plan.name}</span> is
              complete. Welcome to a smarter Edunexa experience.
            </p>
          </div>

          <div className="border-t border-slate-100 px-6 py-6 sm:px-10">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigo-700">
                  <Sparkles aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Membership
                  </p>
                  <p className="mt-0.5 font-bold text-slate-900">
                    {audienceLabel} · Pro
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  <ReceiptText aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Order reference
                  </p>
                  <p className="mt-0.5 font-bold text-slate-900">{reference}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <Link
                href="/tuitions"
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/60 hover:text-indigo-700"
              >
                <Search aria-hidden="true" className="size-4" />
                Browse tuitions
              </Link>
              <Link
                href="/dashboard"
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                <LayoutDashboard aria-hidden="true" className="size-4" />
                Go to dashboard
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-500">
              <ShieldCheck
                aria-hidden="true"
                className="size-4 shrink-0 text-emerald-600"
              />
              Your purchase details are securely processed by Edunexa.
            </p>
          </div>
        </section>

        <p className="mt-6 text-center text-sm text-slate-500">
          Need help with your membership?{" "}
          <a
            href="mailto:hello@edunexa.com"
            className="font-bold text-indigo-700 hover:text-indigo-800"
          >
            Contact support
          </a>
        </p>
      </div>
    </main>
  );
}

// Keep your existing return JSX below this point
