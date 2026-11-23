"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Crown,
  ImagePlus,
  IndianRupee,
  Loader2,
  MapPin,
  Upload,
  X,
} from "lucide-react";
import DashboardSection from "@/components/dashboard/shared/DashboardSection";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://edunexa-server.vercel.app";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "History",
  "Geography",
  "Economics",
  "Accountancy",
  "Other",
];

const classLevels = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "College",
  "University",
];

const initialForm = {
  title: "",
  subject: "",
  classLevel: "",
  mode: "Online",
  location: "",
  monthlyFee: "",
  daysPerWeek: "5",
  description: "",
};

export default function TutorPostTuitionPage() {
  const router = useRouter();

  const { data: session, isPending: sessionLoading } = useSession();

  const user = session?.user;

  const [form, setForm] = useState(initialForm);
  const [banner, setBanner] = useState(null);
  const [preview, setPreview] = useState("");
  const previewUrlRef = useRef("");
  const [stats, setStats] = useState(null);

  const [loadingStats, setLoadingStats] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(
    () => () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    },
    [],
  );

  // Fetch tutor posting statistics
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

    const fetchStats = async () => {
      try {
        const { data: tokenData, error: tokenError } =
          await authClient.token();

        if (tokenError || !tokenData?.token) {
          throw new Error(
            tokenError?.message || "Failed to retrieve auth token",
          );
        }

        const response = await fetch(
          `${API_URL}/tuitions/my/count?email=${encodeURIComponent(user.email)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch posting statistics");
        }

        setStats(data);
      } catch (err) {
        console.error("Fetch stats error:", err);
        setError(err.message);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [sessionLoading, user, router]);

  const isPro = stats?.plan === "pro";
  const limitReached = stats && !stats.canPost;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    previewUrlRef.current = URL.createObjectURL(file);
    setPreview(previewUrlRef.current);
    setBanner(file);
  };

  const uploadImage = async () => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error("ImgBB API key is missing.");
    }

    const imageData = new FormData();
    imageData.append("image", banner);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: imageData,
      },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error?.message || "Image upload failed.");
    }

    return result.data.display_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!user) {
      setError("Please log in to continue.");
      return;
    }

    if (!banner) {
      setError("Please upload a tuition banner image.");
      return;
    }

    if (form.mode !== "Online" && !form.location.trim()) {
      setError("Please enter your tuition location.");
      return;
    }

    if (form.title.trim().length < 5) {
      setError("Title must contain at least 5 characters.");
      return;
    }

    if (form.description.trim().length < 20) {
      setError("Description must contain at least 20 characters.");
      return;
    }

    if (
      !Number.isFinite(Number(form.monthlyFee)) ||
      Number(form.monthlyFee) <= 0
    ) {
      setError("Please enter a valid monthly fee.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Upload banner to ImgBB
      const bannerImage = await uploadImage();

      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error(
          tokenError?.message || "Failed to retrieve auth token",
        );
      }

      // 2. Submit tuition to Express backend
      const response = await fetch(`${API_URL}/tuitions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({
          ...form,
          monthlyFee: Number(form.monthlyFee),
          daysPerWeek: Number(form.daysPerWeek),
          bannerImage,
          tutorEmail: user.email,
          tutorName: user.name,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.limitReached) {
          setStats((previous) => ({
            ...previous,
            canPost: false,
            count: result.currentCount,
            remaining: 0,
          }));
        }

        throw new Error(result.message || "Failed to post tuition.");
      }

      setSuccess(
        "Your tuition has been submitted successfully and is awaiting admin approval!",
      );

      setForm(initialForm);
      setBanner(null);
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = "";
      }
      setPreview("");

      setStats((previous) => ({
        ...previous,
        count: result.currentCount,
        remaining: result.remaining,
        canPost: result.remaining === null || result.remaining > 0,
      }));

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (sessionLoading || loadingStats) {
    return (
      <DashboardSection
        title="Post Tuition"
        description="Create and publish a new tuition listing."
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
      title="Post Tuition"
      description="Create and publish a new tuition listing."
    >
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Subscription information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                {isPro ? (
                  <Crown className="size-5" />
                ) : (
                  <BookOpen className="size-5" />
                )}
              </div>

              <div>
                <p className="font-bold text-slate-900">
                  {isPro ? "Pro Tutor Plan" : "Free Tutor Plan"}
                </p>

                <p className="text-sm text-slate-500">
                  {isPro
                    ? "Create unlimited tuition listings."
                    : `${stats?.count || 0} of 2 tuition posts used.`}
                </p>
              </div>
            </div>

            {!isPro && (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
              >
                <Crown className="size-4" />
                Upgrade to Pro
                <ArrowRight className="size-4" />
              </Link>
            )}
          </div>

          {!isPro && (
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all"
                  style={{
                    width: `${Math.min(((stats?.count || 0) / 2) * 100, 100)}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                {stats?.remaining || 0} free post(s) remaining
              </p>
            </div>
          )}
        </div>

        {/* Notifications */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <X className="mt-0.5 size-5 shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
            {success}
          </div>
        )}

        {/* Free plan restriction */}
        {limitReached ? (
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-8 text-center">
            <Crown className="mx-auto size-12 text-indigo-600" />

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Free Posting Limit Reached
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
              You have already created 2 tuition posts. Upgrade to Pro to create
              unlimited tuition listings.
            </p>

            <Link
              href="/pricing"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700"
            >
              Upgrade to Pro
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
          >
            {/* Basic information */}
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Tuition Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Provide the details of your tuition opportunity.
              </p>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Tuition Title *
                </label>

                <input
                  type="text"
                  name="title"
                  required
                  minLength={5}
                  maxLength={100}
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics Coaching for Class 10"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Subject and class */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Subject *
                  </label>

                  <select
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500"
                  >
                    <option value="">Select Subject</option>

                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Class Level *
                  </label>

                  <select
                    name="classLevel"
                    required
                    value={form.classLevel}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500"
                  >
                    <option value="">Select Class</option>

                    {classLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mode */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  Tuition Mode *
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {["Online", "Offline", "Both"].map((mode) => (
                    <label
                      key={mode}
                      className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                        form.mode === mode
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 text-slate-600 hover:border-indigo-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="mode"
                        value={mode}
                        checked={form.mode === mode}
                        onChange={handleChange}
                        className="sr-only"
                      />

                      {mode}
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              {form.mode !== "Online" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    <MapPin className="mr-1 inline size-4" />
                    Tuition Location *
                  </label>

                  <input
                    type="text"
                    name="location"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Enter city or area"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              {/* Fee and days */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Monthly Fee (USD) *
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                      $
                    </span>

                    <input
                      type="number"
                      name="monthlyFee"
                      required
                      min="1"
                      step="0.01"
                      value={form.monthlyFee}
                      onChange={handleChange}
                      placeholder="300"
                      className="w-full rounded-xl border border-slate-200 py-3 pl-9 pr-4 text-sm outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    <CalendarDays className="mr-1 inline size-4" />
                    Days Per Week *
                  </label>

                  <select
                    name="daysPerWeek"
                    required
                    value={form.daysPerWeek}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <option key={day} value={day}>
                        {day} {day === 1 ? "Day" : "Days"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Tuition Description *
                </label>

                <textarea
                  name="description"
                  required
                  minLength={20}
                  maxLength={2000}
                  rows={5}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your teaching experience, methodology, student requirements and other important details..."
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {form.description.length}/2000 characters
                </p>
              </div>

              {/* Banner upload */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Tuition Banner Image *
                </label>

                <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-indigo-400 hover:bg-indigo-50/30">
                  {preview ? (
                    <div className="relative w-full">
                      <img
                        src={preview}
                        alt="Tuition banner preview"
                        className="max-h-64 w-full object-cover"
                      />

                      <span className="absolute bottom-3 right-3 rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow">
                        Change Image
                      </span>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="mx-auto grid size-12 place-items-center rounded-xl bg-indigo-100 text-indigo-600">
                        <ImagePlus className="size-6" />
                      </div>

                      <p className="mt-3 text-sm font-bold text-slate-700">
                        Click to upload banner image
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        PNG, JPG or WEBP · Maximum 5MB
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>

                {banner && (
                  <p className="mt-2 text-xs text-green-600">
                    Selected: {banner.name}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="border-t border-slate-100 pt-6">
              <div className="mb-5 flex items-start gap-2 text-sm text-slate-500">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-indigo-600" />
                Your tuition will be submitted for admin approval before
                becoming visible to students.
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Uploading and submitting...
                  </>
                ) : (
                  <>
                    <Upload className="size-5" />
                    Submit Tuition for Approval
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </DashboardSection>
  );
}
