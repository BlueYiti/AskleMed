"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import FormInput from "@/components/forms/form-input";

import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    console.log("🚀 Login attempt started");
    console.log("📦 Form data:", formData);

    try {
      const res = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      console.log("📡 Full auth response:", res);

      const { data, error } = res;

      if (error) {
        console.error("❌ Auth error:", error);
        setError(error.message || "Invalid email or password.");
        return;
      }

      console.log("✅ Auth success data:", data);
      console.log("👤 User object:", data?.user);

      const role = (data?.user as any)?.role;

      console.log("🎭 Extracted role:", role);

      if (!role) {
        console.error("⚠️ Role missing from user object!");
        setError("User role not found.");
        return;
      }

      let targetRoute = "/";

      switch (role) {
        case "patient":
          targetRoute = "/patient/dashboard";
          break;
        case "doctor":
          targetRoute = "/doctor/appointments";
          break;
        case "admin":
          targetRoute = "/admin/dashboard";
          break;
      }

      console.log("🔁 Redirecting to:", targetRoute);

      router.push(targetRoute);

      console.log("🔄 Calling router.refresh()");
      router.refresh();

    } catch (err) {
      console.error("🔥 Unexpected login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      console.log("🏁 Login flow finished");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <FormInput
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <FormInput
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading
          ? "Signing In..."
          : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;