import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { pricingPlansByRole } from "@/lib/pricing";

export default async function CheckoutPage({ searchParams }) {
  const { role: requestedRole } = await searchParams;
  const role = requestedRole === "student" ? "student" : "tutor";
  const plan = pricingPlansByRole[role].pro;
  const audienceLabel = role === "student" ? "Student" : "Tutor";

  return (
    <main className="relative min-h-[70vh] overflow-hidden bg-slate-50 px-5 py-12 sm:py-16 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-indigo-100/70 to-transparent"
      />

      <div className="relative mx-auto max-w-5xl">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-700"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to plans
        </Link>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-indigo-700 shadow-sm">
            <LockKeyhole aria-hidden="true" className="size-3.5" />
            Secure checkout
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Review your upgrade
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Confirm the plan details before continuing.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 lg:grid-cols-[1fr_0.8fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-indigo-100 text-indigo-700">
                <Sparkles aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-600">
                  Edunexa Pro · {audienceLabel}
                </p>
                <h2 className="mt-1 text-2xl font-black text-slate-950">
                  {plan.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>
              </div>
            </div>

            <div className="mt-7 border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold text-slate-900">
                Included with your plan
              </h3>
              <ul className="mt-4 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-indigo-600"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <CreditCard
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-amber-700"
                />
                <div>
                  <p className="text-sm font-bold text-amber-900">
                    Payments aren&apos;t available yet
                  </p>
                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    Checkout is not configured, so you won&apos;t be charged and
                    your account won&apos;t be upgraded from this page yet.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-3xl border border-indigo-200 bg-white p-6 shadow-lg shadow-indigo-100/60 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <BadgeCheck
                aria-hidden="true"
                className="size-5 text-indigo-600"
              />
              Order summary
            </div>

            <div className="mt-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="font-semibold text-slate-900">{plan.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  Billed monthly · {audienceLabel}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                Pro
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-4 py-5">
              <span className="text-sm text-slate-600">Total due monthly</span>
              <span className="text-2xl font-black text-slate-950">
                {plan.price}
                <span className="ml-1 text-sm font-medium text-slate-500">
                  / month
                </span>
              </span>
            </div>

            <button
              type="button"
              disabled
              className="flex h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-slate-200 px-4 text-sm font-bold text-slate-500"
            >
              Continue to payment
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
              Payment will be enabled once checkout is set up.
            </p>

            <Link
              href="/pricing"
              className="mt-5 flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-700"
            >
              Choose a different plan
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

// "use client";

// import React from "react";
// import Link from "next/link";
// import {
//   ShieldCheck,
//   Lock,
//   CreditCard,
//   CheckCircle2,
//   ArrowLeft,
//   GraduationCap,
//   Crown,
//   Sparkles,
//   Zap,
//   Users,
//   Shield,
// } from "lucide-react";

// export default function PaymentCheckoutPage() {
//   // Demo values for UI design only.
//   // Later these will come from the logged-in user and selected plan.
//   const user = {
//     name: "Rahim Ahmed",
//     email: "rahim@gmail.com",
//     role: "student",
//   };

//   const isTutor = user.role === "tutor";

//   const plan = {
//     name: isTutor ? "Pro Tutor Plan" : "Pro Student Plan",
//     price: isTutor ? 15 : 10,
//     billing: "One-time payment",
//     features: isTutor
//       ? [
//           "Unlimited tuition postings",
//           "Manage unlimited applicants",
//           "Verified Tutor badge",
//           "Premium tutor visibility",
//           "Advanced dashboard access",
//         ]
//       : [
//           "Unlimited tuition bookmarks",
//           "Priority tuition booking",
//           "Access to premium features",
//           "Personalized learning experience",
//           "Priority student support",
//         ],
//   };

//   const handlePayment = () => {
//     // Stripe Checkout integration will be added later.
//     console.log("Proceeding to Stripe Checkout");
//   };

//   return (
//     <main className="min-h-screen bg-slate-50">
//       {/* Header */}
//       <header className="bg-white border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex items-center justify-between">
//           <Link href="/" className="flex items-center gap-2">
//             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
//               <GraduationCap className="text-white" size={24} />
//             </div>

//             <span className="text-2xl font-extrabold text-slate-900">
//               Mentor<span className="text-indigo-600">Lagbe</span>
//             </span>
//           </Link>

//           <div className="flex items-center gap-2 text-emerald-600">
//             <ShieldCheck size={20} />
//             <span className="text-sm font-semibold hidden sm:block">
//               Secure Checkout
//             </span>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-6xl mx-auto px-5 py-12 lg:py-16">
//         {/* Back Button */}
//         <Link
//           href="/pricing"
//           className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8"
//         >
//           <ArrowLeft size={17} />
//           Back to Pricing
//         </Link>

//         {/* Page Heading */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-4">
//             <Sparkles size={16} />
//             Upgrade Your Experience
//           </div>

//           <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
//             Complete Your Payment
//           </h1>

//           <p className="text-slate-500 mt-3 max-w-xl mx-auto">
//             You are one step away from unlocking the full potential of
//             MentorLagbe Pro.
//           </p>
//         </div>

//         {/* Checkout Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
//           {/* Left Side */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Account Information */}
//             <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
//               <div className="flex items-center gap-3 mb-5">
//                 <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
//                   <Users className="text-indigo-600" size={21} />
//                 </div>

//                 <div>
//                   <h2 className="font-bold text-slate-900">
//                     Account Information
//                   </h2>
//                   <p className="text-xs text-slate-500">
//                     Your registered account details
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="text-xs font-semibold text-slate-500">
//                     FULL NAME
//                   </label>
//                   <p className="mt-1 font-semibold text-slate-800">
//                     {user.name}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="text-xs font-semibold text-slate-500">
//                     EMAIL ADDRESS
//                   </label>
//                   <p className="mt-1 font-semibold text-slate-800">
//                     {user.email}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="text-xs font-semibold text-slate-500">
//                     ACCOUNT TYPE
//                   </label>
//                   <span className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold capitalize">
//                     {isTutor ? (
//                       <GraduationCap size={15} />
//                     ) : (
//                       <Users size={15} />
//                     )}
//                     {user.role}
//                   </span>
//                 </div>
//               </div>
//             </section>

//             {/* Selected Plan */}
//             <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
//               <div className="flex items-center justify-between mb-5">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
//                     <Crown className="text-amber-500" size={22} />
//                   </div>

//                   <div>
//                     <h2 className="font-bold text-slate-900">
//                       Selected Membership
//                     </h2>
//                     <p className="text-xs text-slate-500">
//                       Your Pro membership benefits
//                     </p>
//                   </div>
//                 </div>

//                 <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
//                   PRO
//                 </span>
//               </div>

//               <div className="bg-indigo-50 rounded-xl p-5 mb-5">
//                 <h3 className="text-xl font-extrabold text-indigo-900">
//                   {plan.name}
//                 </h3>

//                 <div className="flex items-baseline gap-1 mt-3">
//                   <span className="text-4xl font-extrabold text-indigo-700">
//                     ${plan.price}
//                   </span>
//                   <span className="text-sm text-indigo-600">USD</span>
//                 </div>

//                 <p className="text-sm text-indigo-600 mt-1">{plan.billing}</p>
//               </div>

//               <h3 className="font-bold text-slate-800 mb-4">
//                 What you will get
//               </h3>

//               <div className="space-y-3">
//                 {plan.features.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <CheckCircle2
//                       size={18}
//                       className="text-emerald-500 shrink-0"
//                     />
//                     <span className="text-sm text-slate-600">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Payment Security */}
//             <section className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
//               <div className="flex gap-3">
//                 <ShieldCheck className="text-emerald-600 shrink-0" size={24} />

//                 <div>
//                   <h3 className="font-bold text-emerald-900">
//                     Your Payment is Secure
//                   </h3>

//                   <p className="text-sm text-emerald-700 mt-1 leading-relaxed">
//                     Your payment will be processed securely through Stripe.
//                     MentorLagbe does not store your card information.
//                   </p>
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* Right Side - Order Summary */}
//           <div className="lg:col-span-2">
//             <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
//               <div className="bg-slate-900 text-white p-6">
//                 <div className="flex items-center gap-2 text-indigo-300 mb-2">
//                   <CreditCard size={19} />
//                   <span className="text-sm font-semibold">Order Summary</span>
//                 </div>

//                 <h2 className="text-2xl font-bold">Payment Details</h2>

//                 <p className="text-slate-400 text-sm mt-2">
//                   Review your order before proceeding.
//                 </p>
//               </div>

//               <div className="p-6">
//                 <div className="flex justify-between gap-3 mb-5">
//                   <div>
//                     <p className="font-bold text-slate-800">{plan.name}</p>
//                     <p className="text-xs text-slate-500 mt-1">
//                       MentorLagbe Premium Membership
//                     </p>
//                   </div>

//                   <p className="font-bold text-slate-900">
//                     ${plan.price.toFixed(2)}
//                   </p>
//                 </div>

//                 <div className="space-y-3 border-t border-slate-100 pt-5">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-slate-500">Subtotal</span>
//                     <span className="font-medium text-slate-800">
//                       ${plan.price.toFixed(2)}
//                     </span>
//                   </div>

//                   <div className="flex justify-between text-sm">
//                     <span className="text-slate-500">Tax</span>
//                     <span className="font-medium text-slate-800">$0.00</span>
//                   </div>
//                 </div>

//                 <div className="border-t border-dashed border-slate-200 mt-5 pt-5">
//                   <div className="flex items-center justify-between">
//                     <span className="font-bold text-slate-900">
//                       Total Amount
//                     </span>

//                     <span className="text-3xl font-extrabold text-indigo-600">
//                       ${plan.price.toFixed(2)}
//                     </span>
//                   </div>

//                   <p className="text-xs text-slate-400 mt-2">Amount in USD</p>
//                 </div>

//                 {/* Payment Button */}
//                 <button
//                   onClick={handlePayment}
//                   className="w-full mt-7 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-100"
//                 >
//                   <Lock size={18} />
//                   Proceed to Payment
//                 </button>

//                 <p className="text-center text-xs text-slate-400 mt-4">
//                   You will be redirected to Stripe's secure checkout page.
//                 </p>

//                 <div className="flex justify-center items-center gap-2 mt-6 pt-5 border-t border-slate-100">
//                   <Shield size={17} className="text-emerald-600" />
//                   <span className="text-xs font-semibold text-slate-500">
//                     Secure checkout powered by Stripe
//                   </span>
//                 </div>
//               </div>
//             </section>

//             <p className="text-center text-xs text-slate-400 mt-5">
//               Need help? Contact MentorLagbe Support.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="border-t border-slate-200 bg-white py-6 mt-10">
//         <p className="text-center text-sm text-slate-500">
//           © {new Date().getFullYear()} MentorLagbe. All rights reserved.
//         </p>
//       </footer>
//     </main>
//   );
// }
