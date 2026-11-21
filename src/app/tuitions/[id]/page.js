"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  User,
  Calendar,
  Clock,
  Star,
  MapPin,
  Monitor,
  X,
  Send,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import toast from "react-hot-toast";
// Adjust this import path to match your BetterAuth client setup
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function TuitionDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  // BetterAuth session hook
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();
  const user = session?.user;
  const userRole = user?.role?.toLowerCase(); // 'student' | 'tutor' | 'admin'

  // Tuition & Reviews state
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Apply Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    institution: "",
    message: "",
  });

  // Fetch single tuition post by ID
  useEffect(() => {
    if (!id) return;

    const fetchTuitionDetails = async () => {
      try {
        setLoading(true);

        // const apiUrl = (
        //   process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        // ).replace(/\/$/, "");

        const res = await fetch(`http://localhost:5000/all-tuitions/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch tuition details");
        }

        const data = await res.json();
        setTuition(data);
      } catch (error) {
        console.error(error);
        setTuition(null);
        toast.error("Could not load tuition details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTuitionDetails();
  }, [id]);

  // Share link handler
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Tuition link copied to clipboard!");
    }
  };

  // Submit application (Students only)
  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!user || userRole !== "student") {
      toast.error("Only registered students can apply for tuitions.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        tuitionId: tuition._id || id,
        tuitionTitle: tuition.title,
        tutorEmail: tuition.tutorEmail || tuition.mentor?.email,
        studentId: user.id,
        studentName: user.name,
        studentEmail: user.email,
        phone: formData.phone,
        institution: formData.institution,
        message: formData.message,
        status: "Pending",
      };

      const res = await fetch("http://localhost:5000/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Application failed");
      }

      toast.success("Application submitted successfully!");
      setHasApplied(true);
      setIsApplyModalOpen(false);
      setFormData({ phone: "", institution: "", message: "" });
    } catch (error) {
      toast.error(error.message || "Something went wrong while applying.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-600 px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Tuition Not Found
        </h2>
        <p className="text-slate-500 mb-6">
          This tuition post may have been removed or is unavailable.
        </p>
        <Link
          href="/tuitions"
          className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
        >
          Back to All Tuitions
        </Link>
      </div>
    );
  }

  // Fallback field mappings so it works seamlessly with your MongoDB schema
  const tutorName =
    tuition.tutorName || tuition.mentor?.name || "EduNexa Tutor";
  const tutorEmail =
    tuition.tutorEmail || tuition.mentor?.email || "tutor@edunexa.com";
  const tutorInitial = tutorName.charAt(0).toUpperCase();
  const currencySymbol =
    tuition.currency === "USD" ? "$" : tuition.currency || "৳";
  const schedule = tuition.daysPerWeek || tuition.schedule || "3 days/week";
  const reviews = tuition.reviews || [];
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation */}
        <div className="mb-6">
          <Link
            href="/tuitions"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Tuitions</span>
          </Link>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Hero Image Banner Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 h-[300px] sm:h-[380px]">
              <Image
                src={
                  tuition.image ||
                  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop"
                }
                alt={tuition.title}
                fill
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

              {/* Top-Left Delivery Mode Pill */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/95 text-indigo-700 border border-indigo-100 backdrop-blur-md">
                  <Monitor className="w-3.5 h-3.5" />
                  {tuition.deliveryMode || tuition.mode || "Online Session"}
                </span>
              </div>

              {/* Top-Right Share & Bookmark Buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  title="Share Tuition"
                  className="p-2.5 rounded-full bg-white/95 hover:bg-indigo-50 text-slate-700 border border-slate-200 backdrop-blur-md transition"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setIsBookmarked(!isBookmarked);
                    toast.success(
                      !isBookmarked
                        ? "Saved to bookmarks"
                        : "Removed from bookmarks",
                    );
                  }}
                  title="Bookmark Tuition"
                  className={`p-2.5 rounded-full border backdrop-blur-md transition ${
                    isBookmarked
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                      : "bg-white/95 hover:bg-indigo-50 text-slate-700 border-slate-200"
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title & Badges Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
              {/* Tags Row */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {tuition.subject || "General Subject"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  {tuition.classLevel || "All Levels"}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Tuition
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-snug mb-5">
                {tuition.title}
              </h1>

              {/* Metadata Footer Row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-500" />
                  <span>
                    Mentor:{" "}
                    <strong className="text-slate-800 font-medium">
                      {tutorName}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>
                    Schedule:{" "}
                    <strong className="text-slate-800 font-medium">
                      {schedule}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>
                    Posted:{" "}
                    <span className="text-slate-600">
                      {tuition.createdAt
                        ? new Date(tuition.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : "Nov 2026"}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* About This Tuition Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">
                About This Tuition
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {tuition.description ||
                  "Detailed syllabus coverage, personalized problem-solving sessions, weekly assessments, and structured mentorship tailored to student goals."}
              </p>
            </div>

            {/* Student Reviews & Feedback Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Student Reviews & Feedback
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Real experiences from accepted EduNexa tuition attendees.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-slate-900 font-mono">
                    {averageRating}
                  </span>
                  <div>
                    <div className="flex items-center gap-0.5 text-slate-300">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < Math.round(Number(averageRating))
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {reviews.length}{" "}
                      {reviews.length === 1 ? "review" : "reviews"}
                    </p>
                  </div>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  No reviews yet. Accepted students will be able to share
                  feedback after their classes.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 pt-2">
                  {reviews.map((rev, i) => (
                    <div key={i} className="py-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-slate-900 text-sm">
                          {rev.studentName}
                        </span>
                        <span className="text-xs text-amber-400">
                          ★ {rev.rating}/5
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY SIDEBAR (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              {/* Fee Header */}
              <div className="pb-5 border-b border-slate-100">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Monthly Tuition Fee
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
                    {currencySymbol}
                    {Number(
                      tuition.monthlyFee ??
                        tuition.salary ??
                        tuition.fee ??
                        6000,
                    ).toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-500">/month</span>
                </div>
              </div>

              {/* Key-Value Details Table */}
              <div className="py-4 divide-y divide-slate-100 text-sm">
                <div className="py-3 flex items-center justify-between">
                  <span className="text-slate-500">Subject</span>
                  <span className="font-semibold text-slate-800">
                    {tuition.subject || "Data Science"}
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <span className="text-slate-500">Class Level</span>
                  <span className="font-semibold text-slate-800">
                    {tuition.classLevel || "University"}
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <span className="text-slate-500">Delivery Mode</span>
                  <span className="font-semibold text-indigo-600">
                    {tuition.deliveryMode || tuition.mode || "Online"}
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <span className="text-slate-500">Location</span>
                  <span className="font-semibold text-slate-800 inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {tuition.location || "Online"}
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <span className="text-slate-500">Weekly Classes</span>
                  <span className="font-semibold text-slate-800 font-mono">
                    {schedule}
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <span className="text-slate-500">Status</span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100">
                    {tuition.status || "Approved"}
                  </span>
                </div>
              </div>

              {/* Tuition Mentor Mini-Card */}
              <div className="pt-4 border-t border-slate-100 mb-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Tuition Mentor
                </p>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                    {tutorInitial}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {tutorName}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {tutorEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role-Based Apply Button */}
              {isSessionLoading ? (
                <button
                  disabled
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 text-slate-500 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Checking Access...
                </button>
              ) : !user ? (
                <>
                  <button
                    onClick={() =>
                      router.push(
                        `/signin?callbackUrl=${encodeURIComponent(`/tuitions/${id}`)}`,
                      )
                    }
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition cursor-pointer shadow-lg shadow-indigo-500/20"
                  >
                    Sign In to Apply
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2.5">
                    Students must log in to submit application requests
                  </p>
                </>
              ) : userRole === "student" ? (
                <>
                  <button
                    onClick={() => setIsApplyModalOpen(true)}
                    disabled={hasApplied}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition cursor-pointer shadow-lg ${
                      hasApplied
                        ? "bg-slate-100 text-indigo-700 border border-indigo-200 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20"
                    }`}
                  >
                    {hasApplied
                      ? "Application Submitted ✓"
                      : "Apply for Tuition"}
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2.5">
                    Logged in as Student ({user.name})
                  </p>
                </>
              ) : (
                <>
                  <button
                    disabled
                    className="w-full py-3 px-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Students Only
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2.5">
                    Your account role ({userRole || "Tutor/Admin"}) cannot apply
                    for tuitions.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* APPLY FOR TUITION MODAL (Students Only) */}
      {isApplyModalOpen && userRole === "student" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Apply for Tuition
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {tuition.title}
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="mt-5 space-y-4">
              {/* Read-only Student Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={user.name || ""}
                    readOnly
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-sm cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Student Email
                  </label>
                  <input
                    type="email"
                    value={user.email || ""}
                    readOnly
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1XXX-XXXXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-slate-900 text-sm"
                />
              </div>

              {/* Current Institution / Class */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Current School / College / University *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BRAC University / Dhaka College"
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-slate-900 text-sm"
                />
              </div>

              {/* Note to Mentor */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Learning Goals & Preferred Time *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly describe what topics you want to focus on and your preferred schedule..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none text-slate-900 text-sm resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
