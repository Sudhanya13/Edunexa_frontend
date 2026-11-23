"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, X, Loader2, RefreshCw, BookOpen } from "lucide-react";
import DashboardSection from "@/components/dashboard/shared/DashboardSection";
import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://edunexa-server.vercel.app";

function ApprovalBadge({ status }) {
  const styles = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-emerald-100 text-emerald-700",
    rejected: "bg-red-100 text-red-700",
  };
  const val = String(status || "pending").toLowerCase();

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
        styles[val] || "bg-slate-100 text-slate-700"
      }`}
    >
      {val}
    </span>
  );
}

export default function AdminTuitionsPage() {
  const [tuitions, setTuitions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchTuitions = useCallback(async () => {
    const { data: tokenData, error: tokenError } = await authClient.token();

    if (tokenError || !tokenData?.token) {
      throw new Error(tokenError?.message || "Failed to retrieve auth token");
    }
    try {
      const res = await fetch(`${API_URL}/admin/tuitions`, {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to load tuitions");
      }
      setError("");
      setTuitions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Load remote data; updates occur after fetch resolves.
    fetchTuitions();
  }, [fetchTuitions]);

  // const handleDecision = async (tuition, nextStatus) => {
  //   if (tokenError || !tokenData?.token) {
  //     throw new Error(tokenError?.message || "Failed to retrieve auth token");
  //   }
  //   try {
  //     setActionId(tuition._id);
  //     setError("");
  //     setSuccess("");

  //     const res = await fetch(
  //       `${API_URL}/admin/tuitions/${tuition._id}/approval`,
  //       {
  //         method: "PATCH",
  //         credentials: "include",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ status: nextStatus }),
  //         Authorization: `Bearer ${tokenData.token}`,
  //       },
  //     );
  //     const data = await res.json();
  //     if (!res.ok) {
  //       throw new Error(data.message || "Action failed");
  //     }

  //     setTuitions((prev) =>
  //       prev.map((item) =>
  //         item._id === tuition._id
  //           ? { ...item, status: nextStatus, approvalStatus: nextStatus }
  //           : item,
  //       ),
  //     );
  //     setSuccess(`"${tuition.title}" marked as ${nextStatus}.`);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setActionId(null);
  //   }
  // };

  const handleDecision = async (tuition, nextStatus) => {
    try {
      setActionId(tuition._id);
      setError("");
      setSuccess("");

      const { data: tokenData, error: tokenError } = await authClient.token();
      if (tokenError || !tokenData?.token) {
        throw new Error(tokenError?.message || "Failed to retrieve auth token");
      }

      const res = await fetch(
        `${API_URL}/admin/tuitions/${tuition._id}/approval`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          body: JSON.stringify({ status: nextStatus }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Action failed");
      }

      setTuitions((prev) =>
        prev.map((item) =>
          item._id === tuition._id
            ? { ...item, status: nextStatus, approvalStatus: nextStatus }
            : item,
        ),
      );
      setSuccess(`"${tuition.title}" marked as ${nextStatus}.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionId(null);
    }
  };
  const visibleTuitions = tuitions.filter((t) => {
    const current = String(
      t.status ?? t.approvalStatus ?? "pending",
    ).toLowerCase();
    if (filter === "all") return true;
    return current === filter;
  });

  return (
    <DashboardSection
      title="Tuition Approval"
      description="Review tutor-submitted tuitions and approve or reject listings."
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`rounded-xl px-4 py-2 text-xs font-bold capitalize transition ${
                  filter === tab
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setLoading(true);
              fetchTuitions();
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw className="size-4" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-indigo-600" />
          </div>
        ) : visibleTuitions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <BookOpen className="mx-auto size-11 text-slate-300" />
            <p className="mt-3 font-semibold text-slate-800">
              No {filter === "all" ? "" : filter} tuitions found
            </p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {visibleTuitions.map((tuition) => {
              const currentStatus =
                tuition.status ?? tuition.approvalStatus ?? "pending";
              const busy = actionId === tuition._id;

              return (
                <article
                  key={tuition._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {tuition.bannerImage && (
                    <img
                      src={tuition.bannerImage}
                      alt={tuition.title}
                      className="h-44 w-full object-cover"
                    />
                  )}

                  <div className="space-y-4 p-5">
                    <div className="flex items-center justify-between gap-2">
                      <ApprovalBadge status={currentStatus} />
                      <span className="text-xs font-medium text-slate-500">
                        {tuition.mode} · ${tuition.monthlyFee}/mo
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {tuition.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {tuition.subject} · {tuition.classLevel}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Tutor: {tuition.tutorName || "Tutor"} (
                        {tuition.tutorEmail || "—"})
                      </p>
                    </div>

                    {tuition.description && (
                      <p className="line-clamp-3 text-sm text-slate-600">
                        {tuition.description}
                      </p>
                    )}

                    <div className="flex gap-3 border-t border-slate-100 pt-4">
                      <button
                        disabled={busy || currentStatus === "approved"}
                        onClick={() => handleDecision(tuition, "approved")}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {busy ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Check className="size-4" />
                        )}
                        Approve
                      </button>

                      <button
                        disabled={busy || currentStatus === "rejected"}
                        onClick={() => handleDecision(tuition, "rejected")}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <X className="size-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </DashboardSection>
  );
}
