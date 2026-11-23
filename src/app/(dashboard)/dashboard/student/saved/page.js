"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  Bookmark,
  Loader2,
  Trash2,
  ArrowLeft,
  BookOpen,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function SavedTuitionsPage() {
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const user = session?.user;
  const userId = user?.id;

  const [savedTuitions, setSavedTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const fetchSavedTuitions = useCallback(async () => {
    if (!userId) return;
    const { data: tokenData, error: tokenError } = await authClient.token();

    if (tokenError || !tokenData?.token) {
      throw new Error(tokenError?.message || "Failed to retrieve auth token");
    }
    console.log(tokenData.token);
    try {
      const res = await fetch(
        `https://edunexa-server.vercel.app/saved-tuitions/student/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Could not load saved tuitions");
      }

      setSavedTuitions(
        (data.savedTuitions || []).filter((item) => item.tuition),
      );
    } catch (error) {
      console.error("Saved tuitions error:", error);
      toast.error(error.message || "Failed to load saved tuitions");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isSessionLoading) return;

    if (!userId) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Load remote data; updates occur after fetch resolves.
    fetchSavedTuitions();
  }, [userId, isSessionLoading, fetchSavedTuitions]);

  const handleRemove = async (tuitionId) => {
    if (!user?.id) return;
    const { data: tokenData, error: tokenError } = await authClient.token();

    if (tokenError || !tokenData?.token) {
      throw new Error(tokenError?.message || "Failed to retrieve auth token");
    }
    console.log(tokenData.token);

    try {
      setRemovingId(tuitionId);

      const res = await fetch(
        `https://edunexa-server.vercel.app/saved-tuitions/${user.id}/${tuitionId}`,

        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to remove tuition");
      }

      setSavedTuitions((prev) =>
        prev.filter((item) => String(item.tuitionId) !== String(tuitionId)),
      );

      toast.success("Tuition removed from saved list");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setRemovingId(null);
    }
  };

  if (isSessionLoading || (Boolean(user) && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <Bookmark className="w-12 h-12 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-900">Please sign in</h2>
        <p className="text-slate-500 mt-2 mb-5">
          Sign in to view your saved tuitions.
        </p>
        <Link
          href="/signin"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-white font-semibold"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/dashboard/student"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Saved Tuitions
            </h1>
            <p className="text-slate-500 mt-2">
              Your bookmarked tuition opportunities.
            </p>
          </div>

          <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3">
            <p className="text-sm text-indigo-700">Saved Tuitions</p>
            <p className="text-2xl font-bold text-indigo-900">
              {savedTuitions.length}
            </p>
          </div>
        </div>

        {savedTuitions.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 px-6 text-center">
            <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900">
              No saved tuitions yet
            </h2>
            <p className="text-slate-500 mt-2 mb-6">
              Browse available tuitions and bookmark the ones you like.
            </p>
            <Link
              href="/tuitions"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-white font-semibold"
            >
              <BookOpen className="w-4 h-4" />
              Explore Tuitions
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedTuitions.map((item) => {
              const tuition = item.tuition;
              const tuitionId = String(item.tuitionId);

              return (
                <div
                  key={tuitionId}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative h-48 bg-slate-100">
                    <Image
                      src={
                        tuition.image ||
                        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000"
                      }
                      alt={tuition.title || "Tuition"}
                      fill
                      className="h-full w-full object-cover"
                    />

                    <button
                      onClick={() => handleRemove(tuitionId)}
                      disabled={removingId === tuitionId}
                      title="Remove saved tuition"
                      className="absolute right-3 top-3 rounded-full bg-white p-2.5 text-red-500 shadow hover:bg-red-50 disabled:opacity-50"
                    >
                      {removingId === tuitionId ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="p-5">
                    <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                      {tuition.subject || "General Subject"}
                    </span>

                    <h2 className="mt-3 text-lg font-bold text-slate-900">
                      {tuition.title || "Untitled Tuition"}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Mentor: {tuition.tutorName || "EduNexa Tutor"}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      $
                      {Number(
                        tuition.monthlyFee ??
                          tuition.salary ??
                          tuition.fee ??
                          0,
                      ).toLocaleString()}{" "}
                      / month
                    </p>

                    <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="w-4 h-4" />
                      {tuition.location || "Online"}
                    </p>

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <Link
                        href={`/tuitions/${tuition._id}`}
                        className="block w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition"
                      >
                        View Tuition
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
