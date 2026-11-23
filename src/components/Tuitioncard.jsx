"use client";

// // "use client";

// // import React, { useEffect, useState } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import {
// //   ArrowRight,
// //   Bookmark,
// //   CalendarDays,
// //   Globe,
// //   MapPin,
// //   UserRound,
// // } from "lucide-react";

// // const FALLBACK_IMAGE = "/images/tuition-placeholder.jpg";

// // function getSafeImageSrc(image) {
// //   if (!image || typeof image !== "string") {
// //     return FALLBACK_IMAGE;
// //   }

// //   const trimmed = image.trim();
// //   if (!trimmed) {
// //     return FALLBACK_IMAGE;
// //   }

// //   // If the backend returns a relative path like "/uploads/math.jpg", point to API server
// //   if (trimmed.startsWith("/") && !trimmed.startsWith("/images/")) {
// //     return `https://edunexa-server.vercel.app${trimmed}`;
// //   }

// //   return trimmed;
// // }

// // export default function Tuitioncard({ tuition }) {
// //   const {
// //     _id,
// //     title,
// //     subject,
// //     classLevel,
// //     mode,
// //     location,
// //     image,
// //     tutorName,
// //     schedule,
// //     monthlyFee,
// //   } = tuition;

// //   const [imgSrc, setImgSrc] = useState(() => getSafeImageSrc(image));

// //   useEffect(() => {
// //     setImgSrc(getSafeImageSrc(image));
// //   }, [image]);

// //   return (
// //     <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/60">
// //       {/* Image */}
// //       <div className="relative h-[232px] w-full overflow-hidden rounded-xl bg-slate-100">
// //         <Image
// //           src={imgSrc}
// //           alt={title || subject || "Tuition banner"}
// //           fill
// //           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //           unoptimized
// //           onError={() => {
// //             if (imgSrc !== FALLBACK_IMAGE) {
// //               setImgSrc(FALLBACK_IMAGE);
// //             }
// //           }}
// //           className="object-cover transition-transform duration-500 group-hover:scale-105"
// //         />

// //         {/* Location */}
// //         <div className="absolute left-3 top-3 z-10">
// //           {mode === "Online" ? (
// //             <span className="flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold text-white">
// //               <Globe size={13} />
// //               Online
// //             </span>
// //           ) : (
// //             <span className="flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold text-white">
// //               <MapPin size={13} className="text-amber-400" />
// //               {location}
// //             </span>
// //           )}
// //         </div>

// //         {/* Bookmark */}
// //         <button
// //           type="button"
// //           aria-label="Bookmark tuition"
// //           className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-teal-500 hover:text-white"
// //         >
// //           <Bookmark size={17} />
// //         </button>
// //       </div>

// //       {/* Subject and class */}
// //       <div className="mt-4 flex items-center justify-between gap-2">
// //         <span className="rounded-md border border-indigo-100 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
// //           {subject}
// //         </span>

// //         <span className="text-xs text-slate-500">{classLevel}</span>
// //       </div>

// //       {/* Title */}
// //       <h3 className="mt-4 line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
// //         {title}
// //       </h3>

// //       {/* Tutor and schedule */}
// //       <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
// //         <span className="flex items-center gap-1.5">
// //           <UserRound size={15} className="text-slate-400" />
// //           {tutorName}
// //         </span>

// //         <span className="flex items-center gap-1.5">
// //           <CalendarDays size={14} className="text-indigo-600" />
// //           {schedule}
// //         </span>
// //       </div>

// //       {/* Divider */}
// //       <div className="my-5 border-t border-slate-100" />

// //       {/* Monthly fee and button */}
// //       <div className="flex items-center justify-between gap-3">
// //         <div>
// //           <p className="text-xs text-slate-500">Monthly Fee</p>

// //           <p className="mt-1 text-xl font-black text-slate-900">
// //             ${Number(monthlyFee).toLocaleString("en-US")}
// //             <span className="ml-1 text-xs font-medium text-slate-400">/mo</span>
// //           </p>
// //         </div>

// //         <Link
// //           href={`/tuitions/${_id}`}
// //           className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-indigo-500 hover:text-white"
// //         >
// //           View Details
// //           <ArrowRight size={15} />
// //         </Link>
// //       </div>
// //     </article>
// //   );
// // }

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   ArrowRight,
//   Bookmark,
//   BookOpen,
//   CalendarDays,
//   Globe,
//   MapPin,
//   UserRound,
// } from "lucide-react";

// function normalizeImageUrl(image) {
//   if (!image || typeof image !== "string") return "";
//   const trimmed = image.trim();
//   if (!trimmed) return "";

//   if (trimmed.startsWith("/")) {
//     return `https://edunexa-server.vercel.app${trimmed}`;
//   }

//   return trimmed;
// }

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
//   } = tuition;

//   const resolvedSrc = normalizeImageUrl(image);
//   const [imageBroken, setImageBroken] = useState(!resolvedSrc);

//   useEffect(() => {
//     setImageBroken(!normalizeImageUrl(image));
//   }, [image]);

//   return (
//     <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/60">
//       {/* Image or Fallback Link */}
//       <div className="relative h-[232px] w-full overflow-hidden rounded-xl bg-slate-100">
//         {!imageBroken && resolvedSrc ? (
//           <Image
//             src={resolvedSrc}
//             alt={title || subject || "Tuition banner"}
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             unoptimized
//             onError={() => setImageBroken(true)}
//             className="object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-indigo-50 via-slate-50 to-teal-50 px-4 text-center">
//             <div className="grid size-11 place-items-center rounded-full bg-white text-indigo-600 shadow-sm">
//               <BookOpen size={20} />
//             </div>
//             <p className="text-xs font-medium text-slate-500">
//               Cover image unavailable
//             </p>
//             <Link
//               href={`/tuitions/${_id}`}
//               className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 underline underline-offset-4 hover:text-indigo-800"
//             >
//               Open tuition page
//               <ArrowRight size={13} />
//             </Link>
//           </div>
//         )}

//         {/* Location */}
//         <div className="absolute left-3 top-3 z-10">
//           {mode === "Online" ? (
//             <span className="flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold text-white">
//               <Globe size={13} />
//               Online
//             </span>
//           ) : (
//             <span className="flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold text-white">
//               <MapPin size={13} className="text-amber-400" />
//               {location}
//             </span>
//           )}
//         </div>

//         {/* Bookmark */}
//         <button
//           type="button"
//           aria-label="Bookmark tuition"
//           className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-teal-500 hover:text-white"
//         >
//           <Bookmark size={17} />
//         </button>
//       </div>

//       {/* Subject and class */}
//       <div className="mt-4 flex items-center justify-between gap-2">
//         <span className="rounded-md border border-indigo-100 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
//           {subject}
//         </span>

//         <span className="text-xs text-slate-500">{classLevel}</span>
//       </div>

//       {/* Title */}
//       <h3 className="mt-4 line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
//         {title}
//       </h3>

//       {/* Tutor and schedule */}
//       <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
//         <span className="flex items-center gap-1.5">
//           <UserRound size={15} className="text-slate-400" />
//           {tutorName}
//         </span>

//         <span className="flex items-center gap-1.5">
//           <CalendarDays size={14} className="text-indigo-600" />
//           {schedule}
//         </span>
//       </div>

//       {/* Divider */}
//       <div className="my-5 border-t border-slate-100" />

//       {/* Monthly fee and button */}
//       <div className="flex items-center justify-between gap-3">
//         <div>
//           <p className="text-xs text-slate-500">Monthly Fee</p>

//           <p className="mt-1 text-xl font-black text-slate-900">
//             ${Number(monthlyFee).toLocaleString("en-US")}
//             <span className="ml-1 text-xs font-medium text-slate-400">/mo</span>
//           </p>
//         </div>

//         <Link
//           href={`/tuitions/${_id}`}
//           className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:bg-indigo-500 hover:text-white"
//         >
//           View Details
//           <ArrowRight size={15} />
//         </Link>
//       </div>
//     </article>
//   );
// }
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  Globe,
  Loader2,
  MapPin,
  UserRound,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Tuitioncard({ tuition }) {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;
  console.log(user);
  const userRole = user?.role?.toLowerCase();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [savingBookmark, setSavingBookmark] = useState(false);

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

  useEffect(() => {
    if (sessionLoading || userRole !== "student" || !user?.id || !_id) return;

    const checkBookmark = async () => {
      try {
        const { data: tokenData, error: tokenError } = await authClient.token();

        if (tokenError || !tokenData?.token) return;

        const response = await fetch(
          `https://edunexa-server.vercel.app/saved-tuitions/student/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          },
        );

        if (!response.ok) return;

        const data = await response.json();
        setIsBookmarked(
          (data.savedTuitions || []).some(
            (item) => String(item.tuitionId) === String(_id),
          ),
        );
      } catch {
        setIsBookmarked(false);
      }
    };

    checkBookmark();
  }, [sessionLoading, userRole, user?.id, _id]);

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Please sign in as a student to save tuitions.");
      router.push("/signin");
      return;
    }

    if (userRole !== "student") {
      toast.error("Only student accounts can save tuitions.");
      return;
    }

    try {
      setSavingBookmark(true);
      const { data: tokenData, error: tokenError } = await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error(tokenError?.message || "Failed to retrieve auth token");
      }

      const response = await fetch(
        isBookmarked
          ? `https://edunexa-server.vercel.app/saved-tuitions/${user.id}/${_id}`
          : "https://edunexa-server.vercel.app/saved-tuitions",
        {
          method: isBookmarked ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          body: isBookmarked
            ? undefined
            : JSON.stringify({
                studentId: user.id,
                studentEmail: user.email,
                tuitionId: _id,
              }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update saved tuition");
      }

      setIsBookmarked((previous) => !previous);
      toast.success(
        isBookmarked
          ? "Tuition removed from saved list"
          : "Tuition added to saved list",
      );
    } catch (error) {
      toast.error(error.message || "Failed to update saved tuition");
    } finally {
      setSavingBookmark(false);
    }
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/60">
      {/* Image */}
      <div className="relative h-[232px] overflow-hidden rounded-xl">
        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80"
          }
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          onClick={handleBookmark}
          disabled={savingBookmark || sessionLoading}
          aria-label={
            isBookmarked ? "Remove tuition from saved list" : "Save tuition"
          }
          title={isBookmarked ? "Remove from saved tuitions" : "Save tuition"}
          className={`absolute right-3 top-3 grid size-9 place-items-center rounded-full shadow-md transition disabled:opacity-60 ${
            isBookmarked
              ? "bg-indigo-600 text-white"
              : "bg-white text-slate-700 hover:bg-indigo-600 hover:text-white"
          }`}
        >
          {savingBookmark ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Bookmark
              size={17}
              className={isBookmarked ? "fill-current" : ""}
            />
          )}
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
