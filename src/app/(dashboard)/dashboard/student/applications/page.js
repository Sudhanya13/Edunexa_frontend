// // import DashboardSection from "@/components/dashboard/shared/DashboardSection";

// // export default function StudentApplicationsPage() {
// //   return (
// //     <DashboardSection
// //       title="My Applications"
// //       description="Review your tuition applications and their status."
// //     />
// //   );
// // }

// // "use client";

// // import { useEffect, useState } from "react";
// // import DashboardSection from "@/components/dashboard/shared/DashboardSection";
// // import { authClient } from "@/lib/auth-client";
// // import { Loader2, Calendar, BookOpen, Clock } from "lucide-react";

// // export default function StudentApplicationsPage() {
// //   const { data: session, isPending: isSessionLoading } =
// //     authClient.useSession();

// //   const user = session?.user;

// //   const [applications, setApplications] = useState([]);
// //   console.log(applications);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (isSessionLoading) return;

// //     if (!user?.id) {
// //       setLoading(false);
// //       return;
// //     }

// //     const fetchApplications = async () => {
// //       try {
// //         setLoading(true);

// //         const apiUrl = (
// //           process.env.NEXT_PUBLIC_API_URL || "https://edunexa-server.vercel.app"
// //         ).replace(/\/$/, "");

// //         const res = await fetch(`${apiUrl}/applications/student/${user.id}`);

// //         if (!res.ok) {
// //           throw new Error("Failed to fetch applications");
// //         }

// //         const data = await res.json();
// //         setApplications(data);
// //       } catch (error) {
// //         console.error("Application fetching error:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchApplications();
// //   }, [user?.id, isSessionLoading]);

// //   const getStatusStyle = (status) => {
// //     switch (status?.toLowerCase()) {
// //       case "accepted":
// //         return "bg-green-50 text-green-700 border-green-200";
// //       case "rejected":
// //         return "bg-red-50 text-red-700 border-red-200";
// //       default:
// //         return "bg-amber-50 text-amber-700 border-amber-200";
// //     }
// //   };

// //   return (
// //     <div>
// //       <DashboardSection
// //         title="My Applications"
// //         description="Review your tuition applications and their status."
// //       />

// //       <div className="mt-6 space-y-4">
// //         {isSessionLoading || loading ? (
// //           <div className="flex justify-center py-16">
// //             <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
// //           </div>
// //         ) : !user ? (
// //           <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
// //             <p className="text-slate-600">
// //               Please sign in to view your applications.
// //             </p>
// //           </div>
// //         ) : user && applications.length === 0 ? (
// //           <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
// //             <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
// //             <h3 className="text-lg font-semibold text-slate-900">
// //               No Applications Yet
// //             </h3>
// //             <p className="text-sm text-slate-500 mt-2">
// //               You haven't applied for any tuition posts yet.
// //             </p>
// //           </div>
// //         ) : (
// //           applications.map((application) => (
// //             <div
// //               key={application._id}
// //               className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm"
// //             >
// //               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-slate-900">
// //                     {application.tuitionTitle || "Tuition Application"}
// //                   </h3>

// //                   <p className="text-sm text-slate-500 mt-1">
// //                     Mentor: {application.tutorEmail || "Not provided"}
// //                   </p>
// //                 </div>

// //                 <span
// //                   className={`inline-flex w-fit items-center px-3 py-1 rounded-full border text-xs font-semibold ${getStatusStyle(
// //                     application.status,
// //                   )}`}
// //                 >
// //                   {application.status || "Pending"}
// //                 </span>
// //               </div>

// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-sm">
// //                 <div className="flex items-center gap-2 text-slate-600">
// //                   <Calendar className="w-4 h-4 text-indigo-500" />
// //                   Applied:{" "}
// //                   {application.createdAt
// //                     ? new Date(application.createdAt).toLocaleDateString()
// //                     : "N/A"}
// //                 </div>

// //                 <div className="flex items-center gap-2 text-slate-600">
// //                   <Clock className="w-4 h-4 text-indigo-500" />
// //                   Institution: {application.institution}
// //                 </div>
// //               </div>

// //               <div className="mt-4 pt-4 border-t border-slate-100">
// //                 <p className="text-xs font-semibold text-slate-500 mb-1">
// //                   Your Message
// //                 </p>
// //                 <p className="text-sm text-slate-600">{application.message}</p>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import DashboardSection from "@/components/dashboard/shared/DashboardSection";
// import { authClient } from "@/lib/auth-client";
// import { Loader2, Calendar, BookOpen, Clock } from "lucide-react";

// export default function StudentApplicationsPage() {
//   const { data: session, isPending: isSessionLoading } =
//     authClient.useSession();

//   const user = session?.user;

//   const [applications, setApplications] = useState([]);
//   const [fetched, setFetched] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     if (isSessionLoading || !user?.id) return;

//     let cancelled = false;

//     const fetchApplications = async () => {
//       try {
//         setError(false);

//         const apiUrl = (
//           process.env.NEXT_PUBLIC_API_URL || "https://edunexa-server.vercel.app"
//         ).replace(/\/$/, "");

//         const res = await fetch(`${apiUrl}/applications/student/${user.id}`);

//         if (!res.ok) {
//           throw new Error("Failed to fetch applications");
//         }

//         const data = await res.json();

//         if (!cancelled) {
//           setApplications(Array.isArray(data) ? data : []);
//         }
//       } catch (err) {
//         console.error("Application fetching error:", err);
//         if (!cancelled) setError(true);
//       } finally {
//         if (!cancelled) setFetched(true);
//       }
//     };

//     fetchApplications();

//     return () => {
//       cancelled = true;
//     };
//   }, [user?.id, isSessionLoading]);

//   const getStatusStyle = (status) => {
//     switch (status?.toLowerCase()) {
//       case "accepted":
//         return "bg-green-50 text-green-700 border-green-200";
//       case "rejected":
//         return "bg-red-50 text-red-700 border-red-200";
//       default:
//         return "bg-amber-50 text-amber-700 border-amber-200";
//     }
//   };

//   const isLoading = isSessionLoading || (user && !fetched);

//   return (
//     <div>
//       <DashboardSection
//         title="My Applications"
//         description="Review your tuition applications and their status."
//       />

//       <div className="mt-6 space-y-4">
//         {isLoading ? (
//           <div className="flex justify-center py-16">
//             <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
//           </div>
//         ) : !user ? (
//           <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
//             <p className="text-slate-600">
//               Please sign in to view your applications.
//             </p>
//           </div>
//         ) : error ? (
//           <div className="bg-white border border-red-200 rounded-xl p-8 text-center">
//             <p className="text-red-600">
//               Failed to load applications. Please try again.
//             </p>
//           </div>
//         ) : applications.length === 0 ? (
//           <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
//             <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold text-slate-900">
//               No Applications Yet
//             </h3>
//             <p className="text-sm text-slate-500 mt-2">
//               You haven&apos;t applied for any tuition posts yet.
//             </p>
//           </div>
//         ) : (
//           applications.map((application) => (
//             <div
//               key={application._id}
//               className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm"
//             >
//               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-slate-900">
//                     {application.tuitionTitle || "Tuition Application"}
//                   </h3>

//                   <p className="text-sm text-slate-500 mt-1">
//                     Mentor: {application.tutorEmail || "Not provided"}
//                   </p>
//                 </div>

//                 <span
//                   className={`inline-flex w-fit items-center px-3 py-1 rounded-full border text-xs font-semibold ${getStatusStyle(
//                     application.status,
//                   )}`}
//                 >
//                   {application.status || "Pending"}
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-sm">
//                 <div className="flex items-center gap-2 text-slate-600">
//                   <Calendar className="w-4 h-4 text-indigo-500" />
//                   Applied:{" "}
//                   {application.createdAt
//                     ? new Date(application.createdAt).toLocaleDateString()
//                     : "N/A"}
//                 </div>

//                 <div className="flex items-center gap-2 text-slate-600">
//                   <Clock className="w-4 h-4 text-indigo-500" />
//                   Institution: {application.institution || "N/A"}
//                 </div>
//               </div>

//               <div className="mt-4 pt-4 border-t border-slate-100">
//                 <p className="text-xs font-semibold text-slate-500 mb-1">
//                   Your Message
//                 </p>
//                 <p className="text-sm text-slate-600">{application.message}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardSection from "@/components/dashboard/shared/DashboardSection";
import { authClient } from "@/lib/auth-client";
import { Loader2, Search, ExternalLink } from "lucide-react";

export default function StudentApplicationsPage() {
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const user = session?.user;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isSessionLoading) return;

    if (!user?.id) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(false);

        const apiUrl = (
          process.env.NEXT_PUBLIC_API_URL || "https://edunexa-server.vercel.app"
        ).replace(/\/$/, "");

        const res = await fetch(`${apiUrl}/applications/student/${user.id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await res.json();

        if (!cancelled) {
          setApplications(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Application fetching error:", err);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchApplications();

    return () => {
      cancelled = true;
    };
  }, [user?.id, isSessionLoading]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "rejected":
        return "bg-rose-50 text-rose-600 border-rose-200";

      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatFee = (application) => {
    const symbol =
      application.currency === "USD"
        ? "$"
        : application.currency === "BDT"
          ? "৳"
          : application.currency || "$";

    return `${symbol}${Number(application.monthlyFee || 0).toLocaleString(
      "en-US",
    )}`;
  };

  const isPageLoading = isSessionLoading || loading;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <DashboardSection
          title="My Applications"
          description="Review the status of your applications submitted to mentors."
        />

        <Link
          href="/tuitions"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition shrink-0"
        >
          <Search className="w-4 h-4" />
          Find More Tuitions
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {isPageLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          </div>
        ) : !user ? (
          <div className="py-16 text-center text-slate-500">
            Please sign in to view your applications.
          </div>
        ) : error ? (
          <div className="py-16 text-center text-rose-600">
            Failed to load applications. Please try again.
          </div>
        ) : applications.length === 0 ? (
          <div className="py-16 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No Applications Yet
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              You haven't applied for any tuition posts yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tuition Title
                  </th>
                  <th className="px-5 py-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Subject
                  </th>
                  <th className="px-5 py-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tutor
                  </th>
                  <th className="px-5 py-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Monthly Fee
                  </th>
                  <th className="px-5 py-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Applied Date
                  </th>
                  <th className="px-5 py-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {applications.map((application) => (
                  <tr
                    key={application._id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 min-w-[280px]">
                        <span className="text-sm font-semibold text-slate-900 leading-5">
                          {application.tuitionTitle || "Tuition Application"}
                        </span>

                        {application.tuitionId && (
                          <Link
                            href={`/tuitions/${application.tuitionId}`}
                            title="View tuition"
                            className="text-slate-400 hover:text-teal-600 shrink-0"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <span className="inline-block max-w-[160px] rounded-md bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700">
                        {application.subject || "N/A"}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-600">
                      {application.tutorName || "Not provided"}
                    </td>

                    <td className="px-5 py-5 text-sm font-bold text-slate-900 whitespace-nowrap">
                      {formatFee(application)}
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-500 whitespace-nowrap">
                      {formatDate(application.createdAt)}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                          application.status,
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {application.status || "Pending"}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-400 italic whitespace-nowrap">
                      No action
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
