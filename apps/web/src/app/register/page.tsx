"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    insuranceProvider: "",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setStatusMessage(null);

    // validation
    if (formData.password !== formData.confirmPassword) {
      setStatusMessage("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setStatusMessage("Password must be at least 8 characters");
      return;
    }

    try {
      setStatusMessage("Creating account...");

      const result = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.fullName,

        // optional username plugin
        username: formData.email.split("@")[0],

        // additional fields
        data: {
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          insuranceProvider: formData.insuranceProvider,
          role: "patient",
        },
      });

      if (result.error) {
        setStatusMessage(result.error.message);
        return;
      }

      setStatusMessage(
        "Account created successfully. Please verify your email."
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        dateOfBirth: "",
        insuranceProvider: "",
      });

    } catch (error) {
      console.error(error);

      setStatusMessage(
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl ring-1 ring-slate-200 overflow-hidden">
        <div className="px-8 py-10">
          <h1 className="text-3xl font-semibold text-slate-900">Register as a Patient</h1>
          <p className="mt-3 text-sm text-slate-600">
            Create your AskleMed account to book telehealth appointments, manage your medical
            profile, and stay connected with care providers.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Full name</span>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Jane Doe"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email address</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Date of birth</span>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="(555) 123-4567"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-slate-700">Insurance provider</span>
                <input
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Optional"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Create a password"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Confirm password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Repeat your password"
                />
              </label>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                className="inline-flex justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create patient account
              </button>

              {statusMessage ? (
                <p className="text-sm text-slate-600">{statusMessage}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
