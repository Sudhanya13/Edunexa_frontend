"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
  BookOpen,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  X,
  Save,
  RefreshCw,
} from "lucide-react";
import DashboardSection from "@/components/dashboard/shared/DashboardSection";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://edunexa-server.vercel.app";

const emptyForm = {
  title: "",
  subject: "",
  classLevel: "",
  mode: "Online",
  location: "",
  monthlyFee: "",
  daysPerWeek: "5",
  description: "",
  bannerImage: "",
};

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    accepted: "bg-green-100 text-green-700",
  };

  const value = String(status || "pending").toLowerCase();

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${styles[value] || "bg-slate-100 text-slate-600"}`}
    >
      {value}
    </span>
  );
}

export default function MyTuitionsPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const user = session?.user;

  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchTuitions = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/tuitions/my`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch tuitions");
      }

      setTuitions(data);
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

    fetchTuitions();
  }, [sessionLoading, user, router, fetchTuitions]);

  const startEdit = (tuition) => {
    setEditing(tuition);

    setForm({
      title: tuition.title || "",
      subject: tuition.subject || "",
      classLevel: tuition.classLevel || "",
      mode: tuition.mode || "Online",
      location: tuition.location || "",
      monthlyFee: String(tuition.monthlyFee ?? ""),
      daysPerWeek: String(tuition.daysPerWeek ?? 5),
      description: tuition.description || "",
      bannerImage: tuition.bannerImage || "",
    });

    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const saveEdit = async (e) => {
    e.preventDefault();

    if (form.title.trim().length < 5 || form.description.trim().length < 20) {
      setError(
        "Title must be at least 5 characters and description at least 20 characters.",
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(`${API_URL}/tuitions/${editing._id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          monthlyFee: Number(form.monthlyFee),
          daysPerWeek: Number(form.daysPerWeek),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      setSuccess("Tuition updated successfully.");
      setEditing(null);
      await fetchTuitions();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteTuition = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tuition? Its associated applications and bookmarks will also be deleted.",
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(`${API_URL}/tuitions/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setTuitions((previous) => previous.filter((item) => item._id !== id));

      setSuccess("Tuition deleted successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleStatus = async (tuition) => {
    try {
      setError("");

      const response = await fetch(
        `${API_URL}/tuitions/${tuition._id}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: !tuition.isActive }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setTuitions((previous) =>
        previous.map((item) =>
          item._id === tuition._id
            ? { ...item, isActive: data.isActive }
            : item,
        ),
      );

      setSuccess(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  if (sessionLoading || loading) {
    return (
      <DashboardSection
        title="My Tuitions"
        description="Manage your tuition listings."
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
      title="My Tuitions"
      description="Manage, edit and track your tuition posts."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Your Tuition Listings
            </h2>
            <p className="text-sm text-slate-500">
              {tuitions.length} tuition post(s) created
            </p>
          </div>

          <button
            onClick={fetchTuitions}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
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
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {tuitions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <BookOpen className="mx-auto size-12 text-slate-300" />
            <h3 className="mt-4 font-bold text-slate-900">
              No tuition posts yet
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Create your first tuition listing to get started.
            </p>
            <button
              onClick={() => router.push("/dashboard/tutor/post-tuition")}
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"
            >
              Post a Tuition
            </button>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {tuitions.map((tuition) => (
              <article
                key={tuition._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <img
                  src={tuition.bannerImage}
                  alt={tuition.title}
                  className="h-48 w-full object-cover"
                />

                <div className="space-y-4 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={tuition.approvalStatus} />

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        tuition.isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {tuition.isActive ? "Active" : "Closed"}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {tuition.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {tuition.subject} · {tuition.classLevel}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">Monthly Fee</p>
                      <p className="mt-1 font-bold text-slate-900">
                        ${tuition.monthlyFee}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Days Per Week</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {tuition.daysPerWeek}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Mode</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {tuition.mode}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Location</p>
                      <p className="mt-1 font-bold text-slate-900">
                        {tuition.location || "Online"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                    <button
                      onClick={() => startEdit(tuition)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-50 px-3 py-2.5 text-sm font-bold text-indigo-700 hover:bg-indigo-100"
                    >
                      <Edit className="size-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => toggleStatus(tuition)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-sm font-bold text-amber-700 hover:bg-amber-100"
                    >
                      {tuition.isActive ? (
                        <>
                          <EyeOff className="size-4" /> Close
                        </>
                      ) : (
                        <>
                          <Eye className="size-4" /> Activate
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => deleteTuition(tuition._id)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100"
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
            <div className="my-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Edit Tuition
                  </h2>
                  <p className="text-sm text-slate-500">
                    Update your tuition details.
                  </p>
                </div>
                <button
                  onClick={() => setEditing(null)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  aria-label="Close edit form"
                >
                  <X />
                </button>
              </div>

              <form onSubmit={saveEdit} className="space-y-4">
                {[
                  ["title", "Tuition Title"],
                  ["subject", "Subject"],
                  ["classLevel", "Class Level"],
                  ["location", "Location"],
                  ["monthlyFee", "Monthly Fee"],
                  ["daysPerWeek", "Days Per Week"],
                  ["bannerImage", "Banner Image URL"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">
                      {label}
                    </label>
                    <input
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      type={
                        ["monthlyFee", "daysPerWeek"].includes(name)
                          ? "number"
                          : "text"
                      }
                      required={!["location"].includes(name)}
                      min={
                        name === "monthlyFee" || name === "daysPerWeek"
                          ? 1
                          : undefined
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Tuition Mode
                  </label>
                  <select
                    name="mode"
                    value={form.mode}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                  >
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Both</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    minLength={20}
                    maxLength={2000}
                    rows={5}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {saving ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Save className="size-4" />
                    )}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardSection>
  );
}
