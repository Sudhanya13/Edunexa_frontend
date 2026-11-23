"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import {
  Users,
  Loader2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  CalendarDays,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import DashboardSection from "@/components/dashboard/shared/DashboardSection";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://edunexa-server.vercel.app";

function StatusBadge({ status }) {
  const normalized = String(status || "pending").toLowerCase();

  const styles = {
    pending: "bg-amber-100 text-amber-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
        styles[normalized] || "bg-slate-100 text-slate-600"
      }`}
    >
      {normalized}
    </span>
  );
}

export default function TutorApplicantsPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const user = session?.user;

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchApplicants = useCallback(async () => {
    const { data: tokenData, error: tokenError } = await authClient.token();

    if (tokenError || !tokenData?.token) {
      throw new Error(tokenError?.message || "Failed to retrieve auth token");
    }
    try {
      const response = await fetch(`${API_URL}/tutor/applicants`, {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch applicants");
      }

      setError("");
      setApplicants(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (sessionLoading) return;

    if (!user) {
      router.replace("/signin");
      return;
    }

    if (user.role !== "tutor") {
      router.replace("/dashboard");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Load remote data; updates occur after fetch resolves.
    fetchApplicants();
  }, [sessionLoading, user, router, fetchApplicants]);

  const updateStatus = async (application, status) => {
    const confirmed = window.confirm(
      `Are you sure you want to ${status} this application?`,
    );

    if (!confirmed) return;

    try {
      setUpdatingId(application._id);
      setError("");
      setSuccess("");

      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error(
          tokenError?.message || "Failed to retrieve auth token",
        );
      }

      const response = await fetch(
        `${API_URL}/applications/${application._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          body: JSON.stringify({ status }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update application");
      }

      setApplicants((previous) =>
        previous.map((item) =>
          item._id === application._id
            ? { ...item, status: data.status }
            : item,
        ),
      );

      setSuccess(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredApplicants = applicants.filter((application) => {
    if (filter === "all") return true;

    return String(application.status || "pending").toLowerCase() === filter;
  });

  const pendingCount = applicants.filter(
    (item) => String(item.status || "pending").toLowerCase() === "pending",
  ).length;

  const acceptedCount = applicants.filter(
    (item) => String(item.status).toLowerCase() === "accepted",
  ).length;

  const rejectedCount = applicants.filter(
    (item) => String(item.status).toLowerCase() === "rejected",
  ).length;

  if (sessionLoading || loading) {
    return (
      <DashboardSection
        title="Manage Applicants"
        description="Review and manage student applications."
      >
        <div className="flex min-h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-indigo-600" />
        </div>
      </DashboardSection>
    );
  }

  if (!user || user.role !== "tutor") return null;

  return (
    <DashboardSection
      title="Manage Applicants"
      description="Review students who have applied to your tuition posts."
    >
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Applicants
              </p>
              <Users className="size-5 text-indigo-600" />
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {applicants.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Pending</p>
            <p className="mt-3 text-3xl font-bold text-amber-600">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Accepted</p>
            <p className="mt-3 text-3xl font-bold text-green-600">
              {acceptedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">Rejected</p>
            <p className="mt-3 text-3xl font-bold text-red-600">
              {rejectedCount}
            </p>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Student Applications
            </h2>
            <p className="text-sm text-slate-500">
              Review applications received for your tuition posts.
            </p>
          </div>

          <button
            onClick={() => {
              setLoading(true);
              fetchApplicants();
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw className="size-4" />
            Refresh
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {["all", "pending", "accepted", "rejected"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition ${
                filter === item
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item === "all" ? `All (${applicants.length})` : item}
            </button>
          ))}
        </div>

        {/* Applicant list */}
        {filteredApplicants.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Users className="mx-auto size-12 text-slate-300" />

            <h3 className="mt-4 font-bold text-slate-900">
              No applications found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {filter === "all"
                ? "Students who apply to your tuition posts will appear here."
                : `There are no ${filter} applications currently.`}
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredApplicants.map((application) => {
              const status = String(
                application.status || "pending",
              ).toLowerCase();

              const isPending = status === "pending";
              const isUpdating = updatingId === application._id;

              return (
                <article
                  key={application._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600">
                        {(application.studentName || "S")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {application.studentName || "Unknown Student"}
                        </h3>

                        <p className="text-xs text-slate-500">
                          Applied{" "}
                          {application.createdAt
                            ? new Date(
                                application.createdAt,
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "Recently"}
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={status} />
                  </div>

                  {/* Tuition title */}
                  <div className="mt-5 rounded-xl bg-indigo-50 p-4">
                    <div className="flex items-start gap-3">
                      <BookOpen className="mt-0.5 size-5 shrink-0 text-indigo-600" />
                      <div>
                        <p className="text-xs font-semibold text-indigo-600">
                          APPLIED FOR TUITION
                        </p>
                        <p className="mt-1 font-bold text-slate-900">
                          {application.tuitionTitle || "Untitled Tuition"}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {application.subject || "Subject not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Student details */}
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 size-4 text-slate-400" />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">Email</p>
                        <p className="break-all text-sm font-medium text-slate-800">
                          {application.studentEmail || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 size-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Phone</p>
                        <p className="text-sm font-medium text-slate-800">
                          {application.phone || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:col-span-2">
                      <CalendarDays className="mt-0.5 size-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">
                          Preferred Schedule
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {application.institution || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Learning note */}
                  <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <MessageSquare className="size-4 text-slate-500" />
                      <p className="text-sm font-bold text-slate-700">
                        Learning Note
                      </p>
                    </div>

                    <p className="text-sm leading-6 text-slate-600">
                      {application.message || "No additional note provided."}
                    </p>
                  </div>

                  {/* Actions */}
                  {isPending ? (
                    <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                      <button
                        onClick={() => updateStatus(application, "accepted")}
                        disabled={isUpdating}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
                      >
                        {isUpdating ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="size-4" />
                        )}
                        Accept Application
                      </button>

                      <button
                        onClick={() => updateStatus(application, "rejected")}
                        disabled={isUpdating}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        <XCircle className="size-4" />
                        Reject Application
                      </button>
                    </div>
                  ) : (
                    <div className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-500">
                      This application has been{" "}
                      <span className="font-bold capitalize text-slate-800">
                        {status}
                      </span>
                      .
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </DashboardSection>
  );
}
