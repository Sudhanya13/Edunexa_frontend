// import React from "react";
// import Link from "next/link";
// import {
//   ArrowRight,
//   Bookmark,
//   CalendarDays,
//   Globe,
//   MapPin,
//   UserRound,
// } from "lucide-react";
// import Image from "next/image";

// export default function Tuitioncard({ tuition }) {
//   const {
//     _id,
//     title,
//     subject,
//     classLevel,
//     mode,
//     location,
//     image,
//     tutorName,
//     schedule,
//     monthlyFee,
//     currency = "$",
//   } = tuition;

//   return (
//     <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-[#101a2e] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-xl hover:shadow-teal-950/20">
//       {/* Image and badges */}
//       <div className="relative overflow-hidden rounded-xl">
//         <Image
//           src={image}
//           alt={title}
//           height={45}
//           width={55}
//           className="h-[232px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />

//         {/* Location / Online badge */}
//         <div className="absolute left-3 top-3">
//           {mode === "Online" ? (
//             <span className="flex items-center gap-1 rounded-full bg-teal-500 px-3 py-1 text-xs font-bold text-white">
//               <Globe size={13} />
//               Online
//             </span>
//           ) : (
//             <span className="flex items-center gap-1 rounded-full bg-slate-800/95 px-3 py-1 text-xs font-bold text-white">
//               <MapPin size={13} className="text-amber-400" />
//               {location}
//             </span>
//           )}
//         </div>

//         {/* Bookmark */}
//         <button
//           type="button"
//           aria-label="Bookmark tuition"
//           className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-slate-900/90 text-white transition hover:bg-teal-500"
//         >
//           <Bookmark size={17} />
//         </button>
//       </div>

//       {/* Subject and class */}
//       <div className="mt-4 flex items-center justify-between gap-2">
//         <span className="rounded-md border border-teal-500/20 bg-teal-500/10 px-2.5 py-1 text-xs font-semibold text-teal-400">
//           {subject}
//         </span>

//         <span className="text-xs text-slate-400">{classLevel}</span>
//       </div>

//       {/* Title */}
//       <h3 className="mt-4 line-clamp-1 text-lg font-bold text-white transition-colors group-hover:text-teal-400">
//         {title}
//       </h3>

//       {/* Tutor and schedule */}
//       <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
//         <span className="flex items-center gap-1.5">
//           <UserRound size={15} className="text-slate-500" />
//           {tutorName}
//         </span>

//         <span className="flex items-center gap-1.5">
//           <CalendarDays size={14} className="text-teal-400" />
//           {schedule}
//         </span>
//       </div>

//       {/* Divider */}
//       <div className="my-5 border-t border-slate-800" />

//       {/* Monthly fee and button */}
//       <div className="flex items-center justify-between gap-3">
//         <div>
//           <p className="text-xs text-slate-400">Monthly Fee</p>

//           <p className="mt-1 text-xl font-black text-white">
//             {currency === "USD" ? "$" : currency}
//             {Number(monthlyFee).toLocaleString("en-US")}
//             <span className="ml-1 text-xs font-medium text-slate-400">/mo</span>
//           </p>
//         </div>

//         <Link
//           href={`/tuitions/${_id}`}
//           className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-900 transition hover:bg-teal-400"
//         >
//           View Details
//           <ArrowRight size={15} />
//         </Link>
//       </div>
//     </article>
//   );
// }

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  Globe,
  MapPin,
  UserRound,
} from "lucide-react";
import Image from "next/image";

export default function Tuitioncard({ tuition }) {
  const {
    _id,
    title,
    subject,
    classLevel,
    mode,
    location,
    image,
    tutorName,
    schedule,
    monthlyFee,
  } = tuition;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/60">
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          height={45}
          width={55}
          className="h-[232px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Location */}
        <div className="absolute left-3 top-3">
          {mode === "Online" ? (
            <span className="flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold text-white">
              <Globe size={13} />
              Online
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold text-white">
              <MapPin size={13} className="text-amber-400" />
              {location}
            </span>
          )}
        </div>

        {/* Bookmark */}
        <button
          type="button"
          aria-label="Bookmark tuition"
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-teal-500 hover:text-white"
        >
          <Bookmark size={17} />
        </button>
      </div>

      {/* Subject and class */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="rounded-md border border-indigo-100 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
          {subject}
        </span>

        <span className="text-xs text-slate-500">{classLevel}</span>
      </div>

      {/* Title */}
      <h3 className="mt-4 line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
        {title}
      </h3>

      {/* Tutor and schedule */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <UserRound size={15} className="text-slate-400" />
          {tutorName}
        </span>

        <span className="flex items-center gap-1.5">
          <CalendarDays size={14} className="text-indigo-600" />
          {schedule}
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-slate-100" />

      {/* Monthly fee and button */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500">Monthly Fee</p>

          <p className="mt-1 text-xl font-black text-slate-900">
            ${Number(monthlyFee).toLocaleString("en-US")}
            <span className="ml-1 text-xs font-medium text-slate-400">/mo</span>
          </p>
        </div>

        <Link
          href={`/tuitions/${_id}`}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-indigo-500 hover:text-white"
        >
          View Details
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
