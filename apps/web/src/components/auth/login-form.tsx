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

    try {
      const { data, error } =
        await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        });

      if (error) {
        setError(error.message || "Invalid email or password.");
        return;
      }

      // 👇 get user role from response
      const role = data?.user?.role;

      if (!role) {
        setError("User role not found.");
        return;
      }

      // 👇 role-based redirection
      switch (role) {
        case "patient":
          router.push("/patient/dashboard");
          break;

        case "doctor":
          router.push("/doctor/appointments");
          break;

        case "admin":
          router.push("/admin/dashboard");
          break;

        default:
          router.push("/");
          break;
      }

      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
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