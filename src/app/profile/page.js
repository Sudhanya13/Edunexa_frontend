"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import {
  Camera,
  ShieldCheck,
  Crown,
  Mail,
  Phone,
  User,
  BookOpen,
  Save,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const user = session?.user;

  const fileInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (sessionLoading) return;

    if (!user) {
      router.replace("/signin");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Sync form defaults after Better Auth session resolves.
    setAvatarPreview(user.image || "");
    setPhone(user.phone || "");
    setBio(user.bio || "");
  }, [sessionLoading, user, router]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Supports PNG, JPG, or WebP only.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB.");
      e.target.value = "";
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let image = user?.image || null;

      if (avatarFile) {
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        if (!apiKey) {
          throw new Error("Profile image upload is not configured.");
        }

        const formData = new FormData();
        formData.append("image", avatarFile);

        const uploadResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          },
        );
        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok || !uploadData.success) {
          throw new Error(
            uploadData?.error?.message || "Failed to upload profile image",
          );
        }

        image = uploadData.data.url;
      }

      const { error } = await authClient.updateUser({
        image,
        phone: phone.trim(),
        bio: bio.trim(),
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      toast.success("Profile updated!");
      setAvatarFile(null);
      setAvatarPreview(image || "");
      await authClient.getSession();
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  if (sessionLoading) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
      </main>
    );
  }

  if (!user) return null;

  const plan = String(user.plan || "free").toLowerCase();
  const planLabel = plan === "pro" ? "Pro" : "Free";
  const roleLabel = String(user.role || "student");

  return (
    <main className="min-h-[75vh] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Account Profile
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Update your public bio, profile avatar, and verified contact
            numbers.
          </p>
        </div>

        {/* Native HTML Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Top Section: Avatar & Badges */}
          <div className="border-b border-slate-200 bg-slate-50/60 p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-md">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Profile Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-900 text-2xl font-bold text-white">
                      {(user?.name || "S").charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Profile Photo
                  </h2>
                  <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Upload a clear portrait to build trust with students and
                    guardians. Supports PNG, JPG, or WebP.
                  </p>
                  <div className="mt-3">
                    <input
                      ref={fileInputRef}
                      name="avatar"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 sm:text-sm"
                    >
                      <Camera className="h-4 w-4 text-slate-500" />
                      Upload New Avatar
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Role & Subscription Plan */}
              <div className="flex flex-row gap-3 sm:flex-col sm:items-end">
                <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2">
                  <span className="block text-[11px] font-medium tracking-wider text-slate-400 uppercase">
                    Account Role
                  </span>
                  <div className="mt-0.5 flex items-center gap-1.5 text-sm font-bold text-slate-800">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    {roleLabel.charAt(0).toUpperCase() + roleLabel.slice(1)}
                  </div>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-3.5 py-2">
                  <span className="block text-[11px] font-medium tracking-wider text-amber-700/80 uppercase">
                    Subscription Plan
                  </span>
                  <div className="mt-0.5 flex items-center gap-1.5 text-sm font-bold text-amber-900">
                    <Crown className="h-4 w-4 text-amber-500" />
                    {planLabel} Plan
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-6 p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Full Name{" "}
                  <span className="text-xs font-normal text-slate-400">
                    (Non-editable)
                  </span>
                </label>
                <div className="relative mt-2">
                  <User className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={user.name || ""}
                    disabled
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 py-2.5 pr-4 pl-10 text-sm text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Email Address{" "}
                  <span className="text-xs font-normal text-slate-400">
                    (Non-editable)
                  </span>
                </label>
                <div className="relative mt-2">
                  <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={user.email || ""}
                    disabled
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 py-2.5 pr-4 pl-10 text-sm text-slate-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Phone Number
                </label>
                <div className="relative mt-2">
                  <Phone className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 00000 00000"
                    className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pr-4 pl-10 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    Bio / Academic Background
                  </label>
                  <span className="text-xs text-slate-400">
                    {bio.length}/300
                  </span>
                </div>
                <div className="relative mt-2">
                  <BookOpen className="pointer-events-none absolute top-3.5 left-3.5 h-4 w-4 text-slate-400" />
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    maxLength={300}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Share your academic background or subjects of interest..."
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white py-2.5 pr-4 pl-10 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end border-t border-slate-200 bg-slate-50/60 px-6 py-4 sm:px-8">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
