"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  AuthLayout,
  GoogleIcon,
  OrDivider,
  googleBtnClass,
  inputClass,
  primaryBtnClass,
} from "@/components/auth/auth-layout";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const passwordsDoNotMatch =
    confirmPassword.length > 0 && password !== confirmPassword;
  const busy = isLoading || isGoogleLoading;

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password,
    };

    try {
      const { data, error } = await authClient.signUp.email(userData);

      if (error) {
        toast.error(error.message || "Could not create account.");
        setIsLoading(false);
        return;
      }

      if (data) {
        toast.success("Registration successful! Please sign in.");
        router.push("/signin");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Could not continue with Google.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="A great learning journey starts here."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-indigo-600 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
        disabled={busy}
        className={googleBtnClass}
      >
        {isGoogleLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        Sign up with Google
      </Button>

      <OrDivider />

      <form onSubmit={handleEmailSignup} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-slate-700">
            Full name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Alex Rivera"
            autoComplete="name"
            disabled={busy}
            className={inputClass}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email" className="text-slate-700">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={busy}
            className={inputClass}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password" className="text-slate-700">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={busy}
              className={`${inputClass} pr-11`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-indigo-600"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirm-password" className="text-slate-700">
            Confirm password
          </Label>
          <div className="relative">
            <Input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={busy}
              className={`${inputClass} pr-11 ${
                passwordsDoNotMatch
                  ? "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-500/30"
                  : ""
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-indigo-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {passwordsDoNotMatch && (
            <p className="flex items-center gap-1 text-xs font-medium text-red-600">
              <AlertCircle className="size-3.5" />
              Passwords do not match
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={busy || passwordsDoNotMatch}
          className={`${primaryBtnClass} mt-1`}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
